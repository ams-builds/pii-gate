import type { Framework } from "../../types.js";
import { hardcodedPii } from "./rules/hardcodedPii.js";
import { piiInLogs } from "./rules/piiInLogs.js";
import { thirdPartyHttp } from "./rules/thirdPartyHttp.js";
import { missingConsent } from "./rules/missingConsent.js";
import { dpiaTrigger } from "./rules/dpiaTrigger.js";

export const gdpr: Framework = {
  id: "gdpr",
  rules: [hardcodedPii, piiInLogs, thirdPartyHttp, missingConsent, dpiaTrigger],
};
