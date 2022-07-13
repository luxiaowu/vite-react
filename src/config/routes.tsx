import JsonForm from "../components/JsonForm"
import Layout from "../pages/Layout"
import Quill from "../components/Quill"
import Editor from "../components/Quill2"
import ModalForm from "../pages/ModalForm"

export default [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "jsonForm", element: <JsonForm /> },
      { path: "quill", element: <Quill /> },
      {
        path: "quill-official",
        element: <Editor placeholder="Write something or insert a star ★" />
      },
      { path: "form", element: <ModalForm /> },
      { path: "*", element: <div>404 not found</div> }
    ]
  }
]
