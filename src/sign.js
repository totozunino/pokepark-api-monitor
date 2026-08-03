import crypto from "node:crypto";

const API_SIGN_KEY = "533cd892-994b-4617-b42c-6422b97a010d";

const SIGNED_FIELDS = new Set([
  "date",
  "month",
  "nonce",
  "timestamp",
  "orderToken",
  "orderNum",
  "travelDate",
  "token",
  "sessionId",
  "email",
  "applicantNum",
  "familyName",
  "firstName",
  "verificationCode",
  "phoneCode",
  "phoneNumber",
  "country",
  "address",
  "startDate",
  "endDate",
  "rafOrderId",
  "orderOperateToken",
  "ppkRafToken",
  "applicantEmail",
  "productId",
  "recaptchaToken",
]);

function createNonce() {
  return Math.random().toString(36).substring(2, 16);
}

function createApiSign(payload) {
  const query = Object.entries(payload)
    .filter(([key, value]) => {
      return (
        SIGNED_FIELDS.has(key) &&
        value !== undefined &&
        value !== null &&
        !Array.isArray(value) &&
        typeof value !== "object"
      );
    })
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return crypto
    .createHash("md5")
    .update(`${query}&key=${API_SIGN_KEY}`)
    .digest("hex");
}

export function createSignedPayload(data) {
  const payload = {
    timestamp: Math.floor(Date.now() / 1000),
    nonce: createNonce(),
    ...data,
  };

  return {
    ...payload,
    apiSign: createApiSign(payload),
  };
}
