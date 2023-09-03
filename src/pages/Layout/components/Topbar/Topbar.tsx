import { Button, Typography } from '@mui/material'
import { Icons, Images } from 'assets'
import { ModalType, useModal, useWallet } from 'contexts'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { shortenAddress } from 'utils/ShortenAddress'

import { useWindowSize } from 'hooks/useWindowSize.js'

import { Notis } from '../Notis'

import styles from './topbar.module.scss'

function OutsideClickCheck(ref: any, visible: any, changeVisible: any) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        visible === true
      ) {
        changeVisible(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, visible, changeVisible])
}

export const Topbar = (props: { activeTab: any }) => {
  const size: any = useWindowSize()
  const [openedMobile, setOpenedMobile] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const { walletData } = useWallet()
  const { openModal } = useModal()

  const [openedNoti, setOpenedNoti] = useState<boolean>(false)
  const notiRef = useRef(null)
  OutsideClickCheck(notiRef, openedNoti, setOpenedNoti)

  useEffect(() => {
    if (walletData) {
      setWalletAddress(
        shortenAddress(
          walletData.ordinalsAddress
            ? walletData.ordinalsAddress
            : walletData.paymentAddress || ''
        )
      )
    } else {
      setWalletAddress(null)
    }
  }, [walletData])

  return (
    <header
      className={
        size.width > 1070
          ? `${styles.nav}`
          : openedMobile === true
          ? `${styles.nav} ${styles.mobileNav}`
          : `${styles.nav} ${styles.mobileNavHidden}`
      }>
      <Link to="/">
        <img src={Images.toshipadLogo} className={styles.logo} alt="ToshiPad" />
      </Link>
      <div
        className={styles.burger}
        onClick={() => {
          setOpenedMobile(!openedMobile)
        }}>
        <img src={Icons.burger} alt="Menu" />
      </div>
      <div
        className={
          size.width > 1070
            ? `${styles.center}`
            : openedMobile === true
            ? `${styles.center} ${styles.centerMobile}`
            : `${styles.center}`
        }>
        <Link
          to="/"
          onClick={() => setOpenedMobile(false)}
          data-value={props.activeTab === '' ? 'active' : ''}>
          Home
        </Link>
        <Link
          to="/launchpad"
          onClick={() => setOpenedMobile(false)}
          data-value={
            props.activeTab === 'launchpad' || props.activeTab === 'project'
              ? 'active'
              : ''
          }>
          Launchpad
        </Link>
        <Link
          to="/about-us"
          onClick={() => setOpenedMobile(false)}
          data-value={props.activeTab === 'about-us' ? 'active' : ''}>
          About Us
        </Link>
      </div>
      <div
        className={
          size.width > 1070
            ? `${styles.right}`
            : openedMobile === true
            ? `${styles.right} ${styles.rightMobile}`
            : `${styles.right}`
        }>
        {/* <div
          className={styles.noti}
          onClick={() => {
            setOpenedNoti(!openedNoti)
          }}>
          <div className={styles.icon}>
            <img src={Icons.bell} alt="Bell" />
            <span>/!*ORANGE DOT*!/ </span>
          </div>
          <Typography>2 New</Typography>
        </div> */}
        {walletAddress ? (
          <Button
            className={styles.wallet}
            onClick={() => openModal(ModalType.WALLET_DISCONNECT)}>
            <span className={styles.icon}>
              <img src={Icons.naviWallet} alt="" />
            </span>
            <Typography>{walletAddress}</Typography>
            <span className={styles.icon}>
              <img src={Icons.arrowDown} alt="" />
            </span>
          </Button>
        ) : (
          <Button
            className={styles.wallet}
            onClick={() => openModal(ModalType.WALLET_CONNECT)}>
            <span className={styles.icon}>
              <img src={Icons.naviWallet} alt="" />
            </span>
            <Typography>Connect wallet</Typography>
          </Button>
        )}
        {openedNoti === true ? (
          <div ref={notiRef} className={styles.notis}>
            <Notis />
            <Button
              className={styles.notiBtn}
              onClick={() => setOpenedNoti(false)}>
              <Typography>Close</Typography>
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  )
}
