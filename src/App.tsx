import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom"
import Layout from "./pages/Layout"
import JsonForm from "./components/JsonForm"
import Quill from "./components/Quill"
import routes from "./config/routes"
import "./App.css"

function App() {
  return useRoutes(routes)
}

export default App
