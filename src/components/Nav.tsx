import { FC, useEffect } from "react";
import { useAuth } from "../context/Context";
import { Link, useHistory } from "react-router-dom";

const Nav = () => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-row  justify-between mb-4 w-full px-10 pt-4">
      {user.isLoggedin && (
        <div className="hidden md:flex justify-center gap-1 items-center">
          <span>welcom back</span>{" "}
          <span className="text-blue-800"> {user.username}</span>
        </div>
      )}
      {user.isLoggedin && (
        <div className="flex flex-row space-x-2 md:space-x-4 justify-center items-center">
          <Link to="/profile" className="text-blue-500 hover:text-blue-800">
            My Profiles
          </Link>
          <Link to="/users" className="text-blue-500  hover:text-blue-800">
            All Users
          </Link>
          <button
            className="border rounded-md px-4 py-2 bg-blue-300 hover:bg-blue-800 hover:text-white"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Nav;
