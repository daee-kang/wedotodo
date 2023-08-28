<script lang="ts">
	import { enhance } from '$app/forms';
	import GoogleLogo from '$lib/assets/google.png';
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string;
	let password: string;

	let loading = false;

	const onInitiateGoogleAuth = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google'
		});
	};
</script>

<div class="page">
	<div class="card">
		<h1>Sign in</h1>

		<form
			method="post"
			class="login-form"
			use:enhance={() => {
				loading = true;

				return async ({ update, result }) => {
					await update();
					console.log(result);
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
				<button disabled={loading}>Sign up</button>
				<button disabled={loading}>Log in</button>
			</div>
		</form>

		or

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

	.card {
		padding: 2rem;
		width: 200px;
		background-color: #ff4000;
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.button-container {
		display: flex;
		justify-content: space-evenly;
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
