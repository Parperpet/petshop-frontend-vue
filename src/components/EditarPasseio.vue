<template>
  <div>
    <MenuProfissional :nomeProfissional="usuario.nome" v-if="usuario.nivelAcesso == 'Profissional'"/>
    <center> 
      <div class="container">
        <br>
        <h1>Editar Passeio</h1><br>    
          <form>
            <div class="row">
              <div class="form-group col-sm-4">
                <label>Bairro</label>
                <input type="nome" class="form-control" v-model="passeio.bairro">
              </div> 
              <div class="form-group col-sm-4">
                <label>Cidade</label>
                <input type="nome" class="form-control" v-model="passeio.cidade">
              </div>
              <div class="form-group col-sm-4">
                <label>Estado</label>
                <select class="form-control" v-model="passeio.estado">										
                  <option>AC</option>
                  <option>AL</option>
                  <option>AP</option>
                  <option>AM</option>
                  <option>BA</option>
                  <option>CE</option>
                  <option>DF</option>
                  <option>ES</option>
                  <option>GO</option>
                  <option>MA</option>
                  <option>MT</option>
                  <option>MS</option>
                  <option>MG</option>
                  <option>PA</option>
                  <option>PB</option>
                  <option>PR</option>
                  <option>PE</option>
                  <option>PI</option>
                  <option>RJ</option>
                  <option>RN</option>
                  <option>RS</option>
                  <option>RO</option>
                  <option>RR</option>
                  <option>SC</option>
                  <option>SP</option>
                  <option>SE</option>
                  <option>TO</option>
                </select>
              </div>       
              
              <div class="form-group col-sm-4">
                <label>Frequência diária</label>
                <select class="form-control" v-model="passeio.frequenciaDiaria">
                  <option>1 vez</option>
                  <option>2 vezes</option>
                  <option>3 vezes</option>         
                </select>
              </div>
              
              <div class="form-group col-sm-4">
                <label>Preço Mensal</label>
                <select class="form-control" v-model="passeio.precoMensal">              
                  <option>R$ 100</option>
                  <option>R$ 120</option>
                  <option>R$ 150</option>
                  <option>R$ 200</option>
                  <option>R$ 220</option>
                  <option>R$ 250</option>
                  <option>Acima de $300</option>      
                </select>
              </div>
            </div>               
          </form>
        <button class="btn btn-warning" @click="editarPasseio">Editar passeio</button>
      </div>
    </center>
    <br>
    <Footer />
  </div>  
</template>

<script>
import MenuProfissional from "@/components/MenuProfissional";
import ApiUsuario from '@/services/ApiUsuario.js';
import Footer from '@/components/Footer';
import ApiPasseio from '@/services/ApiPasseio.js';

export default {
  name: "EditarPasseio",
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
        fotoPerfil: ""        
      },
      passeio:{
        idPasseio: "",
        usuario: "",
        bairro: "",
        cidade: "",
        estado: "",        
        frequenciaDiaria: "",
        precoMensal: ""
      }      
    }
  },

  mounted(){  
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data      
    })

    ApiPasseio.retornaPorId(this.$route.params.idPasseio)
    .then(resp => {          
      this.passeio = resp.data      
    })
  },

  methods:{
    editarPasseio(){
      ApiPasseio.alterarPasseio(this.passeio.idPasseio, this.passeio)
      .then(() => {          
        alert("Passeio alterado com sucesso!")
      })
    }
  }
}
</script>

<style>

</style>