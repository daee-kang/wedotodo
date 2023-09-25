<script context="module" lang="ts">
	export type ListOption = 'basic' | 'board' | 'daily';
</script>

<script lang="ts">
	export let selected: ListOption = 'basic';
</script>

<div class="container">
	<label>
		<input type="radio" bind:group={selected} value="basic" name="basic" class="radio-card" />
		<div class="card">basic</div>
	</label>
	<label>
		<input
			type="radio"
			bind:group={selected}
			value="board"
			name="board"
			class="radio-card"
			disabled
		/>
		<div class="card">board</div>
	</label>
	<label>
		<input
			type="radio"
			bind:group={selected}
			value="daily"
			name="daily"
			class="radio-card"
			disabled
		/>
		<div class="card">daily</div>
	</label>
</div>

<style>
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
		border: 1px solid black;
		width: 400px;
	}
	.container > label {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		height: 100px;
	}
	.radio-card {
		display: none;
	}
	.card {
		height: 100%;
		width: 100%;
		border-radius: 0.25rem;
	}
	.radio-card:disabled + .card {
		color: gray;
	}
	.radio-card:checked + .card {
		background-color: orange;
	}
</style>
