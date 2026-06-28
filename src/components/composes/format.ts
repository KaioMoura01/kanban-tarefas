/** Formats a timestamp (ms) as a pt-BR date and time. */
export function formatDateTime(timestamp: number): string {
	return new Date(timestamp).toLocaleString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}
