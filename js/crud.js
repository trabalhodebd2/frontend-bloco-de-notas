const urlApi = "http://localhost:8000/notepad"

const getAllNotepads = async () => {
    try {
        const response = await fetch(urlApi)
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const deleteNotepad = async (id) => {
    const config = { method: "DELETE" }
    try {
        const response = await fetch(`${urlApi}/${id}`, config)
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { getAllNotepads, deleteNotepad }