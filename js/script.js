const imgDelete = document.querySelectorAll(".delete")
const imgEdit = document.querySelectorAll(".edit")

const idDelete = "#modal-delete"
const idEdit = "#modal-edit"

const modalController = (id) => {
    const modal = document.querySelector(id)
    modal.classList.toggle("hidden")
    modal.classList.toggle("opacity-0")

    const body = document.querySelector("body")
    body.classList.toggle("overflow-hidden")
}

imgDelete.forEach(img => img.addEventListener("click", event => {
    modalController(idDelete)
}))

imgEdit.forEach(img => img.addEventListener("click", event => {
    modalController(idEdit)
}))

document.querySelector(idEdit).addEventListener("click", event => {
    if (event.target !== event.currentTarget) {
        return;
    }
    modalController(idEdit)
})

document.querySelector(idDelete).addEventListener("click", event => {
    if (event.target !== event.currentTarget) {
        return;
    }
    modalController(idDelete)
})