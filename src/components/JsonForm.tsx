import { Button, Form, Input, Tree } from "antd"
import { useState } from "react"
import { recursiveSetKey } from "../utils"
import { set, get, initial, last } from "lodash/fp"
import ReactJson from "react-json-view"

interface TreeNodeData {
  label: string
  name?: string
  type?: string
  value?: string
  children?: TreeNodeData[]
  key?: string
}

const JsonForm = () => {
  const [data, setData] = useState<TreeNodeData[]>(
    recursiveSetKey([
      { label: "标题", name: "title", value: "标题1" },
      {
        label: "按钮",
        name: "buttons",
        type: "array",
        children: [
          {
            label: "按钮",
            children: [
              { label: "名称", name: "name", value: "确定" },
              {
                label: "动作",
                name: "action",
                children: [
                  {
                    label: "点击",
                    name: "click",
                    value: "aaa",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: "模板",
        name: "template",
        children: [
          {
            label: "按钮",
            name: "buttons",
            type: "array",
            children: [
              {
                label: "按钮",
                children: [
                  { label: "名称", name: "name" },
                  {
                    label: "动作",
                    name: "action",
                    children: [
                      {
                        label: "点击",
                        name: "click",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ])
  )

  const add =
    ({ key, children }) =>
    () => {
      const nextData = set(
        `${key}.children`,
        [...children, { ...children[0], key: undefined }],
        data
      )
      setData(recursiveSetKey(nextData))
    }

  const remove = key => () => {
    const parentKey = initial(key.split(".")).join(".")
    const parentChildren = get(parentKey, data)
    // console.log(key, parentKey, parentChildren)
    const nextData = set(
      parentKey,
      parentChildren.filter(x => x.key !== key),
      data
    )
    setData(recursiveSetKey(nextData))
  }

  const onChange = key => e => {
    const nextData = set(`${key}.value`, e.target.value, data)
    // console.log(key, nextData)
    setData(nextData)
  }

  const getValue = arr =>
    arr.reduce(
      (acc, cur) => ({
        ...acc,
        [cur.name]: cur.children ? getValue(cur.children) : cur.value,
      }),
      {}
    )

  const getFormData = data =>
    data.reduce((acc, cur) => {
      // console.log(acc, cur)
      if (cur.type === "array") {
        acc[cur.name] = cur.children.map(x => getValue(x.children))
      } else if (cur.children) {
        acc[cur.name] = getFormData(cur.children)
      } else {
        acc[cur.name] = cur.value
      }
      return acc
    }, {})

  const formData = getFormData(data)
  console.log(formData)

  const renderTreeNode = (treeData: TreeNodeData[]) =>
    treeData.map(x => {
      if (x.children) {
        const parentKey = initial(x.key!.split(".")).join(".")
        const parentChildren = get(parentKey, data)
        return (
          <Tree.TreeNode
            disabled={!x.name}
            title={
              <>
                {x.label}
                {!x.name && +last(x.key!.split(".")) + 1}
                {x.type === "array" && (
                  <Button size="small" type="link" onClick={add(x)}>
                    增加一项
                  </Button>
                )}
                {!x.name && parentChildren.length > 1 && (
                  <Button size="small" type="link" onClick={remove(x.key)}>
                    删除
                  </Button>
                )}
              </>
            }
            key={x.key}
          >
            {renderTreeNode(x.children)}
          </Tree.TreeNode>
        )
      }
      return (
        <Tree.TreeNode
          title={
            <Form layout="inline">
              <Form.Item label={x.label}>
                <Input
                  size="small"
                  value={x.value}
                  onChange={onChange(x.key)}
                />
              </Form.Item>
            </Form>
          }
          key={x.key}
        />
      )
    })

  return (
    <div style={{ display: "flex", paddingTop: 50 }}>
      <ReactJson src={data} collapsed={3} displayDataTypes={false} />
      <Tree showLine selectable={false} defaultExpandAll>
        {renderTreeNode(data)}
      </Tree>
      <ReactJson src={formData} collapsed={3} displayDataTypes={false} />
    </div>
  )
}

export default JsonForm
