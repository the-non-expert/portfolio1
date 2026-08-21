<script lang="ts">
  import { enhance } from "$app/forms";
  import PasswordField from "$lib/crm/PasswordField.svelte";
  import Spinner from "$lib/crm/Spinner.svelte";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let submitting = false;
</script>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
  <div class="max-w-sm mx-auto">
    <h1 class="font-display text-2xl font-semibold text-ink mb-1">Client Portal</h1>
    <p class="text-sm text-muted mb-8">Log in with the credentials you were given.</p>

    {#if form?.error}
      <div class="mb-5 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700">
        {form.error}
      </div>
    {/if}

    <form
      method="POST"
      use:enhance={() => {
        submitting = true;
        return async ({ update }) => {
          await update();
          submitting = false;
        };
      }}
      class="space-y-5"
    >
      <div class="flex flex-col gap-1.5">
        <label for="email" class="text-sm font-medium text-ink">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@company.com"
          class="bg-surface border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          required
        />
      </div>

      <PasswordField id="password" name="password" label="Password" placeholder="••••••••" required />

      <button
        type="submit"
        disabled={submitting}
        class="w-full bg-ink text-bg px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {#if submitting}<Spinner class="w-4 h-4" />{/if}
        Log in
      </button>
    </form>

    <p class="text-xs text-muted mt-8">
      Trouble logging in? Reach out directly and I'll sort it.
    </p>
  </div>
</main>
