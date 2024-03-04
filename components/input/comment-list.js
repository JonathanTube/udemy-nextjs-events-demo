import classes from "./comment-list.module.css"

export default function CommentList({ comments }) {
  return (
    <ul className="container">
      {comments.map((comment) => {
        return (
          <li key={comment._id} className={classes.commentItem}>
            <div className={classes.comment}>{comment.comment}</div>
            <div className={classes.name}>By {comment.name}</div>
          </li>
        )
      })}
    </ul>
  )
}
