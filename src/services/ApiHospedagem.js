import {api} from './Config.js';

let endPoint = "hospedagem/";

export default{
  retornaTodos: () => {
    return api.get(endPoint + "retornaTodos");
  },

  retornaPorUsuario: (idUsuario) => {
    return api.get(endPoint + "retornaPorUsuario/" + idUsuario);
  },

  retornaPorId: (idHospedagem) => {
    return api.get(endPoint + "retornaPorId/" + idHospedagem);
  },

  retornaComParametros: (hospedagemParametros) => {
    return api.post(endPoint + "retornaComParametros", hospedagemParametros);
  },

  gravarHospedagem: (hospedagem) => {
    return api.post(endPoint + "gravarHospedagem", hospedagem);
  },

  editarHospedagem: (idHospedagem, hospedagem) => {
    return api.put(endPoint + "alterarHospedagem/" + idHospedagem , hospedagem);
  },

  deletarHospedagem: (idHospedagem) => {
    return api.delete(endPoint + "deletarHospedagem/" + idHospedagem);
  },
}