// import "@/styles/app.css";

import { SessionContextProvider, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { Auth } from "@supabase/auth-ui-react";
import { StyledLink } from "../StyledLink";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { addEndpoint } from "../../lib/supabase";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

function generateRandomNumber(): number {
  return Math.floor(Math.random() * 1000) + 1;
}

export function ProverEndpointsTable() {
  const [provers, setProvers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("currentCapacity");
  const [newProverEndpoint, setNewProverEndpoint] = useState("");

  const user = useUser();

  if (user) {
    console.log(`User ID: ${user.id}`);
  } else {
    console.log("User is not logged in");
  }

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    url = url.includes("http") ? url : `https://${url}`;
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    console.log("🚀 | getURL | url:", url);
    return "http://localhost:3000/docs/reference/prover-market-page";
  };

  async function addProverEndpoint(e) {
    e.preventDefault();

    try {
      addEndpoint({
        id: generateRandomNumber(),
        created_at: "0",
      });

      // Success: refresh data and show toast?
      fetchProverEndpoints();
      setNewProverEndpoint("");
    } catch (error) {
      console.error(error);
      // Show error as a toast message
    }
  }

  async function getProverEndpoints() {
    let { data: test, error } = await supabase.from("test").select("*");
    console.log(test);

    return []; // TODO: fetch from DB
  }

  async function fetchProverEndpoints() {
    try {
      const proverEndpoints = await getProverEndpoints();
      setProvers(proverEndpoints.sort((a, b) => b.id - a.id));
      console.log(proverEndpoints);
    } catch (error) {
      console.error(error);
    }
  }

  const sortData = (column) => {
    const sortedProvers = [...provers];
    sortedProvers.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[column] - b[column];
      } else {
        return b[column] - a[column];
      }
    });
    setProvers(sortedProvers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
  };

  // Function to render the sorting arrow in the table header
  const renderSortArrow = (column) => {
    if (column === sortColumn) {
      if (sortOrder === "asc") {
        return <span>&uarr;</span>; // Up arrow
      } else {
        return <span>&darr;</span>; // Down arrow
      }
    }
    return null;
  };

  useEffect(() => {
    fetchProverEndpoints();
  }, []);

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {!user && (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          onlyThirdPartyProviders={true} // Github login only
          providers={["github"]}
          showLinks={false}
          theme="dark"
          redirectTo={getURL()}
        />
      )}
      <div>
        <form
          className="flex flex-col items-center my-4"
          onSubmit={(e) => addProverEndpoint(e)}
        >
          <input
            value={newProverEndpoint}
            onChange={(e) => setNewProverEndpoint(e.target.value)}
            className="my-3 py-1 text-center"
            placeholder="http://192.168.20.1:9876"
          />
          <button
            className="hover:cursor-pointer text-neutral-100 bg-[#E81899] hover:bg-[#d1168a] border-solid border-neutral-200 focus:ring-4 focus:outline-none focus:ring-neutral-100 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center m-1 w-48 justify-center"
            type="submit"
          >
            Add prover pool
          </button>
        </form>

        <table className="table-auto w-full text-center mt-8">
          <thead>
            <tr>
              <th>API Endpoint</th>
              <th
                className="cursor-pointer"
                onClick={() => sortData("minimumGas")}
              >
                Minimum Fee {renderSortArrow("minimumGas")}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => sortData("currentCapacity")}
              >
                Current Capacity {renderSortArrow("currentCapacity")}
              </th>
            </tr>
          </thead>
          <tbody>
            {provers.map((prover, index) => (
              <tr key={index}>
                <td>
                  <StyledLink href={prover.url} text={prover.url} />
                </td>
                <td>{prover.minimumGas}</td>
                <td>{prover.currentCapacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SessionContextProvider>
  );
}

export default ProverEndpointsTable;
