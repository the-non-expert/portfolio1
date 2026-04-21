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
    answer: "Production-grade web applications across the full stack — Python FastAPI APIs, SvelteKit and React frontends, PostgreSQL and MongoDB databases, Shopify systems, and AWS-deployed platforms with GitHub Actions CI/CD pipelines. Projects span e-commerce, healthcare, NGO, and AI sectors. Every system is built to be maintained, not just launched."
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
    answer: "Full-stack web development contracts, technical leadership roles, Shopify system builds, and architecture consulting. On the technical side: Python FastAPI backends, SvelteKit or React frontends, PostgreSQL databases, AWS deployments, and CI/CD pipelines. I also implement SEO and Generative Engine Optimisation (GEO) packages for web projects."
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
