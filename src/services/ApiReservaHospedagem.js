import {api} from './Config.js';

let endPoint = "reserva-hospedagem/";

export default{
  retornaTodos: () => {
    return api.get(endPoint + "retornaTodos");
  },

  retornaPorId: (idReservaHospedagem) => {
    return api.get(endPoint + "retornaPorId/" + idReservaHospedagem);
  },

  gravarReservaHospedagem: (gravarReservaHospedagem) => {
    return api.post(endPoint + "gravarReservaHospedagem", gravarReservaHospedagem);
  },
}