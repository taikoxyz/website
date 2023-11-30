// import "@/styles/app.css";

import { SessionContextProvider, useUser } from "@supabase/auth-helpers-react";
import { addEndpoint, editEndpoint, getEndpoints } from "../../lib/supabase";
import { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import { Auth } from "@supabase/auth-ui-react";
import { StyledLink } from "../StyledLink";
import { ThemeSupa } from "@supabase/auth-ui-shared";
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
  const [proverName, setProverName] = useState("");
  const [newProverFee, setNewProverFee] = useState("");
  const [proverExist, setProverExist] = useState(false);

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
    // Add docs/reference/prover-market-page# to the URL.
    url = `${url}docs/reference/prover-market-page`;
    return url;
  };

  async function addOrEditProverEndpoint(e) {
    e.preventDefault();

    if (!proverExist) {
      try {
        await addEndpoint({
          prover_name: proverName,
          prover_url: newProverEndpoint,
          prover_fee: Number(newProverFee),
        });

        // Success: refresh data and show toast?
        fetchProverEndpoints();
        // Show success toast
      } catch (error) {
        console.error(error);
        // Show error as a toast message
      }
    } else {
      try {
        await editEndpoint({
          prover_name: proverName,
          prover_url: newProverEndpoint,
          prover_fee: Number(newProverFee),
        });

        // Success: refresh data and show toast?
        fetchProverEndpoints();
      } catch (error) {
        console.error(error);
        // Show error as a toast message
      }
    }
  }

  async function fetchProverEndpoints() {
    try {
      const proverEndpoints = await getEndpoints();
      setProvers(proverEndpoints.sort((a, b) => b.prover_fee - a.prover_fee));

      // Find user's endpoint if it exists and set as newProverEndpoint

      const userEndpoint = proverEndpoints.find(
        (endpoint) => endpoint.user_id === user.id
      );
      if (userEndpoint) {
        setNewProverEndpoint(userEndpoint.prover_url);
        setNewProverFee(userEndpoint.prover_fee.toString());
        setProverExist(true);
      }
      console.log(proverEndpoints);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchUserEndpoint() {
    try {
      const proverEndpoints = await getEndpoints();
      setProvers(proverEndpoints.sort((a, b) => b.prover_fee - a.prover_fee));
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
  }, [user]);

  return (
    <>
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
      {user && (
        <form
          className="flex justify-between items-center gap-1"
          onSubmit={(e) => addOrEditProverEndpoint(e)}
        >
          <input
            value={proverName}
            onChange={(e) => setProverName(e.target.value)}
            className="my-3 py-1 text-center rounded-md w-full"
            placeholder="My Prover"
          />
          <input
            value={newProverEndpoint}
            onChange={(e) => setNewProverEndpoint(e.target.value)}
            className="my-3 py-1 text-center rounded-md w-full"
            placeholder="http://192.168.20.1:9876"
          />
          <input
            value={newProverFee}
            onChange={(e) => setNewProverFee(e.target.value)}
            className="my-3 py-1 text-center rounded-md"
            placeholder="10"
          />

          <button
            className="hover:cursor-pointer text-neutral-100 bg-[#E81899] hover:bg-[#d1168a] border-solid border-neutral-200 focus:ring-4 focus:outline-none focus:ring-neutral-100 font-medium rounded-md text-sm my-3 py-1.5 px-1 text-center whitespace-nowrap"
            type="submit"
          >
            {!proverExist ? "Add prover pool" : "Edit prover pool"}
          </button>
        </form>
      )}

      <table className="table-auto w-full text-center mt-8">
        <thead>
          <tr>
            <th>Prover Name</th>

            <th>Prover Endpoint</th>
            <th
              className="cursor-pointer"
              onClick={() => sortData("minimumGas")}
            >
              Prover Fee {renderSortArrow("minimumGas")}
            </th>
          </tr>
        </thead>
        <tbody>
          {provers.map((prover, index) => (
            <tr key={index}>
              <td>{prover.prover_name}</td>
              <td>
                <StyledLink href={prover.prover_url} text={prover.prover_url} />
              </td>
              <td>{prover.prover_fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProverEndpointsTable;
