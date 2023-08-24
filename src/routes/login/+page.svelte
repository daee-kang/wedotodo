<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	const onInitiateGoogleAuth = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'google'
		});
	};
</script>

<form method="post">
	<input name="email" value={form?.email ?? ''} />
	<input type="password" name="password" />
	<button>Sign up</button>
	<button on:click={onInitiateGoogleAuth}>google</button>
</form>
