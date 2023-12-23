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

    if (endpoint.prover_name.toLowerCase().includes("taiko")) {
        console.error("Name cannot include Taiko.");
        return;
    }

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


    if (endpoint.prover_name.toLowerCase().includes("taiko")) {
        console.error("Name cannot include Taiko.");
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
