import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { isAdmin } = await parent();
	if (!isAdmin) throw redirect(303, '/crm');
	return {};
};
