import React from 'react'
import WineList from './components/WineList'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import theme from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WineList />
    </ThemeProvider>
  )
}

export default App;
