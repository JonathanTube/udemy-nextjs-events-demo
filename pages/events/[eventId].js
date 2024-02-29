// import { useRouter } from "next/router"
import { getEventById, getAllEvents } from "@/helpers/api-util"
import EventItem from "@/components/events/event-item"
import ErrorAlert from "@/components/ui/error-alert"
import Button from "@/components/ui/button"

export default function EventDetailPage({ event }) {
  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
        <br />
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  return (
    <div>
      <h1>Event Detail</h1>
      <EventItem {...event} />
    </div>
  )
}

export async function getStaticProps(context) {
  const { params } = context
  const { eventId } = params
  const fetchedEvent = await getEventById(eventId)
  console.log("fetchedEvent=", fetchedEvent)
  if (!fetchedEvent) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      event: fetchedEvent,
    },
  }
}

export async function getStaticPaths() {
  const events = await getAllEvents()
  const paths = events.map((event) => {
    return {
      params: {
        eventId: event.id + "",
      },
    }
  })

  console.log(paths)

  return {
    paths: paths,
    // fallback: false,
    fallback: true, // Even the id doesn't exist in paths, we still render the page
    // fallback: "blocking",
  }
}
