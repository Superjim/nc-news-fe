import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Login() {
  const { setUser, userList } = useContext(UserContext);

  const handleChange = (event) => {
    const username = event.target.value;
    const userObject = userList.find((user) => user.username === username);
    setUser(userObject);
  };

  return (
    <div className="login-container">
      <h3>Login: </h3>
      <select onChange={handleChange}>
        {userList.map((user) => (
          <option key={user.username} value={user.username}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Login;
