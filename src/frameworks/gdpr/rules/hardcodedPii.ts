import type { Rule } from "../../../types.js";

/** Flags hardcoded emails, phone numbers, and national ID formats. */
export const hardcodedPii: Rule = {
  id: "gdpr/hardcoded-pii",
  check(file, contents) {
    throw new Error("not implemented");
  },
};
