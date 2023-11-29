import type { Database } from "../database.types";
import { createClient } from "@supabase/supabase-js";

export const client = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

type Endpoint = {
  id: number;
  created_at: string;
};

/**
 * Add Endpoint to database (Must be authorized, logged into github)
 */
export async function addEndpoint(endpoint: Endpoint) {
  let session = await client.auth.getSession();
  console.log("🚀 | addEndpoint | session:", session);
  const { data, error } = await client.from("test").insert(endpoint).select();
  console.log("🚀 | addEndpoint | data:", data);
  console.log("🚀 | addEndpoint | error:", error);
}
/**
 * Edit endpoint in database (Must be authorized, logged into github)
 */
export async function editEndpoint(endpoint: Endpoint) {
  const { data, error } = await client.from("test").update(endpoint).select();
  console.log("🚀 | editEndpoint | data:", data);
  console.log("🚀 | editEndpoint | error:", error);
}
