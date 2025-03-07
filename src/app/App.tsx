import { Login } from "@/features/auth";
import { Register } from "@/features/auth";
import { Logout } from "@/features/auth";

function App() {

  return (
    <div>
      <Register />
      <Login />
      <Logout />
    </div>
  )
}

export default App
