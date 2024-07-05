import "../styles/allUser.css";
export default function AllUser() {
  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Ngày sinh</th>
            <th>Role</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          <td>hoa</td>
          <td>hoa@gmail.com</td>
          <td>06/10/2002</td>
          <td>user</td>
          <td>
            <button className="btn-edit">Sửa</button>
            <button className="btn-delete">Xóa</button>
          </td>
        </tbody>
      </table>
    </div>
  );
}
