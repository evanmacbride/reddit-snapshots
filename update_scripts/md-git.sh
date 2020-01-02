#!/bin/bash

# Add all new markdown files, commit, and push to GitHub.
# Username and password are stored as environment variables.
cd $PATH_TO_PROJECT_DIR
git add src/pages/posts/*.md
git commit -am "add new md files"
git push https://$YOUR_GITHUB_USERNAME:$YOUR_GITHUB_PASSWORD@github.com/$YOUR_GITHUB_USERNAME/reddit-digest.git master
