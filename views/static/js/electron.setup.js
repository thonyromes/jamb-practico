if (typeof module === 'object') {
    window.module = module
    module = undefined
}


// document.onkeydown = (e) => {
//     if (event.keyCode == 123) {
//         return false
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
//         return false
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
//         return false
//     }
//     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
//         return false
//     }
// }


const build = require('../../src/build')

const reset = () => {
    localStorage.clear()
}
const loginInit = () => {
    if (build.loggedIn()) {
        location.assign('./index.html')
    }
}


const examInit = () => {
    if ((!localStorage.getItem('examEnd')) && (!localStorage.getItem('subjects'))) {
        location.assign('./index.html')
    }
}

const init = () => {
    if (!build.loggedIn()) {
        location.assign('./login.html')
    }
}

const getSettings = () => {
    return build.getUserSettings()
}


const setSettings = (config) => {
    return build.setUserSettings(config)
}

const resetSettings = () => {
    return build.resetUserSettings()
}


const login = () => {
<<<<<<< HEAD
	document.querySelector('#form').onsubmit = (e) => {
		e.preventDefault()
		let email = document.querySelector('#userEmail').value
		let password = document.querySelector('#userPass').value

		resetSettings()
		if (email == 'admin@jambpractico.com' && password == 'practicoadmin') {
			setSettings({
				name: 'Practico Admin',
				loggedIn: true
			})
			location.assign('./login.html')
        }
        else{
			alert('Verify Login credentials')
		}
	}
=======
    document.querySelector('#form').onsubmit = (e) => {
        e.preventDefault()
        let email = document.querySelector('#userEmail').value
        let password = document.querySelector('#userPass').value

        resetSettings()
        if (email == 'admin@jambpractico.com' && password == 'practicoadmin') {
            setSettings({
                name: 'Practico Admin',
                loggedIn: true,
                email: 'admin@jambpractico.com  '
            })
            location.assign('./login.html')
        } else {
            alert('Login Failed')
        }
    }
>>>>>>> c207156ddfcbaba1f045ea2885f4316535dada56
}