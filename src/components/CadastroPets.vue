<template>
  <div>
    <MenuCliente :nomeCliente="usuario.nome" v-if="usuario.nivelAcesso == 'Cliente'"/>
    <MenuProfissional :nomeProfissional="usuario.nome" v-if="usuario.nivelAcesso == 'Profissional'"/>
    <center> 
      <div class="container">
        <h1 class="mt-3">Cadastro Pet para adoção</h1><br>
        <div class="row">
            <form class="w-100">
              <div class="row">
                <div class="form-group col-sm-4">
                  <label >Nome Animal</label>
                  <input type="text" class="form-control" placeholder="Pluto" v-model="pet.nome">
                </div>
                <div class="form-group col-sm-4">
                  <label>Idade</label>
                  <select class="form-control" v-model="pet.idade">
                    <option>Filhote</option>
                    <option>Até 1 ano</option>
                    <option>Até 3 anos</option>
                    <option>até 5 anos</option>
                    <option>Mais de 5 anos</option>
                  </select>
                </div>    
                <div class="form-group col-sm-4">
                  <label>Especie</label>
                  <select class="form-control" v-model="pet.especie">
                    <option>Cachorro</option>
                    <option>Gato</option>
                    <option>Pássaros</option>
                    <option>Répteis</option>
                    <option>Outro</option>
                  </select>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-sm-4">
                  <label>Cor</label>
                  <select class="form-control" v-model="pet.cor">
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
                  <select class="form-control" v-model="pet.olhos">
                    <option>Marrom</option>
                    <option>Preto</option>
                    <option>Azul</option>
                    <option>Verde</option>
                    <option>Amarelo</option>          
                  </select>
                </div>       
                
                <div class="form-group col-sm-4">
                  <label >Porte</label>
                  <select class="form-control" v-model="pet.porte">
                    <option>Pequeno</option>
                    <option>Medio</option>
                    <option>Grande</option>             
                  </select>
                </div>
              </div>

              <div class="row">  
                <div class="form-group col-sm-4">
                  <label >Custo Mensal</label>
                  <select class="form-control" v-model="pet.custoMensal">
                    <option>Até R$50</option>
                    <option>Até R$100</option>
                    <option>Até R$200</option>
                    <option>Até R$300</option>      
                  </select>
                </div>
                <div class="form-group col-sm-4">
                  <label>Sexo</label>
                  <select class="form-control" v-model="pet.sexo">
                    <option>Macho</option>
                    <option>Fêmea</option>
                  </select>
                </div>
                <div class="form-group col-sm-4 flexbottom">
                  <div class="flex1">
                    <label>Foto do Pet</label>
                    <input type="file" name="file" multiple ref="files">
                  </div>                  
                </div>                               
              </div>
              <div class="row">
                <div class="form-group col-sm-4">
                  <label>Descrição</label>
                  <textarea class="form-control" rows="2" v-model="pet.descricao"></textarea>
                </div>
                <div class="form-check col-3 mt-5">
                  <input class="form-check-input" type="checkbox" v-model="pet.disponivelParaAdocao">
                  <label class="form-check-label" >Disponível para adoção</label>
                </div>
                <div class="form-check col-sm-2 mt-5">
                  <input class="form-check-input" type="checkbox" v-model="pet.necessitaPasseio">
                  <label class="form-check-label">Necessita Passeio</label>
                </div>
                <div class="form-check col-sm-2 mt-5 ml-5">
                  <input class="form-check-input" type="checkbox" v-model="pet.necessitaCompanhia">
                  <label class="form-check-label">Necessita Companhia</label>
                </div>                 
              </div>   
            </form>        
        </div>
        <br>
        <button class="btn btn-warning" type="submit" @click="cadastrar">Cadastrar Pet</button>
      </div>
    </center>
    <br><br>
    <Footer />
  </div>
  
</template>

<script>
import MenuCliente from "@/components/MenuCliente"
import MenuProfissional from "@/components/MenuProfissional"
import Footer from '@/components/Footer'
import ApiPet from '@/services/ApiPet.js'
import ApiUsuario from '@/services/ApiUsuario.js';

export default {  
  name: "CadastroPets",
  components:{
    MenuCliente,
    MenuProfissional,
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
        disponivelParaAdocao: "",
        sexo: ""
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
    cadastrar(){
      this.pet.dono.idUsuario = this.usuario.idUsuario; 

      if (this.$refs.files.files.length != 0){
        var reader = new FileReader()
        reader.readAsDataURL(this.$refs.files.files[0])
        reader.onload = () => {
          this.pet.fotoPerfilBase64 = reader.result

          ApiPet.gravarPet(this.pet)
          .then(() =>{
            alert("Pet cadastrado com sucesso")
          })
          .catch(e => alert(e.response.data.mensagem))
        }       

      } else {
        ApiPet.gravarPet(this.pet)
        .then(() =>{
          alert("Pet cadastrado com sucesso")
        })
        .catch(e => alert(e.response.data.mensagem))
      }

    }
  }
}
</script>

<style>

</style>