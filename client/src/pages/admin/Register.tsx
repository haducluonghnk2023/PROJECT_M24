import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
interface FormData {
  email: string;
  username: string;
  password: string;
  repassword: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    repassword: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    // Kiểm tra email
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Định dạng email không hợp lệ";
      }
    }

    // Kiểm tra username
    if (!formData.username) {
      newErrors.username = "Username không được để trống";
    } else if (formData.username.length < 6) {
      newErrors.username = "Username phải có ít nhất 6 kí tự";
    } else if (/[^a-zA-Z0-9]/.test(formData.username)) {
      newErrors.username = "Username không được chứa kí tự đặc biệt";
    }

    // Kiểm tra password
    if (!formData.password) {
      newErrors.password = "Password không được để trống";
    } else if (formData.password.length < 7) {
      newErrors.password = "Password phải có ít nhất 7 kí tự";
    }

    // Kiểm tra repassword
    if (!formData.repassword) {
      newErrors.repassword = "Vui lòng xác nhận lại mật khẩu";
    } else if (formData.repassword !== formData.password) {
      newErrors.repassword = "Mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      bcrypt
        .hash(formData.password, 10)
        .then((hashedPassword: string) => {
          bcrypt
            .hash(formData.repassword, 10)
            .then((hashedRepassword: string) => {
              const userData = {
                ...formData,
                password: hashedPassword,
                repassword: hashedRepassword,
              };

              axios
                .post("http://localhost:8080/users", userData)
                .then((response) => {
                  console.log("Đăng ký thành công:", response.data);
                  navigate("/login");
                })
                .catch((error) => {
                  console.error("Lỗi khi đăng ký:", error);
                });
            })
            .catch((hashError: any) => {
              console.error("Lỗi khi mã hóa mật khẩu xác nhận:", hashError);
            });
        })
        .catch((hashError: any) => {
          console.error("Lỗi khi mã hóa mật khẩu:", hashError);
        });
    }
  };

  return (
    <div>
      <section className="flex flex-col items-center pt-6">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Tạo tài khoản
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className={`bg-gray-50 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="Admin@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên người dùng
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className={`bg-gray-50 border ${
                    errors.username ? "border-red-500" : "border-gray-300"
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  placeholder="admin123"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={`bg-gray-50 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="repassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nhập lại mật khẩu
                </label>
                <input
                  type="password"
                  name="repassword"
                  id="repassword"
                  placeholder="••••••••"
                  className={`bg-gray-50 border ${
                    errors.repassword ? "border-red-500" : "border-gray-300"
                  } text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                  value={formData.repassword}
                  onChange={handleChange}
                />
                {errors.repassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.repassword}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Tạo tài khoản
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Đã có tài khoản?{" "}
                <a
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  href="/login"
                >
                  Đăng nhập tại đây
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
