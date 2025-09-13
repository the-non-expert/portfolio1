export const writings = [
  {
    id: 1,
    title: "Building scalable FastAPI backends with PostgreSQL",
    slug: "scalable-fastapi-postgresql",
    date: "2024-09-05",
    excerpt: "My learnings from building production-grade APIs at Addy Fitness and optimizing database queries for better performance.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },
  {
    id: 2,
    title: "The unexpected joy of interim COO work",
    slug: "interim-coo-experience",
    date: "2024-08-20",
    excerpt: "Reflections on stepping into operational leadership while maintaining hands-on development work.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est."
  },
  {
    id: 3,
    title: "SvelteKit vs NextJS: A production comparison",
    slug: "sveltekit-vs-nextjs",
    date: "2024-07-15",
    excerpt: "After building production apps with both frameworks, here's my honest take on when to choose what.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pellentesque eget lorem malesuada wisi. Donec imperdiet tempor mauris. In hac habitasse platea dictumst. Nullam sit amet magna in magna gravida vehicula. Mauris tincidunt sem sed arcu."
  },
  {
    id: 4,
    title: "Why I moved from Vim to VS Code",
    slug: "vim-to-vscode",
    date: "2024-06-08",
    excerpt: "After years of Vim evangelism, I made the switch. Here's why.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."
  }
];

// Group writings by year for timeline display
export function getWritingsByYear() {
  const groupedWritings = {};
  
  writings.forEach(writing => {
    const year = new Date(writing.date).getFullYear();
    if (!groupedWritings[year]) {
      groupedWritings[year] = [];
    }
    groupedWritings[year].push(writing);
  });
  
  // Sort years in descending order
  const sortedYears = Object.keys(groupedWritings)
    .map(year => parseInt(year))
    .sort((a, b) => b - a);
  
  const result = {};
  sortedYears.forEach(year => {
    // Sort writings within each year by date (newest first)
    result[year] = groupedWritings[year].sort((a, b) => new Date(b.date) - new Date(a.date));
  });
  
  return result;
}