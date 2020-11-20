const fs = require('fs')
const path = require('path')
const copyFolder = require('ncp')
const remove = require('rimraf')
const frontmatter = require('front-matter')
const markdown  = require('marked')

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

function moveFontFolder() {
  let mediaPath = path.resolve('./et-book')
  let buildPath = path.resolve('./build/et-book')
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

function createPage(contentPath, pagePath) {
  let resolvedContentPath = path.resolve(contentPath)
  let resolvedPagePath = path.resolve('./build', pagePath)

  let homePageData = parseMarkdown(resolvedContentPath)
  let html = renderPageLayout(homePageData)

  fs.mkdirSync(resolvedPagePath, { recursive: true })
  fs.writeFileSync(`${resolvedPagePath}/index.html`, html)
}

function createIndex(contentPath, pagePath, posts, thumbnailSize) {
  let resolvedContentPath = path.resolve(contentPath)
  let resolvedPagePath = path.resolve('./build', pagePath)

  let pageData = parseMarkdown(resolvedContentPath)
  let html = renderIndexLayout(pageData, posts, thumbnailSize)

  fs.mkdirSync(resolvedPagePath, { recursive: true })
  fs.writeFileSync(`${resolvedPagePath}/index.html`, html)
}

function parseMarkdown(filePath) {
  let resolvedPath = path.resolve(filePath)
  let file = fs.readFileSync(resolvedPath, 'utf-8')
  let data = frontmatter(file)
  let outPath = filePath.split('/')
  outPath = outPath[outPath.length-1]
  outPath = outPath.split('.')[0] // Code above can be reused
  return {
    path: outPath,
    title: data.attributes.title,
    description: data.attributes.description,
    author: data.attributes.author,
    date: data.attributes.date,
    thumbnail: data.attributes.thumbnail,
    type: data.attributes.type,
    tags: data.attributes.tags,
    html: markdown(data.body)
  }
}

function renderHead(data) {
  return `
    <head>
      <title>${data.title}</title>
      <link rel="stylesheet" href="/layout.css">
      <script type="text/javascript" src="/script.js"></script>
    </head>
  `
}

function renderMenu() {
  return `
    <div class="menu">
      <p>
        <a href="/">Home</a>
        <a href="/notes">Notes</a>
        <a href="/projects">Projects</a>
        <a href="/bookshelf">Bookshelf</a>
        <a href="/about">About</a>
      </p>
    </div>
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

function renderThumbnails(posts, size) { // size can be "small, medium and large"
  return `
    <div class="list">
      ${posts.map(function(post) {
        let tags = ''
        if (post.tags != undefined) {
          tags = post.tags.map(function(t) {
            return `tag-${t}`
          }).join(' ')
        }
        if(size == "small")
        {
          return `
          <div class="smallThumbnail ${tags}">
            <p><a href="/${post.path}"><img src="${post.thumbnail}" alt="${post.title} cover image" /></a></p>
            <h4><a href="/${post.path}">${post.title}</a></h4>
            <p>${post.author}</p>
          </div>`
        }
        else if(size == "large")
        {
          return `
          <section>
            <div class="largeThumbnail ${tags}">
              <a href="/${post.path}"><img src="${post.thumbnail}" alt="${post.title} cover image" /></a>
              <h4><a href="/${post.path}">${post.title}</a></h4>
              <p>${post.description}</p>
            </div>
          </section>`

        }
        
      }).join('')}
    </div>
    
  `
}

function renderIndexLayout(pageData, posts, thumbnailSize) {
  let tags = []
  for (let i = 0; i < posts.length; i++) {
    let post = posts[i]
    if (post.tags != undefined) {
      for (let j = 0; j < post.tags.length; j++) {
        let tag = post.tags[j]
        if (tags.indexOf(tag) == -1) {
          tags.push(tag)
        }
      }
    }
  }

  
  function renderTagButtons(tags) {
    return `
      ${tags.map(function(tag) {
        return `
          <button class="tag-button" data-tag="${tag}">${tag}</button>
        `
      }).join('')}
    `
  }

  return `
    <html>
      ${renderHead(pageData)}
      <body>
        ${renderMenu()}
        ${pageData.html}
        ${renderTagButtons(tags)}
        ${renderThumbnails(posts, thumbnailSize)}
      </body>
    </html>
  `
}

cleanBuildFolder()
.then(moveMediaFolder)
.then(moveSourceFolder)
.then(moveFontFolder)
.then(function() {
  // Create single pages
  createPage('./content/pages/home.md', '')
  createPage('./content/pages/about.md', './about') 
  
  let allPosts = getAllPosts()
  allPosts.forEach(function(data) {
    createPage(`./content/posts/${data.fileName}`, `${data.path}`)
  })

  // Create an index page for projects
  let projectPosts = allPosts.filter(function(post) {
    return post.type === 'project'
  })
  createIndex('./content/pages/projects.md','projects', projectPosts, "large")

  // Create an index page for public notes
  let notePosts = allPosts.filter(function(post) {
    return post.type === 'note'
  })
  createIndex('./content/pages/notes.md','notes', notePosts, "small")

  // Create an index page for books
  let bookPosts = allPosts.filter(function(post) {
    return post.type === 'book'
  })
  createIndex('./content/pages/bookshelf.md','bookshelf', bookPosts, "small")

})
.catch(function(error) {
  console.log(error)
})
