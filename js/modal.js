const imgDelete = document.querySelectorAll(".delete")
const imgEdit = document.querySelectorAll(".edit")

const idDelete = "#modal-delete"
const idEdit = "#modal-edit"

let lastNotepad
let counter = 0

const modalController = (id, title = "", text = "") => {
    const modal = document.querySelector(id)
    modal.classList.toggle("hidden")
    modal.classList.toggle("opacity-0")

    const body = document.querySelector("body")
    body.classList.toggle("overflow-hidden")

    document.querySelector("#editTitle").value = title
    document.querySelector("#editText").value = text
}

const isStringEmpty = (text) => {
    return text.trim().length === 0;
}

const controlEdit = () => {
    const title = document.querySelector("#editTitle").value
    const text = document.querySelector("#editText").value

    modalController(idEdit)
    
    if (isStringEmpty(title) === true && isStringEmpty(text) === true) return;

    lastNotepad.querySelector(".title").innerText = title
    lastNotepad.querySelector(".text").innerText = text
}

imgDelete.forEach(img => img.addEventListener("click", event => {
    modalController(idDelete)
    lastNotepad = event.path[3]
}))

imgEdit.forEach(img => img.addEventListener("click", event => {
    lastNotepad = event.path[3]

    const title = lastNotepad.querySelector(".title").innerText
    const text = lastNotepad.querySelector(".text").innerText

    modalController(idEdit, title, text)
}))

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
        }
    }
    
    if (event.target !== event.currentTarget) return;
    
    modalController(idDelete)
})