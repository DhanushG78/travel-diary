import Stack from "../contentstack";

export const getStories = async () => {
  const Query = Stack.ContentType("travel_story").Query();

  Query.includeReference(["destination", "author", "traveler"]);

  const result = await Query.toJSON().find();

  return result[0] || [];
};

export const getStory = async (slug: string) => {
  const Query = Stack.ContentType("travel_story").Query();

  Query.where("slug", slug);
  Query.includeReference(["destination", "author", "traveler"]);

  const result = await Query.toJSON().find();

  return result[0]?.[0] ?? null;
};

export const getTraveler = async (uid: string) => {
  const Query = Stack.ContentType("traveler").Query();
  Query.where("uid", uid);
  const result = await Query.toJSON().find();
  return result[0]?.[0] ?? null;
};

export const getStoriesByTraveler = async (uid: string) => {
  const Query = Stack.ContentType("travel_story").Query();
  Query.includeReference(["destination", "traveler"]);
  const result = await Query.toJSON().find();
  return (result[0] || []).filter((s: any) => 
    s.traveler?.some((t: any) => t.uid === uid)
  );
};
