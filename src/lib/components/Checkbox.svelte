<script lang="ts">
	export let checked = false;
</script>

<label class="checkbox">
	<slot />
	<input type="checkbox" bind:checked />
	<mark />
</label>

<style>
	.checkbox {
		display: block;
		position: relative;
		padding-left: 35px;
		margin-bottom: 12px;
		cursor: pointer;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		font-family: var(--bl-font-family);
		font-size: var(--bl-font-size);
	}

	/* Hide the browser's default checkbox */
	.checkbox input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
		color: var(--bl-color);
	}

	mark {
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: white;
		box-shadow: var(--bl-box-shadow);
		border-radius: 9px;
		transform: scale(0.8);
	}

	.checkbox:hover input ~ mark {
		box-shadow: var(--bl-box-shadow--hover);
	}

	.checkbox input:checked ~ mark {
		background-color: #2196f3;
	}

	/* checked icon */
	mark:after {
		content: '';
		position: absolute;
		display: none;
	}

	/* mark */
	.checkbox input:checked ~ mark:after {
		display: block;
	}

	/* checkmark/indicator */
	.checkbox mark:after {
		left: 9px;
		top: 5px;
		width: 5px;
		height: 10px;
		border: solid white;
		border-width: 0 3px 3px 0;
		-webkit-transform: rotate(45deg);
		-ms-transform: rotate(45deg);
		transform: rotate(45deg);
	}
</style>
