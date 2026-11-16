console.log("Aula 10 - DOM iniciado.");

let alunos = carregarDados(STORAGE_KEYS.alunos, alunosIniciais);
let cursosCadastrados = carregarDados(STORAGE_KEYS.cursos, cursosCadastradosIniciais);
let matriculas = carregarDados(STORAGE_KEYS.matriculas, matriculasIniciais);
let usuarios = carregarDados(STORAGE_KEYS.usuarios, usuariosIniciais);

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
  const card = document.createElement("article");
  card.classList.add("card");
  const nome = document.createElement("h3");
  nome.textContent = aluno.nome;
  const curso = document.createElement("p");
  curso.textContent = `Curso: ${aluno.curso || "Não informado"}`;
  const email = document.createElement("p");
  email.textContent = `E-mail: ${aluno.email || "Não informado"}`;
  const status = document.createElement("p");
  status.textContent = `Status: ${aluno.status}`;
  status.classList.add("status", aluno.status === "ativo" ? "status-ativo" : "status-inativo");
  const acoes = document.createElement("div");
  acoes.classList.add("acoes");
  const detalhes = document.createElement("button");
  detalhes.type = "button";
  detalhes.classList.add("botao-secundario");
  detalhes.textContent = "Ver detalhes";
  detalhes.addEventListener("click", () => exibirDetalhesAluno(aluno));
  const remover = document.createElement("button");
  remover.type = "button";
  remover.textContent = "Remover";
  remover.addEventListener("click", () => {
    const indice = alunos.findIndex((item) => item.id === aluno.id);
    if (indice !== -1) alunos.splice(indice, 1);
    salvarDados(STORAGE_KEYS.alunos, alunos);
    aplicarFiltros();
    atualizarDashboard();
  });
  acoes.append(detalhes, remover);
  card.append(nome, curso, email, status, acoes);
  return card;
}

function exibirDetalhesAluno(aluno) {
  const nome = document.querySelector("#detalhe-nome");
  const curso = document.querySelector("#detalhe-curso");
  const status = document.querySelector("#detalhe-status");
  if (nome) nome.textContent = `Nome: ${aluno.nome}`;
  if (curso) curso.textContent = `Curso: ${aluno.curso || "Não informado"}`;
  if (status) {
    status.textContent = `Status: ${aluno.status}`;
    status.className = aluno.status === "ativo" ? "status-ativo" : "status-inativo";
  }
}

function alterarStatusAluno(id, novoStatus) {
  const aluno = alunos.find((item) => item.id === id);
  if (!aluno) {
    return;
  }
  aluno.status = novoStatus;
  salvarDados(STORAGE_KEYS.alunos, alunos);
  renderizarAlunos(alunos);
  aplicarFiltros();
  atualizarDashboard();
}

function restaurarAlunos() {
   alunos = [
      ...alunosIniciais
   ];
   salvarDados(
      STORAGE_KEYS.alunos,
      alunos
   );
   renderizarAlunos(
      alunos
   );
   atualizarDashboard();
}

function renderizarAlunos(listaAlunos) {
  const elementoLista = document.querySelector("#lista-alunos");
  if (!elementoLista) return;
  elementoLista.textContent = "";
  if (listaAlunos.length === 0) {
    const mensagem = document.createElement("p");
    mensagem.classList.add("mensagem-vazia");
    mensagem.textContent = "Nenhum aluno encontrado.";
    elementoLista.append(mensagem);
    return;
  }
  for (const aluno of listaAlunos) elementoLista.append(criarCardAluno(aluno));
}

function aplicarFiltros() {
  const campoBusca = document.querySelector("#busca");
  const filtroStatus = document.querySelector("#filtro-status");
  const termo = campoBusca ? campoBusca.value.toLowerCase().trim() : "";
  const statusSelecionado = filtroStatus ? filtroStatus.value : "";
  const filtrados = alunos.filter((aluno) => {
    const correspondeNome = aluno.nome.toLowerCase().includes(termo);
    const correspondeStatus = statusSelecionado === "" || aluno.status === statusSelecionado;
    return correspondeNome && correspondeStatus;
  });
  renderizarAlunos(filtrados);
}

function preencherSelectCursos(select) {
  if (!select) return;
  select.textContent = "";
  cursosCadastrados.filter(c => c.status === "ativo").forEach(curso => {
    const option = document.createElement("option");
    option.value = curso.nome;
    option.textContent = curso.nome;
    select.append(option);
  });
}

