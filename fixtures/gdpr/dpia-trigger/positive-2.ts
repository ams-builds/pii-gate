export function updateHealthProfile(user: User, healthData: HealthRecord) {
  user.healthData = healthData;
}
