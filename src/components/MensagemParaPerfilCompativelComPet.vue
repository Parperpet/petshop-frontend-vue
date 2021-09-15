<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <center>
      <div class="container">
        <h1 class="mt-3">Perfil compatível com {{pet.nome}}</h1><br>
        <div class="row">
          <div class="col-6">          
            <img v-if="usuario.fotoPerfilBase64 != 0" :src="perfilCompativel.fotoPerfilBase64"  class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
            <h4 class="ml-3">Nome: {{perfilCompativel.nome}}</h4>
            <h4 class="ml-3">Email: {{perfilCompativel.email}}</h4>
            <h4 class="ml-3">Telefone: {{perfilCompativel.telefone}}</h4>
          </div>  
          <div class="col-6">          
            <img v-if="pet.fotoPerfilBase64 != 0" :src="pet.fotoPerfilBase64"  class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
            <h4 class="ml-3">Nome do pet: {{pet.nome}}</h4>
            <h4 class="ml-3">Idade: {{pet.idade}}</h4>
            <h4 class="ml-3">Porte: {{pet.porte}}</h4>
          </div>
        </div>
        <hr/>
        <div class="row flexbottom">          
          <div class="form-group m-0 w-100">            
            <textarea class="form-control" v-model="mensagem.conteudo" rows="3" placeholder="Digite sua mensagem aqui..."></textarea>
            <button type="button" class="btn btn-warning h-max ml-4 mt-3" @click="enviarMensagem">Enviar Mensagem</button>
          </div>          
        </div>
      </div>
      <br><br>      
    </center>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import MenuCliente from '@/components/MenuCliente';
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiPet from '@/services/ApiPet.js'
import ApiMensagem from '@/services/ApiMensagem.js'

export default {  
 name: "MensagemParaPerfilCompativelComPet",
 components:{
    Footer,
    MenuCliente
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
      pet:{
        idPet: "",
        dono:{
          idUsuario: "",
        },
        nome: "",
        idade: "",
        especie: "",
        cor: "",
        porte: "",
        olhos: "",
        custoMensal: "",
        necessitaPasseio: "",
        necessitaCompanhia: "",
        descricao: "",
        fotoPerfilBase64: "",
        disponivelParaAdocao: ""
      },
      mensagem:{
        idMensagem: "",
        idChat: "",
        remetente: "",
        destinatario: "",
        conteudo:"",
        pet: ""
      },
      perfilCompativel:""
    }
  },

  mounted(){
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data;                   
    })
    .catch(e => alert(e.response.data.mensagem))

    ApiUsuario.retornaPorId(this.$route.params.idPerfilCompativel)
    .then(resp => {          
      this.perfilCompativel = resp.data;                   
    })
    .catch(e => alert(e.response.data.mensagem))

    ApiPet.retornaPorId(this.$route.params.idPet)
    .then(resp =>{
      this.pet = resp.data
    })
    .catch(e => alert(e.response.data.mensagem))
  },

  methods:{
    enviarMensagem(){
      this.mensagem.remetente = this.usuario
      this.mensagem.destinatario = this.perfilCompativel
      this.mensagem.pet = this.pet

      ApiMensagem.gravarMensagem(this.mensagem)
      .then(() =>{
        alert("Mensagem enviada com sucesso.")
      })
      .catch(e => alert(e.response.data.mensagem))
    }
  }
}
</script>

<style>

</style>