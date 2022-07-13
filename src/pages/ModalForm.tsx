import React, { Component, createRef } from "react"
import { Button, Drawer, Form, Input } from "antd"

export class ModalForm extends Component {
  //   formRef: any
  //   constructor(props) {
  //     super(props)
  //     this.state = {
  //       visible: false
  //     }
  //     this.formRef = createRef()
  //   }

  formRef = createRef()

  state = {
    visible: false
  }

  render() {
    console.log(this.formRef)
    const { visible } = this.state
    return (
      <>
        <Button
          onClick={() => {
            this.setState({ visible: true })
          }}
        >
          打开Drawer
        </Button>
        <Form ref={this.formRef}>
          <Drawer visible={visible}>
            <Form.Item>
              <Input />
            </Form.Item>
          </Drawer>
        </Form>
      </>
    )
  }
}

export default ModalForm
