import EventItem from "./event-item"
import classes from "./event-list.module.css"

export default function EventList(props) {
  const { events } = props
  return (
    <ul className={classes.list}>
      {events.map((item) => (
        <EventItem key={item.id} {...item} />
      ))}
    </ul>
  )
}
