import {
  InputBaseComponentProps,
  makeStyles,
  TextField
} from '@material-ui/core'
import axios from 'axios'
import { Button, Checkbox } from 'components'
import { useState } from 'react'
import { isValidEmail } from 'utils'

import './_subscribe.scss'

const BEARER =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjc0NmUzMzEyNThlMTk5N2UzYzc4MDQ3ZDlkOTAzMGI2MmFiOTA1MDZkYzk2NWM1ZGVmMTY2OTU5ZDY5ZWQ2OGRmYzJkYTIyMGRiNjRjNjciLCJpYXQiOjE2ODg0ODYxNTQuOTU5MDE5LCJuYmYiOjE2ODg0ODYxNTQuOTU5MDIyLCJleHAiOjQ4NDQxNTk3NTQuOTUxODI5LCJzdWIiOiI1MjQ4NDgiLCJzY29wZXMiOltdfQ.xQvVKPY7thzp1JqLfxdm4U-rADV8WQ_XOh6i7K56imaVLTgD1YLRywABxxpxkHlR8N-riE8-13q3XgQBaPDmvL-RQndSP_2w0znHRm1nKUADN7OrGw4U8xdAm-RQAmBmv3WIcIMyxcJATFaVEgCm2SxDbYT8nibHG7QYzVEVf3pVxECt0qherPcmheWoFNGvcmX-rtptQL_6rfutsuHLDnpyn8hbM9yE16FHrZZDC_xSyOPPYZ-AhWOIBrGGv3VC49RsuTlWKvYRQIh409N9Q1Y8F1JP4Q-J6j83wLESG42ouy68HrC-eGWFEJPETqR-BC6o5BrPSkW-9ztu5V-nR-2AfpzjBCfeUrzXL-4akjGHldjdvBQ91LjEGG9JdTOgKv_X8gBtAKgmFh9gXBM-UD-DnwGFHjRBwQCA5Hn6YVS2CvF77559yCCXZAcVN2xGaHHFbjVJCEpFT5uFBLdRxWjSR5hUfUuHxvzEcZDPjPkCGd-EiJhjI9llndKQYWl3gKQZuT3dWSs7t-dkOvny4bsho77JyfCDjGTKcFgeoOWoedyVneBp8sUjnkpp-Jiy4O9oN-oNSGGUJVfDUDUKjGVdxm0VJj0G0uUOzRrtkZ4phqWrnlaz5oKBs2UOqkyEmMKMIUlgNdam-zBfLAtzVcrVtYTEiALBgYyg3zfNd1Y'

const useInputStyles = makeStyles(() => ({
  root: {
    flexGrow: 2,
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '12px',
      borderColor: 'black'
    },
    '& .Mui-focused': {
      borderColor: 'black'
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black',
      borderWidth: '2px'
    },
    '&:not(:focus):not(:hover) .MuiOutlinedInput-notchedOutline': {
      borderColor: 'black'
    }
  }
}))

export const EmailForm: React.FunctionComponent = () => {
  const inputClasses = useInputStyles()

  const inputProps: InputBaseComponentProps = {
    style: {
      fontSize: 14,
      padding: 11,
      paddingLeft: 16,
      minWidth: '150px',
      maxWidth: '288px',
      width: '100%',
      backgroundColor: 'transparent',
      color: 'black'
    }
  }
  const [emailValid, setEmailValid] = useState<boolean | undefined>()
  const [inputValue, setInputValue] = useState<string>('')
  const [submitEmptyInput, setSubmitEmptyInput] = useState<boolean>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }

  const submitEmail = async () => {
    const emailIsValid = isValidEmail(inputValue)
    setSubmitEmptyInput(!inputValue)

    if (!isChecked) {
      return setError('Accept Terms and Agreements.')
    }

    if (emailIsValid) {
      setLoading(true)
      setError(null)
      try {
        await axios.post(
          'https://connect.mailerlite.com/api/subscribers',
          {
            email: inputValue,
            groups: ['92616981617837292']
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${BEARER}`
            }
          }
        )

        setInputValue('')
        setSubmitted(true)
      } catch (error: any) {
        console.error('Error', error.response)

        if (error.response && error.response.status === 429) {
          setError('Too many requests. Please try again later.')
        } else if (error.response && error.response.status === 401) {
          setError('Unauthorized. Please check your API key.')
        } else {
          setError('An error occurred. Please try again later.')
        }
      } finally {
        setLoading(false)
      }
    }

    setEmailValid(emailIsValid)
  }

  return (
    <div className="subscribe-form-wrapper">
      <div className="subscribe-form">
        <TextField
          placeholder="Email"
          value={inputValue}
          inputProps={inputProps}
          variant="outlined"
          className={inputClasses.root}
          onChange={e => {
            setInputValue(e.target.value)
            setSubmitEmptyInput(false)
            setEmailValid(undefined)
            setSubmitted(false)
          }}
          error={emailValid}
          helperText={
            Boolean(emailValid === false && inputValue)
              ? 'invalid email'
              : submitEmptyInput
              ? 'please type your email'
              : error
          }
          required
        />

        <Button
          text={
            submitted ? 'Subscribed!' : loading ? 'Loading...' : 'Subscribe'
          }
          color="black"
          onClick={submitEmail}
          disabled={submitted}
          subscribe
        />
      </div>
      <div className="subscribe-form-checkbox">
        <label>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />

          <span className="label-text">
            I agree to the Terms and Agreements
          </span>
        </label>
      </div>
    </div>
  )
}
