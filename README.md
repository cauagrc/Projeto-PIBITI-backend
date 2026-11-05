<div align="center">

# Plataforma para Auxílio no Processo de Movimentação de Servidores Federais

**Back-End de uma plataforma web para auxiliar servidores públicos federais na identificação de possíveis permutas entre instituições.**

[![IV CONECTA 2026](https://img.shields.io/badge/IV%20CONECTA-2026-0057A8?style=flat)](https://www.even3.com.br/iv-conecta-feira-internacional-de-ciencias-e-inovacao-na-amazonia-801439/)
[![PopMédio](https://img.shields.io/badge/Mostra%20Cient%C3%ADfica-PopM%C3%A9dio-EA2A8A?style=flat)](https://www.even3.com.br/iv-conecta-feira-internacional-de-ciencias-e-inovacao-na-amazonia-801439/)
![PIBITI](https://img.shields.io/badge/Programa-PIBITI-196B48?style=flat)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

</div>

> [!NOTE]
> O resumo científico intitulado **"Implementação das regras de negócio do sistema"** foi aceito para apresentação na **IV CONECTA — Feira Internacional de Ciências e Inovação na Amazônia**, na modalidade **Banners PopMédio PIBITI**, em Porto Velho (RO), em 2026.

O projeto integra o **Front-End e o Back-End** no desenvolvimento de uma plataforma web destinada a auxiliar servidores públicos federais na identificação de possíveis permutas entre instituições. A solução centraliza informações profissionais, identifica interesses compatíveis e disponibiliza recursos para solicitações e comunicação entre os usuários.

## Sumário

- [Sobre o trabalho](#sobre-o-trabalho)
- [O problema](#o-problema)
- [Como a plataforma funciona](#como-a-plataforma-funciona)
- [Critério de compatibilidade](#critério-de-compatibilidade)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Instalação e execução](#instalação-e-execução)
- [Limitações e melhorias futuras](#limitações-e-melhorias-futuras)

## Sobre o trabalho

Este repositório reúne o **Back-End** de uma plataforma voltada a servidores públicos federais interessados em processos de movimentação entre instituições, especialmente na identificação de possibilidades de **permuta**.

A aplicação centraliza informações sobre **cargo, instituição atual e instituições de destino desejadas**, permitindo identificar usuários com interesses compatíveis. O Back-End concentra as regras de negócio, gerencia a persistência dos dados, disponibiliza uma API REST e oferece suporte à comunicação em tempo real.

O trabalho é desenvolvido no contexto do **PIBITI/UNIR**, com foco na aplicação de conhecimentos de desenvolvimento de software para uma necessidade concreta da administração pública e de seus servidores.

## O problema

A procura por servidores interessados em permuta costuma ocorrer por meios informais, como grupos de mensagens e redes sociais. A dispersão dessas informações dificulta encontrar pessoas com cargos e interesses institucionais compatíveis.

A proposta da plataforma é **organizar essa busca em um ambiente único**, reduzindo a necessidade de procurar manualmente em diferentes grupos e permitindo que os interessados estabeleçam contato após a manifestação de interesse de ambas as partes.

## Como a plataforma funciona

1. **Cadastro:** o servidor informa seu cargo, sua instituição atual e as instituições para as quais possui interesse em se movimentar.
2. **Busca por compatibilidade:** o sistema identifica possíveis correspondências entre usuários.
3. **Solicitação:** um usuário pode enviar uma solicitação a outro usuário identificado como compatível.
4. **Resposta:** o destinatário pode aceitar ou rejeitar a solicitação.
5. **Contato:** após a aceitação, os usuários podem conversar pela plataforma, sem necessidade de divulgar previamente seus dados pessoais de contato.

## Critério de compatibilidade

O Back-End compara dois servidores para verificar se existe compatibilidade de permuta. A análise considera, inicialmente, a equivalência de cargo entre os usuários. Depois, verifica se a instituição atual de cada usuário está entre as instituições desejadas pelo outro. Se houver correspondência mútua, o sistema identifica uma possível permuta; caso contrário, a combinação é descartada.

<img src="./assets/fluxograma-compatibilidade.svg" alt="Fluxograma de compatibilidade entre servidores" width="850">

## Arquitetura

Node.js, TypeScript e NestJS, utilizando Prisma ORM, PostgreSQL, Docker, Socket.IO, Cloudflare R2 e Swagger/OpenAPI.

| Módulos e tecnologias | Responsabilidades | Path |
| --- | --- | --- |
| **Usuários e Autenticação** | Gerenciamento de perfis, autenticação JWT e proteção de rotas. | `src/usuarios/usuarios.service.ts` |
| **Cargos, Instituições e Permutações** | Gerenciamento de dados profissionais e identificação de possíveis permutas. | `src/permutacoes/permutacoes.service.ts` |
| **Solicitações e Fórum** | Envio e resposta a solicitações, publicações e interações entre usuários. | `src/solicitacoes/solicitacoes.service.ts` |
| **Conversas, Mensagens e Socket.IO** | Comunicação privada, eventos em tempo real e persistência de mensagens. | `src/websockets/websocket.gateway.ts` |
| **Prisma ORM e PostgreSQL** | Modelagem, relacionamentos e persistência dos dados. | `prisma/schema.prisma` |
| **Upload e Cloudflare R2** | Envio e armazenamento de imagens de perfil. | `src/upload/upload.service.ts` |

## Instalação e execução

Requisitos: Node, npm,  Docker e Docker Compose para rodar PostgreSQL.

```bash
git clone https://github.com/cauagrc/Projeto-PIBITI-backend.git
cd Projeto-PIBITI-backend

npm install
cp .env.example .env
docker compose up -d
npx prisma generate
npx prisma migrate dev
npm run start:dev

npm run start           # development
npm run build           # watch mode
npm run start:prod      # production mode
```

**Configurações principais no `.env`:**

| Variável | Exemplo | Descrição |
| --- | --- | --- |
| `POSTGRES_USER` | `admin` | Usuário de acesso ao PostgreSQL. |
| `POSTGRES_PASSWORD` | `admin` | Senha de acesso ao PostgreSQL. |
| `POSTGRES_DB` | `pibiti` | Nome do banco de dados. |
| `SECRETE_KEY` | `example` | Chave utilizada para assinatura dos tokens JWT. |
| `DB_PORT` | `5433` | Porta do PostgreSQL disponibilizada no host. |
| `DATABASE_URL` | `postgresql://example:admin@localhost:5433/example` | String de conexão utilizada pelo Prisma ORM. |
| `R2_ENDPOINT` | — | Endpoint de acesso ao Cloudflare R2. |
| `R2_ACCOUNT_ID` | — | Identificador da conta Cloudflare. |
| `R2_BUCKET_NAME` | — | Nome do bucket utilizado para armazenar arquivos. |
| `R2_ACCESS_KEY_ID` | — | Chave de acesso à API do Cloudflare R2. |
| `R2_SECRET_ACCESS_KEY` | — | Chave secreta de acesso ao Cloudflare R2. |
| `R2_PUBLIC_URL` | — | URL pública utilizada para acessar os arquivos armazenados. |

A documentação interativa da API, gerada com Swagger/OpenAPI, será disponibilizada em `/api` após a inicialização da aplicação.

## Limitações e melhorias futuras

O projeto foi desenvolvido de forma incremental, com funcionalidades revisadas e aprimoradas durante a integração entre Back-End e Front-End. Entre as possibilidades de evolução estão:

- [ ] Notificações sobre novas mensagens, solicitações e possíveis permutas;
- [ ] Melhorias nos mecanismos de busca e filtragem;
- [ ] Ampliação da capacidade de atendimento a mais servidores;
- [ ] Aprimoramento contínuo das validações e da integração entre os módulos.

> [!IMPORTANT]
> A plataforma **auxilia a identificação de possibilidades de permuta**. A efetivação de qualquer movimentação funcional depende dos requisitos e procedimentos administrativos aplicáveis.