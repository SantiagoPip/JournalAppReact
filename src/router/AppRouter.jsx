import React from 'react'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { JournalApp } from '../JournalApp'
import { Route, Routes } from 'react-router-dom'
import { JournalRoutes } from '../journal/route/JournalRoutes'

export const AppRouter = () => {
  return (
    <Routes>
        {/**Login Registro */}
        <Route path = "/auth/*" element={<AuthRoutes/>}/>
        {/**JOurnal App */}
        <Route path = "/*" element={<JournalRoutes/>}/>
    </Routes>
  )
}
