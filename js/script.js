import {
    getAllNotepads,
    createNotepad,
    updateNotepad,
    deleteNotepad,
} from "./crud.js"

import {
    createElementNotepad,
    isStringEmpty,
    modalController
} from "./functions.js"

const idDelete = "#modal-delete"
const idEdit = "#modal-edit"

let lastNotepad, reqType

// Controller do ultimo bloco de notas usado

const updateElementNotepad = (imgCurrent) => {
    lastNotepad = imgCurrent
    for (let cont = 0; cont < 3; cont++) 
        lastNotepad = lastNotepad.parentNode
}

const getTitleAndContent = () => {
    if (!lastNotepad) return {title: "", content: ""}

    const title = lastNotepad.querySelector(".title").innerText
    const content = lastNotepad.querySelector(".content").innerText

    return { title, content }
}

const setTitleAndContent = (title, content) => {
    if (lastNotepad) {
        lastNotepad.querySelector(".title").innerText = title
        lastNotepad.querySelector(".content").innerText = content
    }
}

// Remapear eventos das imgs de edit e delet

const remapEvents = () => {
    const controllerDelete = (event) => {
        modalController(idDelete)
        updateElementNotepad(event.target)
    }
    
    const controllerEdit = (event) => {
        updateElementNotepad(event.target)    
        reqType = "PATCH"

        const { title, content } = getTitleAndContent()
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
    const { title, content } = getTitleAndContent()

    modalController(idEdit)

    if (reqType === "PATCH") {    
        if (isStringEmpty(title) === true && isStringEmpty(content) === true) 
            return null
        
        setTitleAndContent(title, content)

        await updateNotepad(lastNotepad.id, {title, content})
    } else if (reqType === "POST") {
        const notepad = await createNotepad(title, content)

        const elementContent = createElementNotepad(
            notepad._id, notepad.title, notepad.content
        )

        remapEvents()
        
        const parser = new DOMParser()
        lastNotepad = parser.parseFromString(elementContent, "text/html")
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
})

document.querySelector(idDelete).addEventListener("submit", event => {
    event.preventDefault()
    modalController(idDelete)

    lastNotepad.remove()
    deleteNotepad(lastNotepad.id)
})

// Apertar para criar notepad

document.querySelector("#create-notepad").addEventListener("click", event => {
    modalController(idEdit)
    reqType = "POST"
})

// Inicializador, carrega os bloco de notas atuais

const init = async () => {
    const data = await getAllNotepads() || []
    
    for (const item of data) {
        await createElementNotepad(item._id, item.title, item.content)
    }

    remapEvents()
}

init()