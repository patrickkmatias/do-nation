
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

# Configuração de ambiente

1. Instale as linguagens utilizadas pela aplicação:

- PHP e Composer (utilizando Windows, em PowerShell; demais SOs [verificar docs](https://laravel.com/docs/11.x/installation#installing-php).):
```pwsh
# Rodar como administrador...
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://php.new/install/windows/8.4'))
```

- Node.js: https://nodejs.org/pt/download

- SQLite: https://www.sqlite.org/download.html

2. Clone o repositório e instale as dependências:
``` sh
git clone https://github.com/patrickkmatias/do-nation && cd do-nation && npm i && composer i
```

3. Copie o arquivo `.env.example` como `.env`
```sh
cp .env.example .env
```

4. Laravel exige `APP_KEY` populado para execução. Gere uma chave de aplicação com `key:generate`.
```sh
php artisan key:generate 
```

5. Crie um banco de dados .sqlite vazio no caminho `database/database.sqlite`
```sh
touch database/database.sqlite
```

6. Execute as migrações do projeto com `migrate`.

```sh
php artisan migrate
```

