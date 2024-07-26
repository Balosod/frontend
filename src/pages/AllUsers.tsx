import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/api";
import { useHistory } from "react-router-dom";
import Container from "../components/Container";
import { useAuth } from "../context/Context";

const AllUsers = () => {
  const { logout } = useAuth();
  const [users, setUsers] = useState<{ username: string; email: string }[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();

        if (response.status === 200) {
          setUsers(response.data);
        } else {
          logout();
          logout();
        }
      } catch (error) {
        logout();
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <div className="flex flex-col  items-center px-10 pt-4 w-full">
        <h2 className="text-lg font-bold mb-10">All Users</h2>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full  border text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">S/N</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{index + 1}</td>
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default AllUsers;
