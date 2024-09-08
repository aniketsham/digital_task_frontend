import React, { useEffect,useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getProfileId,clearAllUserErrors,resetGetUserSlice} from '../store/slice/userSlice';
import { updateProfileId,clearAllUpdateProfileErrors } from '../store/slice/updateProfileSlice';
const UpdateByAdmin = () => {
    const {id}=useParams();

    console.log(id)
    const {updatingProfile,isAuthenticated,message}=useSelector((state)=>state.user)
    const { loading, error, isUpdated } = useSelector(
      (state) => state.updateProfile
    );
    const dispatch=useDispatch()
    const navigateTo=useNavigate()
    const [email,setEmail]=useState();
    const [name,setName]=useState();
    const [role,setRole]=useState()
    const [phone,setPhone]=useState();

    useEffect(()=>{
        dispatch(getProfileId())
        setEmail(updatingProfile && updatingProfile.email)
        setName(updatingProfile && updatingProfile.name)
        setRole(updatingProfile && updatingProfile.role)
        setPhone(updatingProfile && updatingProfile.phone)
    },[])

    const handleSubmit=(e)=>{
      e.preventDefault()
      const formData=new FormData()
  
      formData.append("name",name);
      formData.append("role",role);
      formData.append("email",email);
      formData.append("phone",phone);
  
      dispatch(updateProfileId(formData,id));
      navigateTo("/allUsers")
    }
    
  return (
    <div>
      <form onSubmit={handleSubmit} class="max-w-md mx-auto">
<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">Update Profile By Admin</h1>

  <div class="relative z-0 w-full mb-5 group">
  <label for="floating_email" class="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
      <input disabled type="email" name="floating_email" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="floating_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=" " required />
  </div>
  
  <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a role</label>
  <select id="countries" value={role} onChange={(e)=>{setRole(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
    <option value="User">User</option>
    <option value="Admin">Admin</option>
  </select>
    <div class="relative z-0 w-full mb-5 group">
    <label for="floating_name" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>

        <input type="text" name="floating_name" value={name} onChange={(e)=>{setName(e.target.value)}} id="floating_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=" " required />
    </div>
    


    <div class="relative z-0 w-full mb-5 group">
    <label for="floating_phone" className="block mb-2 text-sm font-medium text-gray-900">Phone number (123-456-7890)</label>
        <input type="tel"  value={phone} onChange={(e)=>{setPhone(e.target.value)}} name="floating_phone" id="floating_phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=" " required />
    </div>

  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Update</button>
</form>


    </div>
  )
}

export default UpdateByAdmin
