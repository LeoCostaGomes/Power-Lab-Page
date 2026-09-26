import { Routes, Route } from "react-router"
import { AuthProvider } from "./auth/AuthContext"
import RequireAuth from "./routes/RequireAuth"
import GuestOnly from "./routes/GuestOnly"
import Home from "./pages/Home"
import Wiki from "./pages/Wiki"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route element={<GuestOnly />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                </Route>

                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/wiki" element={<Wiki />} />
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App