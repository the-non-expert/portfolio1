<script lang="ts">
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import type { FAQItem } from '$lib/data/faq';

  export let items: FAQItem[];
  export let heading: string = 'Common questions';
  export let label: string = 'FAQ';
  export let id: string = 'faq';

  let openIndex: number | null = null;

  function toggle(i: number): void {
    openIndex = openIndex === i ? null : i;
  }
</script>

<section {id} class="w-full border-t border-stroke py-16">
  <div class="max-w-5xl mx-auto px-4 md:px-6">

    <p class="text-xs uppercase tracking-widest text-muted mb-3">{label}</p>
    <h2 class="font-display text-2xl font-semibold text-ink mb-10">{heading}</h2>

    <div class="border-b border-stroke">
      {#each items as item, i}
        <div class="border-t border-stroke">
          <button
            class="w-full py-5 flex items-start justify-between gap-6 text-left group"
            on:click={() => toggle(i)}
            aria-expanded={openIndex === i}
            aria-controls="faq-answer-{id}-{i}"
          >
            <h3 class="font-display text-lg font-medium text-ink group-hover:text-accent transition-colors duration-200">
              {item.question}
            </h3>
            <svg
              class="w-4 h-4 text-muted shrink-0 mt-1.5 transition-transform duration-300 {openIndex === i ? 'rotate-180' : ''}"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {#if openIndex === i}
            <div
              id="faq-answer-{id}-{i}"
              transition:slide={{ duration: 250, easing: quintOut }}
              class="pb-6 pr-10"
            >
              <p class="text-base text-muted leading-relaxed">{item.answer}</p>
            </div>
          {/if}
        </div>
      {/each}
    </div>

  </div>
</section>
