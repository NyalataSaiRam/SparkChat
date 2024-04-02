import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
// import axios from 'axios';

const useSingup = () => {

    const [ loading, setLoading ] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({ fullname, username, password, confirmPassword, gender }) => {



        const success = handleInputErrors({ fullname, username, password, confirmPassword, gender });
        if (!success) {

            return;
        }

        // setLoading(true);

        // axios.post("/api/auth/signup", { fullname, username, password, confirmPassword, gender })
        //     .then(({ data }) => {
        //         localStorage.setItem("chat-user", JSON.stringify(data));
        //         setAuthUser(data);
        //         setLoading(false);
        //     })
        //     .catch((response) => {
        //         toast.error(response.error);
        //         setLoading(false);
        //     });
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender })

            });

            console.log("Sign up response : ", res);

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            //save user to local storage
            localStorage.setItem("chat-user", JSON.stringify(data));
            //context
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSingup;


function handleInputErrors({ fullname, username, password, confirmPassword, gender }) {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill all the fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password should be atleast 6 characters long");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Both passwords must match!");
        return false;
    }

    return true;
}