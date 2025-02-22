<script lang="ts">
	import '../app.css';
	import { Header } from "$components";
	import { invalidate } from '$app/navigation';
	import { setUserState } from '../lib/state/user-state.svelte';

	let { data, children } = $props()
	let { session, supabase } = $derived(data);

	let userState = setUserState({session: data.session, user: data.user, supabase: data.supabase});

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			userState.updateState({session: newSession, supabase, user: newSession?.user || null});

		if (newSession?.expires_at !== session?.expires_at) {
			invalidate('supabase:auth')
		}
	})


    return () => data.subscription.unsubscribe()
  })


</script>
<Header></Header>
{@render children()}
