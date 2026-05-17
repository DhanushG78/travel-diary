import ContentstackLivePreview from "@contentstack/live-preview-utils";

export const initializeLivePreview = (apiKey: string, environment: string) => {
  if (typeof window !== "undefined") {
    ContentstackLivePreview.init({
      enable: true,
      stackDetails: {
        apiKey,
        environment,
      },
      clientUrlParams: {
        host: "rest-preview.contentstack.com",
      },
      ssr: false,
    });
  }
};
