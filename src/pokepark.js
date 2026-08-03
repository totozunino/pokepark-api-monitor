import { config } from "./config.js";
import { createSignedPayload } from "./sign.js";

export async function getProductsByDate(date) {
  const body = createSignedPayload({ date });

  const response = await fetch(config.apiUrl, {
    method: "POST",
    headers: {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json",
      "x-tyaio-language": "en-US",
      origin: "https://ticket-en.pokepark-kanto.co.jp",
      referer: config.ticketPageUrl,
      "user-agent": "Mozilla/5.0",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  const result = await response.json();

  if (result.code !== 0) {
    throw new Error(
      `PokéPark API error ${result.code}: ${result.msg ?? "Unknown error"}`
    );
  }

  return result.info?.list ?? [];
}
