import { useState } from 'react';
import { Link } from 'react-router-dom';
import medicine from '../../assets/medicine.svg';

const Navbar = ({_id, email, username, rol, ...restUser}) => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [navbarMenuOpen, setNavbarMenuOpen] = useState(false);

    return(
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-700" >
            <div className="container flex flex-wrap items-center justify-between mx-auto"  >
                <Link to={'/'} className="flex items-center">
                    <img src={medicine} alt="MedicalAgenda" className='h-6 mr-3 sm:h-9' />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Medical<span className="font-semibold text-blue-500">Agenda</span></span>
                </Link>
            
                <div className='flex items-center md:order-2' >
                    <button type='button' className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600' id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom" onClick={() => setNavbarOpen(!navbarOpen)}>
                        <span className='sr-only'>Open user menu</span>
                        <img src={medicine} alt="userPhoto" className='w-11 h-11 rounded-full' />
                    </button>

                    {/*Dropdown menu */}
                    <div className={'z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-600' + (navbarOpen ? ' absolute top-12 right-11':' hidden')} id="user-dropdown"  >
                        <div className='px-4 py-3' >
                            <span className='block text-sm text-gray-900 dark:text-white' >{username}</span>
                            <span className='block text-sm font-medium text-gray-500 truncate dark:text-gray-400' >{email}</span>
                        </div>
                    
                        <ul className='py-2' aria-labelledby="user-menu-button" >
                            <li>
                                <Link to={'/settings'} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white' >Settings</Link>
                            </li>
                            <li>
                                <Link to={'/logout'} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white' >Log Out</Link>
                            </li>
                        </ul>                    
                    </div>

                    <button data-collapse-toggle="mobile-menu-2" type="button" onClick={() => setNavbarMenuOpen(!navbarMenuOpen)} className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600' aria-controls="mobile-menu-2" aria-expanded="false">
                        <span className='sr-only' >Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>

                <div className={'items-center justify-between w-full md:flex md:w-auto md:order-1' + (navbarMenuOpen ? ' absolute top-12 right-0':' hidden')} id="mobile-menu-2" >
                    <ul className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-md md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-700 dark:border-gray-700' >
                    <li>
                            <Link to={'/'} className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' >Home</Link>
                        </li>
                        <li>
                            <Link to={'/register-user'} className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' >{rol === 'Admin' ? 'Register User': ''}</Link>
                        </li>
                        <li>
                            <Link to={'/data-collaborator'} className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' >{rol === 'Admin' ? 'Register Data Collaborator': ''}</Link>
                        </li>
                        <li>
                            <Link className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' >Register Patient</Link>
                        </li>
                        <li>
                            <Link className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700' >{rol === 'Admin' || rol === 'Doctor' ? 'Medical History' : ''}</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;