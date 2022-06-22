import React, {useEffect, useState} from "react";
import {Navigate} from 'react-router-dom';
/* LAYOUT */
import {LayoutApp} from '../layout/LayoutApp';

/* Components */
import {BalanceContainer} from '../components/BalanceContainer';
import {Operations} from '../components/Operations';
import { AddOperation } from "../components/AddOperation";

/* utils */


function Home({rute}) {

    const [operations, setOperations] = useState([]);

    const token = localStorage.getItem('token')

    if(!localStorage.getItem('token')) {
        window.location = '/gestor-de-gastos/login';
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

    function Ingresos(){
        var ingresos = 0;

        operations.map(operation => {
            if(operation._type === "Ingreso") {
                ingresos = ingresos + operation._ammount;
            }
        })

        return ingresos;
    }

    function Egresos(){
        var egresos = 0;

        operations.map(operation => {
            if(operation._type === "Egreso") {
                egresos = egresos + operation._ammount;
            }
        })

        return egresos;
    }

    const ingresos = Ingresos();
    const egresos = Egresos();
    const total = ingresos - egresos;

    return (
        <LayoutApp>
            <section className="main_home dinamic">
                <section className="main_balances">
                    <BalanceContainer type="Balance actual" ammount={total}/>
                    <BalanceContainer type="Ingresos" ammount={ingresos}/>
                    <BalanceContainer type="Egresos" ammount={egresos}/>
                </section>
                <AddOperation setOperations={setOperations}/>
                <Operations operations={operations} setOperations={setOperations} rute={rute}/>
            </section>
        </LayoutApp>
    )
}

export {Home};