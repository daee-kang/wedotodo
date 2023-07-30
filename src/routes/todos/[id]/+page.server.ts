import { supabase } from '$lib/supabaseClient';
import type { PageServerLoadEvent } from './$types';

export const load = async ({ params }: PageServerLoadEvent) => {
	const id = params.id as string;

	// fetch supabase for todo by id
	const todoGroup = await supabase.from('team').select().eq('id', id);

	// fetch todos
	const todos = await supabase.from('todo').select();

	return {
		todoGroup: todoGroup.data?.[0] ?? undefined,
		todos: todos.data ?? []
	};
};
