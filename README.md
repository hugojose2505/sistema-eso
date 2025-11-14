# ESO Front End

Interface web do ESO, desenvolvida com React e empacotada com Vite.
A aplicação consome a API do backend ESO e utiliza ShadCN UI + Tailwind CSS para estilização e componentes.

# Deploy

Toda a infraestrutura do ESO foi publicada em ambiente cloud:
- O backend (API NestJS) e o banco de dados PostgreSQL foram deployados na plataforma Render, garantindo disponibilidade e gerenciamento simplificado de infraestrutura.
- O frontend (React + Vite + ShadCN + Tailwind) foi deployado na Vercel, oferecendo build rápido, CDN distribuída e ótimo desempenho para a interface web.
- A aplicação web pode ser acessada através do seguinte link:  https://sistema-eso.vercel.app/


## Tecnologias

- React (SPA)
- Vite (build e dev server)
- TypeScript
- ShadCN UI
- Tailwind CSS

---


## Fluxo de inicialização

Para realizar a execução do projeto é recomendado realizar os seguintes passos:

Local:

Instale as dependências:

- npm install
- npm run dev
---

## Configuração de ambiente

Na **raiz do projeto**, é necessário criar um arquivo .env de variáveis de ambiente:

- `.env`  usado para execução **local**

```env
# Arquivo: .env 

VITE_API_URL_BACK_ESO=http://localhost:3001
