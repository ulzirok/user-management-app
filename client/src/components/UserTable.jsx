import { Container, Table, Form } from "react-bootstrap";

export default function UsersTable({ users, selectedIds, setSelectedIds }) {
  const toggleAll = () => {
    if (selectedIds.length === users.length) setSelectedIds([]);
    else setSelectedIds(users.map((u) => u.id));
  };

  const toggleOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };
  
  return (
    <Table hover bordered responsive="sm">
      <thead className="table-light">
        <tr>
          <th>
            <Form.Check
              checked={selectedIds.length === users.length && users.length > 0}
              onChange={toggleAll}
            />
          </th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Last seen</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Form.Check
                checked={selectedIds.includes(user.id)}
                onChange={() => toggleOne(user.id)}
              />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td
              className={
                user.status === "blocked" ? "text-danger" : "text-success"
              }
            >
              {user.status}
            </td>
            <td>{new Date(user.last_login_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

