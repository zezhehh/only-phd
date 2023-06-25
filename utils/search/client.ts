import { MeiliSearch } from "meilisearch";

const meiliClient = new MeiliSearch({
  host: process.env.MEILI_HOST || "",
  apiKey: process.env.MEILI_SEARCH_KEY || "",
});

export default meiliClient;
