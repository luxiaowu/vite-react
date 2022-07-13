const data = [
  {
    desc: "测试",
    value: "ceshi123123"
  },
  {
    desc: "测试2",
    value: "ceshi12311123"
  }
]

import { useEffect, useRef } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const CustomToolbar = ({ toolbarId }) => (
  <div id={toolbarId} style={{ borderBottom: "none" }}>
    <button className="ql-bold" />
    <select className="ql-color">
      <option value="#ff6a5b" />
      <option value="#000000" />
    </select>

    <button className="ql-clean" />
    {data.map(x => (
      <button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "nowrap",
          border: "1px dashed #ddd",
          width: 40,
          marginRight: 10
        }}
        className="ql-insert"
        value={x.value}
        // id={x.value}
      >
        {x.desc}
      </button>
    ))}

    <button
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        whiteSpace: "nowrap",
        border: "1px dashed #ddd",
        width: 40,
        marginRight: 10
      }}
      className="ql-insert1"
    >
      **个
    </button>
    <button
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        whiteSpace: "nowrap",
        border: "1px dashed #ddd",
        width: 40,
        marginRight: 10
      }}
      className="ql-insert2"
    >
      **
    </button>
  </div>
)

function insert(val) {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, val)
  this.quill.setSelection(cursorPosition + val?.length)
}

function insert1() {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, "**个")
  this.quill.setSelection(cursorPosition + 3)
}

function insert2() {
  const cursorPosition = this.quill.getSelection().index
  this.quill.insertText(cursorPosition, "**")
  this.quill.setSelection(cursorPosition + 2)
}

const CustomerQuill = ({ value = { convertStr: "", str: "" } }) => {
  const handleChange = a => {
    console.log(a, "a")
  }

  const toolbarRef = useRef()
  useEffect(() => {
    toolbarRef.current = `unique-quill-toolbar-${Math.floor(
      Math.random() * 100000000000000
    )}`
  }, [])

  if (!toolbarRef.current) {
    return null
  }
  return (
    <>
      <h1>富文本组件</h1>
      <CustomToolbar toolbarId={toolbarRef.current} />
      <ReactQuill
        placeholder="请输入或插入**元"
        modules={{
          toolbar: {
            container: `#${toolbarRef.current}`,
            handlers: {
              insert,
              insert1,
              insert2
            }
          },
          clipboard: {
            matchVisual: false
          }
        }}
        formats={["bold", "color", "clean"]}
        onChange={handleChange}
        theme="snow"
        style={{ height: 70 }}
      />
    </>
  )
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
CustomerQuill.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      insert,
      insert1,
      insert2
    }
  },
  clipboard: {
    matchVisual: false
  }
}

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
CustomerQuill.formats = ["bold", "color", "clean"]

export default CustomerQuill
