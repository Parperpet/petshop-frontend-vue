import {api} from './Config.js';

let endPoint = "contato/";

export default{
  retornaTodos: () => {
    return api.get(endPoint + "retornaTodos");
  },

  gravarContato: (contato) => {
    return api.post(endPoint + "gravarContato", contato);
  },

  excluirContato: (idMensagem) => {
    return api.delete(endPoint + "excluirContato/" + idMensagem);
  },

}