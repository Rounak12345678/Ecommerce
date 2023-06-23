import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { emailCheck, login, signup } from "../Redux/Crud/loginslice";

export default function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "https://api.escuelajs.co/api/v1/files/f3a5.png",
  });

  const dispatch = useDispatch();

  const onHandleSubmit = () => {
    // const formData = new FormData();
    // Object.keys(user).forEach((item) => formData.append(item, user[item]));
    dispatch(signup(user))
      .unwrap()
      .then((res) => console.log(res, "logres"))
      .catch((err) => console.log(err, "resrerror"));
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="text"
              className="form-control"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={onHandleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
