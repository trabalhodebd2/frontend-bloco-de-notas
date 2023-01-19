const urlApi = "http://localhost:8000/notepad"

const getAllNotepads = async () => {
    try {
        const response = await fetch(urlApi)
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const createNotepad = async (title, text) => {
    const config = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify({ title, text })
	};

    try {
        const response = await fetch(urlApi, config)
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const updateNotepad = async (id, update) => {
    const config = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(update)
	};

    try {
        const response = await fetch(`${urlApi}/${id}`, config)
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


export { getAllNotepads, createNotepad, updateNotepad, deleteNotepad }