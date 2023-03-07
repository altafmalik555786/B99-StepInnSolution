import { useLocation } from 'react-router-dom'
import React from 'react'
import { observer } from 'mobx-react-lite'
import { constRoute } from '@utils/route'
import PrivateLayout from './main-layout/private-layout'
import PublicLayout from './main-layout/public-layout'

const DefaultLayout = observer(() => {
  const router = useLocation()
  const path = router.pathname

  const publicPages = [
    constRoute.login,
  ]

  return publicPages.includes(path) ? <PublicLayout /> : <PrivateLayout />
})

export default DefaultLayout
