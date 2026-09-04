export function registerUser(email: string) {
  return db.users.create({ email });
}
