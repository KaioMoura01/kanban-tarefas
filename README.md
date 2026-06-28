# Kanban de Tarefas

Projeto 2 da lista Front-End Júnior. Quadro Kanban com criação de tarefas,
arrastar e soltar entre colunas, filtros e persistência no LocalStorage.

## Funcionalidades

- Criar tarefas com título, descrição, prioridade e coluna inicial.
- Arrastar e soltar cartões entre **A Fazer**, **Em Progresso** e **Concluído**.
- Filtrar por texto e por prioridade.
- Persistência automática no LocalStorage (recarregue e tudo continua lá).
- Tema claro/escuro.

## Stack

Svelte 5 (Runes) · SvelteKit · TypeScript · Tailwind CSS v4 · Zod · Lucide ·
ESLint · Prettier.

## Arquitetura

Segue o `CLAUDE.md`: camadas em `src/packages/<pacote>` com
`constants / gateway / module / service / toast / types / validators`.

```
Page → Section → Compose → Module → Service → Gateway → API/Storage
```

Nenhum componente acessa Service ou Gateway diretamente — o Module é a única
interface entre UI e domínio.

## Scripts

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção
npm run check    # svelte-check (tipos)
npm run lint     # prettier + eslint
npm run format   # prettier --write
```
