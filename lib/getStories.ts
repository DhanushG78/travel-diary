export const getStories = async () => {
  const res = await fetch("/api/stories");

  if (!res.ok) {
    throw new Error("Failed to fetch travel stories");
  }

  return res.json();
};
