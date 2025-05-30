import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './routes'
import Navbar from './components/Common/Navbar/Navbar'
import { SnackbarProvider } from './contexts/SnackbarContext'

function App() {

  return (
    <>
      <SnackbarProvider>
        <BrowserRouter>
          <Navbar />
          <div className="p-4">
            <AllRoutes />
          </div>
        </BrowserRouter>
      </SnackbarProvider>

    </>
  )
}

export default App
