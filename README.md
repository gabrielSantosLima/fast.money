![](./repo/fastmoney.png)

# 💳 fast.money

> An API to quickly carry out monetary transactions built on Express.js and Typescript, using PostgreSQL

## Technologies

**fast.money** API uses:

-   Express.js (+ Typescript)
-   Knex.js (Query Builder)
-   NGINX (Load Balancer)
-   PostgreSQL (Database)
-   Gatling (Load testing)
-   Docker (Containerizing)

## How to install

System requirements:

-   Node.js (v20.11.0)
-   Docker (v20.10.24)
-   Git (v2.33.1)

### Steps to install

> Manually installation (with Docker for PostgreSQL):

```sh
# Step 1: Clone the repository
git clone git@github.com:gabrielSantosLima/fast.money.git
cd fast.money

# Step 2: Install the dependencies
npm install

# Step 3: Configure env. variables
cp .env.example .env
# change .env with the env. values

# Step 4: Run the PostgreSQL
docker-compose up -d db --build

# Step 5: Run the code
npm run dev
```

> With Docker (for all services):

```sh
# Just run it with Docker Compose
docker-compose up -d
```

## Metrics

Serão adicionadas após a realização dos primeiros testes com o Gatling

## Autor

<div style="border: 1px solid #000;padding:16px" width="200px">
    <img width="100px" src="https://github.com/gabrielSantosLima.png"/> <br>
    <a href="https://github.com/gabrielSantosLima">Gabriel Lima</a>
</div>
