import { createMuiTheme } from '@material-ui/core/styles'

const globalTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF9900',
      dark: '#FF9900'
    },
    secondary: {
      main: '#ffffff'
    },
    info: {
      main: '#10161e',
      dark: '#19202b'
    },
    background: {
      default: '#10161e'
    }
  }
})
const theme = createMuiTheme(
  {
    overrides: {
      MuiTypography: {
        h6: {
          fontFamily: '"Poppins", sans-serif'
        }
      },
      MuiDrawer: {
        paper: {
          border: 'none',
          boxShadow: 'none !important',
          width: '240px',
          maxHeight: '640px'
        }
      },
      MuiPaper: {
        root: {
          color: globalTheme.palette.secondary.main,
          backgroundColor: globalTheme.palette.info.dark,
          border: `6px solid rgba(255,238,0,0.3)`,
          boxShadow: `0px 0px 6px ${globalTheme.palette.primary.dark}, 0 0 0 3px ${globalTheme.palette.primary.main} !important`
        },
        rounded: {
          borderRadius: '27px'
        }
      },
      MuiDialog: {
        paperWidthSm: {
          minWidth: '300px',
          '@media (min-width: 640px)': {
            minWidth: '500px'
          }
        }
      },
      MuiBackdrop: {
        root: {
          backdropFilter: 'blur(3px) !important'
        }
      },
      MuiButton: {
        root: {
          fontFamily: '"Roboto", sans-serif'
        },
        outlined: {
          '&.Mui-disabled': {
            color: globalTheme.palette.info.contrastText,
            opacity: 0.5,
            border: `3px solid ${globalTheme.palette.primary.main}`
          }
        },
        contained: {
          '&.Mui-disabled': {
            color: globalTheme.palette.info.dark,
            opacity: 0.5,
            backgroundColor: globalTheme.palette.primary.main
          }
        },
        containedPrimary: {
          padding: '8px 8px !important',
          minWidth: '175px',
          height: '42px',
          borderRadius: '27px',
          fontSize: '13px',
          textTransform: 'initial',
          fontWeight: 'bold',
          boxShadow: 'none',
          border: `10px solid ${globalTheme.palette.primary.main}`,
          '&:hover': {
            backgroundColor: globalTheme.palette.primary.main,
            boxShadow: `0px 0px 10px ${globalTheme.palette.primary.main}`
          }
        },
        outlinedPrimary: {
          padding: '8px 8px !important',
          minWidth: '175px',
          height: '42px',
          borderRadius: '27px',
          fontSize: '13px',
          textTransform: 'initial',
          boxShadow: 'none',
          border: `3px solid ${globalTheme.palette.primary.main}`,
          color: globalTheme.palette.secondary.main,
          backgroundColor: globalTheme.palette.info.main,
          '&:hover': {
            border: `3px solid ${globalTheme.palette.primary.main}`,
            backgroundColor: globalTheme.palette.info.main,
            boxShadow: `0px 0px 10px ${globalTheme.palette.primary.main}`
          }
        },
        containedSizeSmall: {
          height: '25px',
          padding: '3px 3px !important'
        },
        outlinedSecondary: {
          borderRadius: '21px',
          marginBottom: '15px',
          backgroundColor: globalTheme.palette.info.main,
          textTransform: 'initial',
          border: 'none',
          '&:hover': {
            border: 'none',
            backgroundColor: globalTheme.palette.primary.main,
            color: globalTheme.palette.info.main
          }
        }
      },
      MuiInputBase: {
        input: {
          backgroundColor: globalTheme.palette.info.main,
          color: globalTheme.palette.secondary.main,
          border: 'none',
          borderRadius: '21px',
          height: '32px',
          padding: '6px 20px 4px',
          fontFamily: '"Roboto", sans-serif',
          borderColor: 'inherit'
        }
      },
      MuiInput: {
        underline: {
          borderBottom: 'none',
          '&:after': {
            borderBottom: 'none'
          },
          '&:before': {
            borderBottom: 'none'
          },
          '&:hover': {
            borderBottom: 'none',
            '&:after': {
              borderBottom: 'none'
            },
            '&:not(.Mui-disabled):before': {
              borderBottom: 'none'
            }
          },
          '&.Mui-error': {
            '&:after': {
              borderBottom: 'none'
            }
          }
        }
      },
      MuiFormLabel: {
        root: {
          color: globalTheme.palette.secondary.main,
          fontFamily: '"Roboto", sans-serif',
          fontSize: '12px',
          marginLeft: '15px'
        }
      },

      MuiDivider: {
        root: {
          backgroundColor: '#40444A',
          height: '1px !important',
          padding: '0 !important',
          marginTop: '35px',
          marginBottom: '35px',
          width: '100%'
        },
        light: {
          backgroundColor: '#40444A',
          marginTop: '10px',
          marginBottom: '10px'
        },
        vertical: {
          marginTop: '0',
          marginBottom: '0',
          marginLeft: '10px',
          marginRight: '10px',
          height: '100% !important'
        }
      },
      MuiTabs: {
        root: {
          color: globalTheme.palette.secondary.main
        },
        indicator: {
          background: 'none'
        }
      },
      MuiTab: {
        root: {
          minWidth: '0 !important'
        }
      }
    }
  },
  globalTheme
)

export default theme
