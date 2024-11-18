import { conectaApi } from "./conectaApi.js";
const formulario = document.querySelector("[data-formulario]");

async function criarCard(evento) {
    evento.preventDefault();

    const titulo = document.querySelector("[data-titulo]").value;
    const valor = document.querySelector("[data-valor]").value;
    const imagem = document.querySelector("[data-imagem]").value;
    try {

        await conectaApi.criarCard(titulo, valor, imagem);
    } catch (e) {
        alert(e);
    }

}

formulario.addEventListener("submit", evento => criarCard(evento));