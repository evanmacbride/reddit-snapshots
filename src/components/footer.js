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

        `}
      >
        <nav
          css={css`
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            margin: 0 auto;
            max-width: 610px;
        `}>
          <Link to={`/`}>
          <h3
            css={css`

              margin: 0 auto;
              padding: 0 5px 0 5px;
            `}>
            {data.site.siteMetadata.title}
          </h3>
          </Link>
          <span
            css={css`
              display: flex;
              flex-flow: row wrap;
            `}
          >
            <Link to={`/archive`}
              css={css`
                  margin-right: 0.58em;
              `}
            >
              <h3
                css={css`
                  color: #d2dae2e4;
                  margin-bottom: 0;
                `}
              >
                Archive
              </h3>
            </Link>
              <Link to={`/about`}>
                <h3
                  css={css`
                    color: #d2dae2e4;
                    margin-bottom: 0;
                  `}
                >
                  About
                </h3>
              </Link>
          </span>
        </nav>
      </section>
    </footer>
      {children}
    </div>
    )
}
