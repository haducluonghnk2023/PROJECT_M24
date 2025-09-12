import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { confirmLogout, showSuccess } from "../../utils/confirmDialog";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      const confirmed = await confirmLogout();
      if (confirmed) {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("adminToken");
        showSuccess("Đăng xuất thành công", "Bạn đã đăng xuất khỏi hệ thống!");
        setTimeout(() => {
          navigate("/admin/login");
        }, 3000);
      } else {
        navigate("/admin");
      }
    };

    handleLogout();
  }, [navigate]);

  return <div>Đang đăng xuất...</div>;
}
