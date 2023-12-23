import type { Database } from "../database.types";
import { createClient } from "@supabase/supabase-js";

export const client = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

type Endpoint = {
  user_id?: string;
  prover_name: string;
  prover_url: string;
  prover_fee: number;
};

type InputValiationResponse = {
  result: boolean;
  error?: string;
};

type AddOrEditEndpointResult = {
  validation_error?: string;
  data?: any;
  error?: any;
};

export async function getEndpoints() {
  const { data, error } = await client.from("prover_market").select("*");

  return data;
}

function endpointInputValidation(endpoint: Endpoint): InputValiationResponse {
  if (!endpoint.prover_name) {
    return { result: false, error: "Prover name is required" };
  }

  // Add the user_id to the endpoint data
  if (endpoint.prover_name.toLowerCase().includes("taiko")) {
    return { result: false, error: "Name cannot include Taiko." };
  }

  if (!endpoint.prover_url) {
    return { result: false, error: "Prover URL is required" };
  }

  if (!endpoint.prover_fee) {
    return { result: false, error: "Prover fee is required" };
  }

  // Prover URL must be a valid URL
  try {
    new URL(endpoint.prover_url);
  } catch (error) {
    return { result: false, error: "Prover URL is invalid" };
  }

  return { result: true };
}

export async function addEndpoint(
  endpoint: Endpoint
): Promise<AddOrEditEndpointResult> {
  let session = await client.auth.getSession();

  if (!session) {
    console.error("User must be logged in to insert data");
    return;
  }

  // Input validation
  const { result, error: validation_error } = endpointInputValidation(endpoint);

  if (!result) {
    return { validation_error };
  } else {
    const endpointWithUserId = {
      ...endpoint,
      user_id: session.data.session.user.id,
    };

    const { error } = await client
      .from("prover_market")
      .insert([endpointWithUserId]);

    return { error };
  }
}
/**
 * Edit endpoint in database (Must be authorized, logged into github)
 */
export async function editEndpoint(
  endpoint: Endpoint
): Promise<AddOrEditEndpointResult> {
  let session = await client.auth.getSession();

  if (!session) {
    console.error("User must be logged in to insert data");
    return;
  }

  // Input validation
  const { result, error: validation_error } = endpointInputValidation(endpoint);

  if (!result) {
    return { validation_error };
  } else {
    const { error } = await client
      .from("prover_market")
      .update(endpoint)
      .match({ user_id: session.data.session.user.id });

    return { error };
  }
}

export async function removeEndpoint(endpoint: Endpoint) {
  let session = await client.auth.getSession();

  if (!session) {
    console.error("User must be logged in to delete data");
    return;
  }

  const { error } = await client.from("prover_market").delete().match({
    user_id: endpoint.user_id,
    prover_name: endpoint.prover_name,
    prover_url: endpoint.prover_url,
    prover_fee: endpoint.prover_fee,
  });
  if (error) {
    console.error("Error deleting endpoint:", error);
    return;
  }

  console.log("Endpoint deleted successfully");
}
