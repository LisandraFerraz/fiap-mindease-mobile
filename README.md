# MindEase Mobile

Aplicação mobile desenvolvida em **React Native + Expo** para apoiar a gestão acadêmica e profissional de pessoas neurodivergentes e/ou com desafios de processamento cognitivo e produtividade. Combina ferramentas como Checklist, Kanban, Pomodoro, Notas Adesivas e um painel de acompanhamento em uma experiência mobile multiplataforma (Android, iOS e Web).

---

## Sumário

- [Contexto](#contexto)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Features](#features)
- [Libs e Dependências](#libs-e-dependências)
- [Como executar](#como-executar)

---

## Contexto

O **MindEase** é um ecossistema de ferramentas de apoio à produtividade pensado para pessoas neurodivergentes. Esta versão mobile complementa a versão web, entregando as mesmas funcionalidades em uma interface adaptada para dispositivos móveis, com suporte a **tema claro/escuro** e **escala de fonte ajustável** para garantir acessibilidade e conforto visual.

---

## Tecnologias

| Categoria               | Tecnologia                                                      |
| ----------------------- | --------------------------------------------------------------- |
| Plataforma              | React Native 0.81.4                                             |
| Framework               | Expo SDK 54                                                     |
| Linguagem               | TypeScript 5.9                                                  |
| Runtime JS              | React 19                                                        |
| Gerenciamento de estado | Zustand 5                                                       |
| Navegação               | React Navigation 7 (Native Stack + Bottom Tabs)                 |
| Roteamento              | Expo Router 6                                                   |
| Comunicação com API     | Fetch nativo com camada própria (`apiFetch`) + JWT Bearer Token |

---

## Arquitetura

O projeto segue uma arquitetura **feature-based** com separação clara entre camadas de UI, lógica de negócio, estado global e comunicação com o back-end.

```
src/
├── App.tsx                    # Entry point: NavigationContainer + ThemeProvider
├── routes/                    # Configuração de stacks de navegação
│   ├── RootNavigator.tsx      # Decide entre AuthStack e AppStack via token JWT
│   ├── AppStacks.tsx          # Stack principal (NativeStack + BottomTabs)
│   └── AuthStacks.tsx         # Stack de autenticação
├── navigation/screens/        # Telas da aplicação
├── components/                # Componentes reutilizáveis
│   ├── ui/                    # Primitivos de UI (Button, Icon, Input, Modal…)
│   ├── Checklist/
│   ├── Kanban/
│   ├── Notifications/
│   ├── Settings/
│   └── StickyNotes/
├── core/                      # Camada de infraestrutura
│   ├── core-api.ts            # Cliente HTTP centralizado com injeção de token
│   ├── api-interceptor.ts     # Interceptador de requisições
│   └── env/                   # Endpoints e configuração de ambiente
├── stores/                    # Estado global com Zustand
│   ├── user-data-store.ts     # Dados do usuário e tokens de autenticação
│   └── notifications-store.ts
├── theme/                     # Sistema de temas
│   ├── ThemeContext.tsx        # Context com toggle dark/light e escala de fonte
│   └── themes.ts              # Tokens de cores por tema
└── utils/
    ├── hooks/
    │   ├── api-calls/         # Hooks de chamadas de API por feature
    │   └── functionalities/   # Hooks de lógica de negócio (ex: PomodoroTimer)
    ├── models/                # Interfaces e modelos de dados
    ├── functions/             # Funções utilitárias puras
    └── data/                  # Dados estáticos (cores, fontes, nav items)
```

### Fluxo de autenticação

O `RootNavigator` lê o `accessToken` do store Zustand. Quando presente, renderiza o `AppStack`; caso contrário, redireciona para o `AuthStack`. Todo request da camada `core-api` injeta automaticamente o Bearer token e resolve o `:id` do usuário na URL.

### Sistema de temas

O `ThemeContext` expõe `mode` (light | dark), `fontSize` e `fonts` (tokens escalados). Componentes consomem o contexto via `useThemeMode()` e adaptam estilos dinamicamente, permitindo personalização de acessibilidade por parte do próprio usuário.

---

## Features

### Dashboard

Painel de acompanhamento com gráficos de progresso das ferramentas, atalhos rápidos para todas as funcionalidades e resumo de notificações.

### Kanban

Board de tarefas com colunas customizadas, drag-and-drop de cards, criação/edição/remoção via modal e etiquetas de prioridade.

### Checklist

Gerenciamento de listas de tarefas agrupadas. Suporte a criação, edição, conclusão e exclusão de itens individuais e grupos completos.

### Pomodoro

Timer Pomodoro integrado com lista de tarefas da sessão. Permite adicionar, remover e marcar tarefas como concluídas durante o ciclo de foco.

### Notas Adesivas (Sticky Notes)

Criação e organização de notas em grupos. Suporte a busca de notas e gerenciamento de grupos com interface visual similar ao conceito de post-its.

### Notificações

Central de notificações do usuário com cards individuais, leitura e gerenciamento de alertas das ferramentas.

### Configurações

- Alternância de tema **claro / escuro**
- Seleção de **tamanho de fonte** (padrão, pequeno, grande, extra grande)
- Gerenciamento de dados da conta

---

## Libs e Dependências

### Navegação

| Lib                              | Uso                           |
| -------------------------------- | ----------------------------- |
| `@react-navigation/native`       | Núcleo de navegação           |
| `@react-navigation/native-stack` | Stack de telas nativas        |
| `@react-navigation/bottom-tabs`  | Navegação por abas inferiores |
| `expo-router`                    | Roteamento baseado em arquivo |
| `expo-linking`                   | Deep linking                  |

### UI e Animação

| Lib                                                     | Uso                                          |
| ------------------------------------------------------- | -------------------------------------------- |
| `react-native-elements`                                 | Componentes base de UI                       |
| `expo-linear-gradient` / `react-native-linear-gradient` | Gradientes visuais                           |
| `react-native-safe-area-context`                        | Espaçamento seguro em dispositivos com notch |
| `react-native-screens`                                  | Otimização de telas nativas                  |

### Kanban e Drag-and-Drop

| Lib                                     | Uso                            |
| --------------------------------------- | ------------------------------ |
| `@dnd-kit/core`                         | Motor de drag-and-drop         |
| `@dnd-kit/sortable`                     | Ordenação de itens via DnD     |
| `@dnd-kit/utilities`                    | Utilitários do dnd-kit         |
| `@intechnity/react-native-kanban-board` | Board Kanban para React Native |

### Gráficos

| Lib                          | Uso                   |
| ---------------------------- | --------------------- |
| `react-native-gifted-charts` | Gráficos no Dashboard |

### Estado Global

| Lib       | Uso                                 |
| --------- | ----------------------------------- |
| `zustand` | Gerenciamento de estado global leve |

### Utilitários

| Lib                  | Uso                           |
| -------------------- | ----------------------------- |
| `react-native-uuid`  | Geração de IDs únicos locais  |
| `expo-splash-screen` | Controle da splash screen     |
| `expo-asset`         | Carregamento de assets        |
| `expo-system-ui`     | Configuração da UI do sistema |
| `react-native-web`   | Suporte à plataforma Web      |

---

## Como executar

### Pré-requisitos

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- Android Studio ou Xcode (para emuladores nativos)

### Instalação

```bash
npm install
```

### Executar

```bash
# Servidor de desenvolvimento
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

> O app consome uma API REST externa. Configure a URL base da API no arquivo `src/core/env/environment.ts`.

Clona o projeto da API e siga as instruções de uso: https://github.com/LisandraFerraz/nest-bytebank-api

A API estará disponível em `http://localhost:3000` por padrão.

No arquivo `src/core/env/environment.ts` do app mobile, altere a URL base para o endereço local da API:

```ts
export const environment = {
  data_api: "http://localhost:3000",
};
```

> Em dispositivos físicos ou emuladores Android, substitua `localhost` pelo IP da sua máquina na rede local (ex: `http://192.168.x.x:3000`).
