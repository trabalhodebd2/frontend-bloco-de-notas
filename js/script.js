import lastNotepad from "./controller/lastNotepad.js"
import reqType from "./controller/reqType.js"

import createElementNotepad from "./services/createElementNotepad.js"
import remapEvents from "./services/remapEvents.js"

import modalController, {
    getTitleAndContentModal
} from "./services/modalController.js"

import {
    getAllNotepads,
    createNotepad,
    updateNotepad,
    deleteNotepad,
    searchNotepads
} from "./crud.js"

const idDelete = "#modal-delete"
const idEdit = "#modal-edit"

// Controller de submeter formularios

const controllFormEdit = async () => {
    const { title, content } = getTitleAndContentModal()

    modalController(idEdit)
    
    if (reqType.get() === "PATCH") {
        lastNotepad.setTitleAndContent(title, content)

        await updateNotepad(lastNotepad.getId(), {title, content})
    } else if (reqType.get() === "POST") {
        const notepad = await createNotepad(title, content)

        const elementContent = createElementNotepad(
            notepad._id, notepad.title, notepad.content
        )

        remapEvents()
        
        const parser = new DOMParser()
        lastNotepad.set(parser.parseFromString(elementContent, "text/html"))
    }
}

// Contoler de eventos para fechar modal

const listIdModal = [idEdit, idDelete]

listIdModal.forEach(idModal => {
    const modal = document.querySelector(idModal)
    modal.addEventListener("click", event => {
        if (event.target !== event.currentTarget) return null
        modalController(idModal)
    })
})

listIdModal.forEach(idModal => {
    const modal = document.querySelector(idModal)
    const buttonCancel = modal.querySelector(".cancel")
    buttonCancel.addEventListener("click", () => modalController(idModal))
})

// Contoler ao apertar no botão de submeter formulario

document.querySelector(idEdit).addEventListener("submit", event => {
    event.preventDefault()
    controllFormEdit()

    clearSearch()
})

document.querySelector(idDelete).addEventListener("submit", event => {
    event.preventDefault()
    modalController(idDelete)

    lastNotepad.removeElementAnnotation()
    deleteNotepad(lastNotepad.getId())

    clearSearch()
})

// Apertar para criar notepad

document.querySelector("#create-notepad").addEventListener("click", event => {
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