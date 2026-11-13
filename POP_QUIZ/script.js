// POP QUIZ — perguntas em português com dados reais da API iTunes Search.

const startScreen = document.getElementById("start-screen");
const loadingScreen = document.getElementById("loading-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");
const sideScore = document.getElementById("side-score");
const nextLevel = document.getElementById("next-level");
const progressBar = document.getElementById("progress-bar");
const categoryElement = document.getElementById("category");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");

const letters = ["A", "B", "C", "D"];
const pointsPerQuestion = 100;
const artists = [
  "Taylor Swift", "Sabrina Carpenter", "Billie Eilish", "Bruno Mars",
  "Lady Gaga", "The Weeknd", "Bad Bunny", "Anitta", "Ariana Grande", "ROSÉ"
];
let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;

// Banco de perguntas variadas em português. As perguntas são embaralhadas
// a cada partida, então o jogador não recebe sempre a mesma sequência.
const backupQuestions = [
  { category: "ÁLBUNS", question: "Qual é o nome do álbum de Taylor Swift lançado em 2024?", correct: "The Tortured Poets Department", answers: ["Midnights", "The Tortured Poets Department", "1989 (Taylor's Version)", "Lover"] },
  { category: "ÁLBUNS", question: "Qual cantora lançou o álbum 'Short n' Sweet'?", correct: "Sabrina Carpenter", answers: ["Sabrina Carpenter", "Olivia Rodrigo", "Dua Lipa", "Ariana Grande"] },
  { category: "ÁLBUNS", question: "Qual é o nome do álbum de Billie Eilish lançado em 2024?", correct: "HIT ME HARD AND SOFT", answers: ["GUTS", "MAYHEM", "HIT ME HARD AND SOFT", "Radical Optimism"] },
  { category: "ÁLBUNS", question: "Qual artista lançou o álbum 'Cowboy Carter'?", correct: "Beyoncé", answers: ["Beyoncé", "Rihanna", "Lady Gaga", "Shakira"] },
  { category: "ÁLBUNS", question: "O álbum 'eternal sunshine' é de qual cantora?", correct: "Ariana Grande", answers: ["Ariana Grande", "Taylor Swift", "Selena Gomez", "Miley Cyrus"] },
  { category: "ÁLBUNS", question: "Qual é o nome do álbum de Olivia Rodrigo que inclui 'vampire' e 'get him back!'?", correct: "GUTS", answers: ["SOUR", "GUTS", "emails i can't send", "The Rise and Fall of a Midwest Princess"] },
  { category: "ÁLBUNS", question: "Quem lançou o álbum 'Radical Optimism'?", correct: "Dua Lipa", answers: ["Dua Lipa", "Charli XCX", "Tate McRae", "Sabrina Carpenter"] },
  { category: "ÁLBUNS", question: "Qual artista lançou 'DeBÍ TiRAR MáS FOToS'?", correct: "Bad Bunny", answers: ["Bad Bunny", "J Balvin", "Maluma", "Daddy Yankee"] },
  { category: "ÁLBUNS", question: "Qual é o álbum de estreia de Chappell Roan?", correct: "The Rise and Fall of a Midwest Princess", answers: ["The Rise and Fall of a Midwest Princess", "GUTS", "BRAT", "SAWAYAMA"] },
  { category: "ÁLBUNS", question: "Qual cantora lançou o álbum 'Funk Generation'?", correct: "Anitta", answers: ["Anitta", "Ludmilla", "IZA", "Luísa Sonza"] },

  { category: "ARTISTAS", question: "Qual é o nome do grupo de K-pop do qual ROSÉ faz parte?", correct: "BLACKPINK", answers: ["BLACKPINK", "TWICE", "NewJeans", "aespa"] },
  { category: "ARTISTAS", question: "De qual país é o grupo BTS?", correct: "Coreia do Sul", answers: ["Japão", "Coreia do Sul", "Tailândia", "China"] },
  { category: "ARTISTAS", question: "Qual é o nome verdadeiro do The Weeknd?", correct: "Abel Tesfaye", answers: ["Abel Tesfaye", "Aubrey Graham", "Shawn Mendes", "Bruno Mars"] },
  { category: "ARTISTAS", question: "Qual cantora é conhecida como 'Mother Monster' pelos fãs?", correct: "Lady Gaga", answers: ["Lady Gaga", "Madonna", "Katy Perry", "P!nk"] },
  { category: "ARTISTAS", question: "Qual artista brasileira lançou o hit 'Envolver'?", correct: "Anitta", answers: ["Anitta", "Pabllo Vittar", "Ludmilla", "IZA"] },
  { category: "ARTISTAS", question: "Qual dupla formou o projeto Silk Sonic?", correct: "Bruno Mars e Anderson .Paak", answers: ["Bruno Mars e Anderson .Paak", "The Weeknd e Drake", "Justin Bieber e Shawn Mendes", "Harry Styles e Zayn"] },
  { category: "ARTISTAS", question: "Qual cantora ficou conhecida mundialmente com o álbum 'When We All Fall Asleep, Where Do We Go?'?", correct: "Billie Eilish", answers: ["Billie Eilish", "Lorde", "Halsey", "Lana Del Rey"] },
  { category: "ARTISTAS", question: "Qual integrante do BLACKPINK lançou a música 'APT.' em parceria com Bruno Mars?", correct: "ROSÉ", answers: ["ROSÉ", "Jisoo", "Jennie", "Lisa"] },

  { category: "MÚSICAS", question: "Qual música de Miley Cyrus ganhou o Grammy de Gravação do Ano e Melhor Performance Pop Solo em 2024?", correct: "Flowers", answers: ["Flowers", "Wrecking Ball", "Angels Like You", "Midnight Sky"] },
  { category: "MÚSICAS", question: "Qual música de Sabrina Carpenter virou um grande sucesso com o refrão sobre café expresso?", correct: "Espresso", answers: ["Feather", "Please Please Please", "Espresso", "Nonsense"] },
  { category: "MÚSICAS", question: "A música 'Die With A Smile' é um dueto de quais artistas?", correct: "Lady Gaga e Bruno Mars", answers: ["Lady Gaga e Bruno Mars", "Ariana Grande e The Weeknd", "Beyoncé e Jay-Z", "Taylor Swift e Ed Sheeran"] },
  { category: "MÚSICAS", question: "Qual música de Billie Eilish faz parte do álbum 'HIT ME HARD AND SOFT' e se tornou um grande sucesso em 2024?", correct: "BIRDS OF A FEATHER", answers: ["bad guy", "Happier Than Ever", "BIRDS OF A FEATHER", "everything i wanted"] },
  { category: "MÚSICAS", question: "Qual artista canta 'Blinding Lights'?", correct: "The Weeknd", answers: ["The Weeknd", "Bruno Mars", "Justin Bieber", "Drake"] },
  { category: "MÚSICAS", question: "Qual música de Taylor Swift tem o título de uma estação do ano?", correct: "august", answers: ["Anti-Hero", "august", "Karma", "Delicate"] },
  { category: "MÚSICAS", question: "Quem canta 'As It Was'?", correct: "Harry Styles", answers: ["Harry Styles", "Niall Horan", "Shawn Mendes", "Charlie Puth"] },
  { category: "MÚSICAS", question: "Qual música de Chappell Roan ganhou destaque mundial em 2024?", correct: "Good Luck, Babe!", answers: ["Good Luck, Babe!", "Espresso", "greedy", "Houdini"] },

  { category: "CINEMA E SÉRIES", question: "Quem interpreta Glinda no filme 'Wicked' (2024)?", correct: "Ariana Grande", answers: ["Ariana Grande", "Dove Cameron", "Sabrina Carpenter", "Olivia Rodrigo"] },
  { category: "CINEMA E SÉRIES", question: "Qual atriz interpreta Barbie no filme lançado em 2023?", correct: "Margot Robbie", answers: ["Margot Robbie", "Emma Stone", "Anne Hathaway", "Florence Pugh"] },
  { category: "CINEMA E SÉRIES", question: "Qual cantora interpreta Harley Quinn no filme 'Coringa: Delírio a Dois'?", correct: "Lady Gaga", answers: ["Lady Gaga", "Rihanna", "Miley Cyrus", "Beyoncé"] },
  { category: "CINEMA E SÉRIES", question: "Quem interpreta Wandinha Addams na série da Netflix?", correct: "Jenna Ortega", answers: ["Jenna Ortega", "Millie Bobby Brown", "Sadie Sink", "Emma Myers"] },
  { category: "CINEMA E SÉRIES", question: "Qual filme musical de 2024 é dividido em duas partes e conta a história das bruxas de Oz?", correct: "Wicked", answers: ["Wicked", "Wonka", "La La Land", "Mamma Mia!"] },
  { category: "CINEMA E SÉRIES", question: "Qual atriz interpreta Rue na série 'Euphoria'?", correct: "Zendaya", answers: ["Zendaya", "Sydney Sweeney", "Hunter Schafer", "Alexa Demie"] },

  { category: "CULTURA POP", question: "Qual premiação musical entrega os troféus chamados de 'Grammy'?", correct: "Grammy Awards", answers: ["Grammy Awards", "Oscar", "Emmy Awards", "Globo de Ouro"] },
  { category: "CULTURA POP", question: "Qual plataforma ficou conhecida pela retrospectiva musical anual 'Wrapped'?", correct: "Spotify", answers: ["Spotify", "Netflix", "YouTube", "Apple TV+"] },
  { category: "CULTURA POP", question: "Qual festival de música acontece tradicionalmente no deserto da Califórnia?", correct: "Coachella", answers: ["Coachella", "Rock in Rio", "Lollapalooza Brasil", "Tomorrowland"] },
  { category: "CULTURA POP", question: "Qual é o nome da turnê mundial de Taylor Swift que começou em 2023?", correct: "The Eras Tour", answers: ["The Eras Tour", "Reputation Tour", "1989 World Tour", "Lover Fest"] },
  { category: "CULTURA POP", question: "Qual rede social popularizou vídeos curtos e trends de dança no mundo todo?", correct: "TikTok", answers: ["TikTok", "LinkedIn", "Pinterest", "Reddit"] }
];

