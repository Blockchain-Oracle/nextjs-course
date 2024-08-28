import { unstable_noStore, unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";
import { cache } from "react";

import Messages from "@/components/messages";

// NextJS Aggressive Caching Strategies:
// 1. Request Memoization: NextJS stores data requests with the same configuration.
//    This avoids unnecessary duplicate data fetches. The cache only persists during the request duration.
//    In this file: We use React's cache for memoization (reactCachedFetchMessages).

// 2. Data Cache: NextJS stores & reuses fetched data until it's revalidated.
//    This avoids unnecessary requests to the data source & speeds up the application.
//    The cache persists until it's revalidated (manually or after a set time).
//    In this file: We use unstable_cache for data caching (cachedFetchMessages).

// 3. Full Route Cache: NextJS stores the rendered HTML & RSC at build time.
//    This avoids unnecessary HTML render cycles & data fetches.
//    The cache persists until the related data cache is revalidated.
//    In this file: We use dynamic rendering, so this strategy isn't applied here.

// 4. Router Cache: NextJS stores the RSC payload in memory in the browser.
//    This ensures extremely fast page transitions since no server request is needed.
//    In this file: This is handled automatically by NextJS for client-side navigation.

// The `revalidate` export is used to specify the revalidation time for the page.
// It determines how often the page should be revalidated in seconds.
// For example, setting `revalidate` to 5 means the page will be revalidated every 5 seconds.
export const revalidate = 5;

// The `dynamic` export is used to force the page to be dynamically rendered on each request.
// Setting `dynamic` to 'force-dynamic' ensures that the page is not statically generated and is always rendered on the server.
export const dynamic = "force-dynamic";

// Define a cache tag for messages
const MESSAGES_CACHE_TAG = "messages";

// Create a cached version of the fetch function using unstable_cache
// This function will cache the result and revalidate it every 60 seconds
const cachedFetchMessages = unstable_cache(
  async () => {
    // Fetch messages from the server
    const response = await fetch("http://localhost:8080/messages");
    // Parse the response as JSON
    return response.json();
  },
  ["messages-cache-key"], // Cache key to identify this cache
  {
    tags: [MESSAGES_CACHE_TAG], // Tags for manual revalidation
    revalidate: 60, // Revalidate every 60 seconds
  }
);

// Create another cached version of the fetch function using React's cache
// This function will memoize the result indefinitely until manually invalidated
const reactCachedFetchMessages = cache(async () => {
  // Fetch messages from the server
  const response = await fetch("http://localhost:8080/messages");
  // Parse the response as JSON
  return response.json();
});

export default async function MessagesPage() {
  // The `unstable_noStore` function is used to disable caching for the current request.
  // When called, it ensures that the response is not stored in any cache.
  // This can be useful for pages that should always fetch fresh data.
  unstable_noStore();

  // Use the cached fetch function from unstable_cache
  const messagesFromUnstableCache = await cachedFetchMessages();

  // Use the cached fetch function from React's cache
  const messagesFromReactCache = await reactCachedFetchMessages();

  // For demonstration, we'll use the messages from unstable_cache
  const messages = messagesFromUnstableCache;

  // If no messages are found, display a message
  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  // Render the Messages component with the fetched messages
  return <Messages messages={messages} />;
}

// Function to manually revalidate the cache
export async function revalidateMessages() {
  // This will revalidate the cache for unstable_cache
  revalidateTag(MESSAGES_CACHE_TAG);

  // Note: React's cache doesn't have a built-in revalidation mechanism
  // You would typically re-render the component to get fresh data
}

// Educational notes:
// 1. unstable_cache: Part of Next.js, allows for more granular control over caching,
//    including the ability to set tags and revalidation times.
// 2. React's cache: A simpler caching mechanism that memoizes the result indefinitely.
//    It's useful for values that don't change often or where manual invalidation is preferred.
// 3. unstable_noStore: Ensures the current request is not cached, useful for dynamic content.
// 4. revalidateTag: Allows manual revalidation of caches tagged with a specific key.

// Tags: caching, revalidate, dynamic, unstable_noStore, unstable_cache, revalidateTag, fetch, Messages, React cache
