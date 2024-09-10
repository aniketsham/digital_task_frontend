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
      
loading ? ( <div className='flex items-center justify-center h-screen'>

        <div role="status">
        <svg aria-hidden="true" class="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
    </div>):(
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
</form>)

    </div>
  )
}

export default Login
