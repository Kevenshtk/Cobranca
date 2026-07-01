# Sistema de Cobranças

Aplicação web desenvolvida para auxiliar no gerenciamento de cobranças de clientes, centralizando o cadastro de serviços, acompanhamento de pagamentos e automação do envio de mensagens.

## 🎯 Objetivos do projeto

Este projeto nasceu da necessidade de organizar e automatizar parte da rotina dos serviços de suporte técnico que realizo.

Antes do desenvolvimento da aplicação, o controle dos atendimentos, pagamentos e contatos com clientes era feito de forma manual, aumentando o risco de esquecer informações importantes ou deixar de enviar lembretes de pagamento.

Além de centralizar essas informações em um único lugar, a aplicação automatiza o envio de mensagens aos clientes, reduzindo tarefas repetitivas e minimizando a chance de falhas no acompanhamento dos serviços.

Durante o desenvolvimento, o projeto também serviu para aprofundar conhecimentos em:

- Next.js e TypeScript

- Organização e arquitetura de aplicações Front-end

- Integração com APIs

- Automação de processos utilizando n8n

- Testes unitários com Jest e Testing Library

- Boas práticas de tipagem, componentização e organização de código

## 📑 Índice

- [Demonstração](#-demonstração)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Melhorias futuras](#-melhorias-futuras)
- [API](#-api)

## 📷 Demonstração

### Dashboard
 ![Imagem](https://kevenshtk.github.io/Projetos/img/telas-cobranca/dashboard.png)

### Listagem de Serviços
 ![Imagem](https://kevenshtk.github.io/Projetos/img/telas-cobranca/servicos.png)

### Controle da Automação
 ![Imagem](https://kevenshtk.github.io/Projetos/img/telas-cobranca/automacao.png)

### Histório de Envio
 ![Imagem](https://kevenshtk.github.io/Projetos/img/telas-cobranca/historico.png)

## ✨ Funcionalidades

- Dashboard com indicadores e visão geral dos serviços
- CRUD de serviços
- Controle de pagamento
- Histórico de envio de mensagens

## 🛠️ Tecnologias

- Next.js
- React
- TypeScript
- CSS
- Axios
- React Hook Form
- Jest
- Testing Library
- N8N

## 📁 Estrutura do projeto
```
app/
├── (pages)/      → Páginas da aplicação.
├── components/   → Componentes reutilizáveis da interface.
├── context/      → Gerenciamento de estado global com React Context.
├── hooks/        → Hooks customizados.
├── layouts/      → Estruturas reutilizáveis das páginas.
├── services/     → Camada responsável pelas requisições HTTP e integração com a API.
├── types/        → Tipos e interfaces TypeScript.
└── utils/        → Funções utilitárias compartilhadas.
```

## 🚀 Melhorias futuras

1. Desenvolver uma API própria utilizando Next.js, concentrando nela as regras de negócio, validações e acesso aos dados.

2. Melhorar a separação de responsabilidades entre o front-end, a API e os workflows de automação, tornando a arquitetura mais escalável e de fácil manutenção.

3. Utilizar o n8n exclusivamente para os fluxos de automação, como envio de mensagens e registro de informações no Google Sheets.

4. Implementar autenticação nos webhooks do n8n para aumentar a segurança das requisições realizadas pelo front-end.

5. Tornar a página de controle da automação totalmente funcional, permitindo iniciar, pausar e monitorar as automações diretamente pela interface.

## 🔌 API

Atualmente, o back-end da aplicação é implementado por meio de workflows no n8n.

Além de disponibilizar os endpoints HTTP consumidos pelo front-end, os workflows são responsáveis por:

- Processamento das requisições
- Regras de negócio
- Operações CRUD no Google Sheets
- Envio de mensagens automatizadas

Como os workflows fazem parte de um ambiente privado e contêm credenciais e integrações sensíveis, eles não estão incluídos neste repositório.

Por esse motivo, algumas funcionalidades da aplicação dependem dessa infraestrutura e não podem ser executadas apenas com o código disponível aqui.