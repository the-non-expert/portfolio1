export interface FAQItem {
  question: string;
  answer: string;
}

// Home page FAQ — identity and expertise signals for cold visitors and AI entity disambiguation
export const homeFAQItems: FAQItem[] = [
  {
    question: "Who is Ayush Jhunjhunwala?",
    answer: "Ayush Jhunjhunwala is a full-stack developer and technical leader based in Cuttack, India. He specialises in Python FastAPI backends, SvelteKit frontends, Shopify systems, and AWS deployments. With over five years of experience across UK pharma, US biotech, and early-stage AI startups, he has delivered as a sole developer on six-month contracts, as a team lead managing twelve or more engineers, and as an interim COO balancing strategy with hands-on development."
  },
  {
    question: "What does Ayush Jhunjhunwala build?",
    answer: "Custom websites, Android apps, and software for small businesses — Python FastAPI APIs, SvelteKit and React frontends, Flutter Android apps, QR code loyalty systems, PostgreSQL and MongoDB databases, Shopify systems, and AWS-deployed platforms with GitHub Actions CI/CD pipelines. Projects span e-commerce, healthcare, NGO, pharma, and AI sectors. Every system is built to be maintained, not just launched."
  },
  {
    question: "Do I pay monthly fees or a subscription for a custom website?",
    answer: "No. Every project is a one-time build with a one-time payment — there is no platform subscription, no per-month builder fee, and no lock-in. The only recurring costs are third-party essentials like your domain name and hosting, which are registered in your name and disclosed upfront. You own the code, the design, and every account involved."
  },
  {
    question: "How much does a custom website or app cost in India?",
    answer: "It depends on scope: a focused business website costs far less than a full application with payments, dashboards, or a mobile app. The price is discussed and agreed upfront before any work begins — a fixed quote with no hidden charges, no surprise add-ons, and no recurring platform fees. Contact Ayush with your idea for a clear scope and price."
  },
  {
    question: "Who owns the code and the website after the project?",
    answer: "The client does — 100%. Code is handed over in the client's own repository, hosting and domain accounts are in the client's name, and handover documentation is included so any developer can maintain the system later. There is no dependency on Ayush or any proprietary platform to keep the site running."
  },
  {
    question: "Is Ayush Jhunjhunwala available for new projects?",
    answer: "Yes. Currently open to contracts, technical leadership roles, and architecture consulting engagements. Remote-first, with clients across India, the UK, the US, and Singapore. Typical contracts run four to sixteen weeks, with ongoing retainer arrangements also available."
  },
  {
    question: "What is Generative Engine Optimisation (GEO)?",
    answer: "Generative Engine Optimisation (GEO) is the practice of structuring a website's content, metadata, and entity signals so that AI systems — such as ChatGPT, Perplexity, Google's AI Overviews, and Claude — are more likely to cite or recommend that site in their responses. Where traditional SEO targets search ranking algorithms, GEO targets the large language models and retrieval systems that increasingly answer queries directly. Techniques include Schema.org JSON-LD structured data, entity clarity, citation-worthy content, and FAQ-style definitions that AI systems can extract and quote verbatim."
  },
  {
    question: "Where is Ayush Jhunjhunwala based, and does he work with international clients?",
    answer: "Based in Cuttack, Odisha, India. Fully remote-capable with a track record of delivering for clients in the UK (Roxford Healthcare Ltd.), the US (OM Therapeutics), and Singapore (Humanaissance), alongside Indian clients across jewellery, NGO, preschool, and fitness sectors."
  }
];

// Contact page FAQ — process and engagement questions for conversion-stage visitors
export const contactFAQItems: FAQItem[] = [
  {
    question: "Are you available for new projects right now?",
    answer: "Yes — currently open to new engagements. Send a message using the form above and I typically respond within 24 hours with a clear answer on fit and timing."
  },
  {
    question: "What kind of projects do you take on?",
    answer: "Custom websites, Android apps, and software for small businesses — plus full-stack web development contracts, technical leadership roles, Shopify system builds, and architecture consulting. On the technical side: Python FastAPI backends, SvelteKit or React frontends, Flutter Android apps, PostgreSQL databases, AWS deployments, and CI/CD pipelines. I also implement SEO and Generative Engine Optimisation (GEO) packages for web projects."
  },
  {
    question: "How is pricing decided? Are there any hidden charges?",
    answer: "Pricing is discussed openly before any work begins. You get a fixed quote based on agreed scope — no hidden charges, no surprise add-ons, and no recurring platform fees. If scope changes mid-project, the price change is discussed and agreed before the work happens, never after. The only ongoing costs are third-party essentials like your domain and hosting, registered in your own name."
  },
  {
    question: "Do I have to pay monthly to keep my website or app running?",
    answer: "No. The build is a one-time payment and you own everything — code, design, and accounts. There is no subscription to me or to any proprietary platform. Most projects run on free or low-cost hosting tiers (Netlify, Supabase), and where paid infrastructure is genuinely needed, it is in your account and disclosed before the project starts."
  },
  {
    question: "What does a typical engagement look like?",
    answer: "Most contracts run four to sixteen weeks. I start with a scoping call to understand requirements, timeline, and existing infrastructure, then work independently — shipping regularly, communicating clearly, and flagging decisions early. For leadership roles, the first two weeks focus on team assessment and process alignment before any architectural decisions are made."
  },
  {
    question: "Can you work as a technical lead, not just a developer?",
    answer: "Yes. Several engagements have been explicitly leadership-first — managing teams, setting development standards, running code reviews, and making architectural decisions while staying hands-on with delivery. Managing 80+ members across AIESEC nationally and serving as interim COO are examples of this running as a parallel track alongside technical work, not a departure from it."
  },
  {
    question: "How long does a typical project take?",
    answer: "Simple websites and landing pages: two to four weeks. Full-stack applications with backend, frontend, and deployment: eight to sixteen weeks. Complex projects with multiple integrations — payment systems, CMS, third-party APIs — are scoped individually. Ongoing platform development and technical leadership retainers are available as monthly arrangements."
  },
  {
    question: "What is your development stack?",
    answer: "Frontend: SvelteKit and React, TypeScript, Tailwind CSS. Backend: Python FastAPI, PostgreSQL, MongoDB. Infrastructure: AWS EC2, GitHub Actions CI/CD, Nginx. Also experienced with GraphQL, Cassandra, Firebase, Razorpay webhooks, and Shopify Liquid for theme development."
  }
];
