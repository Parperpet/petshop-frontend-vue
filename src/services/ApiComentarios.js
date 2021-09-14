import {api} from './Config.js';

let endPoint = "comentarios/";

export default{
  retornaPorUsuario: (idUsuario) => {
    return api.get(endPoint + "retornaPorUsuario/" + idUsuario);
  },

  retornaAprovados: (idUsuario) => {
    return api.get(endPoint + "retornaAprovados/" + idUsuario);
  },

  gravarComentario: (comentario) => {
    return api.post(endPoint + "gravarComentario", comentario);
  },

  aprovarComentario: (idComentario, comentario) => {
    return api.put(endPoint + "aprovarComentario/" + idComentario, comentario);
  },

  deletarComentario: (idComentario) => {
    return api.delete(endPoint + "deletarComentario/" + idComentario);
  },
}