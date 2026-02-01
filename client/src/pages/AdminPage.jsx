import { Container } from "react-bootstrap";
import Header from "../components/Header";
import Toolbar from "../components/Toolbar";
import UserTable from "../components/UserTable.jsx";
import { useState, useEffect } from "react";
import { getUsers, deleteUsers, updateUsersStatus } from "../api/users.api";
import { toast } from "react-toastify";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      if (err.response?.status === 401) {
        window.location.href = "/login";
      }
      const errorMessage =
        err.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAction = async (action, status = null) => {
    try {
      if (action === "delete") {
        await deleteUsers(selectedIds);
        toast.success("User is deleted");
      } else {
        await updateUsersStatus(selectedIds, status);
        toast.success(`Status changed to ${status}`);
      }
      setSelectedIds([]);
      fetchUsers();
    } catch (err) {
      if (err.response?.status === 401) window.location.href = "/login";
      const errorMessage =
        err.response?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Header />
      <Container fluid className="p-4">
        <Toolbar
          onAction={handleAction}
          hasSelection={selectedIds.length > 0}
          selectedUsers={users.filter((u) => selectedIds.includes(u.id))}
        />
        <UserTable
          users={users}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </Container>
    </>
  );
}
