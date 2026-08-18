import { randomBytes } from 'crypto';

export function slugify(name: string): string {
	const base = name
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
	const suffix = randomBytes(3).toString('hex');
	return `${base}-${suffix}`;
}

export function generatePassword(): string {
	return randomBytes(9).toString('base64url'); // 12 chars, URL-safe
}
