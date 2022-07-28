import { createElement } from "react"
import { Link, Outlet } from "react-router-dom"
import { Layout, Menu } from "antd"
import menus from "./menus"
import "./index.css"

const MainLayout = ({}) => {
  return (
    <Layout style={{ height: "100%" }}>
      <Layout.Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          // console.log(broken)
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type)
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          {menus.map(x => (
            <Menu.Item key={x.key} icon={createElement(x.icon)}>
              <Link to={x.to}>{x.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header
          className="site-layout-sub-header-background"
          style={{
            padding: 0
          }}
        />
        <Layout.Content
          style={{
            margin: "24px 16px 0",
            overflow: "auto"
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360
            }}
          >
            {/* {children} */}
            <Outlet />
          </div>
        </Layout.Content>
        <Layout.Footer
          style={{
            textAlign: "center"
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Layout.Footer>
      </Layout>
    </Layout>
  )
}

export default MainLayout
