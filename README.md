# Assistente Virtual BoardClass

## Desenvolvido para API (Aprendizagem por Projeto Integrador) da Fatec São José dos Campos - Banco de Dados

<br>

<p align="left">A assistente BoardClass é uma assistente virtual web. Seu objetivo é auxiliar professores com o gerenciamento de turmas e seus respectivos alunos e disciplinas, permitindo a criação de novas turmas/disciplinas, agendamento de provas, adição de novos alunos, entre outras funcionalidades. </p>
<p align="left">Ela funciona recebendo o comando por voz (por meio do professor) e, então, realizando em seguida o que foi pedido. Em alguns casos, é necessário que o professor dê o comando por voz e então tenha que inserir manualmente os dados para que a ação seja concluída. Por exemplo na criação de um aluno, ele deve inserir as informações do aluno por meio do teclado do próprio computador.</p>

<br>

## 🙅‍♂️ Equipe

#### **Equipe Vox**

#### **Integrantes:** João Vitor Marques, Luciano Pamplona, Silas Rafael

<br>

## 👨‍💻 Tecnologias

#### Este projeto foi desenvolvido com as seguintes tecnologias, e aplicações:

- **Design:** [Figma](https://www.figma.com/)
- **Ecossistema:** [Node.js](https://nodejs.org/en/)
- **Front End:** [React](https://pt-br.reactjs.org/)
- **Back End:** [AdonisJS](https://adonisjs.com/)
- **Banco de dados:** [PostgreSQL](https://www.postgresql.org/)

<br>

## 🕛 Cronograma

#### **Sprint 1:** 25/03 - 14/04

#### **Sprint 2:** 25/04 - 15/05

#### **Sprint 3:** 16/05 - 05/06

<br>

## 📃 Backlog do produto

<img src="images/backlogs/product-backlog.jpeg" />

<br>

## 📄 Sprint backlog

<a href="https://github.com/joaovtmarques/assistente_virtual_boardclass/tree/main/images/backlogs/sprint-backlog1.jpeg">Sprint Backlog 1</a>
<br>
<a href="https://github.com/joaovtmarques/assistente_virtual_boardclass/tree/main/images/backlogs/sprint-backlog2.jpeg">Sprint Backlog 2</a>
<br>
<a href="https://github.com/joaovtmarques/assistente_virtual_boardclass/tree/main/images/backlogs/sprint-backlog3.jpeg">Sprint Backlog 3</a>

<br>

## 📝 Task/Story Board

<img src="images/taskboard.png" />

<br>

## ℹ️ Como usar o aplicativo

### Pré-requisitos

Para clonar e rodar a aplicação, é necessário ter instalado em sua máquina as ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [Yarn](https://yarnpkg.com/) (opcional).
Além disso, é legal ter um bom editor de código, como o [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando a aplicação

```bash
# --backend
# Clone este repositório
$ git clone <https://github.com/joaovtmarques/assistente_virtual_boardclass>
# Acesse a pasta do projeto no terminal
$ cd assistente_virtual_boardclass
# Navegue até a pasta 'backend' e depois até a pasta 'boardclass'
$ cd backend
$ cd boardclass
# Instale as dependências
$ npm install ou yarn install
# Configure o orm do adonisjs para banco de dados PostgreSQL
$ node ace configure @adonisjs/lucid
# Na raíz do projeto, crie um arquivo .env com as mesmas variáveis contidas em .env.example
# Preencha as variáveis com os respectivos valores da sua máquina
# Execute a aplicação
$ node ace serve ou yarn dev

# --frontend
# Clone este repositório
$ git clone <https://github.com/joaovtmarques/assistente_virtual_boardclass>
# Acesse a pasta do projeto no terminal
$ cd assistente_virtual_boardclass
# Navegue até a pasta 'frontend' e depois até a pasta 'boardclass'
$ cd frontend
$ cd boardclass
# Instale as dependências
$ npm install ou yarn install
# Na raíz do projeto, crie um arquivo .env com a variável contida em .env.example
$ REACT_APP_BACKEND_URL=http://{ip-backend}:{porta}/api
# Preencha a variável com o ip do backend rodando na sua máquina
# Com o backend já em execução:
# Execute a aplicação
$ npm start ou yarn start
```

<br>

## 🖥️ Mockups

<img src="design/Mockups/home.png" />
<img src="design/Mockups/help-center.png" />
<img src="design/Mockups/discipline-register.png" />
<img src="design/Mockups/create-class.png" />
<img src="design/Mockups/add-student.png" />
<img src="design/Mockups/add-student-menu.png" />
<img src="design/Mockups/remove-student.png" />
<img src="design/Mockups/remove-student-menu.png" />
<img src="design/Mockups/class-info.png" />
<img src="design/Mockups/class-info-menu.png" />
<img src="design/Mockups/class-info-panel.png" />
<img src="design/Mockups/schedule-exam.png" />
<img src="design/Mockups/schedule-exam-discipline-list.png" />
<img src="design/Mockups/schedule-exam-class-list.png" />
<img src="design/Mockups/schedule-lab.png" />
<img src="design/Mockups/schedule-lab-discipline-list.png" />
<img src="design/Mockups/schedule-lab-class-list.png" />
<img src="design/Mockups/create-note.png" />
<img src="design/Mockups/notes.png" />
