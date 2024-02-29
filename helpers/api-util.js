const url =
  "https://react-getting-started-43908-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"

export async function getAllEvents() {
  const response = await fetch(url)
  const data = await response.json()
  // console.log("=====", data)
  const events = []

  for (const key in data) {
    events.push({
      ...data[key],
    })
  }
  return events
}

export async function getFeaturedEvents() {
  const events = await getAllEvents()
  // console.log(events)
  return events.filter((item) => item.isFeatured)
}

export async function getEventById(id) {
  const events = await getAllEvents()
  return events.find((event) => event.id == id)
}

export async function getFilterEvents(dateFilter) {
  const { year, month } = dateFilter
  const events = await getAllEvents()
  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month
    )
  })
  return filteredEvents
}
