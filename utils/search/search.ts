import meiliClient from "./client";
import { Hit } from "meilisearch";

const meiliSearch = async (
  search: string,
  page: number,
  offset: number
): Promise<number[]> => {
  const data = await meiliClient.index("institutions").search(search, {
    page,
    offset,
  });
  return data.hits.map((item: Hit) => item.id);
};

export default meiliSearch;
