const urlApi = "http://localhost:8000/annotations"

const getAllNotepads = async () => {
    try {
        const response = await fetch(urlApi)
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const createNotepad = async (title, content) => {
    const config = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify({ title, content })
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
		method: "PATCH",
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

const searchNotepads = async (query) => {
    try {
        const response = await fetch(`${urlApi}?query=${query}`)
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export { getAllNotepads, createNotepad, updateNotepad, deleteNotepad, searchNotepads }