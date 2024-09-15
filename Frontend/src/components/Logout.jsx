import React from 'react'
import { useAuth } from '../context/AuthProvider';

function Logout() {
    const [authUser,setAuthUser]=useAuth();
    const handleLogout=()=>{
        try {
            setAuthUser({
                ...authUser,
                user:null,
            });
            localStorage.removeItem("Users");
            alert("Logout successfully");
            setTimeout(()=>{
                window.location.reload();
            },1000);
        } catch(error){
            alert("Error: "+ error);
            setTimeout(()=>{},1000);
        }
    };
  return (
    <div>
        <button className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handleLogout} >
            Logout</button>
    </div>
  );
}

export default Logout;