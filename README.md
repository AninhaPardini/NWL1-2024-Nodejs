## NWL 2024 - NodeJs

Este projeto foi baseado no evento da [Rocketseat](https://www.rocketseat.com.br) **NWL Expert** onde é feita uma criação de um sistema de enquetes, na trilha é ensinado todo o passo a passo do backend, desde estrutura de pastas até organização do código para melhor performace, também é apresentado algumas ferramentas(libs - ORM - Conteinizador) recomendadas e como usa-las que são:

- [Fastify](https://github.com/fastify/fastify)
- [Zod](https://zod.dev/?id=from-npm-nodebun)
- [Prisma](https://www.prisma.io/docs/getting-started/quickstart)
- [Docker](https://www.docker.com)

## 📕 1ª Aula

Foi explicado sobre as configurações iníciais, docker-compose, prisma e seus comandos de criação de tabela e migration, o própio server e a lib Fastify em ação.

  ### Prisma - comandos utilizados
    ```npx prisma init```
    ```npx prisma migrate dev```
    ```npx prisma generate```

## 📘 2ª Aula

Organizei os arquivos e gostei da forma como o Diego passou mas gostaria de fazer minha primeira ousadia de aplicar os meus estudos de POO de classes que fiz em autodidata e com o vídeo que vi sobre Encapsulamento do Dechamps.

Nesta aula foi passado o CRUD da aplicação e eu optei por cria-lo em um controller do poll e votes que é repassado para as rotas que irão ser configuradas no meu ``server.ts``.

## 📙 3ª Aula

Na última aula trabalhei com [redis](https://redis.io/docs/get-started/document-database/) e foi apresentado como esse banco de dados pode auxiliar em gamificação de aplicativos/APIs.

## 💜 Adicionais

Usei duas libs para criar o texto final da API que são [figlet](http://www.figlet.org) e [gradient-string](https://www.npmjs.com/package/gradient-string).

## Para iniciar a API

Comece configurando o docker-compose com as informações e credenciais dos seus bancos, lembrando que esta API está formatada para utilizar postresql e redis.

``` docker compose up - d ```

Depois é só rodar npm run dev e tadan! Aproveite ˆˆ

## Front-end 🚧 EM CONSTRUÇÃO 🚧

Irei fazer um simples front sem framework para esse projeto.
