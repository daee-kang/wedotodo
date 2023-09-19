<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { enhance } from '$app/forms';

	export let showModal: boolean;
	export let teamId: string;

	let isCreating = false;
</script>

<div>d</div>

<Modal bind:showModal>
	<h2 slot="header">add modal</h2>

	<form
		method="post"
		action="?/addTodo&id={teamId}"
		use:enhance={() => {
			isCreating = true;

			return async ({ update, result }) => {
				await update();

				if (result.type === 'failure') {
					alert('error creating todo');
					isCreating = false;
					return;
				}

				isCreating = false;
				showModal = false;
			};
		}}
	>
		<input type="text" name="title" />
		<input type="text" name="description" />
		<button type="submit">add</button>
	</form>

	{#if isCreating}
		<p>creating...</p>
	{/if}
</Modal>
