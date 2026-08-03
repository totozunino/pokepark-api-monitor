import "dotenv/config";

function required(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const config = {
  gmailUser: required("GMAIL_USER"),
  gmailAppPassword: required("GMAIL_APP_PASSWORD"),
  notificationEmail: required("NOTIFICATION_EMAIL"),

  apiUrl:
    "https://ticket-en.pokepark-kanto.co.jp/gateway/api/saas/ppk-guest/ppk-draw-calendar/getProductInfoByDate",

  ticketPageUrl: "https://ticket-en.pokepark-kanto.co.jp/tickets",

  dates: [
    "2026-10-06",
    "2026-10-07",
    "2026-10-08",
    "2026-10-09",
    "2026-10-17",
    "2026-10-18",
    "2026-10-19",
    "2026-10-20",
    "2026-10-21",
  ],

  checkIntervalMs: 5 * 60 * 1000,
  delayBetweenDatesMs: 3_000,
};
