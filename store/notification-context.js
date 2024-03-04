import { createContext, useState, useEffect } from "react"

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function (notificationData) {}
})

export function NotificationContextProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState()

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null)
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [activeNotification])

  const showNotificationHandler = (notificationData) => {
    setActiveNotification({
      title: notificationData.title,
      message: notificationData.message,
      status: notificationData.status
    })
  }

  const hideNotificationHandler = () => {
    setActiveNotification(null)
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler
  }

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
