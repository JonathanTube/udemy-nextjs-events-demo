import EventList from "@/components/events/event-list"
import NewLetterRegistration from "@/components/input/newsletter-registration"
import { getFeaturedEvents } from "@/dummy-data"

export default function Home({ events }) {
  return (
    <div>
      <NewLetterRegistration />
      <ul>
        <EventList events={events} />
      </ul>
    </div>
  )
}

export async function getStaticProps(context) {
  const featuredEvents = getFeaturedEvents()

  // this is just a dummy code to show if something happend the page will be redirected to another router.
  // if (featuredEvents.length % 2 === 0) {
  //   return {
  //     props: {
  //       redirect: {
  //         destination: "/",
  //       },
  //     },
  //   }
  // }

  if (featuredEvents.length === 0) {
    return {
      props: {
        notFound: true // if the length of the data list is zero, go to the 404.html
      }
    }
  }
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1200 // only production mode can be effect, The getStaticProps function will be executed by each visition in development mode.
  }
}
