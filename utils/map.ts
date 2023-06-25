import mapboxgl from "mapbox-gl";

const configMap = (
  map: React.MutableRefObject<mapboxgl.Map>,
  onClickCountry: (country: string, ctrlKey: boolean) => void
) => {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN ?? "";
  map.current = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/kiki0805/clirh61tb007e01qy1wbmg9lv",
    zoom: 1,
    logoPosition: "bottom-right",
  });
  map.current.on(
    "click",
    async (e: { point: any; lngLat: any; originalEvent: PointerEvent }) => {
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
        // console.log("Country:", countryName, "Code:", countryCode);
        onClickCountry(countryCode, e.originalEvent.ctrlKey);
      }
    }
  );

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

      if (features.length && features[0].properties) {
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
};

export default configMap;
