import lastNotepad from "../controller/lastNotepad.js"
import reqType from "../controller/reqType.js"

import modalController from "./modals/modalController.js"

import { idEdit, idDelete } from "./getIdModals.js"

const controllerDelete = (event) => {
    modalController(idDelete)
    lastNotepad.updateElementNotepad(event.target)
}

const controllerEdit = (event) => {
    lastNotepad.updateElementNotepad(event.target)    
    reqType.set("PATCH")

    const { title, content } = lastNotepad.getTitleAndContent()
    modalController(idEdit, title, content)
}

const remapEvents = () => {
    const imgsDelete = document.querySelectorAll(".delete")
    imgsDelete.forEach(img => {
        img.addEventListener("click", controllerDelete)
    })

    const imgsEdit = document.querySelectorAll(".edit")
    imgsEdit.forEach(img => {
        img.addEventListener("click", controllerEdit)
    })
}

export default remapEvents