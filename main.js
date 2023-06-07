function verificarEvento(dataHoraAtual) {
  var dataHoraEvento = new Date("2023-06-05T04:45:00");
  var duracaoEvento = 60 * 60 * 1000;
  var intervaloEspera = 75 * 60 * 1000;

  var diff = dataHoraAtual.getTime() - dataHoraEvento.getTime();

  if (diff >= 0) {
    var ciclosCompletos = Math.floor(diff / (duracaoEvento + intervaloEspera));
    var tempoDecorrido =
      diff - ciclosCompletos * (duracaoEvento + intervaloEspera);

    if (tempoDecorrido < duracaoEvento) {
      var minutosRestantes = Math.floor(
        (duracaoEvento - tempoDecorrido) / (1000 * 60)
      );
      var segundosRestantes =
        Math.floor((duracaoEvento - tempoDecorrido) / 1000) % 60;
      return {
        ocorrendo: true,
        minutosRestantes: minutosRestantes,
        segundosRestantes: segundosRestantes,
      };
    } else {
      var minutosProximoEvento = Math.floor(
        (duracaoEvento + intervaloEspera - tempoDecorrido) / (1000 * 60)
      );
      var segundosProximoEvento =
        Math.floor((duracaoEvento + intervaloEspera - tempoDecorrido) / 1000) %
        60;
      return {
        ocorrendo: false,
        minutosProximoEvento: minutosProximoEvento,
        segundosProximoEvento: segundosProximoEvento,
      };
    }
  } else {
    var minutosParaInicio = Math.floor(-diff / (1000 * 60));
    return { ocorrendo: false, minutosProximoEvento: minutosParaInicio };
  }
}

function atualizarTempoRestante() {
  const dataHoraAtual = new Date();
  const resultado = verificarEvento(dataHoraAtual);

  const tempoElement = document.getElementById("tempo");

  if (resultado.ocorrendo) {
    const minutosRestantes = resultado.minutosRestantes;
    const segundosRestantes = resultado.segundosRestantes;
    tempoElement.textContent = `${minutosRestantes} minutos e ${segundosRestantes} segundos`;
  } else {
    const minutosProximoEvento = resultado.minutosProximoEvento;
    const segundosProximoEvento = resultado.segundosProximoEvento;
    tempoElement.textContent = `${minutosProximoEvento} minutos e ${segundosProximoEvento} segundos`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const statusElement = document.getElementById("status");
  const textoElement = document.getElementById("texto");
  const tempoElement = document.getElementById("tempo");

  const dataHoraAtual = new Date();
  const dataHoraEvento = new Date("2023-06-05T07:00:00");
  const duracaoEvento = 60 * 60 * 1000;
  const intervaloEspera = 75 * 60 * 1000;

  const resultado = verificarEvento(
    dataHoraAtual,
    dataHoraEvento,
    duracaoEvento,
    intervaloEspera
  );

  if (resultado.ocorrendo) {
    statusElement.textContent = "O evento está ocorrendo.";
    textoElement.textContent = "Tempo restante: ";
  } else {
    statusElement.textContent = "O evento não está ocorrendo.";
    textoElement.textContent = "A Maré Infernal começa em: ";
  }

  setInterval(atualizarTempoRestante, 1000);
  gerarHorariosProximosEventos(resultado);
});

function gerarHorariosProximosEventos(resultado) {
  const proximosEventos = [];
  const duracaoEvento = 60 * 60 * 1000;
  const intervaloEspera = 75 * 60 * 1000;
  const dataHoraAtual = new Date();
  let dataProximoEvento;

  if (resultado.ocorrendo) {
    console.log(minutosRestantes);
    const tempoDecorrido =
      duracaoEvento -
      (resultado.minutosRestantes * 60 + resultado.segundosRestantes) * 1000;
    dataProximoEvento = new Date(
      dataHoraAtual.getTime() + tempoDecorrido + intervaloEspera
    );
  } else {
    const tempoParaInicio =
      ((resultado.minutosProximoEvento + 1) * 60 +
        resultado.segundosProximoEvento) *
      1000;
    dataProximoEvento = new Date(dataHoraAtual.getTime() + tempoParaInicio);
  }

  for (let i = 0; i < 10; i++) {
    const proximoEventoFormatado = dataProximoEvento.toLocaleString("pt-BR", {
      day: "numeric",
      month: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    proximosEventos.push(proximoEventoFormatado.replace(",", " -"));
    dataProximoEvento = new Date(
      dataProximoEvento.getTime() + duracaoEvento + intervaloEspera
    );
  }

  criarLista(proximosEventos);
}

function criarLista(array) {
  const listaElement = document.getElementById("lista");

  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    const liElement = document.createElement("li");
    liElement.textContent = item;

    listaElement.appendChild(liElement);
  }
}
