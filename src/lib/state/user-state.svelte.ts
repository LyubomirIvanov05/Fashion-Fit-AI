import { goto } from "$app/navigation";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { getContext, setContext } from "svelte";

interface UserStatePops {
    session: Session | null;
    supabase: SupabaseClient | null;
    user: User | null;
}

export class UserState {
    session = $state<Session | null>(null);
    supabase = $state<SupabaseClient | null>(null);
    user = $state<User | null>(null);

    constructor(data: UserStatePops) {
        this.updateState(data);
    }

    updateState(data: UserStatePops) {
        this.session = data.session;
        this.user = data.user;
        this.supabase = data.supabase;
    }

    async logout() {
        await this.supabase?.auth.signOut();
        goto("/");
    }
}

const USER_STATE_KEY = Symbol("USER_STATE");

export function setUserState(data: UserStatePops) {
    return setContext(USER_STATE_KEY, new UserState(data));
}

export function getUserState() {
    return getContext<ReturnType<typeof setUserState>>(USER_STATE_KEY);
}

