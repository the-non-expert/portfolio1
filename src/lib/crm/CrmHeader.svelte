<script lang="ts">
  import { page } from "$app/stores";
  import ProjectSwitcher from "./ProjectSwitcher.svelte";
  import ThemeToggle from "./ThemeToggle.svelte";

  export let isAdmin: boolean;
  export let email: string | undefined;
  export let projects: Array<{
    slug: string;
    name: string;
    status: string;
    archived: boolean;
    clientName?: string;
  }>;

  $: isDashboard = $page.url.pathname === "/crm/admin";
  $: isClients = $page.url.pathname.startsWith("/crm/admin/clients");
  $: isMeetings = $page.url.pathname.startsWith("/crm/admin/meetings");
</script>

<div class="border-b border-stroke-strong bg-surface">
  <div class="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 h-14 flex items-center gap-2 sm:gap-3">
    <a href={isAdmin ? "/crm/admin" : "/crm"} class="shrink-0">
      <img src="/images/Ayushjhunjhunwala.png" alt="Ayush Jhunjhunwala" class="h-6 sm:h-7 w-auto" />
    </a>

    <span class="hidden sm:block h-5 w-px bg-stroke-strong shrink-0" />

    <div class="min-w-0">
      <ProjectSwitcher {isAdmin} {projects} />
    </div>

    <div class="flex-1" />

    {#if email}
      <span class="hidden lg:block text-xs text-muted truncate max-w-[12rem]">{email}</span>
    {/if}
    <ThemeToggle />
    <form method="POST" action="/crm/logout">
      <button type="submit" class="text-sm text-muted hover:text-accent transition-colors duration-200 whitespace-nowrap">
        Log out
      </button>
    </form>
  </div>
</div>

{#if isAdmin}
  <div class="border-b border-stroke bg-surface">
    <div class="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 h-11 flex items-center gap-4 sm:gap-6">
      <a
        href="/crm/admin"
        class="h-11 flex items-center text-sm border-b-2 transition-colors whitespace-nowrap {isDashboard ? 'text-ink border-accent' : 'text-muted border-transparent hover:text-ink'}"
      >
        Dashboard
      </a>
      <a
        href="/crm/admin/clients"
        class="h-11 flex items-center text-sm border-b-2 transition-colors whitespace-nowrap {isClients ? 'text-ink border-accent' : 'text-muted border-transparent hover:text-ink'}"
      >
        Clients
      </a>
      <a
        href="/crm/admin/meetings"
        class="h-11 flex items-center text-sm border-b-2 transition-colors whitespace-nowrap {isMeetings ? 'text-ink border-accent' : 'text-muted border-transparent hover:text-ink'}"
      >
        Meetings
      </a>
      <div class="flex-1" />
      <a
        href="/crm/admin/clients/new"
        class="shrink-0 bg-ink text-bg rounded-full px-4 py-1.5 text-sm hover:bg-accent transition-colors duration-300 whitespace-nowrap"
      >
        New client
      </a>
    </div>
  </div>
{/if}
