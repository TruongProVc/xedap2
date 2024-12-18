import React from "react";
import '../User/Login.css'
import { Link } from "react-router-dom";
const Register =()=>{
    return(     
        <div className="container">
        <div className="circle circle1" />
        <div className="circle circle2" />
        <div className="circle circle3" />
        <div className="circle circle4" />
        <div className="form-container">
          <div className="register-container">
            <h2>Đăng kí</h2>
            <form id="registerForm">
              <div className="input-group">
                <input
                  type="text"
                  id="regUsername"
                  placeholder="Username"
                  required=""
                />
              </div>
              <div className="input-group">
                <input type="email" id="regEmail" placeholder="Email" required="" />
              </div>
              <div className="input-group">
                <input
                  type="password"
                  id="regPassword"
                  placeholder="Password"
                  required=""
                />
              </div>
              <button type="submit" className="login-btn">
                Đăng ký
              </button>
            </form>
            <div className="register-link">
              <p>
                Đã có tài khoản? Hãy nhấn vào <a href="#">Login</a>
              </p>  
            </div>
          </div>
        </div>
      </div>
    )
}
export default Register;