'use client';

import '../styles/map.css'
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef } from "react";

const Map = () => {
    const map = useRef<mapboxgl.Map | any>(null);
    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? '';
        map.current = new mapboxgl.Map({
          container: "map",
          style: 'mapbox://styles/kiki0805/clirh61tb007e01qy1wbmg9lv',
          zoom: 1})
        map.current.on('click', (e: { point: any; }) => {
          var features = map.current.queryRenderedFeatures(e.point);
          console.log(JSON.stringify(features, null, 2));
        })
      }, []);

  return <div className='mx-auto flex flex-col justify-center items-center w-screen h-screen'><div id="map" className='w-3/4 h-screen'></div></div>;
};

export default Map;
