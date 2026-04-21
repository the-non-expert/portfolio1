<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { testimonials } from "$lib/data/testimonials";
  import type { Testimonial } from "$lib/data/testimonials";

  let current: number = 0;
  let paused: boolean = false;
  let touchStartX: number = 0;

  const total: number = testimonials.length;

  $: item = testimonials[current] as Testimonial;

  function next(): void {
    current = (current + 1) % total;
  }

  function prev(): void {
    current = (current - 1 + total) % total;
  }

  function goTo(index: number): void {
    current = index;
  }

  function handleKeydown(e: KeyboardEvent): void {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  function handleTouchStart(e: TouchEvent): void {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent): void {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  }

  let timer: ReturnType<typeof setInterval>;

  function startTimer(): void {
    clearInterval(timer);
    timer = setInterval(() => {
      if (!paused) next();
    }, 5000);
  }

  onMount(() => {
    startTimer();
  });

  onDestroy(() => {
    clearInterval(timer);
  });
</script>

<section
  class="bg-surface py-16"
  role="region"
  aria-label="Testimonials"
  on:mouseenter={() => (paused = true)}
  on:mouseleave={() => (paused = false)}
  on:touchstart={handleTouchStart}
  on:touchend={handleTouchEnd}
  on:keydown={handleKeydown}
  tabindex="-1"
>
  <div class="max-w-5xl mx-auto px-4 md:px-6">

    <!-- Carousel content -->
    {#key current}
      <div class="flex flex-col md:flex-row md:items-center gap-8 animate-fade">
        <!-- Quote -->
        <div class="flex-1 min-w-0">
          <span class="font-display text-5xl text-accent opacity-30 leading-none select-none" aria-hidden="true">&ldquo;</span>
          <blockquote class="text-base text-ink leading-relaxed italic -mt-4">
            {item.testimonial}
          </blockquote>
          <div class="mt-6">
            <p class="font-display text-lg font-semibold text-ink">{item.name}</p>
            <p class="text-xs text-muted">{item.title}, {item.company}</p>
          </div>
        </div>

        <!-- Avatar -->
        <div class="shrink-0 order-first md:order-last">
          <img
            src={item.image}
            alt={item.name}
            class="ring-1 ring-stroke {item.isLogo ? `w-28 h-16 rounded-lg object-contain p-1 ${item.darkBg ? 'bg-black' : 'bg-white'}` : 'w-24 h-24 rounded-full object-cover'}"
            loading="lazy"
          />
        </div>
      </div>
    {/key}

    <!-- Navigation -->
    <div class="flex items-center justify-between mt-10">
      <!-- Dots -->
      <div class="flex items-center gap-2" role="tablist" aria-label="Testimonial slides">
        {#each testimonials as t, i}
          <button
            role="tab"
            aria-selected={i === current}
            aria-label="Go to testimonial {i + 1}"
            class={i === current
              ? 'w-6 h-2 rounded-full bg-accent transition-all duration-300'
              : 'w-2 h-2 rounded-full bg-stroke transition-all duration-300'}
            on:click={() => goTo(i)}
          ></button>
        {/each}
      </div>

      <!-- Prev / Next -->
      <div class="flex items-center gap-3">
        <button
          aria-label="Previous testimonial"
          class="w-10 h-10 rounded-full border border-stroke text-muted hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
          on:click={prev}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          aria-label="Next testimonial"
          class="w-10 h-10 rounded-full border border-stroke text-muted hover:border-accent hover:text-accent transition-colors flex items-center justify-center"
          on:click={next}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

  </div>
</section>

<style>
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  :global(.animate-fade) {
    animation: fade-in 0.4s ease-out;
  }
</style>
