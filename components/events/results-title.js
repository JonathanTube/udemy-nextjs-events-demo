import classes from "./results-title.module.css"
import Button from "../ui/button"
export default function ResultsTitle(props) {
  const { date } = props
  const dateString = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  })
  return (
    <section className={classes.results}>
      <div className={classes.date}>Events in {dateString}</div>
      <Button link="/events">Show all events</Button>
    </section>
  )
}
