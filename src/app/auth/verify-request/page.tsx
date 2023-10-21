import GoBack from "@/components/GoBack/GoBack";
import styles from "./page.module.scss"

function Verify() {

  return (
	<section className={styles.verify}>

		<div className={styles.verifyCard}>
			<h1>Check your email.</h1>
			<p>A sign in link has been sent to your email address.</p>
			<p>You can close this tab.</p>
			<GoBack link="/" />
			<p>If you don&apos;t see the email, check other places it might be, like your junk, spam, social, or other folders.
			</p>
		</div>

	</section>
  )
}

export default Verify