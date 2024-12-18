import React from "react";
import { Link } from "react-router-dom";
import '../User/Login.css'
const Login =()=>{
    return(
      <div className="container">
      <div className="circle circle1" />
      <div className="circle circle2" />
      <div className="circle circle3" />
      <div className="circle circle4" />
      <div className="form-container">
        <div className="login-container">
          <h2>Đăng nhập</h2>
          <form id="loginForm">
            <div className="input-group">
              <input
                type="text"
                id="username"
                placeholder="Username"
                required=""
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder="Password"
                required=""
              />
            </div>
            <button type="submit" className="login-btn">
              Đăng nhập
            </button>
          </form>
          <div className="register-link">
            <p>
              Bạn chưa có tài khoản? Hãy nhấn vào{" "}
              <a href="@" >Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    )
}
export default Login;