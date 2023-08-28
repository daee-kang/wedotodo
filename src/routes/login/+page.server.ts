import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from '../$types';

export const actions = {
	signup: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const validation = EmailAndPasswordCheck(email, password);
		if (validation !== true) {
			return validation;
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`
			}
		});

		if (data?.user?.identities?.length === 0) {
			return fail(400, { message: 'User already exists.', success: false, email });
		}

		if (error) {
			console.log(error);
			return fail(500, { message: 'Server error. Try again later.', success: false, email });
		}

		return {
			message: 'Please check your email for a magic link to log into the website.',
			success: true
		};
	},
	login: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const validation = EmailAndPasswordCheck(email, password);
		if (validation !== true) {
			return validation;
		}

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			console.log(error);
			return fail(500, { message: 'Server error. Try again later.', success: false, email });
		}

		throw redirect(303, '/');
	}
} satisfies Actions;

const isValidEmail = (email: string) => {
	const re = /\S+@\S+\.\S+/;
	return re.test(email);
};

const isValidPassword = (password: string) => {
	return password.length >= 8;
};

const EmailAndPasswordCheck = (email: string, password: string) => {
	if (!email) {
		return fail(400, { message: 'Missing email', success: false });
	}
	if (!password) {
		return fail(400, { message: 'Missing password', success: false });
	}

	if (!isValidEmail(email)) {
		return fail(400, { message: 'Invalid email', success: false, email });
	}
	if (!isValidPassword(password)) {
		return fail(400, {
			message: 'Invalid password (must be 8 characters minimum)',
			success: false,
			email
		});
	}

	return true;
};
