<script lang="ts">
  import { navigating } from "$app/stores";
</script>

{#if $navigating}
  <div class="nav-progress" aria-hidden="true">
    <div class="nav-progress-bar" />
  </div>
{/if}

<style>
  .nav-progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    z-index: 60;
    overflow: hidden;
  }
  .nav-progress-bar {
    height: 100%;
    width: 40%;
    background: var(--color-accent);
    animation: nav-progress-slide 1.1s ease-in-out infinite;
  }
  @keyframes nav-progress-slide {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(60%);
    }
    100% {
      transform: translateX(250%);
    }
  }
</style>
