<script lang="ts">
    import type { Snippet } from "svelte";

    interface BasicProps{
        children: Snippet,
        isSecondary?: boolean,
        isMenu?: boolean,
        isDanger?: boolean
    }

    interface ButtonProps extends BasicProps{
        onclick?: (e:MouseEvent) => void;
        href?: never;
        type?: "submit" | "button";
    }

    interface LinkProps extends BasicProps{
        onclick?: never,
        href?: string
    }

    type ComponetProps = ButtonProps | LinkProps;
    let {children, href, onclick, isSecondary, isDanger, isMenu, ...props}: ComponetProps = $props();
</script>

{#if href}
<a href={href} class="btn" class:btn-secondary={isSecondary} class:btn-danger={isDanger} class:btn-menu={isMenu} {...props}>{@render children()}</a>
{:else}
<button onclick={onclick} class="btn" class:btn-secondary={isSecondary} class:btn-danger={isDanger} class:btn-menu={isMenu} {...props}>{@render children()}</button>
{/if}


<style>
     a{
        display: block;
        text-decoration: none;
    }

    a:hover{
        text-decoration: none;
    }

    .btn{
        padding: 12px 24px;
        min-width: 230px;
        text-align: center;
        background-color: black;
        color: white;
        border-radius: 12px;
        border: 1px solid white;
        font-weight: normal;
        font-size: 22px;

    }
    .btn:hover{
        cursor: pointer;
    }


    .btn-secondary{
        background-color: white;
        color: black;
        border: 1px solid black;
    }

    .btn-danger{
        background-color: rgb(136, 4, 4);
    }

    .btn-menu{
        min-width: 150px;
        padding: 8px 20px;
    }
</style>