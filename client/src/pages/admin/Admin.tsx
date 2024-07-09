import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegNoteSticky, FaUsers } from "react-icons/fa6";
import "../../styles/admin.scss";
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
  MdOutlineQuestionAnswer,
} from "react-icons/md";
import {
  BsBookmarkDash,
  BsMenuButtonWideFill,
  BsPeopleFill,
} from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { CiSquareQuestion } from "react-icons/ci";

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
                  key: "add-user",
                  label: "Thêm mới tài khoản",
                  icon: <UploadOutlined />,
                },
                {
                  key: "all-user",
                  label: "Tất cả tài khoản",
                  icon: <BsPeopleFill />,
                },
              ],
            },
            {
              key: "courses",
              icon: <MdOutlineMenuOpen />,
              label: "Quản lí khóa luyện thi",
              children: [
                {
                  key: "add-course",
                  label: "Thêm mới khóa luyện thi",
                  icon: <UploadOutlined />,
                },
                {
                  key: "all-course",
                  label: "Tất cả khóa luyện thi",
                  icon: <MdOutlineAlignHorizontalLeft />,
                },
              ],
            },
            {
              key: "subject",
              icon: <SiProducthunt />,
              label: "Quản lí môn thi",
              children: [
                {
                  key: "add-subject",
                  label: "Thêm môn thi",
                  icon: <UploadOutlined />,
                },
                {
                  key: "all-subject",
                  label: "Tất cả môn thi",
                  icon: <CgMenuGridR />,
                },
              ],
            },
            {
              key: "test",
              icon: <BsMenuButtonWideFill />,
              label: "Quản lí đề thi",
              children: [
                {
                  key: "add-test",
                  label: "Thêm mới đề thi",
                  icon: <UploadOutlined />,
                },
                {
                  key: "all-test",
                  label: "Tất cả đề thi",
                  icon: <FaRegNoteSticky />,
                },
              ],
            },
            {
              key: "questions",
              icon: <CiSquareQuestion />,
              label: "Quản lí câu hỏi",
              children: [
                {
                  key: "add-question",
                  label: "Thêm câu hỏi",
                  icon: <UploadOutlined />,
                },
                {
                  key: "all-question",
                  label: "Tất cả câu hỏi",
                  icon: <MdOutlineQuestionAnswer />,
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
