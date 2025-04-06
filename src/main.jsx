import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.jsx"
import { Provider } from 'react-redux'
import PexelsStore from "./Store/PexelsStore.js"
// import { ContactPage, Error404Page, Guest_PagePage, HomePage, Sign_inPage, Sign_upPage } from "./Pages/pages.js"
// import LogoutBtn from './Components/LogoutBtn.jsx'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Loading from "./Components/Loading.jsx"
import { Suspense, lazy } from 'react'
import Error404 from './Components/Error404.jsx'

const queryClient = new QueryClient()

const Guest_PagePage = lazy(() => import("./Pages/Guest_Page_page.jsx"))
const HomePage = lazy(() => import("./Pages/Home_page.jsx"))
const ContactPage = lazy(() => import("./Pages/Contact_page.jsx"))
const LogoutBtn = lazy(() => import("./Components/LogoutBtn.jsx"))
const Sign_inPage = lazy(() => import("./Pages/Sign_in_page.jsx"))
const Sign_upPage = lazy(() => import("./Pages//Sign_up_page.jsx"))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='guestPage' element={<Guest_PagePage />} />
      <Route path='home' element={<HomePage />} />
      <Route path='contact' element={<ContactPage />} />
      <Route path='logoutbtn' element={<LogoutBtn />} />
      <Route path="*" element={<Error404 />} />
      <Route path='sign_in' element={<Sign_inPage />} />
      <Route path='sign_up' element={<Sign_upPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(

  <Provider store={PexelsStore}>
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>

        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  </Provider>
)

