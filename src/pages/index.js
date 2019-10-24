import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => {
  //console.log(data.allMarkdownRemark.edges[0])
  return (
    <Layout>
      <div
        css={css`
          margin: auto;
          max-width: 610px;
        `}>
        <header
          css={css`
            padding-left: 5px;
          `}
        >
          <h1
            css={css`
              display: inline-block;
              margin-bottom: ${rhythm(0.618)};
            `}
          >
            The Latest
          </h1>
            <h3
              css={css`
                color: #d2dae2a8;
                margin-bottom: ${rhythm(0.382)};
              `}
            >{data.allMarkdownRemark.edges[0].node.frontmatter.title}</h3>
          </header>
          <section>
            <div
              css={css`
                border-top: 2px solid #00d8d6;
                margin-bottom: ${rhythm(2)};
              `}
              dangerouslySetInnerHTML={{ __html: data.allMarkdownRemark.edges[0].node.html }} />
          </section>
        <h1>{data.allMarkdownRemark.totalCount - 1} Older Posts</h1>
        {data.allMarkdownRemark.edges.slice(1).map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
            `}>
              <p
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}
              >
                {node.frontmatter.title}
              </p>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
}
export const query = graphql`
  query {
    allMarkdownRemark (sort: {
      fields: [frontmatter___date],
      order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
          excerpt
          html
        }
      }
    }
  }
`
