import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css"

const Register = () => {

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: "",
        gender: ""
    });

    const setVal = (e) => {
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword, gender } = inpval;

        if (fname === "") {
            toast.warning("Name is required!", { position: "top-center" });
        } else if (email === "") {
            toast.error("Email is required!", { position: "top-center" });
        } else if (!email.includes("@")) {
            toast.warning("Invalid email!", { position: "top-center" });
        } else if (gender === "") {
            toast.error("Please select gender!", { position: "top-center" });
        } else if (password === "") {
            toast.error("Password is required!", { position: "top-center" });
        } else if (password.length < 6) {
            toast.error("Password must be at least 6 characters!", { position: "top-center" });
        } else if (password !== cpassword) {
            toast.error("Passwords do not match!", { position: "top-center" });
        } else {
           const data = await fetch("https://mernback-tdv5.onrender.com/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword, gender
                })
            });

            const res = await data.json();

            if (res.status === 201) {
                toast.success("Registration Successful! 😃", { position: "top-center" });
                setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "", gender: "" });
            } else {
                toast.error(res.error || "Registration failed!");
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email' />
                        </div>

                        <div className="form_input">
                            <label htmlFor="gender">Gender</label>
                            <select name="gender" onChange={setVal} value={inpval.gender} style={{ width: "100%", padding: "11px", marginTop: "9px", border: "1px solid #d4d0d0", borderRadius: "5px", outline: "none" }}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" placeholder='Password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>{!passShow ? "Show" : "Hide"}</div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" placeholder='Confirm Password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>{!cpassShow ? "Show" : "Hide"}</div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserdata}>Sign Up</button>
                        <p>Already have an account? <NavLink to="/">Log In</NavLink></p>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default Register;