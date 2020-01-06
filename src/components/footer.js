import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"
import { rhythm } from "../utils/typography"

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div
      css={css`
        background-color: #000000bd;
        border-top: 1px solid #00d8d6;
        padding-bottom: ${rhythm(0.809)};
        padding-top: ${rhythm(0.5)};
      `}
    >
    <footer
      css={css`

      `}
    >
      <section
        css={css`
          margin: 0 auto;
          max-width: 610px;
        `}
      >
        {data.site.siteMetadata.title}
      </section>
    </footer>
      {children}
    </div>
    )
}
