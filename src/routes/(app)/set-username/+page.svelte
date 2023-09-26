<script lang="ts">
	import debounce from 'debounce';
	import type { PageData } from './$types';
	import { supabase } from '$lib/supabaseClient';

	let usernameInput = '';
	let isValid: boolean | undefined = undefined;

	$: if (usernameInput.length === 0) {
		isValid = undefined;
	}

	const onInputChange = debounce(async (username: string) => {
		console.log('uhh');
		if (username.length === 0) return;

		// check if the username is unique from supabase
		const users = await supabase
			.from('profile')
			.select('username', { count: 'exact' })
			.eq('username', username);
		console.log(users);
		if (users.count == null || users.count === 0) {
			isValid = true;
		} else {
			isValid = false;
		}
	}, 700);

	$: onInputChange(usernameInput);
</script>

<div class="input-container">
	<h1>@</h1>
	<input type="text" placeholder="Username" id="username-input" bind:value={usernameInput} />
	{#if isValid === true}
		<p class="text-green-500">Username is available</p>
	{:else if isValid === false}
		<p class="text-red-500">Username is taken</p>
	{/if}
</div>

<style>
	.input-container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
</style>
