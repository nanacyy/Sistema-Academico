
// Módulo de Armazenamento 
console.log("Módulo de armazenamento carregado.");

// Chaves da aplicação com o prefixo recomendado
const STORAGE_KEYS = {
    alunos: "academico_alunos",
    cursos: "academico_cursos",
    matriculas: "academico_matriculas",
    usuarios: "academico_usuarios"
};

// Salvar dados no LocalStorage (Serialização)
function salvarDados(chave, dados) {
    try {
        localStorage.setItem(chave, JSON.stringify(dados));
    } catch (erro) {
        console.error("Erro ao salvar dados no LocalStorage.", erro);
    }
}

// Carregar dados do LocalStorage (Desserialização com tratamento try...catch)
function carregarDados(chave, valorPadrao) {
    const dados = localStorage.getItem(chave);
    if (!dados) {
        return valorPadrao;
    }
    try {
        return JSON.parse(dados);
    } catch (erro) {
        console.error("Erro ao carregar dados.", erro);
        return valorPadrao;
    }
}

// Remover uma chave específica
function removerDados(chave) {
    localStorage.removeItem(chave);
}

// Gerar ID seguro para evitar duplicidade ou conflitos após remoções
function gerarNovoId(lista) {
    if (lista.length === 0) {
        return 1;
    }
    const ids = lista.map((item) => item.id);
    return Math.max(...ids) + 1;
}
