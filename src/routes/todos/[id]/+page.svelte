<script lang="ts">
	import type { PageData } from './$types';
	import AddTodoModal from './components/AddTodoModal.svelte';

	export let data: PageData;

	let showAddTodoModal = false;
</script>

<AddTodoModal bind:showModal={showAddTodoModal} teamId={data.todoGroup.id} />

<div class="header">
	<h1>
		hello this is {data.todoGroup?.name}
	</h1>
	<button on:click={() => (showAddTodoModal = true)}> + </button>
</div>

{#each data.todos as todo}
	<div class="todo">
		<div class="todo-title">
			<input type="checkbox" checked={todo.completed} />
			<h3>{todo.title}</h3>
		</div>
		<p>{todo.description}</p>
	</div>
{/each}

<style>
	.header {
		display: flex;
		justify-content: space-between;
	}

	.todo {
		border: 1px solid black;
		margin: 10px;
		padding: 10px;
	}

	.todo-title {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}
</style>
