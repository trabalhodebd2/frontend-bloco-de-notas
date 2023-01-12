import data from "./data.js"

const init = () => {
    const notepads = document.querySelector("#notepads")
    for (const item of data) {
        const element = `
            <article id=${item.id} class="bg-primary p-9 rounded-lg shadow-common">
                <header class="flex justify-between align-center">
                    <h1 class="text-xl title">${item.title}</h1>
                    <div class="flex gap-4">
                        <img src="img/trash.svg" alt="Deletar" class="h-6 cursor-pointer delete">
                        <img src="img/edit.svg" alt="Editar" class="h-6 cursor-pointer edit">
                    </div>
                </header>
                <p class="text-base mt-6 text">${item.text}</p>
            </article>
        `
        notepads.innerHTML += element
    }
}

init()