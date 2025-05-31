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
          <div className="grid grid-cols-12 gap-0">
            <div className="col-start-2 col-end-12">
              <AllRoutes />
            </div>
          </div>
        </BrowserRouter>
      </SnackbarProvider>

    </>
  )
}

export default App
