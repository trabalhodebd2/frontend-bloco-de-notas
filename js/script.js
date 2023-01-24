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

const updateElementNotepad = (imgCurrent) => {
    lastNotepad = imgCurrent
    for (let cont = 0; cont < 3; cont++) 
        lastNotepad = lastNotepad.parentNode
}

const controlEdit = async () => {
    const title = document.querySelector("#editTitle").value
    const content = document.querySelector("#editContent").value

    modalController(idEdit)
    
    if (isStringEmpty(title) === true && isStringEmpty(content) === true) return

    if (reqType === "PATCH") {
        lastNotepad.querySelector(".title").innerText = title
        lastNotepad.querySelector(".content").innerText = content

        await updateNotepad(lastNotepad.id, {title, content})
    } else if (reqType === "POST") {
        const notepad = await createNotepad(title, content)
        const elementContent = createElementNotepad(
            notepad._id, notepad.title, notepad.content
        )

        remapEvents()
        
        const parser = new DOMParser();
        lastNotepad = parser.parseFromString(elementContent, "text/html")
    }
}

const controllerDelete = (event) => {
    modalController(idDelete)
    updateElementNotepad(event.target)
}

const controllerEdit = (event) => {
    updateElementNotepad(event.target)
    reqType = "PATCH"

    const title = lastNotepad.querySelector(".title").innerText
    const content = lastNotepad.querySelector(".content").innerText

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

document.querySelector(idEdit).addEventListener("click", event => {
    if (event.target !== event.currentTarget) return;
    const buttonCreate = document.querySelector("#button-cancel-update")
    const buttonDelete = document.querySelector("#button-update")
    controlEdit()
})

document.querySelector(idEdit).addEventListener("keyup", event => {
    if (event.key === "Enter") controlEdit()
})

document.querySelector(idDelete).addEventListener("click", event => {
    const buttonCancel = document.querySelector("#button-cancel")
    const buttonDelete = document.querySelector("#button-delete")
    const target = event.target

    if (target === buttonCancel || target === buttonDelete) {
        modalController(idDelete)
        
        if (target === buttonDelete) {
            lastNotepad.remove()
            deleteNotepad(lastNotepad.id)
        }
    }
    
    if (event.target !== event.currentTarget) return;
    
    modalController(idDelete)
})

document.querySelector("#create-notepad").addEventListener("click", event => {
    modalController(idEdit)
    reqType = "POST"
})

const init = async () => {
    const data = await getAllNotepads()
    
    for (const item of data) {
        await createElementNotepad(item._id, item.title, item.content)
    }

    remapEvents()
}

init()