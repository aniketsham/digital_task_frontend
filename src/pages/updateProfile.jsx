import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile,clearAllUpdateProfileErrors } from '../store/slice/updateProfileSlice';
import { getMyProfile } from '../store/slice/userSlice';
import { toast } from 'react-toastify';
const UpdateProfile = () => {


    const { user,isAuthenticated } = useSelector((state) => state.user);
    const { loading, error, isUpdated } = useSelector(
      (state) => state.updateProfile
    );

    const dispatch=useDispatch()
    const navigateTo=useNavigate()
  const [email,setEmail]=useState(user && user.email);
  const [name,setName]=useState(user && user.name);
  const [role,setRole]=useState(user && user.role)
  const [phone,setPhone]=useState(user && user.phone);

  const handleSubmit=(e)=>{
    e.preventDefault()
    const formData=new FormData()

    formData.append("name",name);
    formData.append("role",role);
    formData.append("email",email);
    formData.append("phone",phone);

    dispatch(updateProfile(formData));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUpdateProfileErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated.");
      dispatch(getMyProfile());
      dispatch(clearAllUpdateProfileErrors());
    }
    if(!isAuthenticated){
      navigateTo("/")
    }
  }, [dispatch, loading, error, isUpdated, user]);

  return (
    <div>

<form  onSubmit={handleSubmit} class="max-w-md mx-auto">
<h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">Update Profile</h1>

  <div class="relative z-0 w-full mb-5 group">
  <label for="floating_email" class="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
      <input type="email" name="floating_email" value={email} onChange={(e)=>{setEmail(e.target.value)}} id="floating_email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder=" " required />
  </div>
  
  <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a role</label>
  <select disabled id="countries" value={role} onChange={(e)=>{setRole(e.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
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

export default UpdateProfile
