import data from "./data.js"

const idDelete = "#modal-delete"
const idEdit = "#modal-edit"

let lastNotepad

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

const controllerDelete = (event) => {
    modalController(idDelete)
    lastNotepad = event.path[3]
}

const controllerEdit = (event) => {
    lastNotepad = event.path[3]

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

const createNotepad = (id, title = '', text = '') => {
    const element = `
        <article id=${id} class="bg-primary p-9 rounded-lg shadow-common">
            <header class="flex justify-between align-center">
                <h1 class="text-xl title">${title}</h1>
                <div class="flex gap-4">
                    <img 
                        src="img/trash.svg" 
                        alt="Deletar" 
                        class="h-6 cursor-pointer delete"
                    />
                    <img 
                        src="img/edit.svg" 
                        alt="Editar" 
                        class="h-6 cursor-pointer edit"
                    />
                </div>
            </header>
            <p class="text-base mt-6 text">${text}</p>
        </article>
    `

    return element
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
        }
    }
    
    if (event.target !== event.currentTarget) return;
    
    modalController(idDelete)
})

document.querySelector("#create-notepad").addEventListener("click", event => {
    modalController(idEdit)
    const element = createNotepad(3)

    document.querySelector("#notepads").innerHTML += element
    lastNotepad = element

    remapEvents()
})

const init = () => {
    const notepads = document.querySelector("#notepads")
    for (const item of data) {
        const element = createNotepad(item.id, item.title, item.text)
        notepads.innerHTML += element
    }
    remapEvents()
}

init()