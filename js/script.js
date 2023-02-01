import lastNotepad from "./controller/lastNotepad.js"
import reqType from "./controller/reqType.js"

import createElementNotepad from "./services/createElementNotepad.js"
import remapEvents from "./services/remapEvents.js"

import controllFormCreateOrEdit from "./services/createOrEditAnnotation.js"
import reloadCancelModal from "./services/modals/reloadCancelModal.js"
import modalController from "./services/modals/modalController.js"

import {
    getAllNotepads,
    deleteNotepad,
    searchNotepads
} from "./crud.js"

import { idEdit, idDelete } from "./services/getIdModals.js"

// Contoler ao apertar no botão de submeter formulario

document.querySelector(idEdit).addEventListener("submit", event => {
    event.preventDefault()
    controllFormCreateOrEdit()

    clearSearch()
})

document.querySelector(idDelete).addEventListener("submit", event => {
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

// Evento ao Pesquisar

const reloadElementsInPage = async (data, erasedCurrent = false) => {
    if (erasedCurrent) {
        const notepads = document.querySelector("#notepads")
        notepads.innerHTML = ""
    }

    for (const item of data)
        await createElementNotepad(item._id, item.title, item.content)

    remapEvents()
}

const inputSearch = document.querySelector("#input-search")
inputSearch.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        const query = inputSearch.value
        let data

        if (query === "") data = await getAllNotepads()
        else data = await searchNotepads(query)

        await reloadElementsInPage(data, true)
    }
})

const clearSearch = () => inputSearch.value = ""

// Inicializador, carrega os blocos de notas atuais

const init = async (erasedCurrent = false) => {
    const data = await getAllNotepads() || []
    reloadElementsInPage(data, erasedCurrent)
}

init()
reloadCancelModal()