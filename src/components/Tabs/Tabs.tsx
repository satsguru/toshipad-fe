import { Theme, withStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

export function TabPanel(props: any) {
  const { children, value, index, ...rest } = props

  return (
    <div role="tabpanel" hidden={value !== index} {...rest}>
      {value === index && <div>{children}</div>}
    </div>
  )
}

export const StyledTabs = withStyles({
  root: {
    maxHeight: '40px'
  },
  flexContainer: {
    position: 'relative'
  }
})(Tabs)

export const StyledTab = withStyles((theme: Theme) => ({
  root: {
    padding: '9px 24px 9px 20px',
    height: '40px',
    fontFamily: '"Poppins", sans-serif',
    fontSize: '16px',
    fontWeight: 'bold',
    maxHeight: '40px',
    maxWidth: '282px',
    background: theme.palette.background.default,
    opacity: 1,
    color: theme.palette.secondary.main,
    border: `2px solid ${theme.palette.secondary.main}`,
    boxShadow: '0 0 6px #FFFFFF29',
    borderRadius: '14px 0 0 14px',
    zIndex: 0
  },
  selected: {
    border: `2px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    boxShadow: '0 0 6px #FFFFFF29',
    borderRadius: '14px !important',
    zIndex: 1
  }
}))(Tab)

export const StyledTabRight = withStyles({
  root: {
    left: '-10px',
    borderRadius: '0 14px 14px 0'
  }
})(StyledTab)
