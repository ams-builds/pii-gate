export function logAudit(action: string) {
  return db.auditLog.create({ action });
}
