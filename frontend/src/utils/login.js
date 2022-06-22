const Swal = require('sweetalert2')

async function login(params) {
    try {
        const email = document.getElementsByClassName('email_Input')[0].value;
        const password = document.getElementsByClassName('password_Input')[0].value;
        const registerAccount = await fetch('https://serene-brook-59719.herokuapp.com/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": email,
	            "password": password
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.error === "Unauthorized"){
                Swal.fire({
                    icon: 'error',
                    text: 'Correo y/o contraseña incorrectos',
                })
            }else if(email === res.user._email){
                localStorage.setItem('token', res.token)
                window.location.href = `${window.location.origin}/gestor-de-gastos/home`
            }
        })


    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha salido mal',
        })
    }
    
}

export {login};