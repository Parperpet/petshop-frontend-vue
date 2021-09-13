<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <Menu v-if="usuario.nivelAcesso == ''"/>
    <div class="alert-warning">
      <img class="d-block w-100" src="@/assets/hosp.png" width="100%">
      <br><br>
      <div class="w-100">
        <div class="form-row ml-4">
          <div class="row w-100">
            <div class="form-group col-3">
              <label>Cidade</label>
              <input type="text" class="form-control" placeholder="Rio de Janeiro" v-model="hospedagemParemetros.cidade">
            </div>
            <div class="form-group col-3">
              <label>Tipo</label>
              <select class="form-control" v-model="hospedagemParemetros.tipo">
                <option>Casa</option>
                <option>Apartamento</option>
                <option>Sítio</option>
              </select>
            </div> 
            <div class="form-group col-3">
              <label>Especie que aceita</label>
              <select class="form-control" v-model="hospedagemParemetros.especieAceita">
                <option>Cachorro</option>
                <option>Gato</option>
                <option>Pássaros</option>
                <option>Répteis</option>
                <option>todas</option>
              </select>
            </div>                              
          </div>

          <div class="row w-100">
            <div class="form-group col-3">
              <label>Porte que aceita</label>
              <select class="form-control" v-model="hospedagemParemetros.porteAceito">
                <option>Pequeno</option>
                <option>Medio</option>
                <option>Grande</option>
                <option>Todos</option>              
              </select>
            </div>
            
            <div class="form-group col-3">
              <label>Preço da Diaria</label>
              <select class="form-control" v-model="hospedagemParemetros.precoDiaria">
                <option>R$ 15</option>
                <option>R$ 20</option>
                <option>R$ 25</option>
                <option>R$ 50</option>
                <option>R$ 100</option>
                <option>R$ 120</option>
                <option>R$ 150</option>
                <option>R$ 200</option>
                <option>R$ 220</option>
                <option>R$ 250</option>
                <option>Acima de $300</option>      
              </select>
            </div>    
            <button class="btn btn-warning ml-2 h-max mt-4" @click="retornaComParametros">Encontrar Hospedagem</button>            
          </div> 

        </div>  
      </div>
      <br><br>
    </div>
    <hr>
    <center v-if="!hospedagemFiltrada">
      <h1>Hospedagem para pets com amor</h1>
      <br><br>
      <div class="container">    
        <div class="row">
          <div class="col-sm-4">
            <img src="@/assets/01.png"  class="img-thumbnail" />
            <h2>Encontre a hospedagem ideal</h2>
            O hotelzinho que seu pet merece é um lar: com um herói que cuida com amor e mantém a rotina dele como em casa.
          </div>
          <div class="col-sm-4">
            <img src="@/assets/02.svg"  class="img-thumbnail" />
            <h2>Reserve pelo site</h2>
            Ao fechar a reserva pela Parperpet, você faz um pagamento seguro e também conta com o suporte da nossa Garantia Veterinária.
          </div>
          <div class="col-sm-4">
            <img src="@/assets/03.svg"  class="img-thumbnail" />
            <h2>Mate a saudade do seu pet</h2>
            Seu anfitrião vai enviar fotos e vídeos
            do pet para você acompanhar a hospedagem e não se preocupar        </div>
        </div>
      </div>
    </center>    
    <hr>
    <div class="justify-center">
      <h1>Hospedagens em destaque</h1>
    </div>   
    <br><br>
    <div class="container-fluid">  
      <div class="row" > 
        <div class="col" v-for="hospedagem in limiteHospedagem" :key="hospedagem.idHospedagem">
          <div class="row justify-center">
            <div class="p-0">         
              <img v-if="hospedagem.fotoPerfilBase64 != 0" :src="hospedagem.fotoPerfilBase64" class="img-thumbnail" />            
              <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
            </div>         
            <ul class="text-center ml-4"> 
              <h2>{{hospedagem.nome}}</h2>
              <li>Tipo: {{hospedagem.tipo}}</li>
              <li>Endereço: {{hospedagem.endereco}}</li> 
              <li>Bairro: {{hospedagem.bairro}}</li>
              <li>Cidade: {{hospedagem.cidade}}</li>
              <li>Estado: {{hospedagem.estado}}</li>
              <li>Especie que aceita: {{hospedagem.especieAceita}}</li>
              <li>Porte que aceita: {{hospedagem.porteAceito}}</li>
              <li>Preço da diaria: {{hospedagem.precoDiaria}}</li>
              <li>Descrição: {{hospedagem.descricao}}</li>
              <button class="btn btn-success mt-3" @click="reservarHospedagem(hospedagem.idHospedagem)">Reservar hospedagem</button>
            </ul> 
          </div> 
          <hr class="col-12"> 
        </div>              
      </div>
      

      <div class="row" v-if="this.hospedagem == ''">
        <div class="naoTemos w-100 ml-5 mr-5 justify-center">
          <h4>Desculpe, no momento não temos nenhuma hospedagem disponível.</h4>
        </div>          
      </div>
    </div>
    <br><br><br>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import Menu from '@/components/Menu';
import MenuCliente from "@/components/MenuCliente"
import ApiHospedagem from '@/services/ApiHospedagem.js';
import ApiUsuario from '@/services/ApiUsuario.js';

export default {
  name: "IndexHospedagem",
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
      hospedagem:[{
        idHospedagem: "",
        idUsuario: "",
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
      }],
      hospedagemParemetros:{
        cidade: "",
        tipo: "", 
        especieAceita: "",
        porteAceito: "",
        precoDiaria: "",
      },
      valorAux: "",
      hospedagemFiltrada: false,      
    }
  },

  mounted(){
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data;                   
    })

    ApiHospedagem.retornaTodos()
    .then(resp => {          
      this.hospedagem = resp.data;                 
    })
    .catch(this.hospedagem = '')
  },

  methods:{
    retornaComParametros(){     
      ApiHospedagem.retornaComParametros(this.hospedagemParemetros)
      .then(resp => {          
        this.hospedagem = resp.data;
        this.hospedagemFiltrada = true                   
      })
      .catch(this.hospedagem = '', this.hospedagemFiltrada = true)
        
    },      

    reservarHospedagem(idHospedagem){
      if (this.$route.params.idUsuario != 0) {
        this.$router.push({path: `/reservaHospedagem/${this.$route.params.idUsuario}/${idHospedagem}`});  

      } else {
        this.$router.push({path: `/login/`});  
      }
    },

  },

  computed:{
    limiteHospedagem(){
      let qtd = [];

      if (this.hospedagem.lenght > 3) {
        for (let i = 0; i < 3; i++) {
          qtd.push(this.hospedagem[i])          
        }        
      } else {
        qtd = this.hospedagem
      }
      
      return qtd;
    }
  }
}
</script>

<style>

</style>