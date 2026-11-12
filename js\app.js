// Lógica Principal + Persistência 

// Carregamento dos dados do LocalStorage com fallback para os dados iniciais
let alunos = carregarDados(STORAGE_KEYS.alunos, alunosIniciais);
let cursosCadastrados = carregarDados(STORAGE_KEYS.cursos, cursosIniciais);
let matriculas = carregarDados(STORAGE_KEYS.matriculas, matriculasIniciais);
let usuarios = carregarDados(STORAGE_KEYS.usuarios, usuariosIniciais);

// Atualizar contadores do Dashboard
function atualizarDashboard() {
    const elAlunos = document.querySelector("#total-alunos");
    const elCursos = document.querySelector("#total-cursos");
    const elMatriculas = document.querySelector("#total-matriculas");
    const elUsuarios = document.querySelector("#total-usuarios");

    if (elAlunos) elAlunos.textContent = alunos.length;
    if (elCursos) elCursos.textContent = cursosCadastrados.length;
    if (elMatriculas) elMatriculas.textContent = matriculas.length;
    if (elUsuarios) elUsuarios.textContent = usuarios.length;
}

// Criar o card do aluno com botões de detalhes e remoção persistente
function criarCardAluno(aluno) {
    const cardAluno = document.createElement("article");
    cardAluno.classList.add("card");

    const nome = document.createElement("h3");
    nome.textContent = aluno.nome;

    const curso = document.createElement("p");
    curso.textContent = `Curso: ${aluno.curso}`;

    const status = document.createElement("p");
    status.textContent = `Status: ${aluno.status}`;

    const btnDetalhes = document.createElement("button");
    btnDetalhes.textContent = "Ver detalhes";
    btnDetalhes.style.marginRight = "8px";
    btnDetalhes.addEventListener("click", () => exibirDetalhesAluno(aluno));

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.addEventListener("click", () => {
        const index = alunos.findIndex(a => a.id === aluno.id);
        if (index !== -1) {
            alunos.splice(index, 1);
            // Salvar no LocalStorage após a remoção (Passo 40)
            salvarDados(STORAGE_KEYS.alunos, alunos);
            aplicarFiltros();
            atualizarDashboard();
        }
    });

    cardAluno.append(nome, curso, status, btnDetalhes, btnRemover);
    return cardAluno;
}

// Renderizar lista de alunos na página
function renderizarAlunos(lista) {
    const listaAlunosElemento = document.querySelector("#lista-alunos");
    if (!listaAlunosElemento) return;

    listaAlunosElemento.textContent = "";

    for (const aluno of lista) {
        const card = criarCardAluno(aluno);
        listaAlunosElemento.append(card);
    }
}

// Aplicar filtros de busca e status (Aviso: busca e filtro NÃO devem salvar no LocalStorage - Passos 69 e 70)
function aplicarFiltros() {
    const campoBusca = document.querySelector("#busca");
    const filtroStatus = document.querySelector("#filtro-status");

    const termo = campoBusca ? campoBusca.value.toLowerCase() : "";
    const statusSelecionado = filtroStatus ? filtroStatus.value.toLowerCase() : "";

    const filtrados = alunos.filter((aluno) => {
        const correspondeNome = aluno.nome.toLowerCase().includes(termo);
        const correspondeStatus = statusSelecionado === "" || aluno.status.toLowerCase() === statusSelecionado;
        return correspondeNome && correspondeStatus;
    });

    const listaAlunosElemento = document.querySelector("#lista-alunos");
    if (!listaAlunosElemento) return;

    listaAlunosElemento.textContent = "";

    if (filtrados.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum aluno encontrado.";
        listaAlunosElemento.append(mensagem);
    } else {
        renderizarAlunos(filtrados);
    }
}

// Exibir detalhes do aluno selecionado
function exibirDetalhesAluno(aluno) {
    const elNome = document.querySelector("#detalhe-nome");
    const elCurso = document.querySelector("#detalhe-curso");
    const elStatus = document.querySelector("#detalhe-status");

    if (elNome) elNome.textContent = aluno.nome;
    if (elCurso) elCurso.textContent = aluno.curso;
    if (elStatus) elStatus.textContent = aluno.status;
}

// Restaurar dados iniciais dos alunos (Passo 48)
function restaurarAlunos() {
    alunos = [...alunosIniciais];
    salvarDados(STORAGE_KEYS.alunos, alunos);
    renderizarAlunos(alunos);
    atualizarDashboard();
}

// Função de Inicialização Geral da Aplicação (Passo 66)[cite: 52]
function inicializarAplicacao() {
    atualizarDashboard();
    renderizarAlunos(alunos);
}

// Executado quando o DOM é totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
    inicializarAplicacao();

    // Evento de submit do formulário de cadastro com persistência (Passo 37)
    const formAluno = document.querySelector("#form-aluno");
    if (formAluno) {
        formAluno.addEventListener("submit", function(evento) {
            evento.preventDefault(); // Impede o recarregamento da página

            const nomeInput = document.querySelector("#nome-aluno").value;
            const cursoInput = document.querySelector("#curso-aluno").value;
            const statusInput = document.querySelector("#status-aluno").value;

            const novoAluno = {
                id: gerarNovoId(alunos), // ID seguro (Passo 72)[cite: 53]
                nome: nomeInput,
                curso: cursoInput,
                status: statusInput
            };

            alunos.push(novoAluno);
            
            // Salvar no LocalStorage (Passo 37)[cite: 45]
            salvarDados(STORAGE_KEYS.alunos, alunos);

            aplicarFiltros();
            atualizarDashboard();
            formAluno.reset();
        });
    }

    // Eventos de busca e alteração de status nos filtros
    const campoBusca = document.querySelector("#busca");
    const filtroStatus = document.querySelector("#filtro-status");
    if (campoBusca) campoBusca.addEventListener("input", aplicarFiltros);
    if (filtroStatus) filtroStatus.addEventListener("change", aplicarFiltros);

    // Evento do botão de restaurar dados iniciais (Passo 50)[cite: 48, 49]
    const btnRestaurar = document.querySelector("#btn-restaurar-alunos");
    if (btnRestaurar) {
        btnRestaurar.addEventListener("click", restaurarAlunos);
    }
});
