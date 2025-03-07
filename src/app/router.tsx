import { LoginPage, ProfilePage, RegisterPage } from "@/pages"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const routes = {
  auth: {
    login: '/login',
    register: '/register'
  },
  user: {
    profile: '/',
  }
}

export const AppRoutes: React.FC = () => {
  return (<BrowserRouter>
    <Routes>
      <Route path={routes.auth.login} element={<LoginPage />} />
      <Route path={routes.auth.register} element={<RegisterPage />} />
      <Route path={routes.user.profile} element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>)
}