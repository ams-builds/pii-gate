import type { Rule } from "../../../types.js";

/** Flags fetch/axios/requests calls whose payload includes a PII-ish field with no anonymisation. */
export const thirdPartyHttp: Rule = {
  id: "gdpr/third-party-http",
  check(file, contents) {
    throw new Error("not implemented");
  },
};
