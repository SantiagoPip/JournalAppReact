import React, { useEffect } from 'react'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalApp } from '../JournalApp'
import { Navigate, Route, Routes } from 'react-router-dom'
import { JournalRoutes } from '../journal/route/JournalRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../hooks/useCheckAuth'

export const AppRouter = () => {
 
  const {status } = useCheckAuth()

  if(status === 'checking'){
    return <CheckingAuth/>
  }
  return (
    <Routes>
    {
      (status === 'authenticated')?<Route path = "/*" element={<JournalRoutes/>}/>
      : <Route path = "/auth/*" element={<AuthRoutes/>}/>
    }
    <Route path='/*' element={<Navigate to='auth/login'/>}></Route>
    </Routes>
  )
}
