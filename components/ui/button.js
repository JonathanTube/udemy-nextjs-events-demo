import Link from "next/link"
import classes from "./button.module.css"

export default function Button(props) {
  const { children, link, onClick } = props

  if (link) {
    return (
      <Link href={link} className={classes.button}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes.button} onClick={onClick}>
      {children}
    </button>
  )
}
