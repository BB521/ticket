const fs = require("fs");
const path = require("path");

const articleDir = path.join(__dirname, "articles");
const outputFile = path.join(__dirname, "index.html");

const files = fs.readdirSync(articleDir).filter((f) => f.endsWith(".html"));

const links = files
  .map((f) => {
    const name = path.basename(f, ".html");
    return `<a href="articles/${f}" target="viewer">${name}</a>`;
  })
  .join("\n        ");

const template = `
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>文档索引</title>
  <style>
    body { margin: 0; display: flex; height: 100vh; font-family: sans-serif; }
    nav {
      width: 240px;
      padding: 20px;
      background: #f4f4f4;
      border-right: 1px solid #ddd;
      overflow-y: auto;
    }
    main { flex: 1; }
    h2 { margin-bottom: 10px; font-size: 18px; }
    a {
      display: block;
      margin: 8px 0;
      color: #007acc;
      text-decoration: none;
    }
    a:hover { color: #005599; }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  </style>
</head>
<body>
  <nav>
    <h2>📘 文档列表</h2>
    <div id="file-list">
        ${links}
    </div>
  </nav>
  <main>
    <iframe id="viewer" name="viewer" src="articles/${files[0] || ""}"></iframe>
  </main>
</body>
</html>
`;

fs.writeFileSync(outputFile, template);
console.log("✅ index.html 已生成");
