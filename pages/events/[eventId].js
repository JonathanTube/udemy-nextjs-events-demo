// import { useRouter } from "next/router"
import { getEventById } from "@/dummy-data"
import EventItem from "@/components/events/event-item"
import ErrorAlert from "@/components/ui/error-alert"
import Button from "@/components/ui/button"
import Comments from "@/components/input/comments"

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
      <Comments eventId={event.id} />
    </div>
  )
}

export async function getStaticProps(context) {
  const { params } = context
  const { eventId } = params
  const fetchedEvent = getEventById(eventId)
  // console.log("fetchedEvent=", fetchedEvent)
  if (!fetchedEvent) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      event: fetchedEvent
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { eventId: "1" }
      },
      {
        params: { eventId: "2" }
      }
    ],
    // fallback: false,
    fallback: true // Even the id doesn't exist in paths, we still render the page
    // fallback: "blocking",
  }
}
