export function autoApprove(applicant: Applicant): boolean {
  return applicant.creditScore > 700;
}
