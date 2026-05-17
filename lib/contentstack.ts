import Contentstack from "contentstack";

const apiKey = process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY || process.env.CONTENTSTACK_API_KEY;
const previewToken = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN || process.env.CONTENTSTACK_PREVIEW_TOKEN;
const deliveryToken = process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN || process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || process.env.CONTENTSTACK_ENVIRONMENT || "development";

if (!apiKey) {
  throw new Error("Missing Contentstack API Key.");
}

// Only enable live preview if a distinct preview token is provided (not delivery token)
const isValidPreviewToken = previewToken && previewToken !== deliveryToken && previewToken.trim() !== "";

const Stack = Contentstack.Stack({
  api_key: apiKey as string,
  delivery_token: deliveryToken as string,
  environment: environment as string,
  ...(isValidPreviewToken && {
    live_preview: {
      enable: true,
      host: "rest-preview.contentstack.com",
      preview_token: previewToken as string,
    },
  }),
});

export default Stack;
