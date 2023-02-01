import lastNotepad from "./controller/lastNotepad.js"
import reqType from "./controller/reqType.js"

import {
    getAllNotepads,
    createNotepad,
    updateNotepad,
    deleteNotepad,
    searchNotepads
} from "./crud.js"

import {
    createElementNotepad,
    isStringEmpty,
    modalController
} from "./functions.js"

const idDelete = "#modal-delete"
const idEdit = "#modal-edit"

// Controller do ultimo bloco de notas usado

const getTitleAndContentModal = () => {
    const title = document.querySelector("#editTitle").value
    const content = document.querySelector("#editContent").value
    return { title, content }
}

// Remapear eventos das imgs de edit e delet

const remapEvents = () => {
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
    
    const imgsDelete = document.querySelectorAll(".delete")
    imgsDelete.forEach(img => {
        img.addEventListener("click", controllerDelete)
    })

    const imgsEdit = document.querySelectorAll(".edit")
    imgsEdit.forEach(img => {
        img.addEventListener("click", controllerEdit)
    })
}

// Controller de submeter formularios

const controllFormEdit = async () => {
    const { title, content } = getTitleAndContentModal()

    modalController(idEdit)
    
    if (reqType.get() === "PATCH") {
        if (isStringEmpty(title) === true && isStringEmpty(content) === true) 
            return null
        
        lastNotepad.setTitleAndContent(title, content)

        await updateNotepad(lastNotepad.getId(), {title, content})
    } else if (reqType.get() === "POST") {
        const notepad = await createNotepad(title, content)
        console.log(notepad)

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
    init(true)
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