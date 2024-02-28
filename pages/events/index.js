import { useRouter } from "next/router"

import EventList from "@/components/events/event-list"
import { getAllEvents } from "@/dummy-data"
import EventsSearch from "@/components/events/events-search"

export default function AllEventsPage({ events }) {
  const router = useRouter()

  const findEventsHandler = (year, month) => {
    router.push(`/events/${year}/${month}`)
  }

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req, res } = context

  console.log("================================getServerSideProps")

  const events = getAllEvents()
  return {
    props: {
      events: events,
    },
  }
}
