import modalController from "./modalController.js"

import { listIdModal } from "../getIdModals.js"

const reloadCancelWhitClick = (listIdModal) => {
    listIdModal.forEach(idModal => {
        const modal = document.querySelector(idModal)
        modal.addEventListener("click", event => {
            if (event.target !== event.currentTarget) return null
            modalController(idModal)
        })
    })
}

const reloadCancelWhitButton = (listIdModal) => {
    listIdModal.forEach(idModal => {
        const modal = document.querySelector(idModal)
        const buttonCancel = modal.querySelector(".cancel")
        buttonCancel.addEventListener("click", () => modalController(idModal))
    })
}

const reloadCancelModal = () => {
    reloadCancelWhitClick(listIdModal)
    reloadCancelWhitButton(listIdModal)
}

export default reloadCancelModal