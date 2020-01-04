const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: `pages/posts`})
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })
}

// Create blog post list pages
/*
const linksPerPage = 20;
const numPages = Math.ceil(posts.length / linksPerPage);

Array.from({ length: numPages }).forEach((_, i) => {
  createPage({
    path: i === 0 ? `/archive` : `/archive/${i + 1}`,
    component: path.resolve('./src/templates/archive-template.js'),
    context: {
      limit: linksPerPage,
      skip: i * linksPerPage,
      numPages,
      currentPage: i + 1
    }
  });
});*/
