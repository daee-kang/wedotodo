import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from './$types.js';

export const load = async ({ locals: { supabase, getSession } }: PageServerLoadEvent) => {
	// grab todos

	const session = await getSession();

	// TODO: genericize
	if (!session) {
		throw redirect(303, '/login');
	}

	// grab todo groups that you are part of
	const todoMemberQuery = await supabase
		.from('team_member')
		.select()
		.eq('member_id', session.user.id);

	if (todoMemberQuery.error) {
		throw error(500, `Error fetching todo groups members ${todoMemberQuery.error.message}`);
	}

	const groups = todoMemberQuery.data.map((member) => member.team_id);

	// grab todo groups by group id
	const todoGroupQuery = await supabase.from('team').select().in('id', groups);

	if (todoGroupQuery.error) {
		throw error(500, `Error fetching todo groups ${todoGroupQuery.error.message}}`);
	}

	// separate groups by owner or not
	const ownedGroups = todoGroupQuery.data.filter((group) => group.captain === session.user.id);
	const memberGroups = todoGroupQuery.data.filter((group) => group.captain !== session.user.id);

	return {
		groups: {
			owned: ownedGroups,
			member: memberGroups
		}
	};
};
