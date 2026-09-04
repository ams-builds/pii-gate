/** Splits camelCase and snake_case/kebab-case boundaries so word matching can find PII terms inside compound identifiers (e.g. "supportEmail", "user_ssn"). */
function normalizeIdentifiers(text: string): string {
  return text.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ");
}

export function containsAnyWord(text: string, words: string[]): boolean {
  const pattern = new RegExp(`\\b(${words.join("|")})\\b`, "i");
  return pattern.test(normalizeIdentifiers(text));
}
