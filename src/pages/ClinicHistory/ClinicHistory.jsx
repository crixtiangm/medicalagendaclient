import { useContext, useEffect, useState } from "react";
import { Navbar } from "../../component";
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { patientListEp } from "../../services/patient.services";
import { regiterClinicHistoryEp } from "../../services/clinichistory.services";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);


const ClincHistory = () => {

    const navigate = useNavigate();
    const { isLogged, user } = useContext(AuthContext);
    const [familyHistory, setFamilyHistory] = useState('');
    const [allergic, setAllergic] = useState('');
    const [laboratories, setLaboratories] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [patient, setPatient] = useState('');
    const [idPatient, setIdPatient] = useState('');
    const [listPatient, setListPatient] = useState([]);
    const [errors, setErrors] = useState([]);
    
    const onChange = (evt) => {
        setPatient(evt.target.value);
    };

    const onSearch = (searchPatient, idPatient) => {
        setPatient(searchPatient);
        setIdPatient(idPatient);
    }

    const clearInputs = () => {
        setPatient('');
        setFamilyHistory('');
        setAllergic('');
        setLaboratories('');
        setBirthdate('');
    }

    const showAlert = () => {
        MySwal.fire({
            title: "¡Registro exitoso!",
            text:"Los datos de la historia clinica fueron registrados correctamente",
            icon: "success",
            timer: 4000
        })
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const payload = {
                patient,
                family_history:familyHistory,
                allergic,
                clinical_laboratories:laboratories,
                birthdate,
                _patient:idPatient
            };
            await regiterClinicHistoryEp(payload);
            setErrors([]);
            clearInputs();
            showAlert();
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

    useEffect(() => {
        const listPates = async () => {
            const dataPatients = await patientListEp();
            setListPatient(dataPatients.data);
        }

        listPates()
            .catch(console.error);
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
                                placeholder="Name"
                                value={patient}
                                onChange={onChange}
                            />
                            <div className="bg-white flex flex-col border-gray-300">
                                {listPatient.filter(item => {
                                    const searchPatient = patient.toLowerCase();
                                    const fullName = (item.name + " " + item.surname).toLowerCase();

                                    return searchPatient && fullName.startsWith(searchPatient) && fullName !== searchPatient;
                                })
                                .slice(0,3)
                                .map((item) => (
                                    <div 
                                        key={item._id}
                                        onClick={() => onSearch(item.name +" "+ item.surname,item._id)}
                                        className=" cursor-pointer text-start m-1"
                                    >
                                            {item.name + " " + item.surname}
                                    </div>
                                ))}
                            </div>
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
                                placeholder="Family History"
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
                                placeholder="Allergic"
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
                                placeholder="Clinical Laboratories"
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