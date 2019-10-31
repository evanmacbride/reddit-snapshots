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
            background-color: #d2dae2;
            border-bottom: 4.5px solid #34e7e4;
            border-top: 4.5px solid #34e7e4;
            color: #1e272e;
            display: block;
            font-weight: 600;
            margin-bottom: 1.25rem;
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
