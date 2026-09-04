import type { Framework } from "../../types.js";
import { hardcodedPii } from "./rules/hardcodedPii.js";

export const gdpr: Framework = {
  id: "gdpr",
  rules: [
    hardcodedPii,
    // piiInLogs, thirdPartyHttp, missingConsent, dpiaTrigger — not yet implemented
  ],
};
