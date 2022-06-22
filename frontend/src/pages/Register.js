import React from "react";
import {register} from '../utils/register';
import { Navigate } from "react-router-dom";


const Swal = require('sweetalert2')

function Register() {
    const token = localStorage.getItem('token');
    
    if(token) {
        let timerInterval
            Swal.fire({
            icon: 'error',
            title: 'Cierra sesion en tu cuenta para crear otra',
            html: 'Redireccionando a home',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
            }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                window.location = "/gestor-de-gastos/home"
            }
        })
    }

    return (
        <section className="login">
            <div className="login_presentation">
                <h1>GESTOR DE GASTOS</h1>
                <p>Este gestor esta hecho como solucion al challenge presentado para ingresar a la aceleracion de <a href="https://alkemy.org">Alkemy</a></p>
            </div>
            <form className="login_form" id="form">
                <h1>Crear cuenta</h1>
                <p>Tambien puedes <a href="/gestor-de-gastos/login">iniciar sesion</a> usando una cuenta demo que puedes encontrar en el <a href="https://github.com/GonzaloEspindola/alkemy_fulljs_challenge.git">Github del proyecto</a></p>
                <input type="text" placeholder="Email ID" className="email_Input"></input>
                <input type="password" placeholder="Password" className="password_Input"></input>
                <input type="button" className="primary_button" value="Crear cuenta" onClick={register}/>
            </form>
        </section>
    )
}

export {Register};