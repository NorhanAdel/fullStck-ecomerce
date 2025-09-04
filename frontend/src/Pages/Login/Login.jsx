import React, { useState } from "react";
import "./Login.css";

export const Login = () => {
  const [state, setState] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("login", formData);
     let responseData;
     await fetch("http://localhost:4000/login", {
       // corrected URL
       method: "POST",
       headers: {
         Accept: "application/json", // corrected Content-Type
         "Content-Type": "application/json",
       },
       body: JSON.stringify(formData),
     })
       .then((res) => res.json())
       .then((data) => (responseData = data));

     if (responseData.success) {
       localStorage.setItem("auth-token", responseData.token);
       window.location.replace("/");
     } else {
       alert(responseData.errors);
     }
  };

  const register = async () => {
    console.log("register", formData);
    let responseData;
    await fetch("http://localhost:4000/register", {
      // corrected URL
      method: "POST",
      headers: {
        Accept: "application/json", // corrected Content-Type
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    }
    else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="loginSignup">
      <div className="loginSignup-container">
        <h1>{state}</h1>
        <div className="loginSignUp-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={changeHandler}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
          />
          <input
            type="password"
            placeholder="Password" // corrected placeholder
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        <button
          onClick={() => {
            state === "login" ? login() : register();
          }}
        >
          Continue
        </button>
        {state === "login" ? (
          <p className="loginSignup-login">
            Create An Account {/* corrected typo */}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="loginSignup-login">
            Already Have An Account {/* corrected typo */}
            <span
              onClick={() => {
                setState("login");
              }}
            >
              Login here
            </span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>
            By continuing, I agree with the Terms of Use, Privacy & Policy
          </p>{" "}
          {/* corrected typos */}
        </div>
      </div>
    </div>
  );
};
