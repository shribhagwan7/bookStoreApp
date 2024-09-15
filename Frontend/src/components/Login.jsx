import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit =async (data) => {
    const userInfo = {
      email:data.email,
      password:data.password,
    }
    await axios.post("http://localhost:4001/user/login",userInfo)
    .then((res)=>{
      console.log(res.data);
      if(res.data){
        alert("Loggedin successfully");
        document.getElementById("my_modal_3").close();
        setTimeout(()=>{
          window.location.reload();
          localStorage.setItem("Users",JSON.stringify(res.data.user));
        },1000);
      } 
    })
    .catch((err)=>{
      if(err.response){
        console.log(err);
        alert("Error: "+ err.response.data.message);
        setTimeout(()=>{},1000);
      }
    });
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* Close button */}
            <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={()=>document.getElementById("my_modal_3").close()} >
              ✕</Link>
            <h3 className="font-bold text-lg">Login</h3>
            
            {/* Email */}
            <div className="mt-4 space-y-2">
              <span>Email</span><br/>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-80 px-3 py-1 border rounded-md outline-none" 
                {...register("email", { required: true })}
              />
              {errors.email && <p className="text-red-500">Email is required</p>}
            </div>
            
            {/* Password */}
            <div className="mt-4 space-y-2">
              <span>Password</span><br/>
              <input 
                type="password" 
                placeholder="Enter your password" 
                className="w-80 px-3 py-1 border rounded-md outline-none" 
                {...register("password", { required: true })}
              />
              {errors.password && <p className="text-red-500">Password is required</p>}
            </div>
            
            {/* Button */}
            <div className="flex justify-around mt-4">
              <button type="submit" className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">Login</button>
              <p>Not registered?{" "} 
                <Link to="/signup" className="underline text-blue-500 cursor-pointer">Signup</Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Login;
