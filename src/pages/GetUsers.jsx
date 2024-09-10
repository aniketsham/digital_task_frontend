import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {getAllUsers,clearAllGetUserErrors,resetGetUserSlice,deleteUser} from '../store/slice/getAllUsers';
const GetUsers = () => {

    const dispatch=useDispatch();
    const navigateTo=useNavigate();
    
    const {users,error,message,loading}=useSelector((state)=>state.getAllUsers);
    const {isAuthenticated,user}=useSelector(
        (state)=>state.user
      );
    useEffect(()=>{
          dispatch(getAllUsers()); 
    },[])

    useEffect(()=>{
        if(error){
          toast.error(error)
          dispatch(clearAllGetUserErrors());
        }
        if (isAuthenticated) {
            navigateTo("/updateProfile");
          }
        if(user.role!=="Admin"){
            toast.error("Admin access only.");
            navigateTo("/updateProfile");
  
        }
        
        if(message){
          toast.success(message);
          dispatch(resetGetUserSlice());
          dispatch(getAllUsers());
    
        }
      },[dispatch,error,message])
    
      const handleDeleteUser=(id)=>{
        dispatch(deleteUser(id));
        dispatch(getAllUsers());
      }
    
      const handleUpdateUser=(id)=>{
        navigateTo(`/UpdateById/${id}`)
      }

  return (
    loading ? (<div>Loading...</div>):(<div class=" flex items-center justify-center  relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table class="w-2/3 text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <div class="flex items-center">
                            Role
                            <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
      </svg></a>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <div class="flex items-center">
                            Email
                            <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
      </svg></a>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <div class="flex items-center">
                            Phone
                            <a href="#"><svg class="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
      </svg></a>
                        </div>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                    <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Delete</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user,index)=>(
                        <tr key={index} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                        {user.name}
                    </th>
                    <td class="px-6 py-4">
                        {user.role}
                    </td>
                    <td class="px-6 py-4">
                        {user.email}
                    </td>
                    <td class="px-6 py-4">
                        {user.phone}
                    </td>
                    <td class="px-6 py-4 text-right">
                    <button type="button" onClick={() => handleUpdateUser(user._id)} class="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Edit</button>
                    </td>
                    <td class="px-6 py-4 text-right">
                    <button type="button" onClick={() => handleDeleteUser(user._id)} class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Delete</button>
                    </td>
                </tr>
                    ))
                }
               
            </tbody>
        </table>
    </div>
    
    )



  )
}

export default GetUsers
