self.addEventListener("install", (event) => {
  console.log("Service Worker installed v3");
  self.skipWaiting(); // ← これが重要
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated v3");
  event.waitUntil(clients.claim()); // ← これも重要
});

self.addEventListener("fetch", (event) => {
  // fetch ハンドラが存在するだけで PWA 条件を満たす
  // ここに console.log を入れると Chrome が確実に更新を検知する
  console.log("Fetch event:", event.request.url);
});
