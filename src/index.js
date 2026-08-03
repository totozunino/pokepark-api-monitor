import { config } from "./config.js";
import { getProductsByDate } from "./pokepark.js";
import {
  sendAvailabilityEmail,
  verifyEmailConnection,
} from "./mailer.js";

const notifiedDates = new Set();

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function checkDate(date) {
  const products = await getProductsByDate(date);

  console.log(
    `[${new Date().toISOString()}] ${date}: ${products.length} product(s)`
  );

  if (products.length === 0) {
    notifiedDates.delete(date);
    return;
  }

  if (notifiedDates.has(date)) {
    console.log(`Already notified for ${date}`);
    return;
  }

  await sendAvailabilityEmail(date, products);
  notifiedDates.add(date);

  console.log(`Email notification sent for ${date}`);
}

async function runCycle() {
  console.log(`\nStarting cycle at ${new Date().toLocaleString()}`);

  for (const date of config.dates) {
    try {
      await checkDate(date);
    } catch (error) {
      console.error(`[${date}] ${error.message}`);
    }

    await sleep(config.delayBetweenDatesMs);
  }
}

async function main() {
  await verifyEmailConnection();
  console.log("Gmail connection verified.");

  await runCycle();

  setInterval(() => {
    runCycle().catch((error) => {
      console.error("Monitor cycle failed:", error);
    });
  }, config.checkIntervalMs);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
