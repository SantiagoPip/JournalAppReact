import React from 'react'
import { AppRouter } from './router/AppRouter'
import { JournalPage } from './journal/pages/JournalPage'
import { AppTheme } from './theme'

export const JournalApp = () => {
  return (
    <>
    <AppTheme>
        <AppRouter/>
    </AppTheme>
    </>
  )
}
