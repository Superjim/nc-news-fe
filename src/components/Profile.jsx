import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Login from "./Login";

function Profile() {
  const { user } = useContext(UserContext);
  return (
    <div className="profile-container">
      <Login />
      <h3>{user.username}</h3>
      <img
        className="avatar-url"
        src={user.avatar_url}
        alt={user.username}
      ></img>
    </div>
  );
}

export default Profile;
