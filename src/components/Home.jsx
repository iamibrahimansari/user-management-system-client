import { FaUser } from "react-icons/fa";
import {MdEdit, MdDelete} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';
import axios from 'axios';

const PORT = process.env.PORT || 3500;

const TableBodyRow = ({navigateOnUpdateNewUserForm, _id, name, email, gender, profession}) =>{
    const handleDelete = async () =>{
        try{
            const result = confirm('Do you really want to delete?');
            if(result){
                const response = await axios.delete(`http://localhost:${PORT}/user/delete/${_id}`);
            }
        }catch(error){
            console.error(error);
        }
    }
    return(
        <tr>
            <td>{name}</td>
            <td>{email}</td>
            <td>{gender}</td>
            <td>{profession}</td>
            <td className="action">
                <button type="button" onClick={() => navigateOnUpdateNewUserForm(_id)}><MdEdit /></button>
                <button type="button" onClick={() => handleDelete()}><MdDelete /></button>
            </td>
        </tr>
    )
}

const TableRow = ({records, indicator, navigateOnUpdateNewUserForm}) =>{
    return (
        indicator === 'thead' ?
        (
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Profession</th>
                    <th>Action</th>
                </tr>
            </thead>
        ) :
        (
            <tbody>
                {
                    records.map(record => {
                        return(
                            <TableBodyRow  
                                key={record._id}
                                navigateOnUpdateNewUserForm={navigateOnUpdateNewUserForm}
                                {...record} 
                            />
                        )
                    })
                }
            </tbody>
        )
    )
}        

const Home = ({records, setRecords, currentUser, setCurrentUser}) => {
    const navigate = useNavigate();
    useEffect(() =>{
        const getUsers = async () =>{
            try{
                const users = await axios.get(`http://localhost:${PORT}/user/users`);
                setRecords(users.data);
            }catch(error){
                console.error(error);
            }
        }  
        getUsers();
    }, [records])
    const navigateOnAddNewUserForm = () => {
        navigate("/add-new-user", {
                state: {
                    heading: 'New User',
                    description: 'create a new user',
                    btnText: 'Save',
                }
            }
        )
    };
    const navigateOnUpdateNewUserForm = async _id => {
        try{
            const response = await axios.get(`http://localhost:${PORT}/user/${_id}`);
            setCurrentUser(response.data);
            navigate(
                "/update-user", 
                {
                    state: {
                        heading: 'Update User',
                        description: 'update an existing current user',
                        btnText: 'Update',
                    }
                }
            )
        }catch(error){
            console.error(error);
        }
    };
    return (
        <>
        <div className="add-user">
            <button 
                type="button" 
                onClick={navigateOnAddNewUserForm} 
                >
                    New User <FaUser />
            </button>
        </div>
        <div className="user-list">
            <table className="table">
                <TableRow indicator="thead" />
                <TableRow 
                    records={records} 
                    indicator="tdata" 
                    navigateOnUpdateNewUserForm={navigateOnUpdateNewUserForm}
                 />
            </table>
        </div>
        </>
    )
}

export default Home;