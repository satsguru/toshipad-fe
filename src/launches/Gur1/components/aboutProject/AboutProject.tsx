import { Typography } from '@mui/material'

import styles from './AboutProject.module.scss'

export const AboutProject = () => (
  <div className={styles.aboutProject}>
    <Typography className={styles.mainTitle}>About Project</Typography>
    <Typography className={styles.desc}>
      Get ready to embark on a whimsical journey through the world of
      cryptocurrency. Our test project is designed to tickle your funny bone
      while testing your crypto prowess. We've combined the excitement of
      launching new projects with a splash of humor to create an unforgettable
      experience.
    </Typography>
    <Typography className={styles.desc}>
      Join us as we navigate the uncharted waters of crypto comedy. From
      outrageous token names to eccentric project ideas, we're pushing the
      boundaries of what's possible in the crypto space. Don't worry, your
      investment is strictly in laughs, but who knows, you might just stumble
      upon the next big comedic gem!
    </Typography>
    <Typography className={styles.desc}>
      So fasten your seatbelts and get ready to laugh your way to crypto
      stardom. The Satsguru Test Project for Launchpad is not responsible for
      any side-splitting laughter or uncontrollable giggles that may occur.
      Proceed with caution and a sense of humor!
    </Typography>
  </div>
)
