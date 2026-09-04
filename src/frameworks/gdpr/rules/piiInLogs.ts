import type { Rule } from "../../../types.js";

/** Flags console.log/logger.* calls containing PII-named variables (email, ssn, dob, address). */
export const piiInLogs: Rule = {
  id: "gdpr/pii-in-logs",
  check(file, contents) {
    throw new Error("not implemented");
  },
};
