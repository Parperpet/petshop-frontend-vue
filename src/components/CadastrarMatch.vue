<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <div class="container text-center">
      <h2 class="mt-4 mb-4">Dados para Match</h2>
      <form>   
        <div class="row">           
          <div class="form-group col-sm-4">
            <label>Idade</label>
            <select class="form-control" v-model="preferenciaPet.idade">
              <option>Filhote</option>
              <option>Até 1 ano</option>
              <option>Até 3 anos</option>
              <option>até 5 anos</option>
              <option>Mais de 5 anos</option>
            </select>
          </div>        
          <div class="form-group col-sm-4">
            <label>Especie</label>
            <select class="form-control" v-model="preferenciaPet.especie">
              <option>Cachorro</option>
              <option>Gato</option>
              <option>Pássaros</option>
              <option>Répteis</option>
              <option>Outro</option>
            </select>
          </div>
          <div class="form-group col-sm-4">
            <label>Cor</label>
            <select class="form-control" v-model="preferenciaPet.cor">
              <option>Preto</option>
              <option>Branco</option>
              <option>Amarelo</option>
              <option>Malhado predominante branco</option>
              <option>Malhado predominante preto</option>
              <option>Malhado predominante marrom</option>
              <option>Malhado predominante amarelo</option>             
            </select>
          </div>  
          <div class="form-group col-sm-4">
            <label >Olhos</label>
            <select class="form-control" v-model="preferenciaPet.olhos">
              <option>Marrom</option>
              <option>Preto</option>
              <option>Azul</option>
              <option>Verde</option>
              <option>Amarelo</option>          
            </select>
          </div> 
          <div class="form-group col-sm-4">
            <label >Porte</label>
            <select class="form-control" v-model="preferenciaPet.porte">
              <option>Pequeno</option>
              <option>Medio</option>
              <option>Grande</option>             
            </select>
          </div>
          <div class="form-group col-sm-4">
            <label >Custo Mensal</label>
            <select class="form-control" v-model="preferenciaPet.custoMensal">
              <option>Até R$50</option>
              <option>Até R$100</option>
              <option>Até R$200</option>
              <option>Até R$300</option>      
            </select>
          </div>
        </div>               
      </form>
    </div>
    <div class="row justify-content-center">
      <button class="btn btn-warning mt-2 mb-5" @click="cadastrarPreferenciaPet">Cadastrar Match</button> 
    </div>    
    <Footer />
  </div>
</template>

<script>
import MenuCliente from "@/components/MenuCliente"
import Footer from '@/components/Footer';
import ApiUsuario from '@/services/ApiUsuario.js';
import ApiPreferenciaPet from '@/services/ApiPreferenciaPet.js';

export default {
  name: "CadastrarMatch",
  components:{
    MenuCliente,    
    Footer
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
      preferenciaPet:{
        idPreferenciaPet: "",
        usuario:{
          idUsuario: "",
        },
        idade: "",
        especie: "",
        cor: "",
        porte: "",
        olhos: "",
        custoMensal: "",
        necessitaPasseio: "",
        necessitaCompanhia: "",
      }
    }
  },

  mounted(){
    ApiUsuario.retornaPorId(this.$route.params.idUsuario)
    .then(resp => {          
      this.usuario = resp.data;                   
    })
    .catch(e => alert(e.response.data.mensagem))
  },

  methods:{
    cadastrarPreferenciaPet(){
      this.preferenciaPet.usuario = this.usuario
      ApiPreferenciaPet.gravarPreferenciaPet(this.preferenciaPet)
      .then(() =>{
        alert("Match cadastrado com sucesso!")
      })
      .catch(e => alert(e.response.data.mensagem));   
    }
  }
}
</script>

<style>

</style>