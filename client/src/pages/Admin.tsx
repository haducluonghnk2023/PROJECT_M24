import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUsers, FaVanShuttle } from "react-icons/fa6";
import "../styles/admin.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { SiProducthunt } from "react-icons/si";
import { Outlet, useNavigate } from "react-router-dom";
import {
  MdOutlineAlignHorizontalLeft,
  MdOutlineMenuOpen,
} from "react-icons/md";
import { BsBookmarkDash, BsMenuButtonWideFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";

const { Header, Sider, Content } = Layout;
export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  return (
    <Layout className="">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="flex justify-center my-[30px]">
          <div className="demo-logo-vertical rounded-md flex justify-center items-center bg-white h-[50px] w-[80%]">
            <div className="flex justify-center items-center ">
              <BsBookmarkDash size={25} />
              <p className="">
                <span className="font-bold text-red-600">RESCUE</span>
                <span className="font-bold text-sky-400">-ACE</span>
              </p>
            </div>
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "logout") {
              navigate("/login");
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <LuLayoutDashboard />,
              label: "Dashboard",
            },
            {
              key: "user",
              icon: <FaUsers />,
              label: "Quản lí tài khoản",
              children: [
                {
                  key: "add-exam",
                  label: "Thêm mới tài khoản",
                  icon: <UploadOutlined />,
                },
                {
                  key: "all-user",
                  label: "Tất cả tài khoản",
                  icon: <UploadOutlined />,
                },
              ],
            },
            {
              key: "exam",
              icon: <MdOutlineMenuOpen />,
              label: "Quản lí khóa thi",
              children: [
                {
                  key: "add-exam",
                  label: "Thêm mới khóa thi",
                  icon: <UploadOutlined />,
                },
                {
                  key: "all-exam",
                  label: "Tất cả khóa thi",
                  icon: <MdOutlineAlignHorizontalLeft />,
                },
              ],
            },
            {
              key: "test",
              icon: <BsMenuButtonWideFill />,
              label: "Quản lí bài thi",
              children: [
                {
                  key: "add-test",
                  label: "Thêm mới bài thi",
                  icon: <UploadOutlined />,
                },
                {
                  key: "all-test",
                  label: "Tất cả bài thi",
                  icon: <MdOutlineAlignHorizontalLeft />,
                },
              ],
            },
            {
              key: "subject",
              icon: <SiProducthunt />,
              label: "Quản lí môn học",
              children: [
                {
                  key: "add-subject",
                  label: "Thêm môn học",
                  icon: <UploadOutlined />,
                },
                {
                  key: "all-subject",
                  label: "Tất cả môn học",
                  icon: <MdOutlineAlignHorizontalLeft />,
                },
              ],
            },
            {
              key: "logout",
              icon: <IoIosLogOut />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
}
