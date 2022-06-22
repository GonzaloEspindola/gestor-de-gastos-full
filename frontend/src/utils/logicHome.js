const Swal = require('sweetalert2')

var token = localStorage.getItem('token');

async function createOperation({setOperations}){
    try {
        const concept = document.getElementById('concept').value;
        const ammount = document.getElementById('ammount').value;
        const date = document.getElementById('date').value;
        const type = document.getElementById('type').value;
        const category = document.getElementById('category').value;

        const create = await fetch('https://serene-brook-59719.herokuapp.com/tables', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "concept": concept,
                "ammount": Number(ammount),
                "date": date,
                "type": type,
                "category": category
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            if(res.error === "Bad Request"){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Recuerda completar todos los campos',
                })
            }

            if(res.message === "Operation create"){
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Operacion creada',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })

        const update = await fetch('https://serene-brook-59719.herokuapp.com/tables', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(res => setOperations(res))
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha fallado!',
        })
    }
}

async function deleteOperation(id, {setOperations}){
    const deleteOperations = await fetch(`https://serene-brook-59719.herokuapp.com/tables/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const update = await fetch('https://serene-brook-59719.herokuapp.com/tables', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(res => setOperations(res))
}

async function styleUpdate(id){
    const button = document.getElementsByClassName(`updateButton${id}`);
    button[0].addEventListener('click', () => postUpdate(`${id}`))
    button[1].className = `bx bx-message-square-check bx-sm updateButton${id}`;
    button[1].style.color = 'green';


    const row = document.getElementById(`${id}`);
    const data = document.getElementsByClassName(`${id}`);
    data[0].removeAttribute('disabled');
    data[0].style.backgroundColor =  "white"

    data[1].removeAttribute('disabled');
    data[1].style.backgroundColor =  "white";

    data[2].removeAttribute('disabled');
    data[2].style.backgroundColor =  "white";
    
    data[4].removeAttribute('disabled');
    data[4].style.backgroundColor =  "white";
}

async function postUpdate(id) {

    if(!document.getElementsByClassName(`concept${id}`)[0].value){
        var concept = document.getElementsByClassName(`concept${id}`)[0].placeholder;
    }else{
        var concept = document.getElementsByClassName(`concept${id}`)[0].value;
    }

    if(!document.getElementsByClassName(`ammount${id}`)[0].value){
        var ammount = document.getElementsByClassName(`ammount${id}`)[0].placeholder;
    }else{
        var ammount = document.getElementsByClassName(`ammount${id}`)[0].value;
    }

    if(!document.getElementsByClassName(`date${id}`)[0].value){
        var date = document.getElementsByClassName(`date${id}`)[0].placeholder;
    }else{
        var date = document.getElementsByClassName(`date${id}`)[0].value;
    }

    const type = document.getElementsByClassName(`type${id}`)[0].placeholder;

    if(!document.getElementsByClassName(`category${id}`)[0].value){
        var category = document.getElementsByClassName(`category${id}`)[0].placeholder;
    }else{
        var category = document.getElementsByClassName(`category${id}`)[0].value;
    }

    const updateOperations = await fetch(`https://serene-brook-59719.herokuapp.com/tables/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "concept": concept,
                "ammount": Number(ammount),
                "date": date,
                "type": type,
                "category": category
            })
        })

        window.location.reload();
}

export {createOperation, deleteOperation, styleUpdate};
// module.exports = {createOperation, deleteOperation, styleUpdate};