import { useContext, useEffect, useState } from "react";
import { Navbar } from "../../component";
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { registerPatientEp } from "../../services/patient.services";


const Patient = () => {

    const navigate = useNavigate();
    const { isLogged, user } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [gender, setGender] = useState('Female');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState([]);

    const clearInputs = () => {
        setName('');
        setSurname('');
        setGender('Female');
        setAddress('');
        setPhone('');
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const payload = {
                name,
                surname,
                gender,
                address,
                phone
            };
            await registerPatientEp(payload);
            setErrors([]);
            clearInputs();
            navigate('/');
        } catch (error) {
            if(error.response.status === 400){
                setErrors(error.response.data.errorMsg);
            };
            console.error(error.response.data);
        };
    };

    useEffect(() => {
        if(!isLogged){
            navigate('/login');
        }else if(user.rol === 'Assistant'){
            navigate('/')
        }
    },[]);

    return(
        <div>
            <Navbar {...user} />
            {errors.map((err, idx) => (
                <div key={idx} className="flex justify-center">
                    <p class="bg-red-100 border border-red-400 text-red-700 uppercase text-xs text-center p-2 mb-1 mt-1 font-bold rounded-md w-full max-w-lg">{err.msg}</p>
                </div>
            ))}
            <div className="flex justify-center mt-14">
                <form className="w-full max-w-lg">
                    <h1 className="block uppercase tracking-wide text-gray-700 font-bold mb-2">Register Patient</h1>
                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-name">
                                Name*
                            </label>
                            <input 
                                name="name"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-name" 
                                type="text"
                                value={name}
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3" >
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-surname">
                                Surname*
                            </label>
                            <input
                                name="surname"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-surname" 
                                type="text"
                                value={surname}
                                placeholder="Surname"
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2" >
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0" >
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-gender" >
                                Gender
                            </label>
                            <div className="relative">
                                <select
                                    name="gender"
                                    className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value={'Female'} >Female</option>
                                    <option value={'Male'} >Male</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0" >
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-phone">
                                Phone
                            </label>
                            <input
                                name="phone"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-phone" 
                                type="text"
                                value={phone}
                                placeholder="52-5555555555"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-address" >
                                Address
                            </label>
                            <input 
                                name="address"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-address" 
                                type="text"
                                value={address}
                                placeholder="Address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <input onClick={handleSubmit} className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-medium leading-snug shadow-md py-3 cursor-pointer rounded" type="submit" value="Save" />
                </form>
            </div>
        </div>
    );
};


export default Patient;