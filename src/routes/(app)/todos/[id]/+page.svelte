<script lang="ts">
	import type { PageData } from './$types';
	import AddTodoModal from './components/AddTodoModal.svelte';
	import TodoItem from './components/TodoItem.svelte';

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

<div class="todo-list-container">
	<ul class="todo-list">
		{#each data.todos as todo}
			<TodoItem>
				<span slot="title">{todo.title}</span>
				<span slot="created-at"
					>{new Date(todo.created_at).toLocaleDateString('en-US', {
						year: 'numeric',
						month: 'long',
						day: 'numeric'
					})}</span
				>
				<p slot="description">{todo.description}</p>
			</TodoItem>
		{/each}
	</ul>
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
	}

	.todo-list-container {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.todo-list {
		width: 40%;
		min-width: 400px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
</style>
