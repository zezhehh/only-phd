"use client";

import React, { useEffect, useRef, useState } from "react";
import Map from "./map";
import InstitutionList from "./institutionList";

const Panel = () => {
  const [searchContent, setSearchContent] = useState("");
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute w-1/3 h-screen overflow-hidden p-16 pr-3 flex flex-col justify-center items-center">
        <div className="w-full">
          <input
            value={searchContent}
            onChange={(e) => setSearchContent(e.target.value)}
            type="text"
            placeholder="Search institutions"
            className="input input-bordered input-primary w-full mb-5"
          />
        </div>
        {searchContent && <InstitutionList searchContent={searchContent} />}
      </div>
      <Map />
    </div>
  );
};

export default Panel;
