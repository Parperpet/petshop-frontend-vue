<template>
  <div>
    <MenuCliente :nomeCliente="reservaHospedagem.usuario.nome" v-if="reservaHospedagem.usuario.nivelAcesso == 'Cliente'"/>
    <center> 
      <div class="container">
        <br>
        <h1>Reservar Hospedagem</h1>
        <hr/>        
        <div class="row justify-center"> 
          <div class="p-0">         
            <img v-if="reservaHospedagem.hospedagem.fotoPerfilBase64 != 0" :src="reservaHospedagem.hospedagem.fotoPerfilBase64" class="img-thumbnail" />            
            <img v-else src="@/assets/sem-foto.jpg"  class="img-thumbnail" />
          </div>         
          <ul class="text-center ml-4"> 
            <h2>{{reservaHospedagem.hospedagem.nome}}</h2>
            <li>Tipo: {{reservaHospedagem.hospedagem.tipo}}</li>
            <li>Endereço: {{reservaHospedagem.hospedagem.endereco}}</li> 
            <li>Bairro: {{reservaHospedagem.hospedagem.bairro}}</li>
            <li>Cidade: {{reservaHospedagem.hospedagem.cidade}}</li>
            <li>Estado: {{reservaHospedagem.hospedagem.estado}}</li>
            <li>Especie que aceita: {{reservaHospedagem.hospedagem.especieAceita}}</li>
            <li>Porte que aceita: {{reservaHospedagem.hospedagem.porteAceito}}</li>
            <li>Preço da diaria: {{reservaHospedagem.hospedagem.precoDiaria}}</li>
            <li>Descrição: {{reservaHospedagem.hospedagem.descricao}}</li>
          </ul> 
          <hr class="col-12"> 
       </div>

      <h2>Dados Pessoais</h2>
      <form class="w-100">
        <div class="row">                    
          <div class="form-group col-sm-4">
            <label >Nome </label>
            <input type="nome" class="form-control" v-model="reservaHospedagem.usuario.nome" disabled>
          </div>
          <div class="form-group col-sm-4">
            <label >E-mail </label>
            <input type="email" class="form-control" v-model="reservaHospedagem.usuario.email" disabled>
          </div>
          <div class="form-group col-sm-4">
            <label>CPF</label>
            <input type="tel" class="form-control" v-model="reservaHospedagem.usuario.cpf" disabled>
          </div>
        </div>
        <div class="row">            
          <div class="form-group col-sm-4">
            <label>Telefone</label>
            <input type="tel" class="form-control" v-model="reservaHospedagem.usuario.telefone" disabled>
          </div> 
          <div class="form-group col-sm-4">
            <label>Data Entrada</label>
            <input type="date" class="form-control" v-model="reservaHospedagem.dataEntrada">
          </div>
          <div class="form-group col-sm-4">
            <label>Data Saída</label>
            <input type="date" class="form-control" v-model="reservaHospedagem.dataSaida">
          </div>
        </div>
        <hr>  

        <div class="form-check col-sm-12">
          <h2>Dados Pagamento</h2>
        </div>      
        <div class="row mt-5 justify-center">
          <div class="col-2">
            <input class="form-check-input" type="radio" v-model="reservaHospedagem.tipoPagamento" value="Cartão de credito">
            <label class="form-check-label" for="inlineRadio1">Cartão de credito</label>
          </div>
          <div class="col-2">
            <input class="form-check-input" type="radio" v-model="reservaHospedagem.tipoPagamento" value="Cartão de débito">
            <label class="form-check-label" for="inlineRadio2">Cartão de débito</label>
          </div>
          <div class="col-2">
            <input class="form-check-input" type="radio" v-model="reservaHospedagem.tipoPagamento" value="Dinheiro">
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
          <h2>Valor da diária = {{reservaHospedagem.hospedagem.precoDiaria}} </h2>
        </div> 
        <br>
        <button class="btn btn-success btnG" type="submit" @click="reservar">Reservar hospedagem</button>
      </div>
    </center>
    <br><br><br>

    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import MenuCliente from '@/components/MenuCliente';
import ApiReservaHospedagem from '@/services/ApiReservaHospedagem.js';
import ApiHospedagem from '@/services/ApiHospedagem.js';
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiPet from '@/services/ApiPet.js';

export default {
  name: "ReservaHospedagem",
  components:{
    Footer,
    MenuCliente
  },

  data(){
    return{
      reservaHospedagem:{
        idReservaHospedagem: "",
        usuario:"",
        pet:"",
        hospedagem: "",
        tipoPagamento: "",
        dataEntrada:"",
        dataSaida: ""
      },      
      pet: [],
      petSelecionado:"",
      idPetAux:""
    }    
  },

  mounted(){
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.reservaHospedagem.usuario = resp.data;                   
    })

    ApiHospedagem.retornaPorId(this.$route.params.idHospedagem)
    .then(resp => {          
      this.reservaHospedagem.hospedagem = resp.data;                 
    })    

    ApiPet.retornaMeusPets(this.$route.params.idUsuario)
    .then(resp => {          
      this.pet = resp.data;                 
    })
    .catch(this.pet = '')
  },

  methods:{
    reservar(){
      this.reservaHospedagem.pet = this.petSelecionado

      ApiReservaHospedagem.gravarReservaHospedagem(this.reservaHospedagem)
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