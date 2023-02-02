import createElementNotepad from "./createElementNotepad.js"
import remapEvents from "./remapEvents.js"

import {
    getAllNotepads,
    searchNotepads
} from "../crud.js"

const reloadElementsInPage = async (data, erasedCurrent = false) => {
    if (erasedCurrent) {
        const notepads = document.querySelector("#notepads")
        notepads.innerHTML = ""
    }

    for (const item of data)
        await createElementNotepad(item._id, item.title, item.content)

    remapEvents()
}

const search = async (key) => {
    if (key === "Enter") {
        const inputSearch = document.querySelector("#input-search")
        const query = inputSearch.value

        let data

        if (query === "") data = await getAllNotepads()
        else data = await searchNotepads(query)

        await reloadElementsInPage(data, true)
    }
}

const clearSearch = () => {
    const inputSearch = document.querySelector("#input-search")
    inputSearch.value = ""
}

export { reloadElementsInPage, search, clearSearch }