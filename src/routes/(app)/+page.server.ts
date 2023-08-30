import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// TODO: can we improve this by not fetching getSession?
	// we load this already in layout.server
	const session = await locals.getSession();

	if (session?.user.email) {
		// user exists - redirect to /todos
		throw redirect(308, '/todos');
	}
};

export const actions: Actions = {
	signout: async ({ locals: { supabase } }) => {
		// signout
		console.log('ayo');
		await supabase.auth.signOut();
		throw redirect(303, '/');
	}
};