function cadastrarAluno(event) {
  event.preventDefault();
  const formulario = event.currentTarget;
  const nome = document.querySelector("#nome").value.trim();
  const email = document.querySelector("#email").value.trim();
  const curso = document.querySelector("#curso").value;
  const status = document.querySelector("#status").value;
  const novoAluno = { id: Date.now(), nome, email, curso, status };
  alunos.push(novoAluno);
  salvarDados(STORAGE_KEYS.alunos, alunos);
  formulario.reset();
  atualizarDashboard();
  window.location.href = "alunos.html";
}

function iniciarPagina() {
  atualizarDashboard();

  const listaAlunos = document.querySelector("#lista-alunos");
  if (listaAlunos) {
    aplicarFiltros();
    const busca = document.querySelector("#busca");
    const status = document.querySelector("#filtro-status");
    const botaoAtualizar = document.querySelector("#btn-atualizar");
    if (busca) busca.addEventListener("input", aplicarFiltros);
    if (status) status.addEventListener("change", aplicarFiltros);
    if (botaoAtualizar) botaoAtualizar.addEventListener("click", aplicarFiltros);
  }

  const formAluno = document.querySelector("#form-aluno");
  if (formAluno) {
    preencherSelectCursos(document.querySelector("#curso"));
    formAluno.addEventListener("submit", cadastrarAluno);
  }

  const listaCursos = document.querySelector("#lista-cursos");
  if (listaCursos) {
    listaCursos.textContent = "";
    cursosCadastrados.forEach(curso => {
      const card = document.createElement("article");
      card.classList.add("card");
      const nome = document.createElement("h3"); nome.textContent = curso.nome;
      const carga = document.createElement("p"); carga.textContent = `Carga horária: ${curso.cargaHoraria} horas`;
      const status = document.createElement("p"); status.textContent = `Status: ${curso.status}`;
      status.classList.add("status", curso.status === "ativo" ? "status-ativo" : "status-inativo");
      card.append(nome, carga, status); listaCursos.append(card);
    });
  }

  const listaMatriculas = document.querySelector("#lista-matriculas");
  if (listaMatriculas) {
    listaMatriculas.textContent = "";
    matriculas.forEach(m => {
      const card = document.createElement("article"); card.classList.add("card");
      const numero = document.createElement("h3"); numero.textContent = `Matrícula ${m.id}`;
      const aluno = document.createElement("p"); aluno.textContent = `Aluno: ${m.aluno}`;
      const curso = document.createElement("p"); curso.textContent = `Curso: ${m.curso}`;
      const status = document.createElement("p"); status.textContent = `Status: ${m.status}`;
      card.append(numero, aluno, curso, status); listaMatriculas.append(card);
    });
  }

  const listaUsuarios = document.querySelector("#lista-usuarios");
  if (listaUsuarios) {
    listaUsuarios.textContent = "";
    usuarios.forEach(u => {
      const card = document.createElement("article"); card.classList.add("card");
      const nome = document.createElement("h3"); nome.textContent = u.nome;
      const perfil = document.createElement("p"); perfil.textContent = `Perfil: ${u.perfil}`;
      const status = document.createElement("p"); status.textContent = `Status: ${u.status}`;
      card.append(nome, perfil, status); listaUsuarios.append(card);
    });
  }

  const formCurso = document.querySelector("#form-curso");
  if (formCurso) formCurso.addEventListener("submit", event => {
    event.preventDefault();
    cursosCadastrados.push({ id: Date.now(), nome: document.querySelector("#nome-curso").value.trim(), cargaHoraria: Number(document.querySelector("#carga-horaria").value), status: document.querySelector("#status").value });
    window.location.href = "cursos.html";
  });

  const formMatricula = document.querySelector("#form-matricula");
  if (formMatricula) {
    const alunoSelect = document.querySelector("#aluno-matricula");
    const cursoSelect = document.querySelector("#curso-matricula");
    alunos.forEach(a => { const op = document.createElement("option"); op.value = a.nome; op.textContent = a.nome; alunoSelect.append(op); });
    preencherSelectCursos(cursoSelect);
    formMatricula.addEventListener("submit", event => {
      event.preventDefault();
      matriculas.push({ id: matriculas.length + 1, aluno: alunoSelect.value, curso: cursoSelect.value, status: document.querySelector("#status").value });
      window.location.href = "matriculas.html";
    });
  }

  const formUsuario = document.querySelector("#form-usuario");
  if (formUsuario) formUsuario.addEventListener("submit", event => {
    event.preventDefault();
    usuarios.push({ id: Date.now(), nome: document.querySelector("#nome-usuario").value.trim(), perfil: document.querySelector("#perfil").value, status: document.querySelector("#status").value });
    window.location.href = "usuarios.html";
  });
}

document.addEventListener("DOMContentLoaded", iniciarPagina);
