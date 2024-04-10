// components/CreateAccountForm.js

import { useState } from 'react';
import useUser from '../hooks/useUser';

const CreateAccountForm = () => {
    const auth = useUser();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await auth.createAccount(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700">username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" required />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500" required />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Account</button>
        </form>
    );
};

export default CreateAccountForm;
