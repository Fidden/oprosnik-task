export function toInputDateFormat(value: string | Date): string {
	// transform unix time to ms
	const date = typeof value === 'string' ? new Date(value) : value;
	// convert date to yyyy-mm-dd
	return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
		.toISOString()
		.split('T')[0];
}
