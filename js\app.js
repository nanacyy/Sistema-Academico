// Lógica principal 
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
            aplicarFiltros();
            atualizarDashboard();
        }
    });

    cardAluno.append(nome, curso, status, btnDetalhes, btnRemover);
    return cardAluno;
}

function renderizarAlunos(lista) {
    const listaAlunosElemento = document.querySelector("#lista-alunos");
    if (!listaAlunosElemento) return;

    listaAlunosElemento.textContent = "";

    for (const aluno of lista) {
        const card = criarCardAluno(aluno);
        listaAlunosElemento.append(card);
    }
}

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

function exibirDetalhesAluno(aluno) {
    const elNome = document.querySelector("#detalhe-nome");
    const elCurso = document.querySelector("#detalhe-curso");
    const elStatus = document.querySelector("#detalhe-status");

    if (elNome) elNome.textContent = aluno.nome;
    if (elCurso) elCurso.textContent = aluno.curso;
    if (elStatus) elStatus.textContent = aluno.status;
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarDashboard();
    renderizarAlunos(alunos);

    const formAluno = document.querySelector("#form-aluno");
    if (formAluno) {
        formAluno.addEventListener("submit", function(evento) {
            evento.preventDefault(); // Impede o recarregamento da página (Passo 45)[cite: 40]

            const nomeInput = document.querySelector("#nome-aluno").value;
            const cursoInput = document.querySelector("#curso-aluno").value;
            const statusInput = document.querySelector("#status-aluno").value;

            const novoAluno = {
                id: alunos.length + 1,
                nome: nomeInput,
                curso: cursoInput,
                status: statusInput
            };

            alunos.push(novoAluno);
            aplicarFiltros();
            atualizarDashboard();
            formAluno.reset();
        });
    }

    const campoBusca = document.querySelector("#busca");
    const filtroStatus = document.querySelector("#filtro-status");
    if (campoBusca) campoBusca.addEventListener("input", aplicarFiltros);
    if (filtroStatus) filtroStatus.addEventListener("change", aplicarFiltros);
});
