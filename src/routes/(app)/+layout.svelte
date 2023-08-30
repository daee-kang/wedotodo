<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);
</script>

<main>
	<header>
		<h2>we do to do</h2>
		{#if session}
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
	}

	header {
		display: flex;
		position: relative;
		padding: 1rem;
	}

	header > h2 {
		margin: 0;
		padding-left: 4rem;
		flex: 1;
		color: #ff4000;
	}
</style>
