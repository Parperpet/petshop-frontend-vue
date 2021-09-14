<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <Menu v-if="usuario.nivelAcesso == ''"/>
    <div class="alert-warning">      
      <img class="d-block w-100" src="@/assets/passeio.jpg" width="100%">
      <br><br>
      <div class="w-100">
        <div class="form-row ml-4">
          <div class="col-sm-2">
            <label>Bairro</label>
            <input type="text" class="form-control" v-model="passeioParemetros.zip">
          </div>
          <div class="col-sm-2">
            <label>Cidade</label>
            <input type="text" class="form-control" v-model="passeioParemetros.cidade"> 
          </div>
          <div class="col-sm-1">
            <label>Estado</label>
            <select class="form-control" v-model="passeioParemetros.estado">
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
          <div class="form-group col-sm-2">
            <label>Frequência diária</label>
            <select class="form-control"  v-model="passeioParemetros.frequenciaDiaria">              
              <option>1 vez</option>
              <option>2 vezes</option>
              <option>3 vezes</option>
            </select>
          </div> 
          <div class="form-group col-sm-2">
            <label>Preço Mensal</label>
            <select class="form-control" v-model="passeioParemetros.precoMensal">              
              <option>R$ 100</option>
              <option>R$ 120</option>
              <option>R$ 150</option>
              <option>R$ 200</option>
              <option>R$ 220</option>
              <option>R$ 250</option>
              <option>Acima de $300</option>      
            </select>
          </div>
          <div class="m-center">
            <button class="btn btn-warning ml-2 h-max mt-3" @click="retornaComParametros">Encontrar passeio</button>
          </div>             
        </div>  
      </div>
      <br>
    </div>
    <br>
    <center v-if="passeio != ''">
      <h1>Passeios</h1>
      <br><br>
      <div class="container">    
        <div class="row">
          <div class="col-sm-4" v-for="(passeio) in passeio" :key="passeio.idPasseio">
            <img v-if="passeio.usuario.fotoPerfilBase64 != 0" :src="passeio.usuario.fotoPerfilBase64"  class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
            <ul class="mt-3">
              <li><b>Nome do Profisional: </b>{{passeio.usuario.nome}}</li>
              <li v-if="passeio.usuario.notaProfissional != null"><b>Avaliação do Profisional: </b>{{passeio.usuario.notaProfissional}}</li>
              <li v-else><b>Avaliação do Profisional: </b>Sem avaliações</li>
              <li><b>Bairro: </b>{{passeio.bairro}}</li>
              <li><b>Cidade: </b>{{passeio.cidade}}</li> 
              <li><b>Estado: </b>{{passeio.estado}}</li> 
              <li><b>Frequencia diária: </b>{{passeio.frequenciaDiaria}}</li>  
              <li><b>Preço mensal: </b>{{passeio.precoMensal}}</li>               
            </ul>
            <button type="button" class="btn btn-success" @click="contratar(passeio.idPasseio)">Contratar</button>
            <hr class="col-12 ">
          </div>          
        </div>          
      </div>
    </center>
    <div v-else-if="naoEncontrado" class="naoTemos justify-center ml-5 mr-5 pl-5 pr-5">
      <h4 class="center">Desculpe, no momento não temos nenhum passeio disponível de acordo com os filtros solicitados.</h4>
    </div>
    <br><br>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import Menu from '@/components/Menu';
import MenuCliente from "@/components/MenuCliente"
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiPasseio from '@/services/ApiPasseio.js';

export default {
  name: "IndexPasseadores",
  components:{
    Footer,
    Menu,
    MenuCliente
  },
  data(){
    return{
      usuario:{
        nivelAcesso: "",
        nome: "",
        email: "",
        senha: "",
        cpf: "",        
        Telefone: "",
        fotoPerfil: ""        
      },
      passeio:[{
        idpasseio: "",
        idUsuario: "",  
        bairro: "",
        cidade: "",
        estado: "",        
        frequenciaDiaria: "",
        precoMensal: ""
      }],
      passeioParemetros:{
        bairro: "",
        cidade: "",
        estado: "",        
        frequenciaDiaria: "",
        precoMensal: ""
      },
      naoEncontrado: false
    }
  },

  mounted(){
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data;                               
    })  
    this.passeio = ''
  },

  methods:{
    retornaComParametros(){
      ApiPasseio.retornaComParametros(this.passeioParemetros)
      .then(resp => {          
        this.passeio = resp.data;                         
      })
      .catch(this.passeio = '', this.naoEncontrado = true)
    },

    contratar(idPasseio){
      if (!this.verificaUsuarioLogado()){
        return this.$router.push({path: `/login/`});        
      }
      
      this.$router.push({path: `/reservaPasseio/${this.$route.params.idUsuario}/${idPasseio}`});
    },

    verificaUsuarioLogado(){
      return !this.usuario.idUsuario == ''
    }
  }
}
</script>

<style>

</style>