// EMBEDDED API: consulta a API pública iTunes Search para obter músicas e artistas.
// Cada resposta da API é usada para montar a pergunta e as quatro alternativas.
// async/await aguarda as requisições; fetch() realiza as consultas HTTP.
async function fetchArtistQuestions(artist) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&entity=song&limit=40&country=BR`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Falha ao consultar a API de músicas.");
  const data = await response.json();
  const tracks = data.results.filter(item =>
    item.trackName && item.artistName && item.collectionName && item.releaseDate
  );
  if (tracks.length < 2) return [];

  // Os dados da API (faixa, artista, álbum e data) alimentam diferentes modelos de pergunta.
  const track = tracks[Math.floor(Math.random() * tracks.length)];
  const otherTracks = shuffle(tracks.filter(item => item.trackId !== track.trackId));
  const questionsFromApi = [];

  // Tipo 1: identificar o artista a partir de uma música.
  const artistOptions = shuffle([
    track.artistName,
    ...shuffle(artists.filter(name => name.toLowerCase() !== track.artistName.toLowerCase())).slice(0, 3)
  ]);
  questionsFromApi.push({
    category: "MÚSICAS",
    question: `Quem interpreta a música “${track.trackName}”?`,
    correct: track.artistName,
    answers: artistOptions
  });

  // Tipo 2: descobrir em qual álbum uma faixa foi lançada.
  const albumOptions = shuffle([
    track.collectionName,
    ...otherTracks.map(item => item.collectionName)
      .filter(name => name && name !== track.collectionName)
      .slice(0, 3)
  ]);
  if (albumOptions.length === 4) {
    questionsFromApi.push({
      category: "ÁLBUNS",
      question: `Em qual álbum aparece a música “${track.trackName}”, de ${track.artistName}?`,
      correct: track.collectionName,
      answers: albumOptions
    });
  }

  // Tipo 3: descobrir o ano de lançamento usando a data fornecida pela API.
  const year = new Date(track.releaseDate).getFullYear();
  if (Number.isFinite(year) && year > 1950) {
    const yearOptions = shuffle([
      String(year),
      String(year - 1),
      String(year + 1),
      String(year - 2)
    ]);
    questionsFromApi.push({
      category: "LANÇAMENTOS",
      question: `De que ano é o lançamento de “${track.trackName}”, de ${track.artistName}?`,
      correct: String(year),
      answers: yearOptions
    });
  }

  return questionsFromApi;
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

async function getPopQuestions() {
  // Consulta artistas conhecidos na API e reúne perguntas de formatos diferentes.
  const apiResults = await Promise.allSettled(artists.map(artist => fetchArtistQuestions(artist)));
  const fromApi = apiResults
    .filter(result => result.status === "fulfilled")
    .flatMap(result => result.value);

  // Mistura perguntas de música/álbuns/anos geradas pela API com cultura pop,
  // cinema, séries, artistas e premiações do banco em português.
  const apiSelection = shuffle(fromApi).slice(0, 5);
  const backupSelection = shuffle(backupQuestions).slice(0, 10 - apiSelection.length);
  const selected = shuffle([...apiSelection, ...backupSelection]);

  if (selected.length < 10) {
    throw new Error("Não foi possível montar perguntas suficientes.");
  }
  return selected.slice(0, 10);
}

function showScreen(screen) {
  [startScreen, loadingScreen, quizScreen, resultScreen].forEach(item => item.classList.add("hidden"));
  screen.classList.remove("hidden");
}

async function startGame() {
  showScreen(loadingScreen);
  startBtn.disabled = true;
  try {
    questions = await getPopQuestions();
    currentQuestion = 0;
    score = 0;
    updateScore();
    showScreen(quizScreen);
    showQuestion();
  } catch (error) {
    loadingScreen.querySelector("h2").textContent = "Ops! Não conseguimos carregar.";
    loadingScreen.querySelector("p").textContent = "Confira sua conexão com a internet e tente novamente.";
    const retry = document.createElement("button");
    retry.className = "primary-btn";
    retry.textContent = "TENTAR NOVAMENTE";
    retry.addEventListener("click", () => {
      retry.remove();
      loadingScreen.querySelector("h2").textContent = "Preparando o tapete vermelho...";
      loadingScreen.querySelector("p").textContent = "Buscando músicas e artistas.";
      startGame();
    });
    loadingScreen.appendChild(retry);
  } finally {
    startBtn.disabled = false;
  }
}

function showQuestion() {
  answered = false;
  const item = questions[currentQuestion];
  questionNumber.textContent = currentQuestion + 1;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  categoryElement.textContent = item.category;
  questionElement.textContent = item.question;
  answersElement.innerHTML = "";
  feedbackElement.textContent = "";
  feedbackElement.className = "feedback";
  nextBtn.classList.add("hidden");

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = letters[index];
    const answerText = document.createElement("span");
    answerText.textContent = answer;
    button.append(letter, answerText);
    button.addEventListener("click", () => checkAnswer(button, answer, item.correct));
    answersElement.appendChild(button);
  });
}

function checkAnswer(selectedButton, selectedAnswer, correctAnswer) {
  if (answered) return;
  answered = true;
  const buttons = [...answersElement.querySelectorAll(".answer-btn")];
  buttons.forEach(button => {
    button.disabled = true;
    if (button.querySelector("span:last-child").textContent === correctAnswer) button.classList.add("correct");
  });
  if (selectedAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score += pointsPerQuestion;
    selectedButton.classList.add("correct");
    feedbackElement.textContent = "✦ Resposta correta! Você arrasou!";
    feedbackElement.className = "feedback good";
  } else {
    selectedButton.classList.add("wrong");
    feedbackElement.textContent = `Não foi dessa vez! A resposta certa era: ${correctAnswer}`;
    feedbackElement.className = "feedback bad";
  }
  updateScore();
  nextBtn.textContent = currentQuestion === questions.length - 1 ? "VER RESULTADO →" : "PRÓXIMA PERGUNTA →";
  nextBtn.classList.remove("hidden");
}

function updateScore() {
  scoreElement.textContent = score;
  sideScore.textContent = score;
  nextLevel.textContent = score + pointsPerQuestion;
}

function goToNextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) showQuestion();
  else showResult();
}

function showResult() {
  showScreen(resultScreen);
  document.getElementById("final-score").textContent = score;
  const resultTitle = document.getElementById("result-title");
  const resultMessage = document.getElementById("result-message");
  const resultIcon = document.getElementById("result-icon");
  const resultDetail = document.getElementById("result-detail");
  if (score === 1000) {
    resultIcon.textContent = "👑";
    resultTitle.textContent = "Lenda do mundo pop!";
    resultMessage.textContent = "Você acertou tudo! Seu lugar é no tapete vermelho.";
  } else if (score >= 600) {
    resultIcon.textContent = "🌟";
    resultTitle.textContent = "Você brilhou!";
    resultMessage.textContent = "Mandou muito bem! Você conhece bastante do universo pop.";
  } else if (score >= 300) {
    resultIcon.textContent = "🎬";
    resultTitle.textContent = "Quase uma estrela!";
    resultMessage.textContent = "Você tem boas referências. Que tal tentar mais uma vez?";
  } else {
    resultIcon.textContent = "💿";
    resultTitle.textContent = "A estreia foi só o começo!";
    resultMessage.textContent = "Continue acompanhando o mundo pop e volte para um novo desafio.";
  }
  resultDetail.textContent = `Você respondeu ${score / pointsPerQuestion} de ${questions.length} perguntas corretamente.`;
}

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", goToNextQuestion);
restartBtn.addEventListener("click", () => {
  showScreen(startScreen);
  progressBar.style.width = "0%";
});
