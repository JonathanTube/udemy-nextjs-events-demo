import classes from "./new-comment.module.css"
import { useRef, useState } from "react"
import Button from "../ui/button"

export default function NewComment(props) {
  const { onAddComment } = props

  const [isInvalid, setIsInvalid] = useState(false)

  const emailInputRef = useRef()
  const nameInputRef = useRef()
  const commentInputRef = useRef()

  function onSendCommentHandler(event) {
    event.preventDefault()
    const email = emailInputRef.current.value
    const name = nameInputRef.current.value
    const comment = commentInputRef.current.value
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      setIsInvalid(true)
      return
    }

    setIsInvalid(false)

    onAddComment({
      email,
      name,
      comment
    })
  }

  return (
    <section className={classes.container}>
      <form onSubmit={onSendCommentHandler}>
        <div className={classes.emailAndName}>
          <div className={classes.formItem}>
            <label htmlFor="email">Your Email</label>
            <input type="text" name="email" id="email" ref={emailInputRef} />
          </div>
          <div className={classes.formItem}>
            <label htmlFor="name">Your Name</label>
            <input type="text" name="name" id="name" ref={nameInputRef} />
          </div>
        </div>
        <div>
          <div className={classes.formItem}>
            <label htmlFor="comment">Your Comment</label>
            <textarea
              rows="5"
              name="comment"
              id="comment"
              ref={commentInputRef}
            />
          </div>
        </div>
        <br />
        <Button>submit</Button>
      </form>
      {isInvalid && <p>Please input the correct form data!</p>}
    </section>
  )
}
