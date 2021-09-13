<template>
  <div>    
    <MenuAdm :nomeAdm="usuario.nome" v-if="usuario.nivelAcesso == 'Administrador'"/> 
    <MenuProfissional :nomeProfissional="usuario.nome" v-if="usuario.nivelAcesso == 'Profissional'"/>   
    <div class="container">
      <div class="row justify-center">
        <h2 class="mt-3 mb-2">Gerenciar Hospedagens</h2>
      </div>      
      <div v-if="this.hospedagem != ''">
        <hr>
        <div class="row" v-for="(hospedagem) in hospedagem" :key="hospedagem.idHospedagem">        
          <div class="col-4 p-0">         
            <img v-if="hospedagem.fotoPerfilBase64 != 0" :src="hospedagem.fotoPerfilBase64" class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          </div>            
          <ul class="col-5"> 
            <li><b>{{hospedagem.nome}}</b></li>
            <li>Tipo: {{hospedagem.tipo}}</li>
            <li>Endereço: {{hospedagem.endereco}}</li> 
            <li>Bairro: {{hospedagem.bairro}}</li>
            <li>Cidade: {{hospedagem.cidade}}</li>
            <li>Estado: {{hospedagem.estado}}</li>
            <li>Especie que aceita: {{hospedagem.especieAceita}}</li>
            <li>Porte que aceita: {{hospedagem.porteAceito}}</li>
            <li>Preço da diaria: {{hospedagem.precoDiaria}}</li>
            <li>Descrição: {{hospedagem.descricao}}</li>
          </ul>
          <div class="col-sm-3">
            <button type="button" class="btn btn-success mr-3" @click="editarHospedagem(hospedagem.idHospedagem)">Editar</button>  
            <button type="button" class="btn btn-danger" @click="deletarHospedagem(hospedagem.idHospedagem)">Deletar</button>
          </div>
          <hr class="col-12">          
        </div>        
      </div>
      <div class="row mt-3" v-if="this.hospedagem == ''">
        <div class="naoTemos w-100 justify-center">
          <h4 class="center">Ainda não tem nenhuma hospedagem cadastrada.</h4>
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
import ApiHospedagem from '@/services/ApiHospedagem.js';
import MenuProfissional from "@/components/MenuProfissional"

export default {
  name: "GerenciarHospedagens",
  components:{
    Footer,    
    MenuAdm,
    MenuProfissional
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
        Telefone: "",        
      },
      hospedagem:[{
        idHospedagem: "",
        nome: "",
        tipo: "",
        endereco: "",
        bairro: "",
        cidade: "",
        estado: "",
        especieAceita: "",
        porteAceito: "",
        precoDiaria: "",
        descricao: "",
        fotoPerfilBase64: ""
      }]
    }
  },

  mounted(){  
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data

      this.hospedagem = ''

      if (this.usuario.nivelAcesso == "Administrador") {
        ApiHospedagem.retornaTodos() 
        .then(resp1 =>{
          this.hospedagem = resp1.data
        })
        .catch(this.hospedagem = '')
        
      } else {
        ApiHospedagem.retornaPorUsuario(this.usuario.idUsuario) 
        .then(resp1 =>{
          this.hospedagem = resp1.data
        })
        .catch(this.hospedagem = '')
      }
    })
  },

  methods:{
    editarHospedagem(idHospedagem){
      this.$router.push({path: `/editarHospedagem/${this.$route.params.idUsuario}/${idHospedagem}`});
    },

    deletarHospedagem(idHospedagem){
      if (confirm("Tem certeza que deseja excluir a hospedagem?") == true) {
        ApiHospedagem.deletarHospedagem(idHospedagem) 
        .then(() =>{
          alert("Exclusão realizada com sucesso.")
          window.location.reload();
        })
        .catch("Não é possível excluir a hospedagem, pois a mesma está vinculado a uma reserva.")
      }
    }
  }
}
</script>

<style>

</style>