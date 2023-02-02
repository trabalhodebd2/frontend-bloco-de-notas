import lastNotepad from "./controller/lastNotepad.js"
import reqType from "./controller/reqType.js"

import controllFormCreateOrEdit from "./services/createOrEditAnnotation.js"
import reloadCancelModal from "./services/modals/reloadCancelModal.js"
import modalController from "./services/modals/modalController.js"

import { 
    reloadElementsInPage,
    search, 
    clearSearch
} from "./services/search.js"

import {
    getAllNotepads,
    deleteNotepad,
} from "./crud.js"

import { idEdit, idDelete } from "./services/getIdModals.js"

const modalEdit = document.querySelector(idEdit)
modalEdit.addEventListener("submit", event => {
    event.preventDefault()
    controllFormCreateOrEdit()

    clearSearch()
})

const modalDelete = document.querySelector(idDelete)
modalDelete.addEventListener("submit", event => {
    event.preventDefault()
    modalController(idDelete)

    lastNotepad.removeElementAnnotation()
    deleteNotepad(lastNotepad.getId())

    clearSearch()
})

const buttonCreateNotepad = document.querySelector("#create-notepad")
buttonCreateNotepad.addEventListener("click", event => {
    modalController(idEdit)
    reqType.set("POST")
})

const inputSearch = document.querySelector("#input-search")
inputSearch.addEventListener("keydown", async (event) => search(event.key))

const init = async (erasedCurrent = false) => {
    const data = await getAllNotepads() || []
    reloadElementsInPage(data, erasedCurrent)
}

init()
reloadCancelModal()