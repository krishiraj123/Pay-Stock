import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [firstnameErr, setFirstnameErr] = useState("");
  const [lastnameErr, setLastnameErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const sendDate = async () => {
    try {
      if (localStorage.getItem("token")) {
        Swal.fire({
          position: "bottom-end",
          icon: "error",
          title: "Please sign out first!",
          showConfirmButton: false,
          timer: 2500,
        });
        return;
      }
      const res = await axios.post("http://localhost:3001/api/v1/user/signup", {
        username: username,
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      console.log(res.data);
      navigate("/signin");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const usernameregex = /^(?![0-9])\w{8,20}$/i;
    const passregex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/i;
    const nameregex = /^[A-Za-z]+$/i;
    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

    let usernameError = "";
    let passwordError = "";
    let firstnameError = "";
    let lastnameError = "";
    let emailError = "";

    if (username === "") {
      usernameError = "Username is required";
    } else if (!usernameregex.test(username)) {
      usernameError =
        "Username must be between 8 and 20 characters and must not start with a number";
    }

    if (password === "") {
      passwordError = "Password is required";
    } else if (!passregex.test(password)) {
      passwordError =
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character and the length must be between 6 and 15 characters";
    }

    if (firstname === "") {
      firstnameError = "Firstname is required";
    } else if (!nameregex.test(firstname)) {
      firstnameError = "Firstname must contain only alphabets";
    }

    if (lastname === "") {
      lastnameError = "Lastname is required";
    } else if (!nameregex.test(lastname)) {
      lastnameError = "Lastname must contain only alphabets";
    }

    if (email === "") {
      emailError = "Email is required";
    } else if (!emailregex.test(email)) {
      emailError = "Email is not in valid format";
    }

    setUsernameErr(usernameError);
    setPasswordErr(passwordError);
    setFirstnameErr(firstnameError);
    setLastnameErr(lastnameError);
    setEmailErr(emailError);

    if (!usernameError && !passwordError && !firstnameError && !lastnameError) {
      sendDate();
      console.log("Form submitted successfully!");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="src\assets\images\user_logo.png"
            alt="PayStack"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {usernameErr.length > 0 && (
                <p className="text-red-600">{usernameErr}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {firstnameErr.length > 0 && (
                <p className="text-red-600">{firstnameErr}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={(e) => setLastname(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {lastnameErr.length > 0 && (
                <p className="text-red-600">{lastnameErr}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {emailErr.length > 0 && (
                <p className="text-red-600">{emailErr}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {passwordErr.length > 0 && (
                  <p className="text-red-600">{passwordErr}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-4"
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
