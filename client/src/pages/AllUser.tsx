import { useEffect, useState } from "react";
import "../styles/allUser.css";
import axios from "axios";
interface User {
  id: number;
  username: string;
  email: string;
  birthdate: string;
  role: string;
  status: number;
}
export default function AllUser() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("err:", error);
      });
  }, []);

  const toggleUserStatus = (userId: number) => {
    const updatedUsers: any = users.map((user) => {
      if (user.id === userId) {
        let result = { ...user, status: user.status === 1 ? 0 : 1 };
        axios.put(`http://localhost:8080/users/${user.id}`, result);
      } else {
        return user;
      }
    });
    console.log(updatedUsers);
  };

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn-lock"
                  onClick={() => toggleUserStatus(user.id)}
                >
                  {user.status === 1 ? "Khóa" : "Mở khóa"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
