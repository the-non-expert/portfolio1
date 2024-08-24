<script>
  import myImage from "$lib/Images/MyImage.jpeg";
  import MySocialMediaDetails from "$lib/CommonComponents/MySocialMediaDetails.svelte";
  import ToolsUsed from "$lib/ToolsUsed.svelte";
  import MyRecentWork from "$lib/MyRecentWork.svelte";
  import CallToActionHome from "$lib/CallToActionHome.svelte";
</script>

<div class="md:w-full md:flex md:justify-center md:gap-32 md:p-10 p-5">
  <div class="">
    <img
      src={myImage}
      alt="MyImage"
      class="md:w-64 md:h-64 w-44 h-44 object-cover rounded-full"
    />
  </div>
  <div class="md:flex md:flex-col md:m-0 justify-evenly mt-5">
    <p class="md:text-5xl text-4xl font-light">Ayush Jhunjhunwala</p>
    <div>
      <p class="text-xl mt-3">
        A Svelte-Kit Developer based out of Cuttack, India
      </p>
      <p class="mt-2 text-gray-500">Passionate to create digital solutions</p>
    </div>
    <div class="mt-5">
      <MySocialMediaDetails />
    </div>
  </div>
</div>

<ToolsUsed />
<MyRecentWork />
<CallToActionHome />
