"use client";
import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Layout, Menu, MenuProps, message, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { SetLoading } from "@/redux/loadersSlice";
import { SetCurrentUser } from "@/redux/usersSlice";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
interface UserType {
  username: string; // Use the custom ProductId type
  _id: string;
};
function LayoutProvider({ children }: { children: React.ReactNode }) {
  const { currentUser } = useSelector((state: any) => state.users);
  const { loading } = useSelector((state: any) => state.loaders);
  const router = useRouter();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await axios.get("/api/currentuser");
      dispatch(SetCurrentUser(response.data.data));
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
      message.error("Please clear your cookies and try again");
    } finally {
      dispatch(SetLoading(false));
    }
  };
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/login" && !currentUser) {
      getCurrentUser();
    }
   
  
  }, [pathname]);
  const onLogout = async () => {
    try {
      dispatch(SetLoading(true));
      await axios.post("/api/logout");
      message.success("Logged out successfully");
      dispatch(SetCurrentUser(null));
      router.push("/login");
    } catch (error: any) {
      message.error(error.response.data.message || "Something went wrong");
    } finally {
      dispatch(SetLoading(false));
    }
  };
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key == 'logout') {
      onLogout()
    }
    if (e.key == '2') {
      router.push("/admin/questions");
    }
    if (e.key == '1') {
      router.push("/");
    }
  };
const getSelectedKeys=()=>{
  if (pathname.startsWith("/admin")) {
    return['2']
  } else {
    return['1']
  }
}
  const getItemsMenu = () => {
    if (currentUser.isAdmin) {
      return [
        {
          key: '1',
          icon: <VideoCameraOutlined />,
          label: 'Test',
        },
        {
          key: '2',
          icon: <VideoCameraOutlined />,
          label: 'Admin',
        },
        {
          key: 'logout',
          icon: <VideoCameraOutlined />,
          label: 'Logout',
          danger: true,
        },
      ]
    } else {
      return [
        {
          key: '1',
          icon: <VideoCameraOutlined />,
          label: 'Test',
        },
        {
          key: 'logout',
          icon: <VideoCameraOutlined />,
          label: 'Logout',
          danger: true,
        },
      ]
    }
  }
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "blue",
            },
          }}
        >
          {loading && <Loader />}
          {pathname === "/login" ? (
            <div>{children}</div>
          ) : (
            currentUser && (
              <Layout >
                <Sider style={{ height: "5000px", overflow: "auto" }} trigger={null} collapsible collapsed={collapsed}>
                  <div className="demo-logo-vertical" />
                  <div style={{ color: "white", display: "flex", justifyContent: "center", marginLeft: '-10px' }}><UserOutlined />&nbsp;&nbsp;{currentUser.username}</div>
                  <Menu
                    onClick={onClick}
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={getSelectedKeys()}
                    items={getItemsMenu()}
                  />
                </Sider>
                <Layout>
                  <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                      type="text"
                      icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                      onClick={() => setCollapsed(!collapsed)}
                      style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                      }}
                    />
                  </Header>
                  <Content
                    style={{
                      margin: '24px 16px',
                      padding: 24,
                      minHeight: 280,
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                    }}
                  >
                    {children}
                  </Content>
                </Layout>
              </Layout>
            )
          )}
        </ConfigProvider>
      </body>
    </html>
  );
}
export default LayoutProvider;
