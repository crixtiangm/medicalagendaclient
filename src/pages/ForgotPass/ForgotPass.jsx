import { Link } from 'react-router-dom';


const ForgotPass = () => {
    return(
        <section className="h-scren mt-10">
            <div className="px-6 h-full text-gray-800" >
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6 mt-20">
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 max-w-md">
                        <form autoComplete="off">
                            <div>
                                <h1 className="text-4xl my-5 font-extrabold text-center">Medical<span className="font-normal text-blue-500">Agenda</span></h1>
                            </div>
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
                                />
                            </div>

                            <div className="flex items-center justify-between mb-6">
                                <Link to={'/login'} className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Return to Log In</Link>
                            </div>

                            <div className="text-center lg:text-left">
                                <input className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium leading-snug shadow-md py-3 cursor-pointer rounded" type="submit" value="LogIn" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default ForgotPass;