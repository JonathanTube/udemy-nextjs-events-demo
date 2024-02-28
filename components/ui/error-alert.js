import classes from "./error-alert.module.css"

export default function ErrorAlert(props) {
  const { children } = props
  return <section className={classes.container}>{children}</section>
}
