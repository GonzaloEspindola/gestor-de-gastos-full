import React, {useState, useEffect} from "react";

/* LAYOUT */
import {LayoutApp} from '../layout/LayoutApp';

/* Components */
import {Operations} from '../components/Operations';

function Operation({rute}) {

   const [operations, setOperations] = useState([]);

    const token = localStorage.getItem('token')
    
    if(!token) {
        window.location = "/gestor-de-gastos/login"
    }

    const options = {
        headers: {
        'Authorization': `Bearer ${token}`
        }
    }
        useEffect(() => {
            (async function () {
                let data = await fetch('https://serene-brook-59719.herokuapp.com/tables', options)
                .then(data => data.json())
                .then(data => setOperations(data))
            })();
    }, [])

    return (
        <LayoutApp>
            <section className="main_home dinamic">
                <Operations operations={operations} setOperations={setOperations} rute={rute}/>
            </section>
        </LayoutApp>
    )
}

export {Operation};