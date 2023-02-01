import lastNotepad from "../controller/lastNotepad.js"
import reqType from "../controller/reqType.js"

import {
    createNotepad,
    updateNotepad
} from "../crud.js"

import modalController, {
    getTitleAndContentModal
} from "./modals/modalController.js"

import createElementNotepad from "./createElementNotepad.js"
import remapEvents from "./remapEvents.js"

import { idEdit } from "./getIdModals.js"

const controllerEdit = async (title, content) => {
    lastNotepad.setTitleAndContent(title, content)
    await updateNotepad(lastNotepad.getId(), {title, content})
}

const controllerCreate = async (title, content) => {
    const notepad = await createNotepad(title, content)

    const elementContent = createElementNotepad(
        notepad._id, notepad.title, notepad.content
    )

    remapEvents()
    
    const parser = new DOMParser()
    lastNotepad.set(parser.parseFromString(elementContent, "text/html"))
}

const controllFormCreateOrEdit = async () => {
    const { title, content } = getTitleAndContentModal()

    modalController(idEdit)
    
    if (reqType.get() === "PATCH") 
        controllerEdit(title, content)
    else if (reqType.get() === "POST") 
        controllerCreate(title, content)
}

export default controllFormCreateOrEdit