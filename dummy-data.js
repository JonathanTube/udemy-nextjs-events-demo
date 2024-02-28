const DUMMY_EVENTS = [
  {
    id: 1,
    title: "Event 1",
    description: "Description for event 1",
    location: "Location 1",
    date: "2022-01-01",
    image: "https://picsum.photos/id/1/800",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Event 2",
    description: "Description for event 2",
    location: "Location 2",
    date: "2023-01-02",
    image: "https://picsum.photos/id/2/800",
    isFeatured: false,
  },
  {
    id: 3,
    title: "Event 3",
    description: "Description for event 3",
    location: "Location 3",
    date: "2023-01-03",
    image: "https://picsum.photos/id/3/800",
    isFeatured: true,
  },
  {
    id: 4,
    title: "Event 4",
    description: "Description for event 4",
    location: "Location 4",
    date: "2023-01-04",
    image: "https://picsum.photos/id/4/800",
    isFeatured: false,
  },
  {
    id: 5,
    title: "Event 5",
    description: "Description for event 5",
    location: "Location 5",
    date: "2023-01-05",
    image: "https://picsum.photos/id/5/800",
    isFeatured: true,
  },
  {
    id: 6,
    title: "Event 6",
    description: "Description for event 6",
    location: "Location 6",
    date: "2023-01-06",
    image: "https://picsum.photos/id/6/800",
    isFeatured: false,
  },
  {
    id: 7,
    title: "Event 7",
    description: "Description for event 7",
    location: "Location 7",
    date: "2023-01-07",
    image: "https://picsum.photos/id/7/800",
    isFeatured: true,
  },
  {
    id: 8,
    title: "Event 8",
    description: "Description for event 8",
    location: "Location 8",
    date: "2023-01-08",
    image: "https://picsum.photos/id/8/800",
    isFeatured: false,
  },
  {
    id: 9,
    title: "Event 9",
    description: "Description for event 9",
    location: "Location 9",
    date: "2023-01-09",
    image: "https://picsum.photos/id/9/800",
    isFeatured: true,
  },
  {
    id: 10,
    title: "Event 10",
    description: "Description for event 10",
    location: "Location 10",
    date: "2023-01-10",
    image: "https://picsum.photos/id/10/800",
    isFeatured: false,
  },
]

export function getFeaturedEvents() {
  return DUMMY_EVENTS.filter((item) => item.isFeatured)
}

export function getEventById(id) {
  return DUMMY_EVENTS.find((event) => event.id == id)
}

export function getAllEvents() {
  return DUMMY_EVENTS
}

export function getFilterEvents(dateFilter) {
  const { year, month } = dateFilter
  let filteredEvents = DUMMY_EVENTS.filter((event) => {
    const eventDate = new Date(event.date)
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month
    )
  })
  return filteredEvents
}
