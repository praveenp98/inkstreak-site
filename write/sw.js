// Offline support. Bump VERSION whenever index.html changes.
const VERSION = "inkstreak-web-2026-11-05-3";
const FILES = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  const url = new URL(r.url);
  if (url.origin === location.origin) {
    // Network first for the page so updates show up; cache as fallback offline.
    e.respondWith(fetch(r).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(r, copy)); return res; }).catch(() => caches.match(r).then(m => m || caches.match("index.html"))));
  } else if (url.host.endsWith("fonts.googleapis.com") || url.host.endsWith("fonts.gstatic.com")) {
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(r, copy)); return res; })));
  }
});
