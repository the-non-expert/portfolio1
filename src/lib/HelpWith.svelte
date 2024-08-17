<script>
  import pixel1 from "$lib/projectImages/pixel1.png";
  import primeTech1 from "$lib/projectImages/primeTech1.png";
  import aspireImage from "$lib/projectImages/aspireSample1.png";
  import addy from "$lib/projectImages/addyfitness.png";
  import roxford1 from "$lib/projectImages/roxford1.png";
  import roxford2 from "$lib/projectImages/roxford2.png";

  import landingIcon from "$lib/Images/computerIcon.svg";
  import enterpriseIcon from "$lib/Images/enterprise.svg";
  import custom from "$lib/Images/custom.svg";
</script>

<div class="w-full bg-[#F5F5F1] md:p-20 md:px-32 p-4 pt-20">
  <div class="md:flex md:flex-row md:justify-center flex flex-col items-center">
    <p class="md:text-5xl">I can help you with</p>
    <!-- <button class="bg-white text-black border-2 px-4 py-2 rounded-xl"
      >See My Work</button
    > -->
  </div>

  <!-- Functional Landing Pages Section -->
  <div
    class="md:flex md:flex-row md:justify-between flex flex-col items-center mt-10"
  >
    <div class="flex items-center gap-3">
      <img
        src={landingIcon}
        alt=""
        class="w-7 h-7 object-cover bg-white p-1 rounded-full"
      />
      <p class="text-2xl">Functional Landing Pages</p>
    </div>
    <p class="text-sm md:w-6/12 md:text-left text-center mt-2">
      Offering expertise in creating high-performing, functional landing pages
      tailored to drive results and enhance user experience.
    </p>
  </div>
  <div class="w-full flex md:flex-row flex-col items-center mt-5 gap-6">
    <div class="md:w-6/12 bg-[#D8DFF7] rounded-xl">
      <img src={pixel1} alt="pixelSample" class="p-3 rounded-xl" />
    </div>
    <div class="md:w-6/12 bg-[#D8DFF7] rounded-xl">
      <img src={primeTech1} alt="primeTech1" class="p-3 rounded-xl" />
    </div>
  </div>

  <!-- Complete Enterprise Websites Section -->
  <div
    class="md:flex md:flex-row md:justify-between flex flex-col items-center mt-10"
  >
    <div class="flex items-center gap-3">
      <img
        src={enterpriseIcon}
        alt=""
        class="w-6 h-6 object-cover bg-white p-1 rounded-full"
      />
      <p class="text-2xl">Complete Enterprise Websites</p>
    </div>
    <p class="text-sm md:w-6/12 md:text-left text-center mt-2">
      Delivering comprehensive, fully-featured enterprise websites designed to
      meet complex business needs and scale with growth.
    </p>
  </div>
  <div class="w-full flex md:flex-row flex-col items-center mt-5 gap-6">
    <div class="md:w-6/12 bg-[#D8DFF7] rounded-xl">
      <img src={aspireImage} alt="pixelSample" class="p-3 rounded-xl" />
    </div>
    <div class="md:w-6/12 bg-[#D8DFF7] rounded-xl">
      <img src={addy} alt="primeTech1" class="p-3 rounded-xl" />
    </div>
  </div>

  <!-- Coding custom Components for your needs  -->
  <div
    class="md:flex md:flex-row md:justify-between flex flex-col items-center mt-10"
  >
    <div class="flex items-center gap-3">
      <img
        src={custom}
        alt=""
        class="w-7 h-7 object-cover bg-white p-1 rounded-full"
      />
      <p class="text-2xl">Custom Components for you</p>
    </div>
    <p class="text-sm md:w-6/12 md:text-left text-center mt-2">
      Crafting tailored custom components to perfectly match your unique
      requirements and enhance your project’s functionality.
    </p>
  </div>
  <div class="w-full flex md:flex-row flex-col items-center mt-5 gap-6">
    <div class="md:w-6/12 bg-[#D8DFF7] rounded-xl">
      <img src={roxford1} alt="pixelSample" class="p-3 rounded-xl" />
    </div>
    <div class="md:w-6/12 bg-[#D8DFF7] rounded-xl">
      <img src={roxford2} alt="primeTech1" class="p-3 rounded-xl" />
    </div>
  </div>
</div>
