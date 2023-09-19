<script lang="ts">
	import { enhance } from '$app/forms';

	export let id: string;
	export let onOptimisticDelete: (todoId: string) => void | undefined;
	export let onOptimisticDeleteComplete: (todoId: string) => void | undefined;
	export let onOptimisticDeleteError: (todoId: string) => void | undefined;
</script>

<li class="todo-item">
	<div class="todo-container">
		<h3 class="todo-title">
			<slot name="title" />
		</h3>
		<sub class="creation-date">
			<slot name="created-at" />
		</sub>
	</div>

	<slot name="description" />

	<form
		method="POST"
		use:enhance={() => {
			onOptimisticDelete(id);

			return async ({ update, result }) => {
				await update();
				if (result.type === 'failure') {
					onOptimisticDeleteError(id);
					return;
				} else {
					onOptimisticDeleteComplete(id);
				}
			};
		}}
	>
		<button formaction="?/deleteTodo&id={id}">delete</button>
	</form>
</li>

<style>
	.todo-item {
		display: flex;
		flex-direction: column;
		width: 100%;
		border-radius: 8px;
		padding: 4px;
		background-color: #feefdd;
		-webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
		transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
		position: relative;
	}
	.todo-item::after {
		content: '';
		border-radius: 8px;
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
		opacity: 0;
		-webkit-transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
		transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
	}
	.todo-item:hover::after {
		opacity: 1;
	}

	.todo-container {
		display: 'flex';
		flex-direction: column;
	}

	.todo-title {
		margin-bottom: 4px;
	}

	.creation-date {
		font-size: 0.6rem;
		color: #ff4000;
	}
</style>
