import { supabase } from '$lib/supabaseClient';
import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoadEvent } from './$types';

export const load = async ({ params }: PageServerLoadEvent) => {
	const id = params.id as string;

	// fetch supabase for todo by id
	const todoGroup = await supabase.from('team').select().eq('id', id);

	if (todoGroup.data == null || todoGroup.data?.length === 0) {
		throw error(404, `Todo with id ${id} not found`);
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
	}
} satisfies Actions;
