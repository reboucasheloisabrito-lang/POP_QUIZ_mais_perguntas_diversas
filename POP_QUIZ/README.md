# POP QUIZ — O Desafio das Estrelas

## Descrição
POP QUIZ é um jogo de perguntas e respostas inspirado em programas de quiz. O objetivo é testar os conhecimentos sobre artistas conhecidos do cenário pop atual, músicas e cultura musical. Cada resposta correta vale 100 pontos. Ao final de 10 perguntas, o jogo mostra a pontuação e uma mensagem de resultado.

## Tema e identidade visual
- **Tema:** mundo pop e música atual.
- **Nome:** POP QUIZ — O Desafio das Estrelas.
- **Visual:** fundo escuro com tons de roxo e rosa, detalhes neon e referências a premiações e tapete vermelho.
- **Tecnologias:** HTML5, CSS3 e JavaScript.

## Funcionalidades
- Perguntas e alternativas em português.
- Perguntas variadas sobre artistas, músicas, álbuns, anos de lançamento, cinema, séries, festivais e premiações.
- Busca de dados de músicas, intérpretes, álbuns e datas por uma API externa.
- Quatro alternativas por pergunta.
- Verificação de respostas e indicação da alternativa correta.
- Pontuação de 100 pontos por acerto.
- Barra de progresso e tela de resultado.
- Opção de jogar novamente.
- Layout adaptado para celular e computador.

## API utilizada e como funciona
Foi utilizada a **iTunes Search API**, disponibilizada pela Apple: https://itunes.apple.com/search

O JavaScript consulta a API usando nomes de artistas populares, como Taylor Swift, Sabrina Carpenter, Billie Eilish, Bruno Mars, Lady Gaga, The Weeknd, Bad Bunny, Anitta, Ariana Grande e ROSÉ. A função `fetchArtistQuestion()` usa `fetch()` para consultar a API e `async/await` para aguardar a resposta. Em seguida, `response.json()` transforma os dados recebidos em objetos JavaScript.

O jogo utiliza os campos `trackName`, `artistName`, `collectionName` e `releaseDate` recebidos da API para criar diferentes formatos de pergunta: identificar quem canta uma música, descobrir em qual álbum uma faixa aparece e identificar o ano de lançamento. As alternativas incorretas são montadas com outros artistas, álbuns ou anos obtidos/organizados pelo JavaScript. Além das perguntas criadas com os dados da API, existe um banco variado em português sobre álbuns, artistas, músicas, cinema, séries, festivais e premiações. A cada partida, o jogo mistura perguntas das duas fontes e seleciona dez delas. Assim, o conteúdo não fica limitado a perguntas do tipo “quem canta esta música?”.

**Observação:** os nomes de músicas e artistas permanecem em sua grafia original, mas os enunciados, instruções e mensagens do jogo estão em português.

## Etapas de desenvolvimento
1. Planejamento do tema, nome e identidade visual.
2. Criação dos arquivos `index.html`, `style.css` e `script.js`.
3. Construção das telas inicial, de perguntas e de resultado.
4. Implementação da lógica de pontuação, alternativas e progresso.
5. Integração com a iTunes Search API usando `fetch()`, `async` e `await`.
6. Testes no navegador e publicação pelo GitHub Pages.

## Utilização de Inteligência Artificial
**Ferramenta utilizada:** ChatGPT (OpenAI).

A IA foi utilizada como apoio para planejar o jogo, organizar a estrutura dos arquivos, sugerir a identidade visual, desenvolver e compreender a lógica JavaScript, implementar o consumo da API e preparar a documentação.

**Principais prompts utilizados:**
- "Ajude-me a desenvolver um jogo de perguntas e respostas inspirado no Show do Milhão usando HTML, CSS e JavaScript."
- "Crie uma identidade visual moderna para um jogo com tema sobre o mundo pop."
- "Explique como consumir uma API externa usando fetch, async e await."
- "Crie perguntas variadas sobre artistas, álbuns, músicas, lançamentos, cinema e séries, usando os dados de uma API para gerar parte das questões."
- "Ajude a implementar pontuação, verificação das respostas e resultado final."

O código deve ser revisado e compreendido pelo estudante. A IA funciona como ferramenta de apoio, e não substitui o entendimento do funcionamento do projeto.

## Como executar
1. Baixe ou clone este repositório.
2. Mantenha `index.html`, `style.css` e `script.js` na mesma pasta.
3. Abra a pasta no Visual Studio Code.
4. Inicie o `index.html` com a extensão Live Server (recomendado) ou abra o arquivo em um navegador.
5. É necessário estar conectado à internet para consultar a API e carregar as fontes externas.

## Publicação no GitHub Pages
1. Envie os arquivos deste projeto para um repositório público no GitHub.
2. Acesse **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta `/ (root)`, depois salve.
5. Aguarde a publicação e teste o endereço gerado.

**Link do repositório:** COLE_AQUI_O_LINK_DO_REPOSITORIO

**Link do jogo publicado:** COLE_AQUI_O_LINK_DO_GITHUB_PAGES

## Referências sobre artistas e música pop
A seleção de artistas foi inspirada em rankings globais recentes:
- IFPI — Global Artist Chart 2025: https://www.ifpi.org/our-industry/global-charts/
- Spotify — Retrospectiva 2025: https://newsroom.spotify.com/2025-12-03/retrospectiva-top-artistas-musicas-albuns-podcasts-audiolivros/
