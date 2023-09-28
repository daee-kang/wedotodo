import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoadEvent } from '../$types';

export const load = async ({ locals: { getSession } }: PageServerLoadEvent) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/login');
	}

	let hasUsername = false;

	if (session.user.user_metadata.username) {
		hasUsername = true;
	}

	return {
		hasUsername
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const formdata = await request.formData();
		const username = formdata.get('username') as string;

		const session = await getSession();

		if (!session) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		if (!username) {
			return {
				status: 400,
				body: {
					message: 'Username is required'
				}
			};
		}

		// add username to user table
		const { error } = await supabase
			.from('profile')
			.update({
				username
			})
			.eq('id', session.user.id);

		if (error) {
			return {
				status: 500,
				body: {
					message: 'Error updating username',
					error
				}
			};
		}

		// update username to metadata
		const { error: metadataError } = await supabase.auth.updateUser({
			data: {
				username
			}
		});

		if (metadataError) {
			return {
				status: 500,
				body: {
					message: 'Error updating metadata',
					error: metadataError
				}
			};
		}

		await supabase.auth.refreshSession();

		throw redirect(303, `/todos`);
	}
};
