import React, { useEffect, useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast";
import "./User.css";
import { Link } from 'react-router-dom'

const User = () => {

  const [users, setUsers] = useState([]);

  useEffect(()=>{

    const fetchData = async()=>{
        const response = await axios.get(`http://localhost:6005/api/getall`);
        setUsers(response.data);
    }

    fetchData();

  },[])

  const deleteUser = async(userId) =>{
      await axios.delete(`http://localhost:6005/api/delete/${userId}`)
      .then((respones)=>{
        setUsers((prevUser)=> prevUser.filter((user)=> user._id !== userId))
        toast.success(respones.data.msg, {position: 'top-right'})
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  return (
    <div className='userTable'>
        <Link to={"/add"} className='addButton'>Add User</Link>
        <Link to={"/"} className='Logoutbtn'>Logout</Link>
        
        <table border={1} cellPadding={10} cellSpacing={0}>
            <thead>
                <tr>
                    <th>S.No.</th>
                    <th>User name</th>
                    <th>User Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, index)=>{
                        return(
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.fname} {user.lname}</td>
                            <td>{user.email}</td>
                            <td className='actionButtons'>
                                <button onClick={()=> deleteUser(user._id)}><i className="fa-solid fa-trash"></i></button>
                                <Link to={`/update/`+user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                            </td>
                        </tr>
                        )
                    })
                }
                
            </tbody>
        </table>
    </div>
  )
}

export default User