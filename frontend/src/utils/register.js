const Swal = require('sweetalert2')

async function register(params) {
    try {
        const email = document.getElementsByClassName('email_Input')[0].value;
        const password = document.getElementsByClassName('password_Input')[0].value;
        const registerAccount = await fetch('https://serene-brook-59719.herokuapp.com/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
	            "password": password
            })
        })
        

        if(registerAccount.statusText === "Bad Request"){
            Swal.fire({
                icon: 'error',
                title: 'Formato de correo y/o contraseña incorrecto',
            })
        }else if(registerAccount.statusText === "Not Found"){
            Swal.fire({
                icon: 'error',
                title: 'Este correo ya esta registrado',
                footer: '<a href="/gestor-de-gastos/login">Iniciar sesion</a>'
            })
        }else if(registerAccount.statusText === "OK"){
            let timerInterval
            Swal.fire({
            icon: 'success',
            title: 'Cuenta creada con exito',
            html: 'Redireccionando a login',
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
                window.location.href = `/gestor-de-gastos/login`
            }
            })
        }

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha salido mal',
        })
    }
    
}

export {register};