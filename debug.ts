import Contentstack from "contentstack";

const Stack = Contentstack.Stack({
  api_key: process.env.CONTENTSTACK_API_KEY as string,
  delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.CONTENTSTACK_ENVIRONMENT || "development",
});

async function run() {
  try {
    const Query = Stack.ContentType("traveler").Query();
    const res = await Query.toJSON().find();
    if (res && res[0] && res[0].length > 0) {
      console.log(JSON.stringify(res[0][0], null, 2));
    } else {
      console.log("No travelers found");
    }
  } catch (e) {
    console.error(e);
  }
}

run();
