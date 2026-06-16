import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import UsersHeader from "../../components/dashboard/UsersHeader";
import UsersTable from "../../components/dashboard/UsersTable";
import ViewUserModal from "../../components/dashboard/ViewUserModal";
import UpdateUserModal from "../../components/dashboard/UpdateUserModal";

const Users = () => {
  const { token } = useSelector((state) => state.auth);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [viewModal, setViewModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/users/read", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setUsers(data.users || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        getUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <UsersHeader totalUsers={users.length} />

      <UsersTable
        users={users}
        loading={loading}
        onView={(user) => {
          setSelectedUser(user);
          setViewModal(true);
        }}
        onEdit={(user) => {
          setSelectedUser(user);
          setUpdateModal(true);
        }}
        onDelete={handleDelete}
      />

      <ViewUserModal
        open={viewModal}
        setOpen={setViewModal}
        user={selectedUser}
      />

      <UpdateUserModal
        open={updateModal}
        setOpen={setUpdateModal}
        user={selectedUser}
        refreshUsers={getUsers}
      />
    </div>
  );
};

export default Users;
