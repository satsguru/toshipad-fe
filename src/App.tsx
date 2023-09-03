import CircularProgress from '@material-ui/core/CircularProgress'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { ModalProvider, WalletProvider } from 'contexts'
import { AboutUs, HomePage, Launchpad, Layout, Project } from 'pages'
import { Suspense, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom'

import ScrollToTop from './utils/ScrollToTop'

import theme from 'styles/Theme'

import './app.scss'

const App = () => {
  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <ModalProvider>
      <WalletProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <ScrollToTop />
            <Layout>
              <Suspense fallback={<CircularProgress />}>
                <Switch>
                  <Route exact path="/">
                    <HomePage />
                  </Route>
                  <Route exact path="/about-us">
                    <AboutUs />
                  </Route>
                  <Route exact path="/launchpad">
                    <Launchpad />
                  </Route>
                  <Route exact path="/project/:projectName">
                    <Project />
                  </Route>

                  <Redirect to="/" />
                </Switch>
              </Suspense>
            </Layout>
          </Router>
        </ThemeProvider>
      </WalletProvider>
    </ModalProvider>
  )
}

export default App
