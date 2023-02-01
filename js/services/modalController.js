const modalController = (id, title = "", content = "") => {
    const modal = document.querySelector(id)
    modal.classList.toggle("hidden")
    modal.classList.toggle("opacity-0")

    const body = document.querySelector("body")
    body.classList.toggle("overflow-hidden")

    document.querySelector("#editTitle").value = title
    document.querySelector("#editContent").value = content
}

const getTitleAndContentModal = () => {
    const title = document.querySelector("#editTitle").value
    const content = document.querySelector("#editContent").value
    return { title, content }
}

export default modalController
export { getTitleAndContentModal }