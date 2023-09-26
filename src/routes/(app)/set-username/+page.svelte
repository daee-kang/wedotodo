<script lang="ts">
	import debounce from 'debounce';
	import { supabase } from '$lib/supabaseClient';
	import type { PageData } from './$types';

	export let data: PageData;
	const { hasUsername } = data;

	const DEBOUNCE_TIME = 500;

	let usernameInput = '';
	let isValid: boolean | undefined = undefined;
	let isSearching: boolean = false;

	const onInputChange = (username: string) => {
		isValid = undefined;
		getUsernameValidity(username);
	};
	const getUsernameValidity = debounce(async (username: string) => {
		if (username.length === 0) return;

		isSearching = true;
		// check if the username is unique from supabase
		const users = await supabase
			.from('profile')
			.select('username', { count: 'exact' })
			.eq('username', username);

		if (users.count == null || users.count === 0) {
			isValid = true;
		} else {
			isValid = false;
		}

		isSearching = false;
	}, DEBOUNCE_TIME);

	$: onInputChange(usernameInput);
</script>

<div class="page">
	{#if hasUsername}
		<h4>Set a new username</h4>
	{:else}
		<h4>Create a username to get started, you'll need one to share todos with your friends</h4>
	{/if}

	<form
		class="username-form"
		method="POST"
		on:keydown={(e) => {
			if (isValid) return true;

			e.key === 'Enter' && e.preventDefault();
		}}
	>
		<div class="input-container">
			<h1>@</h1>
			<input
				type="text"
				placeholder="Username"
				name="username"
				id="username-input"
				bind:value={usernameInput}
			/>
		</div>

		{#if isSearching === true}
			<p>searching...</p>
		{/if}

		{#if isValid === true}
			<p class="green">Username is available</p>
			<button type="submit">continue</button>
		{:else if isValid === false}
			<p class="red">Username is taken</p>
		{/if}
	</form>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.username-form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.input-container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
	.green {
		color: green;
	}
	.red {
		color: red;
	}
</style>
