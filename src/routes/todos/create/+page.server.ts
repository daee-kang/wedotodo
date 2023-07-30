import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '../$types';

export const actions = {
	default: async ({ request, locals: { supabase, getSession } }) => {
		const formdata = await request.formData();
		const title = formdata.get('title') as string;
		const description = formdata.get('description') as string;

		const session = await getSession();

		if (!session) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		// create the team
		const teamMutation = await supabase
			.from('team')
			.insert({
				name: title,
				description
			})
			.select('id');

		if (teamMutation.error) {
			return fail(500, {
				message: 'Error creating team',
				error: teamMutation.error
			});
		}

		// add user to teammembers table with team uuid
		const teamMemberMutation = await supabase.from('team_member').insert({
			team_id: teamMutation.data[0].id,
			member_id: session.user.id
		});

		if (teamMemberMutation.error) {
			// rollback team creation
			const rollback = await supabase.from('team').delete().match({
				id: teamMutation.data[0].id
			});

			return fail(500, {
				message: 'Error adding default user to team',
				error: teamMemberMutation.error,
				rollbackSuccess: !rollback.error
			});
		}

		// TODO: redirect to todo page with id
		throw redirect(303, '/todos');
	}
} satisfies Actions;
