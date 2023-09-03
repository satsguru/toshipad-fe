import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2)
      }
    }
  })
)

const Spinner = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress size="20px" thickness={8} />
    </div>
  )
}

export default Spinner
