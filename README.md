# Reddit Snapshots

A semi-curated, automatically updated archive of top Reddit posts.

## How does it work?

A set of bash scripts call a Python program ("bot.py") that queries the Reddit API and generates a markdown file containing information (urls, authors, subreddits, etc.) on new top Reddit posts. That file is then committed to a GitHub repo for a GatsbyJS-based website which is then deployed to Netlify.

The website is heavily based on the [Gatsby Hello World Starter](https://github.com/gatsbyjs/gatsby-starter-hello-world), but I've made (and will continue to make) numerous changes to the starter template.
