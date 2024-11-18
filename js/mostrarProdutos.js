import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");

export default function constroiCard(titulo, valor, imagem, id) {
    if (!titulo || !valor || !imagem || !id) {
        throw new Error("Informações insuficientes para criar o card");
    }

    const produto = document.createElement("div");
    produto.className = "card";
    produto.innerHTML = `
        <div class="produtos">
            <img class="imagem-produto" src="${imagem}" alt="Imagem do produto">
            <div class="container__info">
                <p>${titulo}</p>
                <div class="precos">
                    <p>${valor}</p>
                    <img class="lixeira" src="img/lixeira.png" alt="Ícone de lixeira">
                </div>
            </div>
        </div>`;

    const lixeira = produto.querySelector(".lixeira");

    lixeira.addEventListener("click", async function () {
        const confirmacao = window.confirm("Tem certeza de que deseja excluir este produto?");

        if (confirmacao) {
            try {
                const resposta = await fetch(`http://localhost:3000/Produtos/${id}`, {
                    method: "DELETE"
                });

                if (!resposta.ok) {
                    throw new Error("Falha ao excluir o produto");
                }

                produto.remove();
                console.log(`Produto ${id} excluído com sucesso!`);
            } catch (erro) {
                console.error("Erro ao excluir o produto:", erro);
            }
        } else {

            console.log("Exclusão do produto cancelada.");
        }
    });

    return produto;
}

async function listaProdutos() {
    try {
        const listaApi = await conectaApi.listaProdutos();
        listaApi.forEach(elemento => {

            lista.appendChild(constroiCard(elemento.titulo, elemento.valor, elemento.imagem, elemento.id));
        });
    } catch (erro) {
        console.error("Erro ao carregar os produtos:", erro);
        lista.innerHTML = `<h2 class="mensagem__erro">Não foi possível carregar a lista de produtos</h2>`;
    }
}



listaProdutos();
