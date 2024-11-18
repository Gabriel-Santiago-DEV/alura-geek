async function listaProdutos() {
    const conexao = await fetch("http://localhost:3000/Produtos");
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

async function criarCard(titulo, valor, imagem) {
    const conexao = await fetch("http://localhost:3000/Produtos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            valor: `R$ ${valor}`,
            imagem: imagem
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar o produto")
    }
    const conexaoConvertida = await conexao.json();

    return conexaoConvertida;
}

export const conectaApi = {
    listaProdutos,
    criarCard
}