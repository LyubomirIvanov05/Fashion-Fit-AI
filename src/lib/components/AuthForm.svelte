<script lang="ts">
    import {Button} from "$components";
    import type { ActionData } from "../../routes/register/$types";

    interface ComponetProps{
        isRegistration: boolean;
        form: ActionData
    }

    let { isRegistration, form }:ComponetProps = $props();
</script>

<section class="mx-[13vw] mt-[80px]">
    <h1 class="mb-[64px] text-[90px] font-bold">{isRegistration ? "Register" : "Log In"}</h1>
    <div class="flex">
        <form method="POST" 
         class="flex flex-col items-start border-r-[1px] border-gray-700 w-[40%] pr-[80px]"
         action={isRegistration ? "" : "/login/?/signInWithPassword"}
         >
            {#if form && form.errors?.length}
                {#each form.errors as error}
                    <div class="bg-[#7a2323] text-white text-lg rounded-xl p-3 mb-2 w-full">
                        <p>{error}</p>
                    </div>
                {/each}
            {/if}
            {#if isRegistration}
            <input type="text" placeholder="Name" name="name" value={form?.name || ''}/>
            {/if}
            <input type="text" placeholder="Email" name="email" value={form?.email || ''}>
            <input type="password" placeholder="Password" name="password" value={form?.password || ''}>
            {#if isRegistration}
            <input type="password" placeholder="Confirm Password" name="passwordConfirmation" value={form?.passwordConfirmation || ''}>
            {/if}
            <Button>{isRegistration ? "Register" : "Login"}</Button>
            {#if isRegistration}  
                <p class="text-4 text-gray-500 underline mt-4">Already have an account? <a href="/login">Log In</a></p>
            {:else}
                <p class="text-4 text-gray-500 underline mt-4">Do not have an account yet? <a href="/register">Register</a></p>
            {/if}

        </form>
        <div class="pl-[80px] w-[40%]">
            <form method="POST" action={isRegistration ? "/login/?/googleLogin" : "?/googleLogin"} class="flex flex-col items-start">
                <Button type="submit">Continue with Google</Button>
    
            </form>
        </div>
    </div>
    
</section>

<style>
    input{
        width: 100%;
        margin-bottom: 12px;
        font-size: 20px;
        background-color: #74828E;
        border-radius: 8px;
        padding: 4px 12px;
        outline: none;
        border: none;
        min-height: 48px;
    }
    input:last-of-type{
        margin-bottom: 30px;
    }
    input::placeholder{
        font-size: 20px;
        font-weight: 400;
    }
</style>