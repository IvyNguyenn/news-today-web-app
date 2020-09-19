/* eslint-disable no-console */

import { register } from "register-service-worker";
// import { API_URL } from "./const/index";
if (process.env.NODE_ENV === "production") {
  let data_api = "data_api";
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
      // clear cache
      caches.keys().then(function(cacheNames) {
        if(cacheNames.length > 0){
          cacheNames.forEach(function(cacheName) {
            caches.delete(cacheName);
          });
        }
      });
    },
    cached(registration) {
      console.log("Content has been cached for offline use.");
      registration.addEventListener("fetch", function(event) {
        event.respondWith(
          caches.open(data_api).then(function(cache) {
            return fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          })
        );
      });
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated(registration) {
      console.log("New content is available; please refresh.");
      let worker = registration.waiting;
      worker.postMessage({ action: "skipWaiting" });
    },
    offline(registration) {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
      registration.addEventListener("fetch", function(event) {
        event.respondWith(
          fetch(event.request).catch(function() {
            return caches.match(event.request);
          })
        );
      });
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}
