import meiliClient from "./client";
import { Hit, SearchResponse } from "meilisearch";

const meiliSearch = async (
  search: string,
  countries: string[],
  page: number,
  offset: number
): Promise<number[]> => {
  let data: SearchResponse;
  if (countries.length === 0) {
    data = await meiliClient.index("institutions").search(search, {
      page,
      offset,
    });
  } else {
    const countryFilter = countries.map(
      (country) => `country_code = ${country}`
    );
    data = await meiliClient.index("institutions").search(search, {
      filter: [countryFilter],
      page,
      offset,
    });
  }

  return data.hits.map((item: Hit) => item.id);
};

export default meiliSearch;
