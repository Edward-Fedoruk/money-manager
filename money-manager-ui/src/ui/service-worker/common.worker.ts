import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";

declare let self: ServiceWorkerGlobalScope;

console.log("TESTSETSE");
cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST ?? []);

// Example of logging the service worker states
self.addEventListener("install", () => {
    console.log("Service Worker: Install event");
});
self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activate event");
    event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", (event) => {
    console.log("Service Worker: Fetch event for", event.request.url);
});
