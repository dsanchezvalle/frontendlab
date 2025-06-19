export const mockArticle = {
    title: "Building Accessible React Components",
    tags: ["React", "Accessibility"],
    date: "Dec 15, 2024",
    author: "Michael Johnson",
    readingTime: "8 min read",
    content: "<p>Your article HTML/JSX content could go here</p>", // placeholder if needed
  }
  
  export const mockAuthor = {
    initials: "MJ",
    name: "Michael Johnson",
    bio: "Frontend developer specializing in React and accessibility. Passionate about creating inclusive web experiences and teaching others to do the same.",
  }
  
  export const mockRelatedArticles = [
    {
      category: "React",
      title: "Optimizing React Performance",
      excerpt:
        "Deep dive into React performance optimization techniques including memoization, code splitting, and bundle analysis.",
      date: "Dec 8, 2024",
      readTime: "12 min read",
    },
    {
      category: "CSS",
      title: "CSS Custom Properties in Practice",
      excerpt:
        "Master CSS custom properties (variables) to create maintainable stylesheets and dynamic theming systems.",
      date: "Dec 5, 2024",
      readTime: "7 min read",
    },
  ]
  
  export const mockComments = [
    {
      initials: "TS",
      author: "Taylor Smith",
      date: "3 days ago",
      text: `Great article! I've been struggling with making my dropdowns accessible. The example code is really helpful. Do you have any recommendations for handling focus when a modal opens?`,
    },
    {
      initials: "RJ",
      author: "Robin Jones",
      date: "5 days ago",
      text: `I appreciate the emphasis on semantic HTML. Too often we reach for divs and spans when there are better elements available. Would love to see a follow-up article on accessible forms!`,
    },
  ]
  
  export const mockHandlers = {
    onFollow: () => console.log("Follow clicked"),
    onViewAll: () => console.log("View all clicked"),
    onCommentSubmit: (comment: string) => {
      console.log("User submitted:", comment)
    },
  }
  