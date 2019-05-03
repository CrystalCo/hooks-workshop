import React, {useState, useEffect} from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

function Feed() {
  const [newPosts, setNewPosts] = useState([])
  const [posts, setPosts] = useState(null)
  const [limit, setLimit] = useState(3)    // limit number of results
  const [time] = useState(Date.now())  // query for posts created before the unix timestamp
  
  console.log("show time", time)

  const handleViewMore = () => {
    setLimit(limit + 3)
  }

  useEffect(() => {
    // loadFeedPost = single request
    let isCurrent = true
    loadFeedPosts(time, limit).then(posts => {
      if(isCurrent) setPosts(posts)
    })
    return () => isCurrent = false
  }, [time, limit ])

  useEffect(() => 
    // don't need the isCurrent b/c subscribe listens for request of new posts when you push that button 
    // don't need return statement b/c its a one liner, so auto returns 
    subscribeToNewFeedPosts(time, newPosts => {
      setNewPosts(newPosts)
    })
  , [time])

  return (
    <div className="Feed">
      {newPosts.length > 0 && (
        <div className="Feed_button_wrapper">
          <button className="Feed_new_posts_button icon_button">
            View 3 New Posts
          </button>
        </div>
    )}

      {posts && posts.map(post => <FeedPost post={post} key={post.id} /> )}

      <div className="Feed_button_wrapper">
        <button className="Feed_new_posts_button icon_button" onClick={handleViewMore} >View More</button>
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

