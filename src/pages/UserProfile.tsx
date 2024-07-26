import React, { useEffect, useState } from "react";
import { getUserProfile } from "../services/api";
import { useHistory } from "react-router-dom";
import Container from "../components/Container";
import { useAuth } from "../context/Context";

const UserProfile = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState<{
    username: string;
    email: string;
  } | null>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();

        if (response.status === 200) {
          setProfile(response.data);
        } else {
          logout();
        }
      } catch (error) {
        logout();
      }
    };

    fetchProfile();
  }, []);

  return (
    <Container>
      <div className="flex flex-col justify-center items-center ">
        <h2 className="text-lg font-bold mb-10">My Profile</h2>
        {profile ? (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 ">Username</label>
              <p className="bg-gray-100 p-2 rounded-lg">{profile.username}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 ">Email</label>
              <p className="bg-gray-100 p-2 rounded-lg">{profile.email}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Container>
  );
};

export default UserProfile;
