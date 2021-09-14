import {api} from './Config.js';

let endPoint = "passeio/";

export default{
  retornaPorUsuario: (idUsuario) => {
    return api.get(endPoint + "retornaPorUsuario/" + idUsuario);
  },

  retornaPorId: (idPasseio) => {
    return api.get(endPoint + "retornaPorid/" + idPasseio);
  },

  gravarPasseio: (passeio) => {
    return api.post(endPoint + "gravarPasseio", passeio);
  },

  retornaComParametros: (passeioParemetros) => {
    return api.post(endPoint + "retornaComParametros", passeioParemetros);
  },

  alterarPasseio: (idPasseio, passeio) => {
    return api.put(endPoint + "alterarPasseio/" + idPasseio, passeio);
  },

  deletarPasseio: (idPasseio) => {
    return api.delete(endPoint + "deletarPasseio/" + idPasseio);
  },

}