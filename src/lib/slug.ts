export function createSlug(id: string, title: string): string {
    return (
      id +
      "-" +
      title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // remove non-word characters
        .replace(/\s+/g, "-")     // replace spaces with hyphens
        .replace(/--+/g, "-")     // remove duplicate hyphens
    );
  }
  