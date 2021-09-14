import {api} from './Config.js';

let endPoint = "mensagem/";

export default{
  retornaHistoricoConversa: (para) => {
    return api.get(endPoint + "retornaHistoricoConversa/" + para);
  },

  gravarMensagem: (mensagem) => {
    return api.post(endPoint + "gravarMensagem", mensagem);
  },

  gravarNovaMensagem: (mensagem) => {
    return api.post(endPoint + "gravarNovaMensagem", mensagem);
  },

  gravarContatoAdm: (mensagem) => {
    return api.post(endPoint + "gravarContatoAdm", mensagem);
  },

  excluirChat: (idChat) => {
    return api.delete(endPoint + "excluirChat/" + idChat);
  },
}