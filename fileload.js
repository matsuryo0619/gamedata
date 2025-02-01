const scriptTag = document.querySelector('script[src="fileload.js"]');

if (scriptTag) {
  const cssFiles = JSON.parse(scriptTag.dataset.cssFiles || "[]");
  const jsFiles = JSON.parse(scriptTag.dataset.jsFiles || "[]");

  loadCSSFiles(cssFiles);
  loadJSFiles(jsFiles);
} else {
  console.warn("fileload.js の <script> タグが見つかりません。");
}

// CSS を読み込む関数
function loadCSSFiles(files) {
  files.forEach(file => {
    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = file;  // 変更: 直接ファイル名を使用
    document.head.appendChild(link);
  });
}

// JS を読み込む関数
function loadJSFiles(files) {
  files.forEach(file => {
    const script = document.createElement('script');
    script.src = file.src;  // file.src を正しく使用
    if (file.defer) script.defer = true;
    document.body.appendChild(script);
  });
}

// 必須ファイル
const css_requiredFiles = ["main.css"];
const js_requiredFiles = [
  { src: "main.js", defer: true }
];

// 必須ファイルも読み込む
loadCSSFiles(css_requiredFiles);
loadJSFiles(js_requiredFiles);
