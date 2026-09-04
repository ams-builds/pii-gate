export function reportSignupHashed(email: string) {
  return fetch("https://analytics.example.com/track", {
    method: "POST",
    body: JSON.stringify({ email: hash(email) }),
  });
}
