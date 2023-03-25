import { useContext, useEffect, useState } from "react";
import { Navbar } from "../../component";
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { patientListEp } from "../../services/patient.services";


const ClincHistory = () => {

    const navigate = useNavigate();
    const { isLogged, user } = useContext(AuthContext);
    const [patient, setPatient] = useState('');
    const [familyHistory, setFamilyHistory] = useState('');
    const [allergic, setAllergic] = useState('');
    const [laboratories, setLaboratories] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [listPatient, setListPatient] = useState([]);

    const clearInputs = () => {
        setPatient('');
        setFamilyHistory('');
        setAllergic('');
        setLaboratories('');
        setBirthdate('');
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const payload = {
                patient,
                familyHistory,
                allergic,
                laboratories,
                birthdate
            };
            console.log(payload);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        if(!isLogged){
            navigate('/login');
        }else if(user.rol === 'Assistant'){
            navigate('/')
        }
    },[]);

    useEffect(() => {
        const listPates = async () => {
            const dataPatients = await patientListEp();
            setListPatient(dataPatients.data);
        }

        listPates()
            .catch(console.error);
    },[]);

    console.log(listPatient);
    return(
        <div>
            <Navbar {...user} />
            <div className="flex justify-center mt-14">
                <form className="w-full max-w-lg">
                    <h1 className="block uppercase tracking-wide text-gray-700 font-bold mb-2">Register Medical History</h1>
                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"></div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-patient" >
                                Name of Patient
                            </label>
                            <input 
                                name="patient"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-patient" 
                                type="text"
                                value={patient}
                                onChange={(e) => setPatient(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-family_history" >
                                Family History
                            </label>
                            <textarea 
                                name="family_history"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-family_history" 
                                value={familyHistory}
                                onChange={(e) => setFamilyHistory(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-allergic" >
                                Allergic
                            </label>
                            <textarea 
                                name="allergic"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-allergic" 
                                value={allergic}
                                onChange={(e) => setAllergic(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-clinical_laboratories" >
                                Clinical Laboratories
                            </label>
                            <textarea 
                                name="clinical_laboratories"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-clinical_laboratories" 
                                value={laboratories}
                                onChange={(e) => {setLaboratories(e.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-sm text-left font-bold mb-2" htmlFor="grid-birthdate" >
                                Birthdate
                            </label>
                            <input 
                                name="birthdate"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="grid-birthdate" 
                                type="date"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                            />
                        </div>
                    </div>
                    <input onClick={handleSubmit} className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-medium leading-snug shadow-md py-3 cursor-pointer rounded" type="submit" value="Save" />
                </form>
            </div>
        </div>
    );
};


export default ClincHistory;