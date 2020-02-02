import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"
export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <Layout>
      <div
        css={css`
          margin: auto auto ${rhythm(1.618)} auto;
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
            From the archives
          </h1>
          <h3
            css={css`
              color: #d2dae2a8;
              margin-bottom: ${rhythm(0.382)};
            `}
          >
            {post.frontmatter.title}
          </h3>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
