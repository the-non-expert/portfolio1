<script>
  // @ts-nocheck

  import { workExperience } from "$lib/data/workExperience.js";
  
  /**
   * @type {null}
   */
  let selectedId = null;

  /**
   * @param {null} id
   */
  function toggleDescription(id) {
    selectedId = selectedId === id ? null : id;
  }

</script>

<section class="w-full bg-[#F5F5F1] md:p-20 md:px-32 p-4 pt-20" aria-labelledby="work-experience-heading">
  <header class="mb-12">
    <h2 id="work-experience-heading" class="text-3xl font-light mb-2">Work Experience</h2>
    <p class="text-sm text-gray-600">Click any card to view details</p>
  </header>

  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {#each workExperience as experience (experience.id)}
      <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
      <article 
        class="group bg-white rounded-xl border border-gray-200 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-gray-300 hover:-translate-y-1"
        on:click={() => toggleDescription(experience.id)}
        on:keydown={(e) => e.key === 'Enter' && toggleDescription(experience.id)}
        tabindex="0"
        role="button"
        aria-expanded={selectedId === experience.id}
        aria-controls="description-{experience.id}"
      >
        <!-- Card Header -->
        <div class="flex items-start gap-4 mb-4">
          <div class="flex-shrink-0">
            <img
              src={experience.logo}
              alt="{experience.company} logo"
              class="w-12 h-12 object-contain p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors"
            />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between mb-1">
              <h3 class="text-lg font-medium text-gray-900 leading-tight">
                {experience.role}
              </h3>
              {#if experience.url}
                <a 
                  href={experience.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium hover:bg-blue-100 transition-colors flex items-center gap-1 flex-shrink-0 ml-2"
                  title="View live project"
                >
                  View Live
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              {/if}
            </div>
            <div class="flex items-center gap-2 mb-2">
              <p class="text-base font-semibold text-gray-800">{experience.company}</p>
              <span class="text-lg" title={experience.location}>{experience.countryFlag}</span>
            </div>
            <p class="text-sm text-gray-500">{experience.duration}</p>
          </div>
        </div>

        <!-- Technology Tags -->
        <div class="flex flex-wrap gap-2 mb-4">
          {#each experience.technologies.slice(0, 3) as tech}
            <span class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md font-medium">
              {tech}
            </span>
          {/each}
          {#if experience.technologies.length > 3}
            <span class="px-2 py-1 text-xs bg-gray-200 text-gray-600 rounded-md">
              +{experience.technologies.length - 3}
            </span>
          {/if}
        </div>

        <!-- Expandable Content -->
        {#if selectedId === experience.id}
          <div 
            id="description-{experience.id}"
            class="mt-4 pt-4 border-t border-gray-100 animate-slideIn"
          >
            <!-- Key Achievements -->
            <div class="mb-4">
              <h4 class="text-sm font-semibold text-gray-800 mb-2">Key Achievements</h4>
              <ul class="space-y-1">
                {#each experience.achievements as achievement}
                  <li class="text-sm text-gray-600 flex items-start">
                    <span class="inline-block w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {achievement}
                  </li>
                {/each}
              </ul>
            </div>

            <!-- Full Description -->
            <div>
              <h4 class="text-sm font-semibold text-gray-800 mb-2">Role Description</h4>
              <p class="text-sm text-gray-600 leading-relaxed">{experience.description}</p>
            </div>

            <!-- All Technologies -->
            <div class="mt-4">
              <h4 class="text-sm font-semibold text-gray-800 mb-2">Technologies Used</h4>
              <div class="flex flex-wrap gap-2">
                {#each experience.technologies as tech}
                  <span class="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md font-medium border border-blue-200">
                    {tech}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        {/if}

        <!-- Click Indicator -->
        <div class="flex items-center justify-center mt-4 pt-3 border-t border-gray-100">
          <div class="flex items-center text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
            {#if selectedId === experience.id}
              <span>Click to collapse</span>
              <svg class="w-3 h-3 ml-1 transform rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            {:else}
              <span>Click to expand</span>
              <svg class="w-3 h-3 ml-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            {/if}
          </div>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slideIn {
    animation: slideIn 0.3s ease-out;
  }
  
  /* Smooth hover transitions */
  article {
    will-change: transform, box-shadow;
  }
  
  /* Focus styles for accessibility */
  article:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
</style>
