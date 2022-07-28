import JsonForm from "../components/JsonForm"
import Layout from "../pages/Layout"
import Editor from "../components/Editor"
import ModalForm from "../pages/ModalForm"

export default [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "json-form", element: <JsonForm /> },
      {
        path: "editor",
        element: <Editor />
      },
      { path: "form", element: <ModalForm /> },
      { path: "*", element: <div>404 not found</div> }
    ]
  }
]
