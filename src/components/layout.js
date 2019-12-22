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
        margin: 0 auto;
        max-width: 610px;
        padding-top: ${rhythm(0.5)};

      `}
    >
      <nav
        css={css`
          background-color: #000000bd;
          display: block;
          margin-bottom: 2.5rem;
          padding: 8px 5px;
        `}
      >
        <Link to={`/`}>
          <h3
            css={css`
              color: #00d8d6;
              margin-bottom: 0;
            `}
          >
            {data.site.siteMetadata.title}
          </h3>
        </Link>
      </nav>
      {children}
    </div>
    )
}
