"use client";

import configMap from "@/utils/map";
import { curPlaceAtom } from "@/utils/states";
import mapboxSdk from "@mapbox/mapbox-sdk/services/geocoding";
import { useAtom } from "jotai";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import { useHoverDirty } from "react-use";

const Map = ({
  onClickCountry,
}: {
  onClickCountry: (countryCode: string, ctrlKey: boolean) => void;
}) => {
  const map = useRef<mapboxgl.Map | any>(null);
  const rightEdge = useRef<HTMLDivElement>(null);
  const [placeName] = useAtom(curPlaceAtom);
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

  const onClick = useRef((countryCode: string, ctrlKey: boolean) => {
    onClickCountry(countryCode, ctrlKey);
  });

  useEffect(() => {
    onClick.current = onClickCountry;
  }, [onClickCountry]);

  useEffect(() => {
    configMap(map, onClick);

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
