
# Projeto Do Nation

O Do Nation é uma plataforma digital inovadora que visa conectar doadores, voluntários e instituições de assistência social, facilitando a mobilização social em tempos de crise e no dia a dia. 

Tendo em vista a proposta da Segunda Etapa do Projeto Integrador do 1º Semestre de 2025, escolhemos como prova de conceito o caminho da Entidade Social na plataforma, nosso principal público e mais importante tipo de usuário.

# Participantes
- ALICE ABREU RUBIM DIAS
- DANIEL BENELLI MOURO
- GIOVANNA DE CARVALHO SAUD
- JOAQUIM AMORIM NUNES JUNIOR
- LIVIAN DE SOUSA SILVA
- PATRICK MATIAS DA SILVA

# Tecnologias escolhidas
- Frontend: React + Vite
- Backend: Laravel
- Banco de Dados: sqlite3

# Como rodar a aplicação?

A aplicação foi estruturada com auxilio do Laravel, portanto é necessário instalar o Node.js, PHP e preparar o laravel, conforme os materiais de apoio:

https://laravel.com

https://nodejs.org/pt

https://www.php.net/downloads.php

Além disso, para replicar localmente o ambiente, após instalar tudo o que foi informado acima, será necessário clonar este repositório (git clone [link-do-repo]) e instalar as dependências com o comando (npm i && composer i). Após isso, execute o servidor de desenvolvimento utilizando (php artisan serve) e rode o frontend utilizando (npm run dev).

Caso necessite, rode (php artisan) e será possível visualizar comandos úteis do laravel.7

Para gerar o arquivo do banco de dados, será necessário criar um arquivo vazio no caminho /database com o nome de database.sqlite (caminho final: database/database.sqlite) e rodar as migrações do Eloquent com (php artisan migrate). Para gerar o token, rode o comando (php artisan key:generate).

