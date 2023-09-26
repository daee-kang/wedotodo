<script lang="ts">
	import { enhance } from '$app/forms';
	import GoogleLogo from '$lib/assets/google.png';
	export let data;
	export let form;

	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string;
	let password: string;

	let loading = false;

	const getURL = () => {
		let url =
			process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
			process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
			'http://localhost:/';
		// Make sure to include `https://` when not localhost.
		url = url.includes('http') ? url : `https://${url}`;
		// Make sure to include a trailing `/`.
		url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
		return url;
	};

	const onInitiateGoogleAuth = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${getURL()}/auth/callback`
			}
		});
	};
</script>

<div class="page">
	<div class="card">
		<h1>Sign in</h1>

		{#if form?.success === false}
			<small class="error">{form?.message}</small>
		{/if}

		<form
			method="post"
			class="login-form"
			action="?/login"
			use:enhance={() => {
				loading = true;

				return async ({ update, result }) => {
					await update();
					loading = false;
				};
			}}
		>
			<div>
				<input name="email" placeholder="email" bind:value={email} disabled={loading} required />
				<input
					type="password"
					name="password"
					placeholder="password"
					bind:value={password}
					disabled={loading}
					required
				/>
			</div>

			<div class="button-container">
				<button disabled={loading}>Log in</button>
				<button disabled={loading} formaction="?/signup">Sign up</button>
			</div>
		</form>

		<small>or</small>

		<button on:click={onInitiateGoogleAuth} class="auth-login-button" disabled={loading}>
			<img alt="google-logo" src={GoogleLogo} class="social-auth-logo" />
			Sign in with Google
		</button>
	</div>
</div>

<style>
	input {
		width: 100%;
	}

	.page {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	.error {
		color: white;
	}

	.card {
		padding: 2rem;
		width: 200px;
		background-color: #ff4000;
		box-shadow: #f1a1a0 0px 22px 70px 4px;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.login-form + small {
		display: flex;
		justify-content: center;
		margin: 1rem;
	}

	.button-container {
		display: flex;
		justify-content: space-evenly;
	}

	.button-container > button {
		width: 100%;
	}

	.auth-login-button {
		display: flex;
		justify-content: center;
		width: 100%;
		gap: 0.5rem;
	}

	.social-auth-logo {
		width: 1rem;
		height: 1rem;
	}
</style>
