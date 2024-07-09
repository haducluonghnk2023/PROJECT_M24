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
        <option value="">Sắp xếp :</option>
        <option value="">Tăng dần</option>
        <option value="">Giảm dần</option>
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
                {user.status === 1 && user.role === 0 ? (
                  <button
                    className="btn-lock"
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    Khóa
                  </button>
                ) : (
                  ""
                )}
                {user.status === 0 && user.role === 0 ? (
                  <button
                    className="btn-lock"
                    onClick={() => toggleUserStatus(user.id)}
                  >
                    Mở Khóa
                  </button>
                ) : (
                  ""
                )}

                {user.role == 1 ? (
                  <button className="btn-lock" disabled>
                    Disabled
                  </button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
