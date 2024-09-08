import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { register,clearAllUserErrors } from '../store/slice/userSlice';

const Register = () => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [name,setName]=useState("");
  const [role,setRole]=useState("")
  const [phone,setPhone]=useState("");
  const dispatch=useDispatch()
  const navigateTo=useNavigate()

  const {loading,isAuthenticated,error}=useSelector(
    (state)=>state.user
  )

  const handleRegister=(e)=>{
      e.preventDefault();
      if(password===confirmPassword){
        const formData=new FormData();
        formData.append("email",email);
        formData.append("password",password)
        formData.append("role",role)
        formData.append("name",name)
        formData.append("phone",phone)
        dispatch(register(formData))
      }
      else{
        toast.error("Confirm password and password do not match")
      }
   
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

<form onSubmit={handleRegister} class="max-w-md mx-auto">
<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">Welcome!<br/> Please Register</h1>

  <div class="relative z-0 w-full mb-5 group">
  <label for="floating_email" class="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
      <input type="email" name="floating_email" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="floating_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=" " required />
  </div>
  <div class="relative z-0 w-full mb-5 group">
  <label for="floating_password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>

      <input type="password" name="floating_password" value={password} onChange={(e)=>{setPassword(e.target.value)}} id="floating_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=" " required />
  </div>
  <div class="relative z-0 w-full mb-5 group">
  <label for="floating_repeat_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>

      <input type="password" name="repeat_password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} id="floating_repeat_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=" " required />
  </div>
  <div class="relative z-0 w-full mb-5 group">
  <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a role</label>
  <select id="countries" value={role} onChange={(e)=>{setRole(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
    <option value="User">User</option>
    <option value="Admin">Admin</option>
  </select>
  </div>
  
 
    <div class="relative z-0 w-full mb-5 group">
    <label for="floating_name" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>

        <input type="text" name="floating_name" value={name} onChange={(e)=>{setName(e.target.value)}} id="floating_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=" " required />
    </div>


    <div class="relative z-0 w-full mb-5 group">
    <label for="floating_phone" className="block mb-2 text-sm font-medium text-gray-900">Phone number (+91 9876543210)</label>
        <input type="tel"  value={phone} onChange={(e)=>{setPhone(e.target.value)}} name="floating_phone" id="floating_phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=" " required />
    </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Register</button>
</form>








    </div>
  )
}

export default Register
