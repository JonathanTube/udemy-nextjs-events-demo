import Notification from "@/components/ui/notification"
import MainHeader from "./main-header"
import classes from "./layout.module.css"
import { useContext } from "react"
import NotificationContext from "@/store/notification-context"

export default function Layout({ children }) {
  const notificationCtx = useContext(NotificationContext)
  const notification = notificationCtx.notification

  return (
    <>
      <MainHeader />

      <main className={classes.main}>{children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </>
  )
}
