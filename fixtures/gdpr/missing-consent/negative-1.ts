export function registerUser(email: string, hasConsented: boolean) {
  if (!hasConsented) throw new Error("Consent required");
  return db.users.create({ email });
}
