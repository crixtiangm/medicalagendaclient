import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import medicine from '../../assets/medicine.svg';
import { loginEp } from '../../services/auth.services';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth.context';

const Auth = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const { storeToken, authenticateUser } = useContext(AuthContext);


    const clearInputs = () => {
        setEmail('');
        setPassword('');
    }

    const handleOnSubmit = async(e) => {
        try {
            e.preventDefault();
            const payload = { email, password};
            const response = await loginEp(payload);
            storeToken(response.data._token);
            await authenticateUser();
            navigate('/');
        } catch (error) {
            if (error.response) {
                clearInputs();
                navigate('/login');
                setErrors(error.response.data.errorMsg);
                return error.response.data.errorMsg;
              } else if (error.request) {
                return error.request;
              } else {
                console.log('Error', error.message);
              };
        };
    };

    return(
        <section className="h-scren mt-10">
            <div className="px-6 h-full text-gray-800" >
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 mt-20">
                    <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 md:w-9/12 mb-12 md:mb-0" >
                    <img src={medicine} className="w-full" alt="ImageAuth"/>
                    </div>
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 max-w-md">
                        <form>
                            <div>
                                <h1 className="text-4xl my-5 font-extrabold text-center">Medical<span className="font-normal text-blue-500">Agenda</span></h1>
                            </div>
                            {errors.map((err, idx) => (
                                <div key={idx} className="flex justify-center">
                                    <p class="bg-red-100 border border-red-400 text-red-700 uppercase text-xs text-center p-2 mb-1 mt-1 font-bold rounded-md w-full max-w-lg">{err.msg}</p>
                                </div>
                            ))}
                            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                            </div>

                            <div className="mb-6">
                                <label className="block text-md uppercase text-gray-600 text-left mb-2 font-bold" htmlFor="email">Email</label>
                                <input
                                autoComplete="off"
                                name="email"
                                type="text"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <label className="block text-md uppercase text-gray-600 text-left mb-2 font-bold" htmlFor="password">Password</label>
                                <input
                                autoComplete="off"
                                name="password"
                                type="password"
                                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <Link to={'/forgot-password'} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Forgot password?</Link>
                            </div>

                            <div className="text-center lg:text-left">
                                <input onClick={handleOnSubmit} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium leading-snug shadow-md py-3 cursor-pointer rounded" type="submit" value="LogIn" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Auth;