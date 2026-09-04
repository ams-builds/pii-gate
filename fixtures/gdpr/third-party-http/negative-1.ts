export function pingHealthCheck() {
  return fetch("https://status.example.com/health", { method: "GET" });
}
