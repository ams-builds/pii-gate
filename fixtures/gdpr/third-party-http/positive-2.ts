export function syncContact(phone: string) {
  return axios.post("https://crm.example.com/contacts", { phone });
}
