import React, {useContext, useEffect, useState} from "react";
import { Navbar } from "../../component";
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { singupEp } from "../../services/collaborator.services";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Singup = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Assistant');
    const [status, setStatus] = useState('Active');
    const [error, setError] = useState([]);

    const { isLogged, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const clearInputs = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('Assistant');
        setStatus('Active');
    }

    const showAlert = () => {
        MySwal.fire({
            title: "¡Registro exitoso!",
            text:"Los datos fueron registrados correctamente",
            icon: "success",
            timer: 4000
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const payload = {
                username,
                email,
                password,
                role,
                status
            };
            await singupEp(payload);
            setError([]);
            clearInputs();
            showAlert();
        } catch (error) {
            if(error.response.status === 400){
                setError(error.response.data.errorMsg);
            }
            console.error(error.response.data);
        };
    };

    useEffect(()=>{
        if(!isLogged){
            navigate('/login');
        }
    });

    return(
        <div>
            <Navbar {...user} />
            {error.map((err, idx) => (
                <div key={idx} className="flex justify-center">
                    <p class="bg-red-100 border border-red-400 text-red-700 uppercase text-xs text-center p-2 mb-1 mt-1 font-bold rounded-md w-full max-w-lg">{err.msg}</p>
                </div>
            ))}
            <div className="flex justify-center mt-14">
                <form className="w-full max-w-lg">
                    <h1 className="block uppercase tracking-wide text-gray-700 font-bold mb-2">Register User</h1>
                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-username">
                                Username*
                            </label>
                            <input 
                                name="username"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-name" 
                                type="text" 
                                value={username}
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            >
                            </input>
                        </div>
                        <div className="w-full md:w-2/3 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-email">
                                Email*
                            </label>
                            <input 
                                name="email"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-email" 
                                type="email" 
                                value={email}
                                placeholder="your-email@email.com"
                                onChange={(e) => setEmail(e.target.value)}
                            >
                            </input>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-password" >
                                Password*
                            </label>
                            <input 
                                name="password"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-password" 
                                type="password" 
                                value={password}
                                placeholder="******************"
                                onChange={(e)=> setPassword(e.target.value)}
                            >
                            </input>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0" >
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-role" >
                                Role
                            </label>
                            <div className="relative">
                                <select 
                                    name="rol"
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-state"
                                    value={role}
                                    onChange={(e)=> setRole(e.target.value)}
                                >
                                <option value={'Assistant'} >Assistant</option>
                                <option value={'Doctor'} >Doctor</option>
                                <option value={'Admin'} >Admin</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0" >
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-role" >
                                Status
                            </label>
                            <div className="relative">
                                <select 
                                    name="status"
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-state"
                                    value={status}
                                    onChange={(e)=> setStatus(e.target.value)}
                                >
                                <option value={'Active'} >Active</option>
                                <option value={'Inactive'} >Inactive</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <input onClick={handleSubmit} className=" w-full mx-3 mt-10 bg-blue-500 hover:bg-blue-700 text-white font-medium leading-snug shadow-md py-3 cursor-pointer rounded" type="submit" value="Save" />
                    </div>
                </form>
            </div>
        </div>
    );
};


export default Singup;