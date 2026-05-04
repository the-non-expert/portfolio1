export interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  testimonial: string;
  image: string;
  isLogo?: boolean;
  darkBg?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    title: "Head of Product",
    company: "OM Therapeutics",
    testimonial: "Honestly, I wasn't sure what to expect bringing in a contractor for something this critical. Ayush proved me wrong within the first week — he asked the right questions, pushed back when something didn't make sense, and the code he shipped just worked. I keep recommending him to people.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=128&h=128&fit=crop&crop=face&auto=format"
  },
  {
    id: 2,
    name: "Priya Nair",
    title: "Director of Digital",
    company: "Roxford Healthcare Ltd.",
    testimonial: "We handed Ayush the whole project — no team, no handholding, just a brief and a deadline. Six months later the site was live, on time, and we haven't had to touch it since. That kind of reliability is rare, especially from someone so early in their career.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop&crop=face&auto=format"
  },
  {
    id: 3,
    name: "Arjun Mehta",
    title: "CTO",
    company: "Querent AI",
    testimonial: "We were taking a risk going with SvelteKit — nobody on the team had done it before. Ayush not only figured it out, he built something we're still shipping features on two years later. He's the kind of developer who makes everyone around him look good.",
    image: "/images/querentIconNew.png",
    isLogo: true
  },
  {
    id: 4,
    name: "Rohan Das",
    title: "Engineering Lead",
    company: "Zicops",
    testimonial: "I've managed a lot of developers. What I remember about Ayush is that he never came back with half-finished work and excuses. He'd figure it out, ship it clean, and ask what's next. That attitude is genuinely hard to find.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=128&h=128&fit=crop&crop=face&auto=format"
  },
  {
    id: 5,
    name: "Karim El-Amin",
    title: "Engineering Manager",
    company: "Digizilla",
    testimonial: "I was skeptical — most interns need babysitting for the first month. Ayush scoped the problem himself, got to work, and launched a live website before I expected a first draft. If he's grown as much since then as I think he has, he must be remarkable.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=128&h=128&fit=crop&crop=face&auto=format"
  },
  {
    id: 6,
    name: "Raunak Singh",
    title: "Founder",
    company: "SikhAid NGO",
    testimonial: "We needed someone who could build something real, not just a website — a system that would help us serve people better. Ayush understood that immediately. The payment tracking he built changed how we think about our marketing, and the admin portal meant our team could actually use it without calling him every week.",
    image: "/images/sikhaidLogo.png",
    isLogo: true
  },
  {
    id: 7,
    name: "Neal Jha",
    title: "Founder",
    company: "Humanaissance",
    testimonial: "I have absolutely enjoyed working with Ayush on developing my website. I am a difficult client in that I have constantly evolving needs, lots of ideas and moonshot aspirations. Ayush has worked through all of that diligently, is eager to learn and is able to pushback on ideas that would not serve me well. I continue to work with him and you will not regret working with him on your website.",
    image: "/images/NealJha.png"
  },
  {
    id: 8,
    name: "Siddharth Modi",
    title: "Founder",
    company: "Toondemy Preschool",
    testimonial: "For a preschool, the website has to feel warm and trustworthy the moment a parent lands on it. Ayush got that without me having to explain it twice. Clean, fast, and parents actually stay on it — which is exactly what we needed. The SEO work has already started showing results.",
    image: "/images/ToondemyLogo.png",
    isLogo: true
  },
  {
    id: 9,
    name: "Praveen Yadav",
    title: "Owner",
    company: "Aarti Jewellers",
    testimonial: "Our customers needed to trust the prices they were seeing — live rates, no delays, in Hindi so everyone could read it. Ayush built exactly that. It looks professional, our customers understand it, and it's already made a difference in how people walk through the door.",
    image: "/images/AartiJewellersLogo.png",
    isLogo: true,
    darkBg: true
  }
];
