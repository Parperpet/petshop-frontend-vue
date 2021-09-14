<template>
  <div>    
    <MenuProfissional :nomeProfissional="usuario.nome" v-if="usuario.nivelAcesso == 'Profissional'"/>   
    <div class="container p-0">
      <div class="row justify-center">
        <h2 class="mt-3 mb-2">Meus passeios</h2>
      </div> 
      <hr>     
      <div class="row w-100 ml-0" v-if="this.passeio != ''">
        <div class="col-4 p-0 mb-5 text-center" v-for="(passeio) in passeio" :key="passeio.idPasseio">
          <ul> 
            <li><b>Bairro:</b> {{passeio.bairro}}</li>
            <li><b>Cidade:</b> {{passeio.cidade}}</li>
            <li><b>Estado:</b> {{passeio.estado}}</li>
            <li><b>Frequencia diária:</b> {{passeio.frequenciaDiaria}}</li>
            <li><b>Preço da diaria:</b> {{passeio.precoMensal}}</li>
          </ul>
          <div class="row justify-center">
            <button type="button" class="btn btn-success mr-3" @click="editarPasseio(passeio.idPasseio)">Editar</button>  
            <button type="button" class="btn btn-danger" @click="deletarPasseio(passeio.idPasseio)">Deletar</button>
          </div>                    
        </div>
      </div>
      <div class="row mt-3" v-if="this.passeio == ''">
        <div class="naoTemos w-100 justify-center">
          <h4 class="center">Ainda não tem nenhum passeio cadastrado.</h4>
        </div>          
      </div>
      <br><br>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiPasseio from '@/services/ApiPasseio.js';
import MenuProfissional from "@/components/MenuProfissional"

export default {
  name: "MeusPasseios",
  components:{
    Footer, 
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
      passeio:[{
        idPasseio: "",
        usuario: "",
        bairro: "",
        cidade: "",
        estado: "",        
        frequenciaDiaria: "",
        precoMensal: ""
      }]
    }
  },

  mounted(){  
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data

      this.passeio = ''
      
      ApiPasseio.retornaPorUsuario(this.usuario.idUsuario) 
      .then(resp1 =>{
        this.passeio = resp1.data
      })
      .catch(this.passeio = '')
      
    })
  },

  methods:{
    editarPasseio(idPasseio){
      this.$router.push({path: `/editarPasseio/${this.$route.params.idUsuario}/${idPasseio}`});
    },

    deletarPasseio(idPasseio){
      if (confirm("Tem certeza que deseja excluir o passeio?") == true) {
        ApiPasseio.deletarPasseio(idPasseio) 
        .then(() =>{
          alert("Exclusão realizada com sucesso.")
          window.location.reload();
        })
        .catch("Não é possível excluir o passeio, pois existem reservas vinculadas.")
      }
    }
  }
}
</script>

<style>

</style>