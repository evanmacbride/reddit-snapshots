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
            Snapshot Archive
          </h1>
        </header>
        {data.allMarkdownRemark.edges.slice(1).map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={css`
                text-decoration: none;
            `}>
              <p
                css={css`
                  margin-bottom: ${rhythm(1)};
                `}
              >
                {node.frontmatter.title}
              </p>
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
