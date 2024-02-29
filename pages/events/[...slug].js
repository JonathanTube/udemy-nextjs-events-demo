import { useRouter } from "next/router"
import EventList from "@/components/events/event-list"
import { getFilterEvents } from "@/helpers/api-util"
import ResultsTitle from "@/components/events/results-title"
import Button from "@/components/ui/button"
import ErrorAlert from "@/components/ui/error-alert"

export default function FilteredEventsPage({
  hasError,
  noDate,
  year,
  month,
  events,
}) {
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

  if (hasError) {
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

  if (noDate) {
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

  const date = new Date(year, month - 1)

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList events={events} />
    </div>
  )
}

export async function getServerSideProps(context) {
  console.log(context.params)
  const { slug } = context.params

  const filteredYear = +slug[0]
  const filteredMonth = +slug[1]

  if (isNaN(filteredYear) || isNaN(filteredMonth)) {
    return {
      props: {
        hasError: true,
      },
    }
  }

  const events = await getFilterEvents({
    year: filteredYear,
    month: filteredMonth,
  })

  if (!events || events.length === 0) {
    return {
      props: {
        noDate: true,
      },
    }
  }

  return {
    props: {
      year: filteredYear,
      month: filteredMonth,
      events: events,
    },
  }
}
