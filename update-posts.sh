#!/bin/bash
echo "pulling from GitHub"
source /etc/environment
cd $PATH_TO_PROJECT_DIR/runbot.sh
git pull https://$YOUR_GITHUB_USERNAME:$YOUR_GITHUB_PASSWORD@github.com/$YOUR_GITHUB_USERNAME/reddit-digest.git
echo "start runbot.sh - create new md file based on Reddit posts"
source $PATH_TO_PROJECT_DIR/runbot.sh
echo "finish runbot.sh"
echo "start md-git.sh - commit and push to GitHub"
source $PATH_TO_PROJECT_DIR/md-git.sh
echo "finish md-git.sh"
