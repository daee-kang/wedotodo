<script lang="ts">
	export let categories = ['todo', 'done'];
</script>

<div class="container">
	{#each categories as category}
		<div class="category-container">
			{category}
		</div>
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		border: 1px solid black;
		width: 400px;
	}

	.category-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.5rem;
	}
</style>
