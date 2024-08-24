<script>
  import svelteImage from "$lib/ToolsLogo/svelte.png";
  import tailwindImage from "$lib/ToolsLogo/tailwind.png";
  import nodeImage from "$lib/ToolsLogo/nodeJs.png";
  import canva from "$lib/ToolsLogo/Canva.png";
  import adobe from "$lib/ToolsLogo/adobe.png";
  import figma from "$lib/ToolsLogo/Figma.png";
  import golangImage from "$lib/ToolsLogo/goImage.png";
  import vscode from "$lib/ToolsLogo/vscode.png";
  import netlify from "$lib/ToolsLogo/netlify.png";
  import github from "$lib/ToolsLogo/githubLogo.png";
</script>

<div class="w-full bg-[#F5F5F1] md:p-10 md:px-32 p-4">
  <p class="text-3xl w-full text-center font-bold">Dev Tools I Use</p>

  <div class="flex flex-wrap gap-12 justify-center mt-8">
    <img
      src={svelteImage}
      alt="sveltekitStack"
      class="w-36 h-auto object-contain"
    />
    <img
      src={golangImage}
      alt="sveltekitStack"
      class="w-28 h-auto object-contain"
    />
    <img src={vscode} alt="sveltekitStack" class="w-16 h-auto object-contain" />
    <img
      src={tailwindImage}
      alt="sveltekitStack"
      class="w-36 h-auto object-contain"
    />
    <img
      src={netlify}
      alt="sveltekitStack"
      class="w-36 h-auto object-contain"
    />
    <img
      src={nodeImage}
      alt="sveltekitStack"
      class="w-28 h-auto object-contain"
    />
    <img src={github} alt="sveltekitStack" class="w-20 h-auto object-contain" />
    <!-- <img src={adobe} alt="sveltekitStack" class="w-36 h-auto object-contain" />
    <img src={canva} alt="sveltekitStack" class="w-36 h-auto object-contain" />
    <img src={figma} alt="sveltekitStack" class="w-28 h-auto object-contain" /> -->
  </div>
</div>
