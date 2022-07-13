import { useRef, useState } from "react"
import { Input } from "antd"

const InputIME = ({ value, onChange, size }) => {
  const [innerValue, setInnerValue] = useState(value)

  const lockRef = useRef(false)

  const onCompositionStart = () => {
    // console.log("onCompositionStart")
    lockRef.current = true
  }

  const onCompositionEnd = e => {
    // console.log("onCompositionEnd", e)
    lockRef.current = false
    onChange(e.target.value)
  }

  const onInputChange = e => {
    // console.log("onInputChange", e.target.value, lockRef)
    setInnerValue(e.target.value)
    if (!lockRef.current) {
      onChange(e.target.value)
    }
  }

  return (
    <Input
      size={size}
      value={innerValue}
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
      //   onCompositionUpdate={onCompositionUpdate}
      onChange={onInputChange}
    />
  )
}

export default InputIME
