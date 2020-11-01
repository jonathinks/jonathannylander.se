const fs = require('fs')
const path = require('path')
const copyFolder = require('ncp')
const remove = require('rimraf')
const frontmatter = require('front-matter')
const markdown  = require('showdown')
const converter = new markdown.Converter()

function moveMediaFolder() {
  let mediaPath = path.resolve('./media')
  let buildPath = path.resolve('./build/media')
  return new Promise(function(resolve, reject) {
    copyFolder(mediaPath, buildPath, function(err) {
      if (err) return reject(err)
      resolve()
    })
  })
}

function moveSourceFolder() {
  let mediaPath = path.resolve('./src')
  let buildPath = path.resolve('./build')
  return new Promise(function(resolve, reject) {
    copyFolder(mediaPath, buildPath, function(err) {
      if (err) return reject(err)
      resolve()
    })
  })
}

function cleanBuildFolder() {
  let buildPath = path.resolve('./build')
  return new Promise(function(resolve, reject) {
    remove(buildPath, function(err) {
      fs.mkdirSync(buildPath, { recursive: true })
      if (err) return reject(err)
      resolve()
    })
  })
}

function getAllPosts() {
  let postFolder = path.resolve('./content/posts')
  let files = fs.readdirSync(postFolder)
  files = files.filter(function(file) {
    return file.indexOf('.md') !== -1
  })
  return files.map(function(fileName) {
    let data = parseMarkdown(`./content/posts/${fileName}`)
    data.fileName = fileName
    return data
  })
}

function getAllBooks() {
  let postFolder = path.resolve('./content/books')
  let files = fs.readdirSync(postFolder)
  files = files.filter(function(file) {
    return file.indexOf('.md') !== -1
  })
  return files.map(function(fileName) {
    let data = parseMarkdown(`./content/books/${fileName}`)
    data.fileName = fileName
    return data
  })
}

function createPage(contentPath, pagePath) {
  let resolvedContentPath = path.resolve(contentPath)
  let resolvedPagePath = path.resolve('./build', pagePath)

  let homePageData = parseMarkdown(resolvedContentPath)
  let html = renderPageLayout(homePageData)

  fs.mkdirSync(resolvedPagePath, { recursive: true })
  fs.writeFileSync(`${resolvedPagePath}/index.html`, html)
}

function createIndex(contentPath, pagePath, posts) {
  let resolvedContentPath = path.resolve(contentPath)
  let resolvedPagePath = path.resolve('./build', pagePath)

  let pageData = parseMarkdown(resolvedContentPath)
  let html = renderIndexLayout(pageData, posts)

  fs.mkdirSync(resolvedPagePath, { recursive: true })
  fs.writeFileSync(`${resolvedPagePath}/index.html`, html)
}

function parseMarkdown(filePath) {
  let resolvedPath = path.resolve(filePath)
  let file = fs.readFileSync(resolvedPath, 'utf-8')
  let data = frontmatter(file)
  let outPath = filePath.split('/')
  outPath = outPath[outPath.length-1]
  outPath = outPath.split('.')[0]
  return {
    path: outPath,
    title: data.attributes.title,
    description: data.attributes.description,
    thumbnail: data.attributes.thumbnail,
    type: data.attributes.type,
    html: converter.makeHtml(data.body)
  }
}

function renderHead(data) {
  return `
    <head>
      <title>${data.title}</title>
      <link rel="stylesheet" href="/layout.css">
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
  `
}

function renderMenu() {
  return `
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/projects">Projects</a></li>
      <li><a href="/garden">Digital Garden</a></li>
      <li><a href="/bookshelf">Bookshelf</a></li>
    </ul>
  `
}

function renderPageLayout(data) {
  return `
    <html>
      ${renderHead(data)}
      <body>
        ${renderMenu()}
        ${data.html}
      </body>
    </html>
  `
}

function renderIndexLayout(pageData, posts) {
  function renderThumbnails(posts) {
    return `
      <div class="list">
        ${posts.map(function(post) {
          return `
            <div class="thumbnail">
              <h3><a href="/${post.path}">${post.title}</a></h3>
              <p><img src="${post.thumbnail}" alt="${post.title}" /></p>
            </div>
          `
        }).join('')}
      </div>
    `
  }
  return `
    <html>
      ${renderHead(pageData)}
      <body>
        ${renderMenu()}
        ${pageData.html}
        ${renderThumbnails(posts)}
      </body>
    </html>
  `
}

cleanBuildFolder()
.then(moveMediaFolder)
.then(moveSourceFolder)
.then(function() {
  // Create single pages
  createPage('./content/pages/home.md', '')
  // Get all file names inside
  let allPosts = getAllPosts()
  allPosts.forEach(function(data) {
    // generate a folder name from file name
    createPage(`./content/posts/${data.fileName}`, `${data.path}`)
  })

  let allBooks = getAllBooks()
  allBooks.forEach(function(data) {
    // generate a folder name from file name
    createPage(`./content/books/${data.fileName}`, `${data.path}`)
  })

  // Create an index page for projects
  let projectPosts = allPosts.filter(function(post) {
    return post.type === 'project'
  })
  createIndex('./content/pages/projects.md','projects', projectPosts)

  // Create an index page for garden notes
  let blogPosts = allPosts.filter(function(post) {
    return post.type === 'blog'
  })
  createIndex('./content/pages/garden.md','garden', blogPosts)

  // Create an index page for books
  let bookPosts = allPosts.filter(function(post) {
    return post.type === 'book'
  })
  createIndex('./content/pages/bookshelf.md','bookshelf', bookPosts)

})
.catch(function(error) {
  console.log(error)
})
