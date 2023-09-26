<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);
</script>

<main>
	<header>
		<a href="/" class="header-link"> we do to do </a>
		{#if session}
			{#if session.user}
				<small class="debug"
					>Logged in as @{session.user.user_metadata.username ?? session.user.email}</small
				>
			{/if}
			<form method="POST" action="../?/signout">
				<button>Log out</button>
			</form>
		{:else}
			<button
				on:click={() => {
					//navigate to sign in page
					goto('/login');
				}}>Log in</button
			>
		{/if}
	</header>

	<div class="body">
		<slot />
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
	}

	.body {
		flex: 1;
		overflow: auto;
		padding: 1rem;
	}

	header {
		display: flex;
		align-items: center;
		gap: 1rem;
		position: relative;
		padding: 1rem;
	}

	.header-link {
		text-decoration: none;
		margin: 0;
		flex: 1;
		color: #ff4000;
	}
</style>
