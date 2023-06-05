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
      return { ocorrendo: true, minutosRestantes: minutosRestantes };
    } else {
      var minutosProximoEvento = Math.floor(
        (duracaoEvento + intervaloEspera - tempoDecorrido) / (1000 * 60)
      );
      return { ocorrendo: false, minutosProximoEvento: minutosProximoEvento };
    }
  } else {
    var minutosParaInicio = Math.floor(-diff / (1000 * 60));
    return { ocorrendo: false, minutosProximoEvento: minutosParaInicio };
  }
}

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

document.addEventListener("DOMContentLoaded", function () {
  const tituloElement = document.getElementById("titulo");
  const statusElement = document.getElementById("status");
  const tempoElement = document.getElementById("tempo");

  tituloElement.textContent = "Maré Infernal";

  const resultado = verificarEvento(
    dataHoraAtual,
    dataHoraEvento,
    duracaoEvento,
    intervaloEspera
  );

  if (resultado.ocorrendo) {
    statusElement.textContent = "O evento está ocorrendo.";
    tempoElement.textContent =
      "Tempo restante: " + resultado.minutosRestantes + " minutos.";
  } else {
    statusElement.textContent = "O evento não está ocorrendo.";
    tempoElement.textContent =
      "A Maré Infernal começa em: " + resultado.minutosProximoEvento + " minutos.";
  }
});
