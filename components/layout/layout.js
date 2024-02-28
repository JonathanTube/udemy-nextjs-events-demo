import MainHeader from "./main-header"
import classes from "./layout.module.css"

export default function Layout({ children }) {
  return (
    <>
      <MainHeader />
      <main className={classes.main}>{children}</main>
    </>
  )
}
