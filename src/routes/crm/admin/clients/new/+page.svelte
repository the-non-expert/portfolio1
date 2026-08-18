<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";

  export let form: ActionData;

  let copied = "";
  function copy(text: string, field: string) {
    navigator.clipboard.writeText(text);
    copied = field;
    setTimeout(() => (copied = ""), 1500);
  }

  let billingType: "hourly" | "flat" = "flat";
</script>

<main class="max-w-5xl mx-auto px-4 md:px-6 py-12">
  <div class="max-w-md mx-auto">
    {#if form?.success}
      <h1 class="font-display text-2xl font-semibold text-ink mb-1">Client created</h1>
      <p class="text-sm text-muted mb-8">
        Hand these to {form.projectName ? "them" : "the client"} now — this password won't be shown again.
      </p>

      <div class="bg-surface border border-stroke rounded-xl p-6 space-y-4">
        <div>
          <p class="text-xs text-muted uppercase tracking-widest mb-1">Login URL</p>
          <div class="flex items-center justify-between gap-2">
            <code class="text-sm text-ink break-all">ayushjhunjhunwala.com/crm/login</code>
          </div>
        </div>
        <div>
          <p class="text-xs text-muted uppercase tracking-widest mb-1">Email</p>
          <div class="flex items-center justify-between gap-2">
            <code class="text-sm text-ink break-all">{form.email}</code>
            <button
              type="button"
              on:click={() => copy(String(form.email), "email")}
              class="text-xs text-accent hover:text-accent-hover shrink-0"
            >
              {copied === "email" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <div>
          <p class="text-xs text-muted uppercase tracking-widest mb-1">Password</p>
          <div class="flex items-center justify-between gap-2">
            <code class="text-sm text-ink break-all">{form.password}</code>
            <button
              type="button"
              on:click={() => copy(String(form.password), "password")}
              class="text-xs text-accent hover:text-accent-hover shrink-0"
            >
              {copied === "password" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      <a
        href={`/crm/admin/projects/${form.slug}`}
        class="inline-block mt-6 bg-ink text-bg px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors duration-300"
      >
        Go to project &rarr;
      </a>
    {:else}
      <h1 class="font-display text-2xl font-semibold text-ink mb-1">New client</h1>
      <p class="text-sm text-muted mb-8">Creates their login and a project to log against.</p>

      {#if form?.error}
        <div class="mb-5 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-700">
          {form.error}
        </div>
      {/if}

      <form method="POST" use:enhance class="space-y-5">
        <div class="flex flex-col gap-1.5">
          <label for="full_name" class="text-sm font-medium text-ink">Client name</label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            placeholder="Full name"
            class="bg-surface border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            required
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="email" class="text-sm font-medium text-ink">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="client@company.com"
            class="bg-surface border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            required
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="company" class="text-sm font-medium text-ink">Company <span class="text-muted font-normal">(optional)</span></label>
          <input
            id="company"
            name="company"
            type="text"
            class="bg-surface border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="phone" class="text-sm font-medium text-ink">Phone <span class="text-muted font-normal">(optional)</span></label>
          <input
            id="phone"
            name="phone"
            type="tel"
            class="bg-surface border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="project_name" class="text-sm font-medium text-ink">Project name</label>
          <input
            id="project_name"
            name="project_name"
            type="text"
            placeholder="e.g. Website Redesign"
            class="bg-surface border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            required
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <span class="text-sm font-medium text-ink">Billing</span>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 text-sm text-ink">
              <input type="radio" name="billing_type" value="flat" bind:group={billingType} class="accent-accent" />
              Flat rate
            </label>
            <label class="flex items-center gap-2 text-sm text-ink">
              <input type="radio" name="billing_type" value="hourly" bind:group={billingType} class="accent-accent" />
              Hourly rate
            </label>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label for="rate" class="text-sm font-medium text-ink">
            {billingType === "hourly" ? "Hourly rate (₹/hr)" : "Flat project price (₹)"}
            <span class="text-muted font-normal">(optional)</span>
          </label>
          <input
            id="rate"
            name="rate"
            type="number"
            min="0"
            step="0.01"
            placeholder={billingType === "hourly" ? "e.g. 500" : "e.g. 25000"}
            class="bg-surface border border-stroke rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-ink text-bg px-6 py-3 rounded-full text-sm font-medium hover:bg-accent transition-colors duration-300"
        >
          Create client
        </button>
      </form>
    {/if}
  </div>
</main>
