"use client";

import "../styles/map.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAtom } from "jotai";
import { curPlaceAtom } from "@/utils/states";
import { useHoverDirty } from "react-use";
import React, { useEffect, useRef, useState } from "react";
import mapboxSdk from "@mapbox/mapbox-sdk/services/geocoding";

const Map = () => {
  const map = useRef<mapboxgl.Map | any>(null);
  const rightEdge = useRef<HTMLDivElement>(null);
  const [placeName, setPlaceName] = useAtom(curPlaceAtom);
  const isHoveringEdge = useHoverDirty(rightEdge);
  const marker = useRef<mapboxgl.Marker | any>(null);
  const popup = useRef<mapboxgl.Popup | any>(null);

  const searchPlace = async () => {
    const mapboxClient = mapboxSdk({
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? "",
    });
    const response = await mapboxClient
      .forwardGeocode({
        query: placeName,
        limit: 1,
      })
      .send();

    const features = response.body.features;
    console.log(features);
    if (features.length === 0) return;
    const { center } = features[0];

    map.current.flyTo({
      center,
      zoom: 5,
      essential: true,
    });
    popup.current = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    }).setText(placeName);
    marker.current.setPopup(popup.current).togglePopup();
    marker.current.setLngLat(center).addTo(map.current);
  };

  useEffect(() => {
    if (!placeName || map.current === null) return;
    searchPlace();
  }, [placeName]);

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

    marker.current = new mapboxgl.Marker({
      color: "#e3a47a",
    });
  }, []);

  useEffect(() => {
    if (isHoveringEdge) {
      map.current.scrollZoom.disable();
    } else {
      map.current.scrollZoom.enable();
    }
  }, [isHoveringEdge]);

  return (
    <div className="mx-auto flex justify-center items-center">
      <div
        ref={rightEdge}
        className="absolute flex justify-center items-center inset-y-0 right-0 w-48 z-30 hover:bg-[#eaeaea]/50 transition ease-in-out opacity-0 hover:opacity-100 invisible lg:visible"
      >
        Scroll page
      </div>
      <div id="map" className="ml-auto lg:w-2/3 w-screen h-screen"></div>
    </div>
  );
};

export default Map;
