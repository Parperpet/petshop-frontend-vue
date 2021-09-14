<template>
  <div>
    <MenuAdm :nomeAdm="usuario.nome" v-if="usuario.nivelAcesso == 'Administrador'"/>
    <div class="container-fluid"><br>
      <div class="row justify-center" v-if="this.contato != ''">
        <section class="col-6 topicos">
          <div class="mb-4" v-for="contato in contato" :key="contato.idMensagem">        
            <label class="ml-3"><b>Nome: </b>{{contato.nome}}</label>
            <label class="ml-3"><b>Email: </b>{{contato.email}}</label>
            <label class="ml-3"><b>É cliente: </b>{{contato.cliente}}</label>
            <button class="btn btn-success ml-3" @click="mostrarMensagem(contato)">Ver mensagem</button>
            <button class="btn btn-danger ml-3" @click="excluirMensagem(contato.idMensagem)">Apagar mensagem</button>
            <hr class="mb-0">             
          </div>      
        </section>        
        
        <section class="col-4 chat ml-5 " v-if="this.mensagem != ''">          
          <label class="ml-3"><b>{{mensagem.nome}}</b></label>
          <label class="ml-3"><b>{{mensagem.email}}</b></label> 
          <hr>       
          <div class="chatReverse">                                    
            <label class="msgDestinatario">{{mensagem.mensagem}}</label>
          </div> 
          <hr class="mt-0"> 
        </section> 
      </div>

      <div class="naoTemos w-100 justify-center" v-else>
        <h4>Caixa de entrada vazia.</h4>
      </div>               
      <br>
    </div> 
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import MenuAdm from "@/components/MenuAdm"
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiContato from '@/services/ApiContato.js';

export default {
  name: "CaixaDeEntradaAdm",
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
        cadastraPasseio: ""
      },
      contato:{
        idMensagem: "",
        nome: "",
        email: "",
        mensagem: "",
        cliente: ""
      },
      mensagem: ''
    }
  },

  mounted(){
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data;      

      ApiContato.retornaTodos()
      .then(resp2 =>{
        this.contato = resp2.data
      })
      .catch(this.contato = '')

    })
    .catch(e => alert(e.response.data.mensagem))
  },

  methods:{
    mostrarMensagem(msg){
      this.mensagem = msg
    },

    excluirMensagem(idMensagem){
      if (confirm("Tem certeza que deseja excluir a mensagem?")) {
        ApiContato.excluirContato(idMensagem)
        .then(() =>{
          alert("Mensagem excluída com sucesso.")
          window.location.reload();
        })
        .catch(e => alert(e.response.data.mensagem))        
      }
    }
  }

}
</script>

<style>

</style>