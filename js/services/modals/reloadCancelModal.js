import modalController from "./modalController.js"

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
    const idDelete = "#modal-delete"
    const idEdit = "#modal-edit"
    
    const listIdModal = [idEdit, idDelete]

    reloadCancelWhitClick(listIdModal)
    reloadCancelWhitButton(listIdModal)
}

export default reloadCancelModal