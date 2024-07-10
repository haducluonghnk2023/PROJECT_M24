import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../../styles/allUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchUsers, updateUserStatus } from "../../service/course.servce";
import { User } from "../../store/interface/interface";

export default function AllUser() {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.admin.users);

  const [searchUser, setSearchUser] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 2;
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    dispatch(fetchUsers({ searchUser }));
  }, [dispatch, searchUser]);

  const toggleUserStatus = (userId: number) => {
    const userToUpdate = users.find((user: User) => user.id === userId);

    if (userToUpdate) {
      const updatedStatus = userToUpdate.status === 1 ? 0 : 1;
      dispatch(updateUserStatus({ userId, status: updatedStatus }));
    }
  };

  const sortedUsers = () => {
    switch (sortBy) {
      case "increase":
        return [...users].sort((a, b) => a.username.localeCompare(b.username));
      case "decrease":
        return [...users].sort((a, b) => b.username.localeCompare(a.username));
      default:
        return users;
    }
  };

  const pageCount = Math.ceil(sortedUsers().length / usersPerPage);
  const offset = currentPage * usersPerPage;
  const currentUsers = sortedUsers().slice(offset, offset + usersPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="table-container">
      <input
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
        className="int"
        type="text"
        placeholder="Nhập tên cần tìm kiếm"
      />
      <select name="" id="" onChange={handleSortChange}>
        <option value="">Sắp xếp :</option>
        <option value="increase">Tăng dần</option>
        <option value="decrease">Giảm dần</option>
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
          {currentUsers.map((user: User) => (
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

                {user.role === 1 ? (
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
      <ReactPaginate
        previousLabel={"Trước"}
        nextLabel={"Sau"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}
