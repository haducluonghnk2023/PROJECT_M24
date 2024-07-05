import { useEffect } from "react";
import "../styles/allUser.css";
import { fetchUsers, updateUserStatus } from "../store/reducers/adminReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";

interface User {
  id: number;
  username: string;
  email: string;
  birthdate: string;
  role: string;
  status: number;
}

export default function AllUser() {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.admin.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const toggleUserStatus = (userId: number) => {
    const userToUpdate = users.find((user: User) => user.id === userId);
    if (userToUpdate) {
      const updatedStatus = userToUpdate.status === 1 ? 0 : 1;
      dispatch(updateUserStatus({ userId, status: updatedStatus }));
    }
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
          {users.map((user: User) => (
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
