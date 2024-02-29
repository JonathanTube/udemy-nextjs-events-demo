import styles from "@/styles/Home.module.css"
import EventList from "@/components/events/event-list"
import { getFeaturedEvents } from "@/helpers/api-util"

export default function Home({ events }) {
  return (
    <div>
      <ul>
        <EventList events={events} />
      </ul>
    </div>
  )
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents()
  console.log(featuredEvents)

  if (featuredEvents.length === 0) {
    return {
      props: {
        notFound: true, // if the length of the data list is zero, go to the 404.html
      },
    }
  }
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1200, // only production mode can be effect, The getStaticProps function will be executed by each visition in development mode.
  }
}
