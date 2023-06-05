function verificarEvento(
  dataHoraAtual,
  dataHoraEvento,
  duracaoEvento,
  intervaloEspera
) {
  const diff = dataHoraAtual - dataHoraEvento;

  if (diff >= 0 && diff < duracaoEvento) {
    const minutosRestantes = Math.floor((duracaoEvento - diff) / (1000 * 60));
    return { ocorrendo: true, minutosRestantes: minutosRestantes };
  } else {
    const diffProximoEvento =
      dataHoraEvento.getTime() +
      duracaoEvento +
      intervaloEspera -
      dataHoraAtual.getTime();
    const minutosProximoEvento = Math.floor(diffProximoEvento / (1000 * 60));
    return { ocorrendo: false, minutosProximoEvento: minutosProximoEvento };
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
     tempoElement.textContent = "Tempo restante: " + resultado.minutosRestantes + " minutos.";
   } else {
     statusElement.textContent = "O evento não está ocorrendo.";
     tempoElement.textContent = "Próximo evento em: " + resultado.minutosProximoEvento + " minutos.";
   }
 });
