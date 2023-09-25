<script lang="ts">
	import CategoryDropdown from './components/CategoryDropdown.svelte';
	import ListTypeSelector, { type ListOption } from './components/ListTypeSelector.svelte';

	let listType: ListOption = 'basic';

	$: console.log(listType);
</script>

<div class="body">
	<h1>🐸 create todo 🐸</h1>

	<form method="POST">
		<div class="text-input">
			<label for="title"> title </label>
			<input type="text" id="title" name="title" />
		</div>

		<div class="text-input">
			<label for="description"> description </label>
			<input type="text" id="description" name="description" />
		</div>

		<ListTypeSelector bind:selected={listType} />
		<!-- <CategoryDropdown /> -->
		<button> create </button>
	</form>
</div>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.body {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.text-input {
		display: flex;
		flex-direction: column;
	}
</style>
