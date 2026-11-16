
console.log("Módulo de armazenamento carregado.");

// ========================================
// CHAVES DE ARMAZENAMENTO
// ========================================

const STORAGE_KEYS = {
  alunos: "academico_alunos",
  cursos: "academico_cursos",
  matriculas: "academico_matriculas",
  usuarios: "academico_usuarios"
};

// ========================================
// SALVAR DADOS
// ========================================

function salvarDados(chave, dados) {
  try {
    const dadosConvertidos = JSON.stringify(dados);
    localStorage.setItem(chave, dadosConvertidos);

    return true;
  } catch (erro) {
    console.error("Erro ao salvar os dados:", erro);
    return false;
  }
}

// ========================================
// CARREGAR DADOS
// ========================================

function carregarDados(chave, valorPadrao) {
  try {
    const dados = localStorage.getItem(chave);

    if (dados === null) {
      return [...valorPadrao];
    }

    const dadosConvertidos = JSON.parse(dados);

    if (!Array.isArray(dadosConvertidos)) {
      console.warn("Formato de dados inválido. Restaurando valores padrão.");
      return [...valorPadrao];
    }

    return dadosConvertidos;

  } catch (erro) {
    console.error("Erro ao carregar os dados:", erro);
    return [...valorPadrao];
  }
}

// ========================================
// REMOVER DADOS
// ========================================

function removerDados(chave) {
  try {
    localStorage.removeItem(chave);
    return true;

  } catch (erro) {
    console.error("Erro ao remover os dados:", erro);
    return false;
  }
}
