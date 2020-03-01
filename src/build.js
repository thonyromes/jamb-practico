const { AlphaORM: DB } = require('alpha-orm')
const fs = require('fs')
const usb = require('usb')
const constants = require('./constants')
const licenseKey = require('license-key-gen')
const settings = require('electron-settings');


const setup = async () => {
    console.log('initializing')
    usb.on('detach', onUsbDetached)
    usb.on('attach', onUsbAttached)
    checkForGenuineDevice()
}

const notify = (title, body, icon = '../icon.ico') => {
    const notification = new Notification(title, { body, icon, closeButtonText: 'Dismiss' })

    notification.onclick = (event) => {
        ipcRenderer.send('notification-clicked', '')
    }
}

const isOnline = () => {
    return navigator.onLine
}

const generateLicense = (type = 'basic') => {
    let info = { company: 'Legool', company: 'MetaSoft Inc.', url: 'https:legool.tech', type, used: false }
    let data = { info, prodCode: Date.now(), appVersion: "1.5", osType: 'IOS8' }

    try {
        let license = licenseKey.createLicense(data).license
        hash = Buffer.from(JSON.stringify(data)).toString('base64')
        return { hash, license }
    } catch (err) {
        // console.log(err)
        return false
    }
}

const validateLicense = (hash, license) => {
    try {
        let data = JSON.parse(Buffer.from(hash, 'base64').toString('ascii'))
        var license = licenseKey.validateLicense(data, license);
        return true
    } catch (err) {
        return false
    }
}


// Private functions
const checkForGenuineDevice = () => {
    wait(0.1)
    for (letter of constants.LETTERS) {
        try {
            fs.openSync(`${letter}:\\${constants.ASSETS_DIR}`, 'r')
            hideModal()
            return true
        } catch (e) {
            continue
        }
    }
    showModal()
    return false
}

const onUsbDetached = () => {
    if (!checkForGenuineDevice()) {
        // notify('Legool', 'The Legool USB Device has been unplugged.')
    }
}

const onUsbAttached = () => {
    if (checkForGenuineDevice()) {
        // notify('Legool', 'The Legool USB Device has been detected.')
    }
}

const wait = (s) => {
    let ms = s * 1000
    let waitDateOne = new Date();
    while ((new Date()) - waitDateOne <= ms) {}
}

const createLicenses = (num, type = 'basic') => {
    fd = fs.openSync('licenses.txt', 'a+');
    for (let i = 0; i < num; i++) {
        let license = generateLicense(type)
        fs.writeSync(fd, `${license.hash} , ${license.license}\n\n`)
        wait(0.1)
    }
}

const showModal = () => {
    $("#modal-fixed").modal({
        backdrop: "static",
        keyboard: false
    })
}

const hideModal = () => {
    $("#modal-fixed").modal('hide')
}

const loggedIn = () => {
    if (settings.has('user.loggedIn')) {
        return settings.get('user.loggedIn')
    }
    return false
}

const setUserSettings = (config) => {
    if (settings.has('user')) {
        settings.delete('user')
    }
    settings.set('user', config);
}


const getUserSettings = () => {
    return settings.get('user');
}


const resetUserSettings = () => {
    settings.delete('user')
}

module.exports = { setup, notify, isOnline, generateLicense, validateLicense, loggedIn, setUserSettings, getUserSettings, resetUserSettings }