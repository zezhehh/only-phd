"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { tokenAtom } from "@/utils/states";
import { useAtom } from "jotai";
import useSWR from "swr";

export const adminFetcher = (token: string): Promise<boolean> =>
  fetch("/api/isAdmin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })
    .then((res) => res.json())
    .then((jsonRes) => jsonRes.isAdmin);

const Admin = () => {
  const [, setAdminToken] = useAtom(tokenAtom);
  const [token, setToken] = useState("");
  const { data } = useSWR(token, adminFetcher);

  useEffect(() => {
    if (data) {
      setAdminToken(token);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Input the admin token"
        className="input input-bordered w-full max-w-xs"
      />
      {data && (
        <div className="alert alert-success w-full max-w-xs mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Successfully verified admin role!</span>
        </div>
      )}
    </div>
  );
};

export default Admin;
