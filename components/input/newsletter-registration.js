import classes from "./newsletter-registration.module.css"
import { useRef, useContext } from "react"
import NotificationContext from "@/store/notification-context"

export default function NewLetterRegistration() {
  const emailInputRef = useRef()

  const notificationCtx = useContext(NotificationContext)

  const submitHandler = (event) => {
    event.preventDefault()

    notificationCtx.showNotification({
      title: "Loading newsLetter",
      message: "Loading newsLetter",
      status: "pending"
    })

    fetch("/api/newsLetter", {
      method: "POST",
      body: JSON.stringify({
        email: emailInputRef.current.value
      }),
      headers: {
        "Content-Type": "application/json; charset=utf8"
      }
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error(data.message || "Something went wrong!")
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Successfully registered for newsletter",
          status: "success"
        })
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error"
        })
      })
  }

  return (
    <div className={classes.container}>
      <h1>Sign up to stay updated!</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.main}>
          <input
            type="email"
            placeholder="your email"
            ref={emailInputRef}
            required
          />
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}
