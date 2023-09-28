<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';

	export let showModal: boolean;
	export let teamId: string;

	let searchedUser = '';
</script>

<Modal bind:showModal>
	<h2>share todo</h2>

	<form method="POST" action="?/share&id={teamId}">
		<input type="text" name="user-search" bind:value={searchedUser} />
		<button type="submit">add</button>
	</form>
</Modal>
