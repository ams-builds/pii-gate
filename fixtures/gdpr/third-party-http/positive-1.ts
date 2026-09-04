export function reportSignup(email: string) {
  return fetch("https://analytics.example.com/track", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}
