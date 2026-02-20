import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Dashboard = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
    const [data, setData] = useState(false);
    const history = useNavigate();

    const maleImg = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    const femaleImg = "https://cdn-icons-png.flaticon.com/512/6997/6997662.png";

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");
     const res = await fetch("https://mernback-tdv5.onrender.com/validuser", {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": token }
        });
        const resData = await res.json();
        if (resData.status === 401 || !resData) {
            history("*");
        } else {
            setLoginData(resData);
            setData(true);
        }
    }

    useEffect(() => { DashboardValid(); }, []);

    const userGender = logindata?.ValidUserOne?.gender;

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f7fe" }}>
            {data ? (
                <div style={{ 
                    backgroundColor: "#fff", 
                    padding: "40px", 
                    borderRadius: "20px", 
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)", 
                    textAlign: "center",
                    width: "100%",
                    maxWidth: "400px" 
                }}>
                    <img 
                        src={userGender === "Female" ? femaleImg : maleImg} 
                        alt="user profile" 
                        style={{ width: "130px", height: "130px", borderRadius: "50%", border: "4px solid #673ab7", marginBottom: "20px", objectFit: "cover" }} 
                    />
                    <h1 style={{ fontSize: "28px", color: "#2c3e50", margin: "0", textTransform: "capitalize" }}>
                        Welcome, {logindata?.ValidUserOne?.fname}
                    </h1>
                    <p style={{ color: "#7f8c8d", marginTop: "10px" }}>
                        {logindata?.ValidUserOne?.email}
                    </p>
                    <div style={{ marginTop: "20px", color: "#4caf50", fontWeight: "600" }}>
                        Account Verified ✓
                    </div>
                </div>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    <CircularProgress sx={{ color: "#673ab7" }} />
                </Box>
            )}
        </div>
    )
}

export default Dashboard;