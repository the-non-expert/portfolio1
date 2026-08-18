<script lang="ts">
  export let id: string;
  export let name: string;
  export let label: string;
  export let placeholder = "";
  export let required = false;
  export let value = "";

  let visible = false;
</script>

<div class="flex flex-col gap-1.5">
  <label for={id} class="text-sm font-medium text-ink">{label}</label>
  <div class="relative">
    {#if visible}
      <input
        {id}
        {name}
        {required}
        bind:value
        type="text"
        {placeholder}
        class="w-full bg-surface border border-stroke rounded-xl pl-4 pr-11 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
      />
    {:else}
      <input
        {id}
        {name}
        {required}
        bind:value
        type="password"
        {placeholder}
        class="w-full bg-surface border border-stroke rounded-xl pl-4 pr-11 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
      />
    {/if}
    <button
      type="button"
      on:click={() => (visible = !visible)}
      aria-label={visible ? "Hide password" : "Show password"}
      class="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
    >
      {#if visible}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>
      {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      {/if}
    </button>
  </div>
</div>
