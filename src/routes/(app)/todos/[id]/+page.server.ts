import { supabase } from '$lib/supabaseClient';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoadEvent } from './$types';

export const load = async ({ params, locals: { getSession } }: PageServerLoadEvent) => {
	const id = params.id as string;

	const session = await getSession();
	if (!session) {
		throw error(401, `You are not logged in`);
	}

	// fetch supabase for todo by id
	const todoGroup = await supabase.from('team').select().eq('id', id);
	if (todoGroup.data == null || todoGroup.data?.length === 0) {
		throw error(404, `Todo with id ${id} not found`);
	}

	// check if user is part of todo group
	// TODO: test this lol
	const members = await supabase.from('team_member').select().eq('team_id', id);
	if (
		members.data?.length === 0 ||
		members.data?.filter((member) => member.member_id === session.user.id).length === 0
	) {
		throw error(401, `You are not part of this team`);
	}

	// fetch todos
	const todos = await supabase.from('todo').select().eq('team_id', id);

	return {
		todoGroup: todoGroup.data[0],
		todos: todos.data ?? []
	};
};

export const actions = {
	addTodo: async ({ locals: { supabase, getSession }, url, request }) => {
		const session = await getSession();

		// TODO: genericize
		if (!session) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		const formData = await request.formData();
		const teamId = url.searchParams.get('id') as string;
		if (!teamId) {
			return fail(400, {
				message: 'Missing teamId to upload todo'
			});
		}

		const title = formData.get('title') as string;
		const description = formData.get('description') as string;

		if (!title) {
			return fail(400, {
				message: 'Missing title or description'
			});
		}

		const { error } = await supabase.from('todo').insert({
			title,
			description,
			team_id: teamId,
			creator: session.user.id
		});

		if (error) {
			return fail(500, {
				message: error.message
			});
		}
	},
	deleteTodo: async ({ locals: { supabase, getSession }, url }) => {
		const session = await getSession();

		// TODO: genericize
		if (!session) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		const todoId = url.searchParams.get('id') as string;
		if (!todoId) {
			return fail(400, {
				message: 'Missing todoId to delete'
			});
		}

		const { error } = await supabase.from('todo').delete().eq('id', todoId);

		if (error) {
			return fail(500, {
				message: error.message
			});
		}
	},
	share: async ({ locals: { supabase, getSession }, url, request }) => {
		const formdata = await request.formData();
		const shareUser = formdata.get('user-search') as string;

		const session = await getSession();
		if (!session) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		if (!shareUser) {
			return fail(400, {
				message: 'Missing user to share with'
			});
		}

		// check to see if user exists by username
		const { data: users, error } = await supabase
			.from('profile')
			.select()
			.eq('username', shareUser);

		if (error) {
			return fail(500, {
				message: error.message
			});
		}

		if (users?.length === 0) {
			console.log('user not found');

			return fail(404, {
				message: 'User not found'
			});
		}

		const teamId = url.searchParams.get('id') as string;
		if (!teamId) {
			return fail(400, {
				message: 'Missing teamId to upload todo'
			});
		}

		const { error: shareError } = await supabase.from('team_member').insert({
			team_id: teamId,
			member_id: users[0].id
		});

		if (shareError) {
			return fail(500, {
				message: shareError.message
			});
		}

		console.log('success');

		return {
			status: 200,
			body: {
				message: 'Successfully shared'
			}
		};
	}
} satisfies Actions;
