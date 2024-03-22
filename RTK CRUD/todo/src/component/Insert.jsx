import React, { useState } from 'react';
import { useInsertDataMutation } from '../services/post';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const Insert = () => {
    const [inputData, setInputData] = useState({ name: '', email: '', pass:'' });
    const [insertData, { isLoading: isInserting }] = useInsertDataMutation();
    const [errors, setErrors] = useState({});

    const navigate = useNavigate()
    const submithandle = async (e) => {
        e.preventDefault();
        try {
            await insertData(inputData).unwrap();
            setInputData({ name: '', email: '', pass:''});
            navigate('/Home')
        } catch (error) {
            console.error('Failed to insert data:', error);
        }
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
    };

    const handleChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    return (
        <section>
            <div className="container mx-auto">
                <h1 className='text-center my-11 text-6xl capitalize'>registration form fill it</h1>
                <form onSubmit={submithandle} className='md:w-2/3 p-9 w-full mx-auto form bg-gradient-to-r   border-none from-yellow-200 text-black to-green-300'>
                    <h2 className='text-center text-3xl my-3 capitalize'>fill the form</h2>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                    <input type="text" name='name' id="name" onChange={handleChange} className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="XYZ" required />

                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name='email' id="email" onChange={handleChange} className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="name@gmail.com" required />

                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                    <input type="password" name='pass' id="pass"  className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required onChange={handleChange}/>
                    <input id="terms" type="checkbox" className="w-4 h-4 border border-gray-300 mb-4 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" required />

                    <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a></label><br />
                    <div className='flex justify-between'>
                        <button type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 '>submit</button>
                        <Link to="/Home">
                            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 '>Back</button>
                        </Link>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Insert;
