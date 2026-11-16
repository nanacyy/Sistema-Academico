
/*
 * SISTEMA DE GERENCIAMENTO ACADÊMICO
 * Dados iniciais do sistema
 * Desenvolvido para fins acadêmicos.
 *
 * Os dados abaixo são utilizados como base
 * para inicialização do sistema.
 */

// ==============================
// CURSOS CADASTRADOS
// ==============================

const cursosCadastradosIniciais = [
  {
    id: 1,
    nome: "Análise e Desenvolvimento de Sistemas",
    cargaHoraria: 2000,
    status: "ativo"
  },
  {
    id: 2,
    nome: "Gestão de Recursos Humanos",
    cargaHoraria: 1600,
    status: "ativo"
  },
  {
    id: 3,
    nome: "Administração",
    cargaHoraria: 1800,
    status: "inativo"
  }
];

// ==============================
// ALUNOS CADASTRADOS
// ==============================

const alunosIniciais = [
  {
    id: 1,
    nome: "Ana Souza",
    email: "ana@email.com",
    curso: "Análise e Desenvolvimento de Sistemas",
    status: "ativo"
  },
  {
    id: 2,
    nome: "Carlos Silva",
    email: "carlos@email.com",
    curso: "Análise e Desenvolvimento de Sistemas",
    status: "ativo"
  },
  {
    id: 3,
    nome: "Mariny Santos",
    email: "mariny@email.com",
    curso: "Gestão de Recursos Humanos",
    status: "inativo"
  }
];

// ==============================
// MATRÍCULAS
// ==============================

const matriculasIniciais = [
  {
    id: 1,
    aluno: "Ana Souza",
    curso: "Análise e Desenvolvimento de Sistemas",
    status: "ativo"
  },
  {
    id: 2,
    aluno: "Carlos Silva",
    curso: "Análise e Desenvolvimento de Sistemas",
    status: "ativo"
  },
  {
    id: 3,
    aluno: "Mariny Santos",
    curso: "Gestão de Recursos Humanos",
    status: "inativo"
  }
];

// ==============================
// USUÁRIOS DO SISTEMA
// ==============================

const usuariosIniciais = [
  {
    id: 1,
    nome: "Administrador do Sistema",
    perfil: "Administrador",
    status: "ativo"
  },
  {
    id: 2,
    nome: "Secretaria Acadêmica",
    perfil: "Secretaria",
    status: "ativo"
  },
  {
    id: 3,
    nome: "Professor João",
    perfil: "Professor",
    status: "inativo"
  }
];
