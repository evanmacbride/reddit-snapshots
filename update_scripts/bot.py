import requests
import requests.auth
import os
import json
from datetime import datetime
import heapq as hq
from post import Post

# The maximum number of posts for each section of a snapshot
SCI_TECH_LIMIT = 8
DEV_LIMIT = 4
FUN_LIMIT = 4

# Get secrets from environment variables
username = os.environ['YOUR_REDDIT_USERNAME']
password = os.environ['YOUR_REDDIT_PASSWORD']
clientID = os.environ['YOUR_CLIENT_ID']
clientSecret = os.environ['YOUR_CLIENT_SECRET']
postPath = os.environ['PATH_TO_PROJECT_DIR'] + "/src/pages/posts/"
jsonPath = os.environ['PATH_TO_PROJECT_DIR'] + "/update_scripts/"
#
# First, get the access token
agent = "Reddit Snapshots by u/evnbd"
client_auth = requests.auth.HTTPBasicAuth(clientID, clientSecret)
post_data = {"grant_type": "password", "username": username, "password": password}
headers = {"User-Agent": agent}
response = requests.post("https://www.reddit.com/api/v1/access_token", auth=client_auth, data=post_data, headers=headers)
access = response.json()['access_token']

# Now, query the API
headers = {"Authorization": "bearer " + access, "User-Agent": agent}

# Filter out political posts, "Happy Birthday" posts, cancer cure hype, etc.
filterWordList  = ["BIDEN","WARREN","SANDERS","BIRTHDAY","CANCER","ALZHEIMER",
    "THUNBERG","ST TATTOO", "[META]", "[ META ]"]

# Get subreddits from subreddits.json
subs = {}
with open(jsonPath + "subreddits.json","r") as subFile:
    subs = json.load(subFile)
    subFile.close()

sciTechMulti = "r/"
devMulti = "r/"
funMulti = "r/"

for sub in subs["subreddits"]["sciTech"]:
    sciTechMulti += sub + "+"

for sub in subs["subreddits"]["dev"]:
    devMulti += sub + "+"

for sub in subs["subreddits"]["fun"]:
    funMulti += sub + "+"

# Cut off last + symbol
sciTechMulti = sciTechMulti[:-1]
sciTechTop = sciTechMulti + "/top?t=day"
devMulti = devMulti[:-1]
devTop = devMulti + "/top?t=day"
funMulti = funMulti[:-1]
funTop = funMulti + "/top?t=day"

d = datetime.utcnow()
now = d.strftime("%Y-%m-%dT%H:%M:%S")
titleTime = d.strftime("%D %l:%M%p UTC")
mdFilename = postPath + now + "-post.md"

# TODO: Keep trying if response status is not 200
sciTechResponse = requests.get("https://oauth.reddit.com/" + sciTechTop, headers=headers)
devResponse = requests.get("https://oauth.reddit.com/" + devTop, headers=headers)
funResponse = requests.get("https://oauth.reddit.com/" + funTop, headers=headers)

responses = [(sciTechResponse, "Sci/Tech", SCI_TECH_LIMIT), (devResponse, "Developer", DEV_LIMIT),
    (funResponse, "Etcetera", FUN_LIMIT)]

sectionList = []

# Build the heap of posts. Push every post in each response. Worry about the
# post limit for each section when writing the Markdown file, not when building
# the heap. This way, the adjustedScore algorithm can produce a more interesting
# selection of posts.
for resp,sectionTitle,limit in responses:
    heap = []
    for post in resp.json()['data']['children']:
        #subSeen = False
        # Ignore stickied posts, NSFW posts, and spoilers
        if (post['data']['stickied'] or post['data']['over_18'] or post['data']['spoiler']):
            continue
        # Check that the title doesn't contain words in the filter list
        hitFilter = False
        for word in filterWordList :
            if word in post['data']['title'].upper():
                hitFilter = True
                break
        if hitFilter:
            continue
        p = Post(post)
        hq.heappush(heap,p)
    sectionList.append((heap,sectionTitle,limit))

# If a featuredFile file exists, we'll use it to check if links have already
# been posted. If the file doesn't exist, we'll create it. Then, we'll save
# urls of links that have been posted to the website to make sure we're not
# posting the same link twice.
prevFeatured = {}
with open(jsonPath + "featured.json","r") as featuredFile:
    prevFeatured = json.load(featuredFile)
    featuredFile.close()

# For each new snapshot, start a new seenAuthors list. It's OK if the same
# user has posts in multiple snapshots, but I want to avoid multiple posts from
# the same user within a single snapshot.
seenAuthors = []
seenSubreddits = []

# Write the Markdown file by popping posts from the heaps and calling their
# getHTML() functions.
with open(mdFilename,'w',encoding='utf-8') as md:
    md.write("---\ntitle: '" + titleTime + " Snapshot'\ndate: '" + now + "'\n---\n")
    md.write("<ul>\n")
    for heap,sectionTitle,limit in sectionList:
        postCount = 1
        md.write("<h2>" + sectionTitle + "</h2>" + "\n\n")
        for post in range(len(heap)):
            # Ignore reposts and crossposts, and avoid being overrun by
            # powerusers. As of 2/8/20, featured.json still contains many urls
            # with query strings, but from now on it will only be filled with
            # queryless urls. When checking reposts, check for both the real
            # url and the the urls without the query string.
            p = hq.heappop(heap)
            if (p.url in prevFeatured['links'] or p.author in seenAuthors or
                p.getQuerylessUrl() in prevFeatured['links']):
                continue
            if (p.subreddit not in seenSubreddits):
                seenSubreddits.append(p.subreddit)
            # If this post's sub is already represented, mark it and push it
            # back to the heap. The next time it gets popped, it will be written
            # to the MD file.
            elif (not p.subSeen):
                p.subSeen = True
                p.getAdjustedScore()
                hq.heappush(heap,p)
                continue

            html = p.getHTML()
            md.write(html + "\n\n")
            postCount += 1
            # Use the url without the query string to avoid reposting this link
            # in the future. The same link may have different query strings
            # depending on who posts it, how they navigated to the url, etc.
            prevFeatured['links'][p.getQuerylessUrl()] = None
            seenAuthors.append(p.author)
            if postCount > limit:
                break
    md.write("</ul>\n")

md.close()

# Update featured.json with the seenLinks from this snapshot
with open(jsonPath + "featured.json","w") as featuredFile:
    json.dump(prevFeatured,featuredFile)
