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
      <Link to={`/`}>
        <h3
          css={css`
            color: #00d8d6;
            display: block;
            margin-bottom: 2.5rem;
            padding: 6px 5px;
          `}
        >
          {data.site.siteMetadata.title}
        </h3>
      </Link>
      {children}
    </div>
    )
}
