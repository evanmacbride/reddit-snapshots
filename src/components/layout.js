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
        /*max-width: 610px;*/
        padding-top: ${rhythm(0.5)};
      `}
    >
      <Link to={`/`}>
        <h3
          css={css`
            border-bottom: 5px solid #d2dae2;
            border-top: 5px solid #d2dae2;
            display: block;
            font-weight: 600;
            margin-bottom: ${rhythm(1)};
            padding: 5px 8px;
          `}
        >
          {data.site.siteMetadata.title}
        </h3>
      </Link>
      {children}
    </div>
    )
}
