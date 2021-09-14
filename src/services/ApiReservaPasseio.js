import {api} from './Config.js';

let endPoint = "reserva-passeio/";

export default{
  retornaPorCliente: (idUsuario) => {
    return api.get(endPoint + "retornaPorCliente/" + idUsuario);
  },

  retornaPorProfissional: (idUsuario) => {
    return api.get(endPoint + "retornaPorProfissional/" + idUsuario);
  },

  gravarReservaPasseio: (reservaPasseio) => {
    return api.post(endPoint + "gravarReservaPasseio", reservaPasseio);
  },

  deletarReservaPasseio: (idReservaPasseio) => {
    return api.delete(endPoint + "deletarReservaPasseio/" + idReservaPasseio);
  },

}