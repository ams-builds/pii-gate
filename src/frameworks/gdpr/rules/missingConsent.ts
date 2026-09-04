import type { Rule } from "../../../types.js";

/** Flags a new form field or DB write with no nearby reference to "consent" in the same file. */
export const missingConsent: Rule = {
  id: "gdpr/missing-consent",
  check(file, contents) {
    throw new Error("not implemented");
  },
};
