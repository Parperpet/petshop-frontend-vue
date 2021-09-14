<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <div class="container alert-warning pt-3 pl-4 pr-4 mt-4">
      <section class="mb-4">
        <h2 class="h1-responsive font-weight-bold text-center mt-4">Como você avalia nossos serviços?</h2>
        <div class="row">              
          <div class="col-md">
            <form id="contact-form">
              <div class="row">
                <div class="col-md">
                  <div class="md-form">
                    <label for="message">Comentário:</label>
                    <textarea type="text" rows="2" class="form-control md-textarea" v-model="comentarios.comentario"></textarea>
                  </div>
                </div>
              </div>             
            </form>
            <br><br>
            <div class="text-center">
              <a class="btn btn-warning btnG" @click="enviar">Enviar</a><br>
              <small>Os comentários serão avalidados pelo Administrador do site.</small>
            </div>
            <div class="status"></div>
            <br><br>
          </div>              
        </div>
      </section>    
    </div>
    <br><br><br>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import MenuCliente from "@/components/MenuCliente"
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiComentarios from '@/services/ApiComentarios.js';

export default {
  name: "ComentariosAdm",
  components:{
    MenuCliente,
    Footer
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
        cadastraPasseio: ""        
      },
      comentarios:{
        idProfissional:-1,
        idCliente:"",
        comentario: "",
        aprovadoAdm: false
      },
    }
  },

  mounted(){    
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data;
      this.comentarios.idCliente = this.usuario.idUsuario               
    }) 
  },

  methods:{
    enviar(){
      ApiComentarios.gravarComentario(this.comentarios)
      .then(() =>{
        alert("Comentario registrado com sucesso!")
      })
      .catch(e => e.response.data.mensagem)
    }
  }
}
</script>

<style>

</style>