// Informações sobre a FURIA
const furiaInfo = {
    lineup: [
      { name: "yuurih", role: "Rifler" },
      { name: "KSCERATO", role: "Rifler" },
      { name: "YEKINDAR", role: "Entry Fragger" },
      { name: "FalleN", role: "IGL (In-Game Leader) e AWPer" },
      { name: "molodoy", role: "AWPer" },
    ],
    upcomingMatch: {
      opponent: "G2 Esports",
      date: "30/04/2025",
      time: "18:00",
      event: "IEM Cologne 2025",
    },
    events: [
      {
        name: "IEM Cologne 2025",
        date: "30/04/2025",
        location: "Colônia, Alemanha",
      },
      { name: "BLAST Premier Fall 2025", date: "15/05/2025", location: "Online" },
      {
        name: "ESL Pro League Season 16",
        date: "10/06/2025",
        location: "Online",
      },
    ],
    streams: {
      twitch: "https://www.twitch.tv/furiaesports",
      youtube: "https://www.youtube.com/c/FURIAesports",
      facebook: "https://www.facebook.com/FURIAesports",
    },
  };
  
  // Função para formatar a próxima partida
  function getUpcomingMatch() {
    const { opponent, date, time, event } = furiaInfo.upcomingMatch;
    return `A próxima partida da FURIA é contra ${opponent} no evento ${event}, no dia ${date} às ${time}.`;
  }
  
  // Função para retornar o lineup atual
  function getLineup() {
    let lineupText = "Lineup atual da FURIA:\n";
    furiaInfo.lineup.forEach((player) => {
      lineupText += `${player.name} (${player.role})\n`;
    });
    return lineupText;
  }
  
  // Função para retornar próximos eventos
  function getUpcomingEvents() {
    let eventsText = "Próximos eventos da FURIA:\n";
    furiaInfo.events.forEach((event) => {
      eventsText += `${event.name} - ${event.date} - ${event.location}\n`;
    });
    return eventsText;
  }
  
  // Função para obter links de streams
  function getStreams() {
    return `Você pode acompanhar a FURIA ao vivo nas seguintes plataformas:\n
      - Twitch: ${furiaInfo.streams.twitch}\n
      - YouTube: ${furiaInfo.streams.youtube}\n
      - Facebook: ${furiaInfo.streams.facebook}`;
  }
  
  // Função para gerar as opções de interação
  function getSuggestedOptions(input) {
    input = input.toLowerCase();
    if (
      input.includes("lineup") ||
      input.includes("jogadores") ||
      input.includes("escalação")
    ) {
      return [
        "Quando é a próxima partida?",
        "Onde posso assistir ao próximo jogo?",
      ];
    } else if (
      input.includes("próximo jogo") ||
      input.includes("próxima partida") ||
      input.includes("quando joga")
    ) {
      return [
        "Quem são os jogadores do time?",
        "Onde posso assistir ao próximo jogo?",
      ];
    } else if (
      input.includes("eventos") ||
      input.includes("competição") ||
      input.includes("campeonatos")
    ) {
      return ["Quando é a próxima partida?", "Quem são os jogadores do time?"];
    } else if (input.includes("assistir") || input.includes("transmissão")) {
      return ["Quando é a próxima partida?", "Quem são os jogadores do time?"];
    } else {
      return [
        "Quando é a próxima partida?",
        "Quem são os jogadores do time?",
        "Onde posso assistir ao próximo jogo?",
      ];
    }
  }
  
  // Função principal para responder com as informações sobre a FURIA
  function getBotResponse(input) {
    input = input.toLowerCase();
  
    if (
      input.includes("lineup") ||
      input.includes("jogadores") ||
      input.includes("escalação")
    ) {
      return getLineup();
    } else if (
      input.includes("próximo jogo") ||
      input.includes("próxima partida") ||
      input.includes("quando joga")
    ) {
      return getUpcomingMatch();
    } else if (
      input.includes("eventos") ||
      input.includes("competição") ||
      input.includes("campeonatos")
    ) {
      return getUpcomingEvents();
    } else if (input.includes("assistir") || input.includes("transmissão")) {
      return getStreams();
    } else {
      return "Desculpe, não entendi. Pergunte sobre o lineup, próximo jogo, eventos ou como assistir.";
    }
  }
  
  // Função para adicionar uma mensagem do bot
  function appendMessage(message, fromUser) {
    const chat = document.getElementById("chat-messages");
    const div = document.createElement("div");
    div.classList.add(fromUser ? "user-message" : "bot-message");
    div.textContent = message;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }
  
  // Função para exibir as opções de botões
  function showChatOptions(options) {
    const optionsBox = document.getElementById("chat-options");
    optionsBox.innerHTML = ""; // Limpa as opções anteriores
  
    options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.onclick = () => {
        appendUserMessage(option);
        const botResponse = getBotResponse(option);
        appendMessage(botResponse, false);
        showChatOptions(getSuggestedOptions(option));
      };
      optionsBox.appendChild(button);
    });
  }
  
  // Função para adicionar a mensagem do usuário
  function appendUserMessage(message) {
    appendMessage(message, true);
  }
  
  // Função chamada quando o usuário envia uma mensagem
  document.getElementById("send-button").addEventListener("click", () => {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (message) {
      appendMessage(message, true); // Adiciona mensagem do usuário
      input.value = ""; // Limpa o campo de input
      const botResponse = getBotResponse(message); // Chama a função para obter a resposta do bot
      setTimeout(() => {
        appendMessage(botResponse, false); // Adiciona resposta do bot após 1 segundo
      }, 1000);
    }
  });
  
  // Função chamada quando o usuário pressionar Enter (se preferir não usar apenas o botão)
  document.getElementById("user-input").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      document.getElementById("send-button").click();
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    showChatOptions([
      "Quando é a próxima partida?",
      "Quem são os jogadores do time?",
      "Onde posso assistir ao próximo jogo?",
    ]);
  });
  