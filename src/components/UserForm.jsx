import {FaAngleDoubleLeft} from 'react-icons/fa';
import {useNavigate, useLocation} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';

const data = [
    {
        type: 'text',
        name: 'name',
        placeholder: 'John Doe',
        element: 'Name'
    },
    {
        type: 'email',
        name: 'email',
        placeholder: 'example@gmail.com',
        element: 'Email'
    },
    {
        type: 'text',
        name: 'profession',
        placeholder: 'Web Developer',
        element: 'Profession'
    }
];

const InputField = ({currentUser, onChange, type, name, placeholder, element}) =>{
    return (
        <div className="input-field">
            <label htmlFor={name}>{element}</label>
                <input 
                    onChange={event => onChange(event)}
                    className="input"
                    type={type} 
                    id={name}
                    name={name}
                    value={currentUser[name]}
                    placeholder={placeholder} 
                />            
        </div>
    )
}

const initialStatus = {
    name: '',
    email: '',
    profession: '',
    gender: ''
}

const UserForm = ({records, setRecords, currentUser, setCurrentUser}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {heading, description, btnText} = location.state;
    const handleOnSubmit = async event =>{
        event.preventDefault();
        if(btnText === "Save"){
            try{
                const response = await axios.post(`https://ums-api.onrender.com/user/create`, currentUser);
                const user = response.data;
                setRecords([...records, user]);
                alert('User Successfully Created');
            }catch(error){
                console.error(error);
            }
        }else{
            try{
                const response = await axios.put(`https://ums-api.onrender.com/user/update`, currentUser);
                const editedUser = response.data;
                const temp = records;
                const index = temp.findIndex(temp_ => editedUser._id === temp_._id);
                temp.splice(index, 1, editedUser);
                setRecords(temp);
                alert('User Record Successfully Updated');
            }catch(error){
                console.error(error);
            }
        }
        setCurrentUser(initialStatus);
    }
    const handleOnChange = event =>{
        setCurrentUser({
            ...currentUser,
            [event.target.name]: event.target.value
        })

    }
    return (
        <div className="form-container">
            <div className="go-back">
                <button type="button" onClick={() => navigate("/")}><FaAngleDoubleLeft /> All Users</button>
            </div>
            <form method="post" className="form" onSubmit={handleOnSubmit}>
                <header>
                    <h2>{heading}</h2>
                    <p>Use the below form to {description}</p>
                </header>
                {
                    data.map((temp, index) => {
                        return(
                            <InputField 
                                key={index} 
                                currentUser={currentUser}
                                onChange={handleOnChange} 
                                {...temp} 
                            />
                        )
                    })
                }
                <div className="gender-field">
                    <span>Gender</span>
                    <div>
                        <label htmlFor="male">Male</label>
                        <input onChange={handleOnChange} type="radio" id="male" value="Male" name="gender" />
                    </div>
                    <div>
                        <label htmlFor="female">Female</label>
                        <input onChange={handleOnChange} type="radio" id="female" value="Female" name="gender" />
                    </div>
                </div>
                <div>
                    <button 
                        className="save-btn" 
                        type="submit"
                    >
                        {btnText}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserForm;