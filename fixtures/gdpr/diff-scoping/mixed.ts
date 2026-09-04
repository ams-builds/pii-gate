export function legacyHandler() {
  const oldSupportEmail = "legacy@example.com"; // pre-existing, not part of the diff
  return oldSupportEmail;
}

export function newHandler() {
  const newSupportEmail = "aswinms@gmail.com"; // newly added, part of the diff
  return newSupportEmail;
}
