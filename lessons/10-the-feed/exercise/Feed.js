import React, {useState, useEffect} from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

function Feed() {
  const [posts, setPosts] = useState(null)
  const [limit] = useState(3)    // limit number of results
  const [time] = useState(Date.now())  // query for posts created before the unix timestamp
  
  console.log("show time", time)

  useEffect(() => {
    let isCurrent = true
    loadFeedPosts(time, limit).then(posts => {
      if(isCurrent) setPosts(posts)
    })
    return () => isCurrent = false
  }, [time, limit ])

  return (
    <div className="Feed">
      <div className="Feed_button_wrapper">
        <button className="Feed_new_posts_button icon_button">
          View 3 New Posts
        </button>
      </div>

      {posts && posts.map(post => <FeedPost post={post} key={post.id} /> )}

      <div className="Feed_button_wrapper">
        <button className="Feed_new_posts_button icon_button">View More</button>
      </div>
    </div>
  )
}

// you can delete this
// const fakePost = {
//   createdAt: Date.now() - 10000,
//   date: "2019-03-30",
//   message: "Went for a run",
//   minutes: 45,
//   uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2"
// }

