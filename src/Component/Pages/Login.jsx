import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Crud/loginslice";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const onHandleSubmit = () => {
    // const formData = new FormData();
    // Object.keys(user).forEach((item) => formData.append(item, user[item]));
    dispatch(login(user))
      .unwrap()
      .then((res) => console.log(res, "hello"))
      .catch((err) => console.log(err?.msg, "error"));
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
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
// rounak.barman@gmail.com
