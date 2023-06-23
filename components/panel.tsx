"use client";

import React, { useEffect, useRef, useState } from "react";
import Map from "./map";
import useSWR from "swr";
import { useAtom } from "jotai";
import { tokenAtom, isAdminAtom } from "@/utils/states";
import { adminFetcher } from "./admin";

import InstitutionList from "./institutionList";

const TIPS = () => {
  return (
    <div className="alert alert-accent mb-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info shrink-0 w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>TIPS: Scroll down to load more</span>
    </div>
  );
};

const Panel = () => {
  const [searchContent, setSearchContent] = useState("");
  const [, setIsAdmin] = useAtom(isAdminAtom);
  const [token] = useAtom(tokenAtom);
  const { data } = useSWR(token, adminFetcher);

  useEffect(() => {
    if (data) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [data]);

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute w-1/3 h-screen overflow-hidden p-16 pr-3 flex flex-col justify-center items-center invisilbe lg:visible">
        <div className="w-full">
          {searchContent && <TIPS />}
          <input
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            type="text"
            placeholder="Search with institution names and/or subjects"
            className="input input-bordered input-primary w-full mb-5"
          />
        </div>
        <InstitutionList searchContent={searchContent} />
      </div>
      <Map />
    </div>
  );
};

export default Panel;
