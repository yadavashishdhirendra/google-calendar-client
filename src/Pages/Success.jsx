import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import lodingcount from '../Assets/Icons/world-clock-pro-mobile-v3copy.gif'

const Success = () => {
    const [Count, setCount] = useState(5)
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev > 1) {
                    return prev - 1
                } else {
                    clearInterval(interval)
                    return 0
                }
            })

        }, 1000);
        return () => clearInterval(interval)
    }, [])

    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 5000);
    }, [navigate])

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');

        if (code) {
            console.log('Authorization code:', code);

            // Send the authorization code to your server
            axios.post('https://google-calendar-vskh.onrender.com/google/redirect', { code })
                .then((res) => {
                    console.log('Server response:', res.data?.tokens);
                    localStorage.setItem("user", JSON.stringify(res.data?.tokens))
                })
                .catch((err) => {
                    console.error('Error sending code to server:', err);
                });
        }
    }, [location]);


    return (
        <div className='success-container'>
            <div>
                <img src={lodingcount} alt="" />
                <h1>Redirecting You To The Homepage.... {Count}</h1>
            </div>
        </div>
    )
}

export default Success
