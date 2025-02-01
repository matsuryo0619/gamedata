const sprictTag = document.querySelector('script[src="fileload.js"]');
const cssFiles = JSON.parse(scriptTag.dataset.cssFiles || "[]");
const jsFiles = JSON.parse(scriptTag.dataset.jsFiles || "[]");

//CSS読み込み
cssFiles.forEach(file => {
  const link = document.createElement('link');
  link.rel = "stylesheet";
  link.href = file;
  document.head.appendChild(link);
});

//JS読み込み
jsFiles.forEach(file => {
  const script = document.createElement('script');
  script.src = file.src;
  if (file.defer) script.defer = "true";
  document.body.appendChild(script);
});
