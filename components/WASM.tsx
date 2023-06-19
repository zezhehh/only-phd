'use client';

import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const WASM = dynamic(
    () => import("academics-core").then(mod => {
      console.log(mod.add(3, 4));
      return () => <div>WAS</div>
    }),
)

  

export default WASM
