import React, { useState } from "react";
// const {createOperation} = require('../utils/logicHome');
import {createOperation} from '../utils/logicHome';

function AddOperation({setOperations}) {

    function chageType(select) {
        if(select === 'Ingreso'){
            setType(ingresos)
        }else if(select === 'Egreso'){
            setType(egresos)
        }
    }

    let egresos = ['Comida', 'Servicio', 'Vivienda', 'Viatico', 'Salud', 'Limpieza', 'Impuesto', 'Alimentacion', 'Indumentaria', 'Salidas', 'Extras'];
    let ingresos = ['Sueldo', 'Ventas', 'Ahorro', 'Intereses', 'Dividendos', 'Devolucion', 'Alquiler', 'Trabajo', 'Otro'];

    const [type, setType] = useState(ingresos);

    const typeInput = document.getElementById('type');

    if(typeInput) {
        if(typeInput.value === "Ingreso"){
            var display = type.map(category => {
                return(
                    <option key={category}>{category}</option>  
                )
            });
        }else if(typeInput.value === "Egreso"){
            var display = type.map(category => {
                return(
                    <option key={category}>{category}</option>  
                )
            });
        }
    }

    return <>
    <form className="add_operation">
                    <div>
                        <label htmlFor="concept">Concepto:</label>
                        <input type="text" id="concept"/>
                    </div>

                    <div>
                        <label htmlFor="ammount">Monto:</label>
                        <input type="number" id="ammount"/>
                    </div>

                    <div>
                        <label htmlFor="date">fecha:</label>
                        <input type="date" id="date"/>
                    </div>

                    <div>
                        <label htmlFor="type">Tipo:</label>
                        <select id="type" onChange={() => chageType(typeInput.value)}>
                            <option>Ingreso</option>
                            <option>Egreso</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="category">Categoria:</label>
                        <select id="category">
                            {display}
                        </select>
                    </div>

                    <button type="button" className="primary_button" onClick={() => createOperation({setOperations})}>Agregar</button>
                </form>
    
    </>
}

export {AddOperation};