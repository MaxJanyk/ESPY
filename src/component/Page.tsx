import * as React from 'react'
import content_ from '../sass/content.module.sass'
import {useDispatch, useSelector} from '../store'
import {getUser} from '../store/user/actionCreator'
import {Header} from '../container/main/Header'
import {Navbar} from '../container/main/Navbar'
import {LocalStorage} from '../function/localStorage'

type Props = {
  children: any
}

const navbarLocalStorageStatus = localStorage.getItem(LocalStorage.NAVBAR_STATUS) || 'true'
const localStorageNavbarOpen = navbarLocalStorageStatus === 'true'

const mdWidth = 960

const handleOnload = () => {
  const width = window.innerWidth
  const isMobile = width < mdWidth

  if (isMobile) return false
  else return localStorageNavbarOpen
}

export function Page({children}: Props) {
  const dispatch = useDispatch()

  const isRtl = useSelector(state => state.common.isRtl)
  const isUserFetched = useSelector(state => state.user.isUserFetched)

  const handleResize = React.useCallback(() => {
    const width = window.innerWidth
    const isMobile = width < mdWidth

    setIsMobile(isMobile)

    if (isMobile) setNavbarOpen(false)
    else setNavbarOpen(localStorageNavbarOpen)
  }, [])

  const [navbarOpen, setNavbarOpen] = React.useState<boolean>(handleOnload())
  const [isMobile, setIsMobile] = React.useState<boolean>()

  React.useEffect(() => {
    if (!isUserFetched) dispatch(getUser)
  }, [isUserFetched, dispatch])

  React.useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  const handleNavbarOpen = (status: boolean) => {
    setNavbarOpen(status)
    localStorage.setItem(LocalStorage.NAVBAR_STATUS, String(status))
  }

  let contentClassName = navbarOpen ? content_.root_narrow : content_.root_wide
      contentClassName = isMobile ? content_.root_mobile : contentClassName
      contentClassName = `${contentClassName} ${isRtl ? content_.root_rtl : content_.root_ltr}`

  return (
    <>
      <Header/>

      <Navbar navbarOpen={navbarOpen} setNavbarOpen={handleNavbarOpen}/>

      <div className={contentClassName}>
        {children}
      </div>
    </>
  )
}