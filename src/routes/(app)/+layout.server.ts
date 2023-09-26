import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// TODO: can we improve this by not fetching getSession?
	// we load this already in layout.server
	const session = await locals.getSession();

	// verify user has username
	if (session) {
		const userData = session.user.user_metadata;

		// check if they have a username
		if (session.user && (!userData || (!userData.username && url.pathname !== '/set-username'))) {
			// user needs to set a username to continue using the app
			throw redirect(308, '/set-username');
		}
	} else {
		if (url.pathname !== '/') {
			// user is not signed in
			throw redirect(308, '/');
		}
	}
};
