// Generic "approve" business logic — not automated decision-making about a person, no trigger keyword matches.
export function approveInvoice(invoice: Invoice): boolean {
  return invoice.total > 0;
}
