import classes from "./event-item.module.css"
import Button from "@/components/ui/button"
import IconCalendar from "../icons/icon-calendar.js"

export default function EventItem(props) {
  const { title, image, date, description, location, id } = props
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <li className={classes.item}>
      <img src={image} alt="" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <div className={classes.icon}>
              <IconCalendar />
            </div>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{location}</address>
          </div>
          <div className={classes.description}>
            <p>{description}</p>
          </div>
          <div className={classes.actions}>
            <Button
              link={{
                pathname: "/events/[eventId]",
                query: {
                  eventId: id,
                },
              }}
            >
              Explore Event
            </Button>
          </div>
        </div>
      </div>
    </li>
  )
}
