"use client";

import "../styles/map.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAtom } from "jotai";
import { curPlaceAtom } from "@/utils/states";
import { useHoverDirty } from "react-use";
import React, { useEffect, useRef } from "react";
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
    map.current.on("click", async (e: { point: any; lngLat: any }) => {
      // var features = map.current.queryRenderedFeatures(e.point);
      const { lng, lat } = e.lngLat;

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();

      // Extract country details
      const countryFeatures = data.features.filter((feature: any) =>
        feature.place_type.includes("country")
      );

      if (countryFeatures.length > 0) {
        const countryName = countryFeatures[0].text;
        const countryCode = countryFeatures[0].properties.short_code;

        console.log("Country:", countryName, "Code:", countryCode);
      }
    });

    map.current.on("load", () => {
      // https://stackoverflow.com/questions/67906883/hover-effect-for-countries
      map.current.addSource("cbs", {
        type: "geojson",
        data: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson",
      });

      map.current.addLayer({
        id: "cf", // country-fills
        type: "fill",
        source: "cbs",
        layout: {},
        paint: {
          "fill-color": "#3f94b8",
          "fill-opacity": 0,
        },
      });

      map.current.addLayer({
        id: "cb", // country borders
        type: "line",
        source: "cbs",
        layout: {},
        paint: {
          "line-color": "#3f94b8",
          "line-width": 0,
        },
      });

      map.current.addLayer({
        id: "cfh", // country-fills-hover",
        type: "fill",
        source: "cbs",
        layout: {},
        paint: {
          "fill-color": "#3f94b8",
          "fill-opacity": 0.5,
        },
        filter: ["==", "name", ""],
      });

      map.current.on("mousemove", function (e: any) {
        var features = map.current.queryRenderedFeatures(e.point, {
          layers: ["cf"],
        });

        if (features.length) {
          map.current.getCanvas().style.cursor = "pointer";
          map.current.setFilter("cfh", [
            "==",
            "name",
            features[0].properties.name,
          ]);
        } else {
          map.current.setFilter("cfh", ["==", "name", ""]);
          map.current.getCanvas().style.cursor = "";
        }
      });

      map.current.on("mouseout", function () {
        map.current.getCanvas().style.cursor = "auto";
        map.current.setFilter("cfh", ["==", "name", ""]);
      });
    });

    marker.current = new mapboxgl.Marker({
      color: "#e3a47a",
    });

    return () => map.current.remove();
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
        className="absolute flex justify-center items-center inset-y-0 right-0 w-48 z-30 hover:bg-[#eaeaea]/50 transition ease-in-out opacity-0 hover:opacity-100 invisible xl:visible"
      >
        Scroll page
      </div>
      <div id="map" className="ml-auto xl:w-2/3 w-screen h-screen"></div>
    </div>
  );
};

export default Map;
