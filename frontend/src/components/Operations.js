import React from "react";
import {deleteOperation} from '../utils/logicHome';
import {styleUpdate} from '../utils/logicHome';

function Operations ({operations, setOperations, rute}) {

    switch (rute) {
        case "home":
            var lastOperations = operations.slice(0, 10);
            var display = lastOperations.map(operation => {
                return (
                    <tr key={operation._idoperation} id={operation._idoperation}>
                        <td><input className={`${operation._idoperation} concept${operation._idoperation}`} placeholder={operation._concept} type="text" disabled/></td>
                        <td><input className={`${operation._idoperation} ammount${operation._idoperation}`} placeholder={operation._ammount} type="number" disabled/></td>
                        <td><input className={`${operation._idoperation} date${operation._idoperation}`} placeholder={operation._date} type="text" disabled/></td>
                        <td><input className={`${operation._idoperation} type${operation._idoperation}`} placeholder={operation._type} type="text" disabled/></td>
                        <td><input className={`${operation._idoperation} category${operation._idoperation}`} placeholder={operation._category} type="text" disabled/></td>
                        <td><a className={`updateButton${operation._idoperation}`} onClick={() => styleUpdate(operation._idoperation)}><i className={`bx bx-message-square-edit bx-sm bx-tada-hover updateButton${operation._idoperation} update`}></i></a><a onClick={() => deleteOperation(operation._idoperation, {setOperations})}><i className='bx bx-message-square-x bx-sm bx-tada-hover delete'></i></a></td>
                    </tr>
                )
            })
            break;
        
        case "operations":
            var display = operations.map(operation => {
                return (
                    <tr key={operation._idoperation} id={operation._idoperation}>
                        <td><input className={`${operation._idoperation} concept${operation._idoperation}`} placeholder={operation._concept} type="text" disabled/></td>
                        <td><input className={`${operation._idoperation} ammount${operation._idoperation}`} placeholder={operation._ammount} type="number" disabled/></td>
                        <td><input className={`${operation._idoperation} date${operation._idoperation}`} placeholder={operation._date} type="text" disabled/></td>
                        <td><input className={`${operation._idoperation} type${operation._idoperation}`} placeholder={operation._type} type="text" disabled/></td>
                        <td><input className={`${operation._idoperation} category${operation._idoperation}`} placeholder={operation._category} type="text" disabled/></td>
                        <td><a className={`updateButton${operation._idoperation}`} onClick={() => styleUpdate(operation._idoperation)}><i className={`bx bx-message-square-edit bx-sm bx-tada-hover updateButton${operation._idoperation} update`}></i></a><a onClick={() => deleteOperation(operation._idoperation, {setOperations})}><i className='bx bx-message-square-x bx-sm bx-tada-hover delete'></i></a></td>
                    </tr>
                )
            })
            break;
    }

    return <>
        <div className="main_table">
            <table>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {display}
                </tbody>
            </table>
        </div>
    </>
}

export {Operations};