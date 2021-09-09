<template>
  <div>    
    <MenuAdm :nomeAdm="usuario.nome" v-if="usuario.nivelAcesso == 'Administrador'"/>    
    <div class="container">
      <div class="row justify-center">
        <h2 class="mt-3 mb-2">Gerenciar Profissionais</h2>
      </div>      
      <div v-if="this.profissionais != ''">
        <hr>
        <div class="row" v-for="(profissional) in profissionais" :key="profissional.idUsuario">        
          <div class="col-4 p-0">         
            <img v-if="profissional.fotoPerfilBase64 != 0" :src="profissional.fotoPerfilBase64" class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          </div>            
          <ul class="col-4"> 
            <li class="mb-2"><b>{{profissional.nome}}</b></li>
            <li>Nome: {{profissional.nome}}</li>
            <li>Email: {{profissional.email}}</li> 
            <li>CPF: {{profissional.cpf}}</li>
            <li>Telefone: {{profissional.telefone}}</li>
            <li>
              <label class="mr-3 mb-0">Cadastra hospedagem: </label>
              <input type="checkbox" v-model="profissional.cadastraHospedagem" disabled>
            </li>
            <li>  
              <label class="mr-3 mb-0">Cadastra adoção: </label>
              <input type="checkbox" v-model="profissional.cadastraAdocao" disabled>
            </li>
            <li>
              <label class="mr-3 mb-0">Cadastra Passeio: </label>
              <input type="checkbox" v-model="profissional.cadastraPasseio" disabled>
            </li>  
          </ul>
          <div class="col-sm-4 justify-flex-end">
            <button v-if="profissional.aprovado != true" type="button" class="btn btn-success mr-3" @click="aprovarProfissional(profissional)">Aprovar cadastro</button>  
            <button type="button" class="btn btn-warning mr-3" @click="editarProfissional(profissional.idUsuario)">Editar</button>  
            <button type="button" class="btn btn-danger" @click="deletarProfissional(profissional.idUsuario)">Deletar</button>
          </div>
          <hr class="col-12">          
        </div>        
      </div>
      <div class="row mt-3" v-if="this.profissionais == ''">
        <div class="naoTemos w-100 justify-center">
          <h4 class="center">Ainda não tem nenhum profissional cadastrado.</h4>
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

export default {
  name: "GerenciarProfissionais",
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
      profissionais: []
      
    }
  },

  mounted(){  
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data

      this.profissionais = ''

      ApiUsuario.retornaProfissionais() 
      .then(resp1 =>{
        this.profissionais = resp1.data
      })
      .catch(this.profissionais = '')
    })
  },

  methods:{
    aprovarProfissional(profissional){
      if (confirm("Tem certeza que deseja aprovar o cadastro?") == true) {
        profissional.aprovado = true

        ApiUsuario.alterarUsuario(profissional.idUsuario, profissional) 
        .then(() =>{
          alert("Profisional aprovado com sucesso.")
        })
        .catch(e => alert(e.response.data.mensagem))
      }
    },

    editarProfissional(idProfissional){
      this.$router.push({path: `/editarProfissional/${this.$route.params.idUsuario}/${idProfissional}`});
    },

    deletarProfissional(idUsuario){
      if (confirm("Tem certeza que deseja excluir o profissional?") == true) {
        ApiUsuario.deletarUsuario(idUsuario) 
        .then(() =>{
          alert("Exclusão realizada com sucesso.")
          window.location.reload();
        })
        .catch("Não é possível excluir o profissional, pois o mesmo está vinculado a uma hospedagem ou passeio.")
      }
    }
  }
}
</script>

<style>

</style>