'use client';


import React, { useEffect, useRef } from "react";
import Map from "./map";
import InstitutionList from "./institutionList";

const Panel = () => {

  return <div>
    <input type="text" placeholder="Search institutions" className="input input-bordered w-full max-w-xs" />
    <InstitutionList />
    <Map />
  </div>;
};

export default Panel;
