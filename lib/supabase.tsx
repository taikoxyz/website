import type { Database } from "../database.types";
import { createClient } from "@supabase/supabase-js";

export const client = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

type Endpoint = {
  user_id?: string;
  prover_url: string;
  prover_fee: number;
};

export async function getEndpoints() {
  const { data, error } = await client.from("prover_market").select("*");

  return data;
}

export async function addEndpoint(endpoint: Endpoint) {
  let session = await client.auth.getSession();

  if (!session) {
    console.error("User must be logged in to insert data");
    return;
  }

  // Add the user_id to the endpoint data
  const endpointWithUserId = {
    ...endpoint,
    user_id: session.data.session.user.id,
  };

  const { data, error } = await client
    .from("prover_market")
    .insert([endpointWithUserId]);

  return data;
}
/**
 * Edit endpoint in database (Must be authorized, logged into github)
 */
export async function editEndpoint(endpoint: Endpoint) {
  let session = await client.auth.getSession();

  if (!session) {
    console.error("User must be logged in to insert data");
    return;
  }

  const { data, error } = await client
    .from("prover_market")
    .update(endpoint)
    .match({ user_id: session.data.session.user.id });

  if (error) {
    return error;
  }

  return data;
}
