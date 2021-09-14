<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <MenuProfissional :nomeProfissional="usuario.nome" v-if="usuario.nivelAcesso == 'Profissional'"/>
    <div class="container-fluid"><br>
      <div class="row justify-center" v-if="this.mensagem != ''">
        <section class="col-6 topicos">
          <div class="mb-4" v-for="mensagem in quantidadeChatsUsuairo" :key="mensagem.idChat">        
            <img v-if="mensagem.pet.fotoPerfilBase64 != 0" :src="mensagem.pet.fotoPerfilBase64" class="img-thumbnail iconeMensagem" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail iconeMensagem" />
            <label class="ml-3"><b>Remetente: </b>{{mensagem.remetente.nome}}</label>
            <label class="ml-3"><b>Pet: </b>{{mensagem.pet.nome}}</label>
            <button class="btn btn-success ml-3" @click="historicoChat(mensagem)">Ver conversa</button>
            <button class="btn btn-danger ml-3" @click="excluirChat(mensagem.idChat)">Excluir conversa</button>
            <hr class="mb-0">             
          </div>      
        </section>        
        
        <section class="col-4 chat ml-5 " v-if="this.historico != 0">
          <img v-if="remetente.fotoPerfilBase64 != 0 && remetente.idUsuario != usuario.idUsuario" :src="remetente.fotoPerfilBase64" class="img-thumbnail iconeMensagem" />            
          <img v-else-if="destinatario.fotoPerfilBase64 != 0 && remetente.idUsuario == usuario.idUsuario" :src="destinatario.fotoPerfilBase64" class="img-thumbnail iconeMensagem" />            
          <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail iconeMensagem" /> 
          <label v-if="remetente.idUsuario != usuario.idUsuario" class="ml-3"><b>{{remetente.nome}}</b></label> 
          <label v-if="remetente.idUsuario == usuario.idUsuario" class="ml-3"><b>{{destinatario.nome}}</b></label> 
          <hr>       
          <div class="chatReverse">            
            <div v-for="(historico) in historico" :key="historico.idMensagem">                                          
              <label class="msgDestinatario" v-if="historico.remetente.idUsuario == usuario.idUsuario">{{historico.conteudo}}</label>                     
              <label class="msgRemetente" v-else>{{historico.conteudo}}</label>           
            </div>
          </div> 
          <hr class="mt-0">          
          <div class="form-group">            
            <textarea class="form-control mt-2" placeholder="Digite sua mensagem aqui..." v-model="novaMensagem.conteudo"></textarea>
          </div>
          <div class="justify-center">
            <button type="button" class="btn btn-warning" @click="enviarMensagem">Enviar Mensagem</button>
          </div>  
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
import MenuCliente from '@/components/MenuCliente';
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiMensagem from '@/services/ApiMensagem.js';
import MenuProfissional from "@/components/MenuProfissional"

export default {
  name: "CaixaDeEntrada",
  components:{
    Footer,
    MenuCliente,
    MenuProfissional
  },

  data(){
    return{
      usuario:{
        idUsuario: "",
        nivelAcesso: "Cliente",
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
      mensagem:[{
        idMensagem: "",
        idChat: "",
        remetente: "",
        destinatario: "",
        conteudo:"",
        pet: ""
      }],
      historico: [],
      remetente: "",
      destinatario: "",
      novaMensagem: {
        idMensagem: "",
        idChat: "",
        remetente: "",
        destinatario: "",
        conteudo:"",
        pet: ""
      }
    }
  },

  mounted(){
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data;      

      ApiMensagem.retornaHistoricoConversa(this.usuario.idUsuario)
      .then(resp2 =>{
        this.mensagem = resp2.data
      })
      .catch(this.mensagem = '')

    })
    .catch(e => alert(e.response.data.mensagem))
  },

  methods:{
    enviarMensagem(){
      this.novaMensagem.remetente = this.usuario
      this.novaMensagem.destinatario = this.remetente

      if (this.novaMensagem.conteudo != '') {
        ApiMensagem.gravarNovaMensagem(this.novaMensagem)
        .then(resp =>{
          this.addMensagemEnviada(resp.data)
        })
        .catch(e => alert(e.response.data.mensagem))
      } else {
        alert("Digite algum conteudo antes de enviar a mensagem.")
      }
      
      
    },

    addMensagemEnviada(mansagem){
      let historicoAux = []
      historicoAux.push(mansagem)

      this.historico.forEach(m =>{
        historicoAux.push(m)
      })

      this.historico = historicoAux
      this.novaMensagem.conteudo = ''
    },

    historicoChat(mensagem){
      this.historico = []
      this.remetente = mensagem.remetente 
      this.destinatario = mensagem.destinatario

      this.mensagem.forEach(m =>{
        if (m.idChat == mensagem.idChat) {
          this.historico.push(m)
        }        
      })

      this.novaMensagem.idChat = mensagem.idChat
      this.novaMensagem.pet = mensagem.pet
    },

    excluirChat(idChat){
      if (confirm("Tem certeza que deseja excluir a conversa?")) {
        ApiMensagem.excluirChat(idChat)
        .then(() =>{
          alert("Conversa excluída com sucesso.")
          window.location.reload();
        })
        .catch(e => alert(e.response.data.mensagem))        
      }
    }
  },

  computed:{
    quantidadeChatsUsuairo(){
      let qtd = [];
      let aux = '';
      this.mensagem.forEach(m => {  
        if (m.idChat != aux) {
          qtd.push(m);
        }
        aux = m.idChat        
      }) 
      return qtd;
    }
  }
}
</script>

<style>

</style>