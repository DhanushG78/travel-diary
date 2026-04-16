import Contentstack from "contentstack";

const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT || "development";

if (!apiKey || !deliveryToken) {
  throw new Error(
    "Missing Contentstack environment variables. Set CONTENTSTACK_API_KEY and CONTENTSTACK_DELIVERY_TOKEN."
  );
}

const Stack = Contentstack.Stack({
  api_key: apiKey,
  delivery_token: deliveryToken,
  environment,
});

export default Stack;
