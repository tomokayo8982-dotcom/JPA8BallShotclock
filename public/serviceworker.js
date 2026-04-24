self.addEventListener("install", () => {
  console.log("Service Worker installed");
});

self.addEventListener("fetch", () => {});

self.addEventListener("fetch", (event) => {
  // 何もしなくても fetch ハンドラが存在するだけで OK
});
