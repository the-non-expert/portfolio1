<script>
  import myImage from "$lib/Images/MyImage.jpeg";
  import MySocialMediaDetails from "./CommonComponents/MySocialMediaDetails.svelte";
  import { onMount } from "svelte";

  /**
   * @type {string}
   */
  let currentTime = new Date().toLocaleTimeString();

  function updateTime() {
    currentTime = new Date().toLocaleTimeString();
  }

  onMount(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });
</script>

<div class="max-w-5xl mx-auto px-4 md:px-6 py-8 md:flex md:items-center md:gap-6 p-4">
  <div class="md:w-6/12 flex flex-col">
    <img
      src={myImage}
      alt="Ayush Jhunjhunwala"
      class="w-20 h-20 object-cover rounded-full border border-stroke"
    />
    <h1 class="font-display text-4xl font-bold text-ink mt-10 md:w-10/12">
      Hello! I'm Ayush Jhunjhunwala
    </h1>

    <div class="flex gap-4 items-center mt-5">
      <MySocialMediaDetails />

      <div class="flex flex-col justify-center">
        <p class="text-xs text-muted">Cuttack, India</p>
        <p class="text-xs text-muted">{currentTime}</p>
      </div>
    </div>
  </div>

  <div class="md:w-6/12">
    <h2 class="font-display text-2xl font-semibold text-ink mt-5 md:mt-0">
      Engineer. Leader. Builder.
    </h2>
    <p class="mt-4 text-base text-muted">
      Specializing in Python FastAPI backends, SvelteKit frontends, Shopify systems & AWS deployments.
    </p>

    <div class="flex gap-4 mt-10">
      <a href="/contact">
        <button class="bg-accent text-bg px-4 py-2 rounded-xl hover:bg-accent-hover transition-colors">
          Hire me
        </button>
      </a>
      <a href="/myworks">
        <button class="bg-transparent text-ink border border-stroke px-4 py-2 rounded-xl hover:bg-surface transition-colors">
          My works
        </button>
      </a>
    </div>
  </div>
</div>
