import React from "react";
import {login} from '../utils/login';

function Login () {
    const token = localStorage.getItem('token');
    
    if(token) {
        window.location = "/gestor-de-gastos/home"
    }

    return (
        <section className="login">
            <div className="login_presentation">
                <h1>GESTOR DE GASTOS</h1>
                <p>Este gestor esta hecho como solucion al challenge presentado para ingresar a la aceleracion de <a href="alkemy.org">Alkemy</a></p>
            </div>
            <form className="login_form">
                <h1>Iniciar sesion</h1>
                <p>Para iniciar sesion debes <a href="/gestor-de-gastos/register">crear una cuenta</a> o usar una cuenta demo que puedes encontrar en el <a href="https://github.com/GonzaloEspindola/alkemy_fulljs_challenge.git">Github del proyecto</a></p>
                <input type="text" placeholder="Email ID" className="email_Input"></input>
                <input type="password" placeholder="Password" className="password_Input"></input>
                <input type="button" className="primary_button" value="Iniciar sesion" onClick={login}/>
            </form>
        </section>
    )
}

export {Login};