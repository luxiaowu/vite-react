import { useRoutes } from "react-router-dom"
import routes from "./config/routes"
import "./App.css"

function App() {
  return useRoutes(routes)
}

export default App
