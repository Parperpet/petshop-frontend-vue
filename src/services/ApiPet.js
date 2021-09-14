import {api} from './Config.js';

let endPoint = "pet/";

export default{
  retornaTodos: () => {
    return api.get(endPoint + "retornaTodos");
  },

  retornaPetsDisponiveisParaAdocao: () => {
    return api.get(endPoint + "retornaPetsDisponiveisParaAdocao");
  },

  retornaMeusPets: (idUsuario) => {
    return api.get(endPoint + "retornaMeusPets/" + idUsuario);
  },

  retornaPorId: (idPet) => {
    return api.get(endPoint + "retornaPorId/" + idPet);
  },
  
  retornaPetsCompativeisComPerfil: (preferenciaPet) => {
    return api.post(endPoint + "retornaPetsCompativeisComPerfil/", preferenciaPet);
  },

  gravarPet: (pet) => {
    return api.post(endPoint + "gravarPet", pet);
  },

  alterarPet: (idPet, pet) => {
    return api.put(endPoint + "alterarPet/" + idPet, pet);
  },

  deletarPet: (idPet) => {
    return api.delete(endPoint + "deletarPet/" + idPet);
  }
}