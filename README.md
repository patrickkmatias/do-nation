
# Projeto Do Nation

O Do Nation é uma plataforma digital inovadora que visa conectar doadores, voluntários e instituições de assistência social, facilitando a mobilização social em tempos de crise e no dia a dia. 

Tendo em vista a proposta da Segunda Etapa do Projeto Integrador do 1º Semestre de 2025, escolhemos como prova de conceito o caminho da Entidade Social na plataforma. O objetivo da nossa prova de conceito é demonstrar a viabilidade técnica e de experiência de usuário no fluxo de cadastro, análise e interação das entidades sociais na plataforma. Segue abaixo uma descrição da jornada do usuário Entidade Social no Do Nation:

1 - A Entidade Social inicia seu acesso à plataforma por meio de um cadastro.

2 - Após o envio do formulário, é realizada uma análise automática do CNPJ.

3 - Com a aprovação, a entidade pode:

- Incluir fotos, documentos e uma descrição institucional.

Após realizar o login:

4 - É redirecionada para um dashboard contendo:

- Pré-visualização dos dados cadastrais, com opção de edição;

- Um grid com informações de doadores e solicitações de visitas.

- Também estará disponível uma seção para divulgação de notícias, eventos e serviços prestados.

5 - Durante o uso, a entidade pode:

- Retornar à página inicial;

- Encerrar a sessão pelo botão "Sair".

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

