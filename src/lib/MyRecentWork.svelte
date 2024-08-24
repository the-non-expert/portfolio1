<script>
  import pixelLogo from "$lib/MyRecentWorkImages/PixelLogo.png";
  import roxfordLogo from "$lib/MyRecentWorkImages/roxfordLogo2.png";
  import addyFitness from "$lib/MyRecentWorkImages/addyFitness.png";
  import PrimeTechnology from "$lib/MyRecentWorkImages/PrimeTechnology.png";
  import alphabetList from "$lib/MyRecentWorkImages/AlphabetList.png";
  import HoverableWorkShowcase from "./CommonComponents/HoverableWorkShowcase.svelte";

  const myWorks = [
    {
      id: 1,
      name: "Pixel Webpages",
      image: pixelLogo,
      description: "High-End IT Company providing full-stack services",
      websiteLink: "https://pixelwebpages.com/",
    },
    {
      id: 2,
      name: "Roxford Healthcare",
      image: roxfordLogo,
      description:
        "A leading global pharmaceutical company,committed to innovation & patient-centricity",
      websiteLink: "https://roxfordhealthcare.com/",
    },
    {
      id: 3,
      name: "Addy Fitness",
      image: addyFitness,
      description:
        "Achieve your ideal body through tailored nutrition plans & expert guidance",
      websiteLink: "https://neon-maamoul-a504e5.netlify.app/",
    },
    {
      id: 4,
      name: "Prime Technologies",
      image: PrimeTechnology,
      description: "Making IT infrastructure work smarter for your business",
      websiteLink: "https://primetechnologies.netlify.app//",
    },
    {
      id: 5,
      name: "Alphabet List",
      image: alphabetList,
      description:
        "An npm package allowing users to quickly filter and navigate through a list of items by their starting letter.",
      websiteLink: "https://alphabet-list-svelte-demo.netlify.app/",
    },
  ];
</script>

<div class="w-full bg-[#F5F5F1] md:p-10 md:px-32 p-4">
  <p class="text-3xl w-full text-center font-bold">My Recent Work</p>
  <p class="text-xs w-full text-center">(Please Click on it)</p>
  <div class="mt-10 grid gap-10 md:grid-cols-3 grid-cols-1">
    <HoverableWorkShowcase data={myWorks} />
  </div>
</div>
