import React from "react";
import {Link, Navigate} from 'react-router-dom';
const jose = require('jose');

function LayoutApp (props) {

    const token = localStorage.getItem('token');

    if(!token){
        <Navigate to='/login'/>
    }

    const tokenDecode = jose.decodeJwt(token)

    function closeSesion(){
        localStorage.removeItem('token');
        <Navigate to='/login'/>
    }

    {
        return (
            <main className="main">
                <header className="header">
                    <p>{tokenDecode.sub}</p>
                    <Link to='/login'><button onClick={closeSesion} className="secondary_button">Cerrar sesion</button></Link>
                </header>
    
                <nav className="nav">
                    <ul>
                        <Link to='/home' className="link home"><i class='bx bxs-home' ></i> Inicio</Link>
                        <Link to='/operations' className="link table"><i class='bx bxs-wallet-alt' ></i> Operaciones</Link>
                    </ul>
                </nav>
                {props.children}
            </main>
        )
    } 
}

export {LayoutApp};