import "./App.css"
import { Link, BrowserRouter, Routes, Route } from "react-router-dom"
import JsonForm from "./components/JsonForm"
import "antd/dist/antd.css"

const basename = process.env.NODE_ENV === "production" ? "/vite-react" : "/"

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<JsonForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
