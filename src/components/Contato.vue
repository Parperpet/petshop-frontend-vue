<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <MenuProfissional :nomeProfissional="usuario.nome" v-if="usuario.nivelAcesso == 'Profissional'"/>
    <MenuAdm :nomeAdm="usuario.nome" v-if="usuario.nivelAcesso == 'Administrador'"/>
    <Menu v-if="usuario.nivelAcesso == ''"/>
    <div class="container alert-warning">
      <section class="mb-4">
        <h2 class="h1-responsive font-weight-bold text-center my-4">Contato</h2>
        <div class="row">              
          <div class="col-md">
            <form id="contact-form">                      
              <div class="row">
                <div class="col-md">
                  <div class="md-form">
                    <label for="name" class="">Nome</label>
                    <input type="text" class="form-control" v-model="contato.nome">
                  </div>
                </div>                          
                <div class="col-md">
                  <div class="md-form">
                    <label for="email" class="">E-mail</label>
                    <input type="email" class="form-control" v-model="contato.email">      
                  </div>
                </div>                          
              </div>
              <div class="row">
                <div class="col-md">
                  <div class="md-form">
                    <label for="message">Mensagem</label>
                    <textarea type="text" rows="2" class="form-control md-textarea" v-model="contato.mensagem"></textarea>
                  </div>
                </div>
              </div>             
            </form>
            <br><br>
            <div class="text-center">
              <a class="btn btn-warning btnG" @click="enviar">Enviar</a>
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
import Menu from '@/components/Menu';
import MenuCliente from "@/components/MenuCliente"
import MenuProfissional from "@/components/MenuProfissional"
import MenuAdm from "@/components/MenuAdm"
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiContato from '@/services/ApiContato.js';

export default {
  name: "Contato",
  components:{
    MenuCliente,
    MenuProfissional,
    MenuAdm,
    Menu,
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
      contato:{
        idMensagem: "",
        nome: "",
        email: "",
        mensagem: "",
        cliente: ""
      }
    }
  },

  mounted(){
    if (this.$route.params.idUsuario == undefined) {
      this.usuario = ""
      this.contato.cliente = false

    } else {
      ApiUsuario.retornaPorId(this.$route.params.idUsuario)
      .then(resp => {          
        this.usuario = resp.data; 
        this.contato.nome = this.usuario.nome
        this.contato.email = this.usuario.email
        this.contato.cliente = true                 
      })
      .catch(this.contato.cliente = false)
    }    
  },

  methods:{
    enviar(){
      ApiContato.gravarContato(this.contato)
      .then(() =>{
        alert("Mensagem enviada com sucesso!")
      })
      .catch(e => e.response.data.mensagem)
    }
  }
}
</script>

<style>

</style>