import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	// TODO: can we improve this by not fetching getSession?
	// we load this already in layout.server
	const session = await locals.getSession();

	if (session?.user.email) {
		// user exists - redirect to /home
		throw redirect(308, '/home');
	}
};
