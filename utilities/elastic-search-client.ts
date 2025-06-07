// libraries
import { Client } from "@elastic/elasticsearch";

let esc: Client;
export const elasticSearchClient = ({ region: WombatRegions }): Client => {
  if (!esc) {
    if (process.env.CI) {
      if (!process.env.ELASTIC_SEARCH_API_KEY) {
        throw new Error(
          "Environment variable 'ELASTIC_SEARCH_API_KEY' is not set",
        );
      }
      if (!process.env.ELASTIC_SEARCH_CLOUD_ID) {
        throw new Error(
          "Environment variable 'ELASTIC_SEARCH_CLOUD_ID' is not set",
        );
      }
      esc = new Client({
        auth: {
          apiKey: process.env.ELASTIC_SEARCH_API_KEY,
        },
        cloud: {
          id: process.env.ELASTIC_SEARCH_CLOUD_ID,
        },
      });
    } else {
      esc = new Client({
        node: "http://localhost:9200",
        auth: {
          username: "elastic",
          password: "changeme",
        },
      });
    }
  }
  return esc;
};
