const http = require("http")
const fs = require("fs")
const path = require("path")

const port = 3000

const server = http.createServer((req, res) => {

  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url)

  let extName = path.extname(filePath)

  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png"
  }

  const contentType = mimeTypes[extName] || "text/plain"

  fs.readFile(filePath, (err, content) => {

    if (err) {
      res.writeHead(404)
      res.end("404 File Not Found")
    } else {
      res.writeHead(200, { "Content-Type": contentType })
      res.end(content)
    }

  })

})

server.listen(port, () => {
  console.log(`Server running at ${port}`)
})