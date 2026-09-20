import { Routes, Route } from "react-router"
import Home from "./pages/Home"
import Wiki from "./pages/Wiki"

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wiki" element={<Wiki />} />
        </Routes>
    )
}

export default App