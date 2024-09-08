import { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { login,clearAllUserErrors } from '../store/slice/userSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const dispatch=useDispatch()
  const navigateTo=useNavigate()
  const {loading,isAuthenticated,error}=useSelector(
    (state)=>state.user
  )

  const handleLogin=(e)=>{
      e.preventDefault();
      const formData = new FormData();
      formData.append("email",email)
      formData.append("password",password)
      dispatch(login(formData))
  }

 useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigateTo("/updateProfile");
    }
  }, [dispatch, error, loading, isAuthenticated]);
  return (
    <div>
      

<form onSubmit={handleLogin} class="max-w-sm mx-auto">
<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">Welcome!<br/> Please Login</h1>

  <div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
    <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" required />
  </div>
  <div class="mb-5">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
    <input type="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
  </div>
   
  <button type="submit"  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Login</button>
</form>

    </div>
  )
}

export default Login
