export function updateProfile(dob: string, address: string) {
  return profile.update({ dob, address });
}
