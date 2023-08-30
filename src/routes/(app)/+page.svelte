<script lang="ts">
	import { redirect } from '@sveltejs/kit';

	export let data;
	const { session } = data;
</script>

<h1>todo</h1>

{#if session}
	<h1>hello {session.user.email}</h1>
{:else}
	<h1>not signed in</h1>
{/if}
