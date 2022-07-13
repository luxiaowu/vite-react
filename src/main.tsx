import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "antd/dist/antd.css"
import "./index.css"
import { BrowserRouter } from "react-router-dom"

const basename = process.env.NODE_ENV === "production" ? "/vite-react" : "/"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
