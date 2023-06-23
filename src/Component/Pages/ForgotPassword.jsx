import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ForgetPasswordUser, ForgotPassword2 } from "../Redux/Crud/loginslice";

export default function ForgotPassword() {
  const [user, setUser] = useState({
    email: "",
  });
const dispatch = useDispatch()
const onSubmit = ()=>{
    dispatch(ForgotPassword2(user))
    .unwrap()
    .then((res) => alert(res.message))
    .catch((err) => console.log(err));
}

  return (
    <div>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="text"
          className="form-control"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <button
            type="button"
            className="btn btn-primary"
        onClick={onSubmit}
          >
            Submit
          </button>
    </div>
  );
}
// rounak.barman@gmail.com