const createElementNotepad = (id, title = '', content = '') => {
    const element = `
        <article id=${id} class="bg-primary p-9 w-full rounded-lg shadow-common
                border border-solid border-[#e7e7e7]">
            <header class="flex justify-between align-center">
                <h1 class="content-xl title">${title}</h1>
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
            <p class="text-base mt-6 content">${content}</p>
        </article>
    `

    const notepads = document.querySelector("#notepads")
    notepads.innerHTML += element

    return element
}

export default createElementNotepad