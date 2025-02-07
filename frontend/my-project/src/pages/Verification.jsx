import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const VerifyEmail = () => {
    const [message, setMessage] = useState('Verifying...');
    const { token } = useParams();
    useEffect(() => {
        console.log(token);
        const verify = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `http://localhost:3000/user/verify/${token}`,

            };

            axios.request(config)
                .then((response) => {
                    setMessage(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    setMessage(response.data);
                });

        };
        verify();
    }, [token]);

    return (
        <div>
            <h2>Email Verification: </h2>
            <p>{message}</p>
        </div>
    );
};