class lastNotepad {
    lastNotepad

    constructor() {
        this.lastNotepad
    }

    set (newLastNotepad) {
        this.lastNotepad = newLastNotepad
    }

    get () {
        return this.lastNotepad
    }

    getId () {
        return this.lastNotepad.id
    }

    getTitleAndContent () {
        const title = this.lastNotepad.querySelector(".title").innerText
        const content = this.lastNotepad.querySelector(".content").innerText
    
        return { title, content }
    }
    
    setTitleAndContent (title, content) {
        if (this.lastNotepad) {
            this.lastNotepad.querySelector(".title").innerText = title
            this.lastNotepad.querySelector(".content").innerText = content
        }
    }

    updateElementNotepad (imgCurrent) {
        this.lastNotepad = imgCurrent
        for (let cont = 0; cont < 3; cont++) 
            this.lastNotepad = this.lastNotepad.parentNode
    }

    removeElementAnnotation () {
        this.lastNotepad.remove()
    }
}

export default new lastNotepad()