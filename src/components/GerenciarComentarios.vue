<template>
  <div>    
    <MenuAdm :nomeAdm="usuario.nome" v-if="usuario.nivelAcesso == 'Administrador'"/>    
    <div class="container">
      <div class="row justify-center">
        <h2 class="mt-3 mb-4">Gerenciar Comentários</h2>
      </div>      
      <div class="row justify-center" v-if="this.comentarios != ''">
        <div class="col-4 text-center" v-for="(comentarios) in comentarios" :key="comentarios.idComentario"> 
          <img v-if="comentarios.idCliente.fotoPerfilBase64 != 0" :src="comentarios.idCliente.fotoPerfilBase64" class="img-thumbnail" />            
          <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          <label class="mb-2 mt-2"><b>Cliente: </b>{{comentarios.idCliente.nome}}</label><br>
          <label><b>Comentario: </b>{{comentarios.comentario}}</label><br>
          <button v-if="comentarios.aprovadoAdm != true" type="button" class="btn btn-success mt-2" @click="aprovarComentario(comentarios)">Aprovar comentario</button><br> 
          <button type="button" class="btn btn-danger mt-3" @click="deletarComentario(comentarios.idComentario)">Deletar</button>          
          <hr class="col-12">          
        </div>        
      </div>
      <div class="row mt-3" v-else>
        <div class="naoTemos w-100 justify-center">
          <h4 class="center">Ainda não tem nenhum comentário cadastrado.</h4>
        </div>          
      </div>
      <br><br>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import MenuAdm from "@/components/MenuAdm"
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiComentarios from '@/services/ApiComentarios.js';

export default {
  name: "GerenciarComentarios",
  components:{
    Footer,    
    MenuAdm
  },

  data(){
    return{
      usuario:{
        idUsuario: "",
        nivelAcesso: "",
        nome: "",
        email: "",
        senha: "",
        cpf: "",        
        telefone: "",
        fotoPerfilBase64: "",
        cadastraHospedagem: "",
        cadastraAdocao: "",
        cadastraPasseio: "",
        aprovado: ""       
      },
      comentarios:[{
        idComentario: "",
        idProfissional:"",
        idCliente:"",
        comentario: "",
        aprovadoAdm: ""
      }],
      comentarioRequest:""
    }
  },

  mounted(){  
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data

      ApiComentarios.retornaPorUsuario(-1) 
      .then(resp1 =>{
        this.comentarios = resp1.data
      })
      .catch(this.comentarios = '')
    })
  },

  methods:{
    aprovarComentario(comentario){
      if (confirm("Tem certeza que deseja aprovar o comentario?") == true) {
        comentario.aprovadoAdm = true
        comentario.idCliente = comentario.idCliente.idUsuario         

        ApiComentarios.aprovarComentario(comentario.idComentario, comentario) 
        .then(() =>{
          window.location.reload()
          alert("Comentario aprovado com sucesso.")
        })
        .catch(e => alert(e.response.data.mensagem))
      }
    },

    deletarComentario(idComentario){
      if (confirm("Tem certeza que deseja excluir o comentario?") == true) {
        ApiComentarios.deletarComentario(idComentario) 
        .then(() =>{
          alert("Exclusão realizada com sucesso.")
          window.location.reload();
        })
      }
    }
  }
}
</script>

<style>

</style>