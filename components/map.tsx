"use client";

import "../styles/map.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef, useState } from "react";

const Map = () => {
  const map = useRef<mapboxgl.Map | any>(null);
  const rightEdge = useRef<HTMLDivElement>(null);
  const [onRightEdge, setOnRightEdge] = useState(false);
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? "";
    map.current = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/kiki0805/clirh61tb007e01qy1wbmg9lv",
      zoom: 1,
      logoPosition: "bottom-right",
    });
    map.current.on("click", (e: { point: any }) => {
      var features = map.current.queryRenderedFeatures(e.point);
      console.log(JSON.stringify(features, null, 2));
    });

    const enterRightEdge = () => {
      setOnRightEdge(true);
    };

    const leaveRightEdge = () => {
      setOnRightEdge(false);
    };

    if (rightEdge.current) {
      rightEdge.current.addEventListener("mouseenter", enterRightEdge);
      rightEdge.current.addEventListener("mouseleave", leaveRightEdge);
    }
    return () => {
      if (rightEdge.current) {
        rightEdge.current.removeEventListener("mouseenter", enterRightEdge);
        rightEdge.current.removeEventListener("mouseleave", leaveRightEdge);
      }
    };
  }, []);

  useEffect(() => {
    if (onRightEdge) {
      map.current.scrollZoom.disable();
    } else {
      map.current.scrollZoom.enable();
    }
  }, [onRightEdge]);

  return (
    <div className="mx-auto flex justify-center items-center">
        <div
          ref={rightEdge}
          className="absolute flex justify-center items-center inset-y-0 right-0 w-48 z-30 hover:bg-[#eaeaea]/50 transition ease-in-out opacity-0 hover:opacity-100"
        >
          Scroll page
        </div>
        <div id="map" className="ml-auto w-2/3 h-screen"></div>
    </div>
  );
};

export default Map;
