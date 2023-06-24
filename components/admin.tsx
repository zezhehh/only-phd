"use client";

import { tokenAtom } from "@/utils/states";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { SuccessAlert } from "./alerts";
import Merger from "./merger";

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
      {data && <SuccessAlert info="Successfully verified admin role!" />}
      {data && <Merger />}
    </div>
  );
};

export default Admin;
