// Hourly projects have no stored per-entry cost — it's computed live as
// hours × the project's rate. Flat projects have no project-level rate, so
// cost has to live on the entry itself (entries.amount) instead.
export function entryFullValue(
	entry: { hours?: number | null; amount?: number | null },
	billingType: 'hourly' | 'flat' | null,
	rate: number | null
): number {
	if (billingType === 'hourly') return (entry.hours ?? 0) * (rate ?? 0);
	return entry.amount ?? 0;
}

export function invoiceStatusLabel(status: string): string {
	if (status === 'paid') return 'Paid';
	if (status === 'void') return 'Void';
	return 'Pending';
}
