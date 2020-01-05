# Organize information from posts and get HTML for MD files.
class Post:
    def __init__(self, postData, subscribers=None):
        self.title = postData['data']['title']
        self.url = postData['data']['url']
        self.thumbnail = postData['data']['thumbnail']
        self.author = postData['data']['author']
        self.comments = postData['data']['num_comments']
        self.permalink = postData['data']['permalink']
        self.created = postData['data']['created_utc']
        self.subreddit = postData['data']['subreddit']
        self.score = postData['data']['score']
        self.subSeen = False
        # Will default to None
        self.subscribers = subscribers
        self.fixCrosspostLink(postData)

    # If the post is a crosspost link to a post in another subreddit, change its
    # url to a real address, not reddit's shorthand.
    def fixCrosspostLink(self,postData):
        if (postData['data'].get('crosspost_parent_list') and ("http" not in self.url)):
            self.url = "https://www.reddit.com" + self.url

    def getAdjustedScore(self):
        # Convert to negative number so larger adjusted scores are pushed from
        # the heap first.
        #adjustedScore = -((self.score + self.comments)**2) / self.subscribers
        adjustedScore = -self.score
        # If a post's subreddit is already represented, reduce its adjusted
        # score by an order of magnitude.
        if self.subSeen == True:
            adjustedScore = adjustedScore / 5
        return adjustedScore

    def __lt__(self, other):
        return self.getAdjustedScore() < other.getAdjustedScore()

    def getFormattedThumbnail(self):
        thumb = ""
        if self.thumbnail == "self":
            thumb = (
    """<svg version='1.1' viewBox='-34 -12 104 64' preserveAspectRatio='xMidYMid slice' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
    <title>text link thumbnail</title>
    <path d='M12.19,8.84a1.45,1.45,0,0,0-1.4-1h-.12a1.46,1.46,0,0,0-1.42,1L1.14,26.56a1.29,1.29,0,0,0-.14.59,1,1,0,0,0,1,1,1.12,1.12,0,0,0,1.08-.77l2.08-4.65h11l2.08,4.59a1.24,1.24,0,0,0,1.12.83,1.08,1.08,0,0,0,1.08-1.08,1.64,1.64,0,0,0-.14-.57ZM6.08,20.71l4.59-10.22,4.6,10.22Z'>
    </path>
    <path d='M32.24,14.78A6.35,6.35,0,0,0,27.6,13.2a11.36,11.36,0,0,0-4.7,1,1,1,0,0,0-.58.89,1,1,0,0,0,.94.92,1.23,1.23,0,0,0,.39-.08,8.87,8.87,0,0,1,3.72-.81c2.7,0,4.28,1.33,4.28,3.92v.5a15.29,15.29,0,0,0-4.42-.61c-3.64,0-6.14,1.61-6.14,4.64v.05c0,2.95,2.7,4.48,5.37,4.48a6.29,6.29,0,0,0,5.19-2.48V26.9a1,1,0,0,0,1,1,1,1,0,0,0,1-1.06V19A5.71,5.71,0,0,0,32.24,14.78Zm-.56,7.7c0,2.28-2.17,3.89-4.81,3.89-1.94,0-3.61-1.06-3.61-2.86v-.06c0-1.8,1.5-3,4.2-3a15.2,15.2,0,0,1,4.22.61Z'>
    </path>
    </svg>""")
        elif self.thumbnail in ["","default","image"]:
            thumb = (
    """<svg version='1.1' viewBox='-34 -14 104 64' preserveAspectRatio='xMidYMid meet' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>
    <title>link thumbnail</title>
    <path d='M32,4H4A2,2,0,0,0,2,6V30a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V6A2,2,0,0,0,32,4ZM4,30V6H32V30Z'></path>
    <path d='M8.92,14a3,3,0,1,0-3-3A3,3,0,0,0,8.92,14Zm0-4.6A1.6,1.6,0,1,1,7.33,11,1.6,1.6,0,0,1,8.92,9.41Z'></path>
    <path d='M22.78,15.37l-5.4,5.4-4-4a1,1,0,0,0-1.41,0L5.92,22.9v2.83l6.79-6.79L16,22.18l-3.75,3.75H15l8.45-8.45L30,24V21.18l-5.81-5.81A1,1,0,0,0,22.78,15.37Z'></path>
    </svg>""")
        else:
            thumb = "<img src='" + self.thumbnail + "' alt='link thumbnail'>"
        return "<a href='" + self.url + "'>" + thumb + "</a>"

    def getLinkHTML(self):
        return "<div class='linkTitle'><a href='" + self.url + "'>" + self.title + "</a></div>(" + self.url.split('/')[2].replace('www.','') + ")"

    def getPostInfoHTML(self):
        return (
                " posted by " + "<a href='https://www.reddit.com/user/" + self.author + "'>" + self.author + "</a> " +
                "in " + "<a href='https://www.reddit.com/r/" + self.subreddit + "'>" + self.subreddit + "</a> " +
                str(self.score) + " points & " + str(self.comments) + " <a href='https://www.reddit.com" + self.permalink +"'>comments</a>"
            )

    def getLinkInfoWrapHTML(self):
        return (
            "<div>" +
                self.getLinkHTML() + self.getPostInfoHTML() +
            "</div>"
            )

    def getHTML(self):
        return (
            "<li>" +
                self.getFormattedThumbnail() + self.getLinkInfoWrapHTML() +
            "</li>"
        )
