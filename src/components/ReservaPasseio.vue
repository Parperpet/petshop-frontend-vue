<template>
  <div>
    <MenuCliente :nomeCliente="reservaPasseio.cliente.nome" v-if="reservaPasseio.cliente.nivelAcesso == 'Cliente'"/>
    <center> 
      <div class="container">
        <br>
        <h1>Reservar Passeio</h1>
        <hr/>        
        <h2>Profissional</h2>
        <div class="row justify-center mt-4">           
          <div class="p-0">         
            <img v-if="reservaPasseio.passeio.usuario.fotoPerfilBase64 != ''" :src="reservaPasseio.passeio.usuario.fotoPerfilBase64" class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          </div>         
          <ul class="text-center ml-4"> 
            <h2>Nome: {{reservaPasseio.passeio.usuario.nome}}</h2>
            <h6>Média das avaliações: {{notaProfissional}}</h6>
            <h6>Email: {{reservaPasseio.passeio.usuario.email}}</h6>
          </ul> 
          <hr class="col-12"> 
       </div>

      <h2>Dados do passeio</h2>
      <form class="w-100">
        <div class="row">                    
          <div class="form-group col-sm-4">
            <label>Bairro</label>
            <input type="nome" class="form-control" v-model="reservaPasseio.passeio.bairro" disabled>
          </div>
          <div class="form-group col-sm-4">
            <label>Cidade</label>
            <input type="email" class="form-control" v-model="reservaPasseio.passeio.cidade" disabled>
          </div>
          <div class="form-group col-sm-4">
            <label>Estado</label>
            <input type="tel" class="form-control" v-model="reservaPasseio.passeio.estado" disabled>
          </div>
        </div>
        <div class="row">            
          <div class="form-group col-sm-4">
            <label>Frequência diária</label>
            <input type="tel" class="form-control" v-model="reservaPasseio.passeio.frequenciaDiaria" disabled>
          </div> 
          <div class="form-group col-sm-4">
            <label>Preço Mensal</label>
            <input type="tel" class="form-control" v-model="reservaPasseio.passeio.precoMensal" disabled>
          </div> 
        </div>
        <hr>  

        <div class="form-check col-sm-12">
          <h2>Dados Pagamento</h2>
        </div>      
        <div class="row mt-5 justify-center">
          <div class="col-2">
            <input class="form-check-input" type="radio" v-model="reservaPasseio.tipoPagamento" value="Cartão de credito">
            <label class="form-check-label" for="inlineRadio1">Cartão de credito</label>
          </div>
          <div class="col-2">
            <input class="form-check-input" type="radio" v-model="reservaPasseio.tipoPagamento" value="Cartão de débito">
            <label class="form-check-label" for="inlineRadio2">Cartão de débito</label>
          </div>
          <div class="col-2">
            <input class="form-check-input" type="radio" v-model="reservaPasseio.tipoPagamento" value="Dinheiro">
            <label class="form-check-label" for="inlineRadio3">Dinheiro</label>
          </div>
        </div>
        <div class="form-check col-sm-12 mt-5 mb-2">          
          <h6><strong>** Pagamento deve ser realizado no local, na hora da entrega do animal. **</strong> </h6>          
        </div>                       
        
        <hr>
          <h2>Dados pet</h2>
        <div class="row">                               
          <div class="form-group col-sm-4">
            <label>Selecione o Pet</label>
            <select class="form-control" @change="mostrarPetSelecionado()" v-model="idPetAux">
              <option v-for="(pet) in pet" :key="pet.idPet" :value="pet.idPet">{{pet.nome}}</option>
            </select>
          </div>            
          <div class="col-7 row ml-5" v-if="petSelecionado != ''">
            <div class="p-0">         
              <img v-if="petSelecionado.fotoPerfilBase64 != 0" :src="petSelecionado.fotoPerfilBase64" class="img-thumbnail" />            
              <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
            </div>         
            <ul class="text-center ml-4"> 
              <h2>{{petSelecionado.nome}}</h2>
              <li>Idade: {{petSelecionado.idade}}</li>
              <li>Especie: {{petSelecionado.especie}}</li> 
              <li>Sexo: {{petSelecionado.sexo}}</li> 
              <li>Cor: {{petSelecionado.cor}}</li>
              <li>Porte: {{petSelecionado.porte}}</li>
              <li>Olhos: {{petSelecionado.olhos}}</li>
            </ul> 
          </div>          
          <hr class="col-12">          
        </div>
      </form>  
        <br>
        <div class="alert-warning right">
          <h2>Valor mensal = {{reservaPasseio.passeio.precoMensal}} </h2>
        </div> 
        <br>
        <button class="btn btn-success btnG" type="submit" @click="reservar">Reservar passeio</button>
      </div>
    </center>
    <br><br><br>

    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import MenuCliente from '@/components/MenuCliente';
import ApiReservaPasseio from '@/services/ApiReservaPasseio.js';
import ApiPasseio from '@/services/ApiPasseio.js';
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiPet from '@/services/ApiPet.js';

export default {
  name: "ReservaPasseio",
  components:{
    Footer,
    MenuCliente
  },

  data(){
    return{
      reservaPasseio:{
        idReservaPasseio: "",
        passeio: "",
        cliente: "",
        pet: "", 
        profissional:"",
        tipoPagamento: ""       
      },      
      pet: [],
      petSelecionado:"",
      idPetAux:"",
      notaProfissional: "Sem avaliações"
    }    
  },

  mounted(){
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.reservaPasseio.cliente = resp.data;      
    })

    ApiPasseio.retornaPorId(this.$route.params.idPasseio)
    .then(resp => {          
      this.reservaPasseio.passeio = resp.data; 
      this.reservaPasseio.profissional = resp.data.usuario 
      
      if (this.reservaPasseio.passeio.usuario.notaProfissional != null) {
        this.notaProfissional = this.reservaPasseio.passeio.usuario.notaProfissional
      }
    })    

    ApiPet.retornaMeusPets(this.$route.params.idUsuario)
    .then(resp => {          
      this.pet = resp.data;                 
    })
    .catch(this.pet = '')
    
  },

  methods:{
    reservar(){
      this.reservaPasseio.pet = this.petSelecionado      

      ApiReservaPasseio.gravarReservaPasseio(this.reservaPasseio)
      .then(() => {          
        alert("Reserva realizada com sucesso.")                   
      })
      .catch(e => alert(e.response.data.mensagem))
    },

    mostrarPetSelecionado(){     
      this.pet.forEach(p =>{
        if (p.idPet == this.idPetAux) {
          this.petSelecionado = p          
        }
      })      
    }
  }
}
</script>

<style>

</style>