import type { Rule } from "../../../types.js";

/**
 * Flags code patterns associated with GDPR Article 35 DPIA triggers —
 * new automated decision-making, large-scale special-category data
 * processing, or systematic monitoring/profiling. Does not assess risk
 * itself; flags that a human-run DPIA (or UK equivalent) likely applies.
 */
export const dpiaTrigger: Rule = {
  id: "gdpr/dpia-trigger",
  check(file, contents) {
    throw new Error("not implemented");
  },
};
