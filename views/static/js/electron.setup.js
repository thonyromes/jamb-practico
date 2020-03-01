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


const loginInit = () => {
    if (build.loggedIn()) {
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