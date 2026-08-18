<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { fade, fly } from "svelte/transition";

  export let title: string | undefined = undefined;

  const dispatch = createEventDispatcher();
  let dialogEl: HTMLDivElement;

  // Bottom sheet on mobile (thumb-reachable, feels native); centered modal
  // on desktop, where a drawer pinned to the bottom edge looks orphaned on
  // a wide screen. Computed once at open time, from CSS's own breakpoint —
  // a live resize mid-open won't retarget the entrance animation, but the
  // layout itself (position/width/rounding below) stays responsive via
  // Tailwind's sm: classes regardless.
  const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches;
  const flyY = isDesktop ? 24 : 400;

  function close() {
    dispatch("close");
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "Escape") close();
  }

  onMount(() => {
    document.body.style.overflow = "hidden";
    dialogEl?.focus();
  });
  onDestroy(() => {
    document.body.style.overflow = "";
  });
</script>

<svelte:window on:keydown={onKeydown} />

<div class="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6">
  <button
    type="button"
    class="absolute inset-0 bg-ink opacity-40"
    on:click={close}
    aria-label="Close"
    transition:fade={{ duration: 200 }}
  ></button>

  <div
    bind:this={dialogEl}
    role="dialog"
    aria-modal="true"
    aria-label={title}
    tabindex="-1"
    class="relative bg-surface border border-stroke-strong rounded-t-2xl sm:rounded-2xl shadow-pop w-full sm:max-w-xl max-h-[90vh] sm:max-h-[85vh] overflow-y-auto p-6 sm:p-8 focus:outline-none"
    transition:fly={{ y: flyY, duration: 250 }}
  >
    <div class="flex items-start justify-between gap-4 mb-6">
      <slot name="header">
        <h2 class="font-display text-xl font-semibold text-ink">{title}</h2>
      </slot>
      <button
        type="button"
        on:click={close}
        aria-label="Close"
        class="text-muted hover:text-ink w-7 h-7 rounded-lg hover:bg-bg flex items-center justify-center shrink-0"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <slot />
  </div>
</div>
