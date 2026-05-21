const CACHE = "amma-v2";
const FILES = ["/amma-recovery/", "/amma-recovery/index.html", "/amma-recovery/style.css", "/amma-recovery/app.js", "/amma-recovery/manifest.json"];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))));
self.addEventListener("fetch", e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
