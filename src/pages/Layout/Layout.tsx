import { ModalType, useModal } from 'contexts'
import { FC } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'

import { Footer, Topbar, WalletConnect, WalletDisconnect } from './components'

import './_layout.scss'

interface ILayoutProps {}

const paramsRoutes = ['stake', 'project']
const specialRoutesRoutes = ['squadrons', 'leaderboard']

export const Layout: FC<ILayoutProps> = props => {
  const { children } = props
  const location = useLocation()
  const {
    [ModalType.WALLET_CONNECT]: walletConnectModalOpen,
    [ModalType.WALLET_DISCONNECT]: walletDisconnectModalOpen
  } = useModal()
  const [, pageRoute, params, additional, special] =
    location.pathname.split('/')
  let layoutClass = pageRoute || 'homepage'

  if (paramsRoutes.find(pr => pr === pageRoute) && params) {
    layoutClass = params
  }

  if (additional) {
    if (specialRoutesRoutes.find(pr => pr === additional) && special) {
      layoutClass = `${additional}-${special}`
    } else {
      layoutClass = additional
    }
  }

  const rootClass = 'layout'

  return (
    <div className={`${rootClass} ${layoutClass}`}>
      <Switch>
        <Route>
          <div className={`${rootClass}__topbar-wrapper`}>
            <Topbar activeTab={pageRoute} />
          </div>
        </Route>
      </Switch>

      <div className={`${rootClass}__content-wrapper`}>{children}</div>
      <Switch>
        <Route>
          <div className={`${rootClass}__footer-wrapper`}>
            <Footer />
          </div>
        </Route>
      </Switch>

      {walletConnectModalOpen && <WalletConnect />}

      {walletDisconnectModalOpen && <WalletDisconnect />}
    </div>
  )
}
