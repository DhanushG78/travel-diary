import ContentstackLivePreview from "@contentstack/live-preview-utils";

export const initializeLivePreview = () => {
  if (typeof window !== "undefined") {
    ContentstackLivePreview.init({
      enable: true,
      stackDetails: {
        apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
        environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT || "development",
      },
      clientUrlParams: {
        host: "rest-preview.contentstack.com",
      },
      ssr: false,
    });
  }
};
