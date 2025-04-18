// generate-index.js
const fs = require("fs");
const path = require("path");

const articlesDir = path.join(__dirname, "articles");
const outputPath = path.join(__dirname, "index.html");

function generateIndex() {
  const files = fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".html"))
    .sort();

  const links = files
    .map((file) => {
      const name = path.basename(file, ".html");
      return `<li><a href="articles/${file}">${name}</a></li>`;
    })
    .join("\n");

  const html = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>文章目录</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    h1 { color: #333; }
    ul { line-height: 2; }
  </style>
</head>
<body>
  <h1>📚 文章目录</h1>
  <ul>
    ${links}
  </ul>
  <p style="font-size: 0.9em; color: gray;">自动生成于：${new Date().toLocaleString()}</p>
</body>
</html>
`;

  fs.writeFileSync("./dist/index.html", html); // ✅ 替换原来的输出路径
  console.log("✅ index.html 生成成功");
}

generateIndex();
