// --- 1. DASHBOARD ---
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

// --- 2. RENDERIZAÇÃO E CARDS DE ALUNOS ---
function criarCardAluno(aluno) {
    const cardAluno = document.createElement("article");
    cardAluno.classList.add("card");

    const nome = document.createElement("h3");
    nome.textContent = aluno.nome;

    const curso = document.createElement("p");
    curso.textContent = `Curso: ${aluno.curso}`;

    const status = document.createElement("p");
    status.textContent = `Status: ${aluno.status}`;

    // Botão Ver Detalhes
    const btnDetalhes = document.createElement("button");
    btnDetalhes.textContent = "Ver detalhes";
    btnDetalhes.addEventListener("click", () => exibirDetalhesAluno(aluno));

    // Botão Remover
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

// --- 3. CURSOS ---
function criarCardCurso(curso) {
    const cardCurso = document.createElement("article");
    cardCurso.classList.add("card");

    const nome = document.createElement("h3");
    nome.textContent = curso.nome;

    const detalhes = document.createElement("p");
    detalhes.textContent = `Duração/Carga: ${curso.cargaHoraria || curso.duracao || "Padrão"}`;

    cardCurso.append(nome, detalhes);
    return cardCurso;
}

function renderizarCursos(lista) {
    const listaCursosElement = document.querySelector("#lista-cursos");
    if (!listaCursosElement) return;

    listaCursosElement.textContent = "";
    lista.forEach((curso) => {
        const card = criarCardCurso(curso);
        listaCursosElement.append(card);
    });
}

// --- 4. MATRÍCULAS ---
function criarCardMatricula(matricula) {
    const cardMatricula = document.createElement("article");
    cardMatricula.classList.add("card");

    const numero = document.createElement("h3");
    numero.textContent = `Código: ${matricula.id}`;

    const aluno = document.createElement("p");
    aluno.textContent = `Aluno: ${matricula.aluno}`;

    const curso = document.createElement("p");
    curso.textContent = `Curso: ${matricula.curso}`;

    const data = document.createElement("p");
    data.textContent = `Data: ${matricula.data}`;

    const turnoSemestre = document.createElement("p");
    turnoSemestre.textContent = `Turno: ${matricula.turno} | ${matricula.semestre}`;

    const status = document.createElement("p");
    status.textContent = `Status: ${matricula.status}`;

    cardMatricula.append(numero, aluno, curso, data, turnoSemestre, status);
    return cardMatricula;
}

function renderizarMatriculas(lista) {
    const listaMatriculasElement = document.querySelector("#lista-matriculas");
    if (!listaMatriculasElement) return;

    listaMatriculasElement.textContent = "";
    lista.forEach((matricula) => {
        const card = criarCardMatricula(matricula);
        listaMatriculasElement.append(card);
    });
}

// --- 5. USUÁRIOS ---
function criarCardUsuario(usuario) {
    const cardUsuario = document.createElement("article");
    cardUsuario.classList.add("card");

    const nome = document.createElement("h3");
    nome.textContent = usuario.nome;

    const email = document.createElement("p");
    email.textContent = `E-mail: ${usuario.email}`;

    const perfil = document.createElement("p");
    perfil.textContent = `Perfil: ${usuario.perfil}`;

    cardUsuario.append(nome, email, perfil);
    return cardUsuario;
}

function renderizarUsuarios(lista) {
    const listaUsuariosElement = document.querySelector("#lista-usuarios");
    if (!listaUsuariosElement) return;

    listaUsuariosElement.textContent = "";
    lista.forEach((usuario) => {
        const card = criarCardUsuario(usuario);
        listaUsuariosElement.append(card);
    });
}

// --- 6. FORMULÁRIOS E EVENTOS DE CADASTRO ---

// Cadastro de Alunos
const formAluno = document.querySelector("#form-aluno");
if (formAluno) {
    formAluno.addEventListener("submit", function(evento) {
        evento.preventDefault();

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

// Cadastro de Cursos
const formCurso = document.querySelector("#form-curso");
if (formCurso) {
    formCurso.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nomeInput = document.querySelector("#nome-curso").value;
        const cargaInput = document.querySelector("#carga-curso").value;

        const novoCurso = {
            id: cursosCadastrados.length + 1,
            nome: nomeInput,
            cargaHoraria: cargaInput
        };

        cursosCadastrados.push(novoCurso);
        renderizarCursos(cursosCadastrados);
        atualizarDashboard();
        formCurso.reset();
    });
}

// Cadastro de Matrículas
const formMatricula = document.querySelector("#form-matricula");
if (formMatricula) {
    formMatricula.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const alunoInput = document.querySelector("#aluno-matricula").value;
        const cursoInput = document.querySelector("#curso-matricula").value;
        const turnoInput = document.querySelector("#turno-matricula").value;
        const statusInput = document.querySelector("#status-matricula").value;

        const novaMatricula = {
            id: `MAT-2026${String(matriculas.length + 1).padStart(2, '0')}`,
            aluno: alunoInput,
            curso: cursoInput,
            data: new Date().toLocaleDateString('pt-BR'),
            turno: turnoInput,
            semestre: "1º Semestre",
            status: statusInput
        };

        matriculas.push(novaMatricula);
        renderizarMatriculas(matriculas);
        atualizarDashboard();
        formMatricula.reset();
    });
}

// Cadastro de Usuários
const formUsuario = document.querySelector("#form-usuario");
if (formUsuario) {
    formUsuario.addEventListener("submit", function(evento) {
        evento.preventDefault();

        const nomeInput = document.querySelector("#nome-usuario").value;
        const emailInput = document.querySelector("#email-usuario").value;
        const perfilInput = document.querySelector("#perfil-usuario").value;

        const novoUsuario = {
            id: usuarios.length + 1,
            nome: nomeInput,
            email: emailInput,
            perfil: perfilInput
        };

        usuarios.push(novoUsuario);
        renderizarUsuarios(usuarios);
        atualizarDashboard();
        formUsuario.reset();
    });
}

// --- 7. FILTROS E BUSCA DE ALUNOS ---
const campoBusca = document.querySelector("#busca");
const filtroStatus = document.querySelector("#filtro-status");

function aplicarFiltros() {
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

if (campoBusca) campoBusca.addEventListener("input", aplicarFiltros);
if (filtroStatus) filtroStatus.addEventListener("change", aplicarFiltros);

// --- 8. DETALHES DO ALUNO ---
function exibirDetalhesAluno(aluno) {
    const elNome = document.querySelector("#detalhe-nome");
    const elCurso = document.querySelector("#detalhe-curso");
    const elStatus = document.querySelector("#detalhe-status");

    if (elNome) elNome.textContent = aluno.nome;
    if (elCurso) elCurso.textContent = aluno.curso;
    if (elStatus) elStatus.textContent = aluno.status;
}

// --- 9. INICIALIZAÇÃO AO CARREGAR A PÁGINA ---
document.addEventListener("DOMContentLoaded", () => {
    atualizarDashboard();
    renderizarAlunos(alunos);
    renderizarCursos(cursosCadastrados);
    renderizarMatriculas(matriculas);
    renderizarUsuarios(usuarios);
});