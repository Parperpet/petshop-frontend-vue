import {api} from './Config.js';

let endPoint = "usuario/";

export default{
  retornaTodos: () => {
    return api.get(endPoint + "retornaTodos");
  },

  retornaPorId: (idUsuario) => {
    return api.get(endPoint + "retornaPorId/" + idUsuario);
  },

  retornaProfissionais: () => {
    return api.get(endPoint + "retornaProfissionais");
  },

  login: (login) => {    
    return api.post(endPoint + "login", login);
  },

  gravarUsuario: (usuario) => {
    return api.post(endPoint + "gravarUsuario", usuario);
  },

  alterarUsuario: (idUsuario, usuario) => {
    return api.put(endPoint + "alterarUsuario/" + idUsuario, usuario);
  },

  avaliarProfissional: (idUsuario, usuario) => {
    return api.put(endPoint + "avaliarProfissional/" + idUsuario, usuario);
  },

  deletarUsuario: (idUsuario) => {
    return api.delete(endPoint + "deletarUsuario/" + idUsuario);
  }
}