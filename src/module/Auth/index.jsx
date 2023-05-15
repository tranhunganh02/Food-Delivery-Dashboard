import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import React, { useState } from "react";
import "../../assets/vendor/css/core.css";
import "../../assets/vendor/css/pages/page-auth.css";
import { useNavigate } from "react-router-dom";
function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async (e) => {
    e.preventDefault();
    const emailI = email;
    const passwordI = password;
    try {
      await signInWithEmailAndPassword(auth, emailI, passwordI);
      navigate("/");
    } catch (err) {
      console.log("false");
    }
  };
  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center"></div>
              <h3 className="mb-2">Welcome to Admin Delivery Food! 👋</h3>

              <form id="formAuthentication" className="mb-3">
                <div className="mb-3">
                  <label  className="form-label">
                    Email or Username
                  </label>
                  <input
                    type="email"
                    label="Email address"
                    className="form-control"
                    id="email"
                    name="email-username"
                    placeholder="Enter your email or username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3 form-password-toggle">
                  <div className="d-flex justify-content-between">
                    <label className="form-label">
                      Password
                    </label>
                    <a href="auth-forgot-password-basic.html">
                      <small>Forgot Password?</small>
                    </a>
                  </div>
                  <div className="input-group input-group-merge">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter password"
                      value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required       
                    />
                    <span className="input-group-text cursor-pointer">
                      <i className="bx bx-hide"></i>
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="remember-me"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-primary d-grid w-100"
                    type="submit" 
                    onClick={handleSignIn}       
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

const styles = {
  Cricle1: {
    position: "absolute",
    width: 96,
    height: 96,
    left: 220,
    top: -5,
    borderRadius: 100,
    backgroundColor: "#9BA0B3",
  },
  Cricle2: {
    position: "absolute",
    width: 165,
    height: 165,
    left: -30,
    top: -15,
    backgroundColor: "#E4CFCA",
    borderRadius: 100,
  },
  Circle3: {
    position: "absolute",
    width: 181,
    height: 181,
    left: 298,
    top: -70,
    backgroundColor: "#A87956",
    borderRadius: 100,
  },
  form: {
    width: 400,
    height: 600,
  },
  input: {
    height: 350,
    width: "100%",
    justifyContent: "space-evenly",
  },
  input2: {
    height: 350,
    width: "100%",
    justifyContent: "space-evenly",
  },
  text: {
    color: "#9796A1",
    fontWeight: "300",
    fontSize: 20,
  },
  inputText: {
    width: "100%",
    height: 600,
    fontSize: 20,
    borderColor: "#C4C4C4",
    borderRadius: 15,
    borderWidth: 0.5,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  actionContainer: {
    height: 600,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonAction: {
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    height: 60,
    backgroundColor: "#DC7255",
  },
  socialContainer: {
    marginTop: 150,
    width: 400,
    height: 600,
    justifyContent: "center",
  },
  socialHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 600,
    alignItems: "center",
  },
  socialBottom: {
    width: "100%",
    height: 100,
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
  },
  socialButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    width: 4008,
    height: 55,
    justifyContent: "space-evenly",
  },
};
