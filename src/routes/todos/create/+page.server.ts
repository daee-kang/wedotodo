export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formdata = await request.formData();
		const title = formdata.get('title') as string;
		const description = formdata.get('description') as string;

		console.log(title, description);
	}
};
