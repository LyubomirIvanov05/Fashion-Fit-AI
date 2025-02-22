<script lang="ts">
    import { Button } from "$components";
    import logo from "$assets/shirt.svg";
    import { getUserState } from "$lib/state/user-state.svelte";

  let userContext = getUserState();
  let { user } = $derived(userContext);

</script>

<header class="flex justify-between items-center py-[12px] px-[4vw]">
    
    <a href={user ? '/private/scan' : '/'}>
        <img src={logo} alt="Logo" class="w-[64px]">
    </a>
    <nav>
        {#if !user}
        <ul class="flex gap-[20px]">
            <li><Button isMenu={true} href="/register">Create account</Button></li>
            <li><Button isMenu={true} isSecondary={true} href="/login">Log in</Button></li>
        </ul>
        {:else}
        <ul class="flex gap-[20px] items-center">
            <li>{user.email}</li>
            <li><Button isMenu={true} onclick={() => userContext.logout()}>Logout</Button></li>
        </ul>
        {/if}
    </nav>

    
</header>