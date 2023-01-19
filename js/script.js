import {
    getAllNotepads,
    deleteNotepad
} from "./crud.js"

import {
    createNotepad,
    isStringEmpty,
    modalController
} from "./functions.js"

const idDelete = "#modal-delete"
const idEdit = "#modal-edit"

let lastNotepad, reqType

const controlEdit = () => {
    const title = document.querySelector("#editTitle").value
    const text = document.querySelector("#editText").value

    modalController(idEdit)
    
    if (isStringEmpty(title) === true && isStringEmpty(text) === true) return;

    lastNotepad.querySelector(".title").innerText = title
    lastNotepad.querySelector(".text").innerText = text
}

const controllerDelete = (event) => {
    modalController(idDelete)
    lastNotepad = event.path[3]
}

const controllerEdit = (event) => {
    lastNotepad = event.path[3]
    reqType = "PUT"

    const title = lastNotepad.querySelector(".title").innerText
    const text = lastNotepad.querySelector(".text").innerText

    modalController(idEdit, title, text)
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
    // const element = createNotepad(3)

    // document.querySelector("#notepads").innerHTML += element
    // lastNotepad = element

    remapEvents()
})

const init = async () => {
    const notepads = document.querySelector("#notepads")
    const data = await getAllNotepads()
    
    for (const item of data) {
        const element = createNotepad(item.id, item.title, item.text)
        notepads.innerHTML += element
    }

    remapEvents()
}

init()