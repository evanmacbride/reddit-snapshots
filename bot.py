import requests
import requests.auth
import os
from datetime import datetime

MULTI_POST_LIMIT = 10

# Get secrets from environment variables
username = os.environ['YOUR_REDDIT_USERNAME']
password = os.environ['YOUR_REDDIT_PASSWORD']
clientID = os.environ['YOUR_CLIENT_ID']
clientSecret = os.environ['YOUR_CLIENT_SECRET']
postPath = os.environ['PATH_TO_PROJECT_DIR'] + "/src/pages/posts/"

# First, get the access token
agent = "Trend Finder by u/evnbd"
client_auth = requests.auth.HTTPBasicAuth(clientID, clientSecret)
post_data = {"grant_type": "password", "username": username, "password": password}
headers = {"User-Agent": agent}
response = requests.post("https://www.reddit.com/api/v1/access_token", auth=client_auth, data=post_data, headers=headers)
access = response.json()['access_token']

# Now, query the API
headers = {"Authorization": "bearer " + access, "User-Agent": agent}

techSubs = [
    "technology","tech","raspberry_pi","hardware","hacking","3dprinting",
    "functionalprint","gadgets","netsec","buildapc","privacy","linux"
]

techMulti = "r/"

for sub in techSubs:
    techMulti += sub + "+"

techMulti = techMulti[:-1]
multiHot = techMulti + "/hot"

d = datetime.utcnow()
now = d.strftime("%Y-%m-%dT%H:%M:%S")
titleTime = d.strftime("%b %-d, %Y at %l:%M%p")
#absPath = "/home/chrx/Projects/reddit-bot/"
#mdFilename = absPath + now + "-post.md"
mdFilename = postPath + now + "-post.md"

postCount = 1
seenLinks = []
seenAuthors = []

# TODO: Keep trying if no response status is not 200
response = requests.get("https://oauth.reddit.com/" + multiHot, headers=headers)
with open(mdFilename,'w',encoding='utf-8') as f:
    f.write("---\ntitle: 'Hot Posts for " + titleTime + "'\ndate: '" + now + "'\n---\n")
    for post in response.json()['data']['children']:
        if not (post['data']['stickied'] or post['data']['over_18'] or post['data']['spoiler']) and (
            post['data']['url'] not in seenLinks and post['data']['author'] not in seenAuthors):
            postTitle = post['data']['title']
            postUrl = post['data']['url']
            seenLinks.append(post['data']['url'])
            formattedThumbnail = ""
            postThumbnail = ""
            if post['data']['thumbnail'] not in ["","default","self","image"]:
                postThumbnail = post['data']['thumbnail']
                formattedThumbnail = "[![alt text](" + postThumbnail + " 'Thumbnail image for link')](" + postUrl + ")"

            formattedLink = "<div>\n" + "[" + postTitle + "]" + "(" + postUrl + ")\n</div>\n"

            postAuthor = post['data']['author']
            seenAuthors.append(post['data']['author'])
            postComments = str(post['data']['num_comments'])
            postPermalink = post['data']['permalink']
            postCreated = post['data']['created_utc']
            postSubreddit = post['data']['subreddit']
            postScore = str(post['data']['score'])

            formattedInfo = ("<div>\nposted by " + "[" + postAuthor + "](" + "https://www.reddit.com/user/" +
                postAuthor + ") in [" + postSubreddit + "](https://www.reddit.com/r/" +
                postSubreddit + "). " + postScore + " points. " + postComments +
                " [comments](https://www.reddit.com" + postPermalink + ").\n</div>\n")

            thumbnailHTML = ""
            if postThumbnail:
                thumbnailHTML = (
                    "<a href='" + postUrl + "'><img src='" + postThumbnail + "' alt='thumbnail for link to post'></a>"
                    )
            linkHTML = "<a href='" + postUrl + "'>" + postTitle + "</a> (" + postUrl.split('/')[2].replace('www.','') + ")"
            infoHTML = (
                "<p>" +
                    "posted by " + "<a href='https://www.reddit.com/user/" + postAuthor + "'>" + postAuthor + "</a> " +
                    "in " + "<a href='https://www.reddit.com/r/" + postSubreddit + "'>" + postSubreddit + "</a>. " +
                    postScore + " points. " + postComments + " <a href='https://www.reddit.com" + postPermalink +"'>comments</a>." +
                "</p>"
                )
            linkInfoWrapHTML = (
                "<div>" +
                    linkHTML + infoHTML +
                "</div>"
            )
            postHTML = (
                "<article>" +
                    thumbnailHTML + linkInfoWrapHTML +
                "</article>"
            )
            f.write(postHTML + "\n\n")
            postCount += 1
            if postCount > MULTI_POST_LIMIT:
                break

f.close()
