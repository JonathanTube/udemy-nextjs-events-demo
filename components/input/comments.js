import { useState, useContext, useEffect } from "react"
import Button from "../ui/button"
import NewComment from "./new-comment"
import classes from "./comments.module.css"
import CommentList from "./comment-list"
import NotificationContext from "@/store/notification-context"

export default function Comments({ eventId }) {
  const [showComment, setShowComment] = useState(false)
  const [comments, setComments] = useState([])
  const [isCommentLoading, setIsCommentLoading] = useState(false)

  const notificationCtx = useContext(NotificationContext)

  const toggleShowComment = () => {
    setShowComment(!showComment)
  }

  useEffect(() => {
    setIsCommentLoading(true)
    if (showComment) {
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments)
          setIsCommentLoading(false)
        })
    }
  }, [showComment])

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Sending comments...",
      message: "Your comment is currently being stored into a database!",
      status: "pending"
    })
    fetch("/api/comments/" + eventId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(commentData)
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error("Something went wrong")
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success",
          message: "Your comment was saved!",
          status: "success"
        })
      })
      .catch((err) => {
        notificationCtx.showNotification({
          title: "Error",
          message: err.message || "Something went wrong!",
          status: "error"
        })
      })
  }

  return (
    <>
      <div className={classes.controlCommentShown}>
        {showComment && (
          <>
            <Button onClick={toggleShowComment}>Hide Comments</Button>
            <div className={classes.newComment}>
              <NewComment onAddComment={addCommentHandler} />
            </div>
            <div className={classes.commentList}>
              {isCommentLoading ? (
                <p>Loading Comments...</p>
              ) : (
                <CommentList comments={comments} />
              )}
            </div>
          </>
        )}
        {!showComment && (
          <Button onClick={toggleShowComment}>Show Comments</Button>
        )}
      </div>
    </>
  )
}
