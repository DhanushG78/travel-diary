import Contentstack from "contentstack";

const Stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY as string,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.CONTENTSTACK_ENVIRONMENT || "development",
});

async function run() {
  const Query = Stack.ContentType("travel_story").Query();
  const res = await Query.toJSON().find();
  const story = res[0][0];
  console.log(JSON.stringify(story.content_sections, null, 2));
}

run();
