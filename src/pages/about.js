import React from "react"
import { graphql } from "gatsby";
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <article>
      <h1>About {data.site.siteMetadata.title}</h1>

      <h3>A semi-curated, automatically updated archive of top Reddit posts</h3>

      <h2>What is the site's purpose?</h2>
      <div className="articleText">
        <p>
          Reddit has some good content, but it's often buried under reposts, tired jokes,
          and other not-good content. I wanted to make something that would only present
          the best, most meaningful content from each section of Reddit that I was
          interested in, while filtering out as much garbage as possible.
        </p>
        <p>
          I also wanted to experiment with converting Reddit's semi-linear stream of links
          into a layout that's somewhat reminiscent of a traditional news website. So each
          snapshot's links are organized into sections (currently Sci/Tech, Developer, and
          "Etcetera") instead of appearing in whatever order Reddit's opaque algorithm
          sorts them in.
        </p>
        <h2>How are links filtered?</h2>
        <p>
        Each snapshot starts with the top posts from the past 24 hours for a list of
        subreddits. bot.py then removes
        </p>
        <p>
          <ul>
            <li>any link that's ever been featured in a previous snapshot (effectively banning reposts)</li>
            <li>multiple links posted by the same author (an author will only have at most one
              link in each snapshot)</li>
            <li>content flagged as NSFW or containing spoilers</li>
            <li>posts with titles containing banned words (I'm experimenting with an evolving list)</li>
            <li>"stickied" posts (which are usually special moderator announcements that don't
              make for very interesting reading)</li>
          </ul>
        </p>
        <p>
          bot.py also tries to make sure no single subreddit will dominate a section of a
          snapshot. Once a link from a given subreddit makes it into a snapshot, it's
          harder for another link from that same subreddit to be included. This feature is
          accomplished using Python's heapq data structure.
        </p>
        <h2>Using heapq</h2>
        <p>
          Each link has an invisible score that determines how it's sorted in the heap.
          When bot.py detects a link from a subreddit that's already been featured, the
          invisible score for that link is reduced by a constant, and the link is pushed
          back onto the heap. If the link makes it to the top of the heap again (before
          all the limited spots in the snapshot are filled), bot.py will detect that the
          link's score has already been reduced (by checking a Boolean), and the link will
          finally be added to the snapshot.
        </p>
        <h2>How is the site updated?</h2>
        <p>
          A set of bash scripts call a Python program ("bot.py") that queries the Reddit
          API and generates a Markdown file containing information (urls, authors,
          subreddits, etc.) on new top Reddit posts. These scripts create two of these
          "snapshots" each day. After its creation, the Markdown file is then committed to
          a GitHub repo for a GatsbyJS-based website which is then deployed to Netlify.
        </p>
        <p>
          The website is heavily based on the <a href="https://github.com/gatsbyjs/gatsby-starter-hello-world">
          Gatsby Hello World Starter</a>,
          but I've made (and will continue to make) numerous changes to the starter template.
        </p>
        <h2>How is the site "semi-curated"?</h2>
        <p>
          I choose the section themes, the subreddits that go into each section, and the
          special filtering conditions that fill each section with links. The specific
          links that are featured are determined by an automated process. I do not
          approve each link individually. I am actively updating the site's filters to get
          the best content possible.
        </p>
        <h2>Disclaimer</h2>
        <p>
          Reddit Snapshots is in no way affiliated with Reddit, Inc. or any parent or
          subsidiary companies. Some material appearing on Reddit Snapshots may be
          protected under copyright. Any such material is presented under the doctrine of
          Fair Use. The underlying design and software of Reddit Snapshots is released
          under the MIT License.
        </p>
      </div>
    </article>
  </Layout>
)
export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
