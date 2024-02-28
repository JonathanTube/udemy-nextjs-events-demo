import { useRouter } from "next/router"
import EventList from "@/components/events/event-list"
import { getFilterEvents } from "@/dummy-data"
import ResultsTitle from "@/components/events/results-title"
import Button from "@/components/ui/button"
import ErrorAlert from "@/components/ui/error-alert"

export default function FilteredEventsPage() {
  const router = useRouter()

  const arr = router.query.slug
  if (!arr) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. The values are empty!</p>
        </ErrorAlert>
        <br />
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredYear = +arr[0]
  const filteredMonth = +arr[1]

  if (isNaN(filteredYear) || isNaN(filteredMonth)) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <br />
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const events = getFilterEvents({
    year: filteredYear,
    month: filteredMonth,
  })

  if (!events || events.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <br />
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(filteredYear, filteredMonth - 1)

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList events={events} />
    </div>
  )
}
