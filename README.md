![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Badge Concluído](https://img.shields.io/static/v1?label=STATUS&message=CONCLUÍDO&color=GREEN&style=for-the-badge)

# Xu do pix
 
|Participantes|Curso|Função no porjeto|
| -------| --------------------- | --------- |
|Enéas |  Ciência da Computação | Software Engineer |
|Mariah |  Engenharia da Computação | Front-End Developer |
|Gustavo |  Engenharia da Computação | Back-End Developer |

O objetivo deste projeto é desenvolver um sistema de gestão de dívidas utilizando a arquitetura MVC (Model-View-Controller) com JavaScript. O projeto será integrado ao framework Express, que facilita a criação de aplicativos web e APIs em Node.js, e o banco de dados utilizado será o MongoDB, um banco de dados NoSQL amplamente utilizado em aplicações web modernas.

### Funcionalidades Previstas
> Este projeto consiste na criação e integração de uma API desenvolvida em Node.js e MongoDB para auxiliar operações CRUD (Create, Read, Update, Delete) nas entidades de Pessoa e Dívida.
> - Pessoa
|ATRIBUTO|DESCRIÇÃO|TIPO|
| -------| --------------------- | --------- |
|id |  Identificador único da pessoa | (ObjectID) |
|cpf | Número de CPF da pessoa | (String, obrigatório) |
|nome |  Nome completo da pessoa | (String, obrigatório) |
|senha |  Senha da pessoa para autenticação | (String, obrigatório) |

> - Divida 
|ATRIBUTO|DESCRIÇÃO|TIPO|
| -------| --------------------- | --------- |
|id | Identificador único da dívida | (ObjectID) |
|id_devedor | ID da pessoa devedora | (ObjectID, referência à entidade Pessoa, obrigatório) |
|id_fiador | ID da pessoa fiadora | (ObjectID, referência à entidade Pessoa, obrigatório) |
|valor | Valor da dívida | (Number, obrigatório) |
|status | indica se a divida já foi paga ou não | (Boolean, padrão: false) |
|dataCriacao | Data de criação da dívida | (Date, padrão: data atual) |
|prazo | data para pagamento da dívida | (Date) |

### Requisitos funcionais do Projeto 
> Criar entidade
> Mostrar entidade
> Consultar entidade expecifica pelo ID
> Editar entidade
> Deletar entidade

### Tecnologias Utilizadas
> - JavaScript
> - Express
> - Nodemon
> - mongoDB

### Como Contribuir
> - Se você deseja contribuir para este projeto, siga os passos abaixo:

```
git clone https://github.com/EneasDavid/xuDoPix
```
> - Clonar o repositorio

```
npm install
```
> - O gitIgnore faz com que a pasta "node_modules" não seja instalada automaticamente

```
npm run dev
```
> - ligar o servidor

#### Algumas bibliotecas que podem vir a ser necessárias

```
npm install dotenv
```
> - baixar extensão para que a conexão com o banco seja feita de forma correta

```
npm install mongodb
```
> - instalar o banco de dados

```
npm install mongoose
```
> - instalar o mongoose

```
npm install cors
```
> - para conectar a API ao front