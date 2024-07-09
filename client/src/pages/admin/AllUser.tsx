import { useEffect } from "react";
import "../../styles/allUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchUsers, updateUserStatus } from "../../service/course.servce";
import { User } from "../../store/interface/interface";

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
      <input className="int" type="text" placeholder="Nhập tên cần tìm kiếm" />
      <select name="" id="">
        <option value="">Sắp xếp theo:</option>
        <option value="">Tên</option>
        <option value="">Email</option>
      </select>
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
