// A parameter merely named "email" carries no hardcoded value — nothing to flag.
export function greetUser(email: string): string {
  return `Hello, ${email}`;
}
