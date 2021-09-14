import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/components/Index.vue';
import Login from '@/components/Login.vue';
import CadastroProfissional from '@/components/CadastroProfissional.vue';
import CadastroCliente from '@/components/CadastroCliente.vue';
import Perfil from '@/components/Perfil.vue';
import CadastroPets from '@/components/CadastroPets.vue';
import Contato from '@/components/Contato.vue';
import PetsDisponiveisParaAdocao from '@/components/PetsDisponiveisParaAdocao.vue';
import PetsCompativelParaUsuario from '@/components/PetsCompativelParaUsuario.vue';
import PerfilPet from '@/components/PerfilPet.vue';
import Mensagem from '@/components/Mensagem.vue';
import CaixaDeEntrada from '@/components/CaixaDeEntrada.vue';
import IndexHospedagem from '@/components/IndexHospedagem.vue';
import ReservaHospedagem from '@/components/ReservaHospedagem.vue';
import MeusPets from '@/components/MeusPets.vue';
import CadastroHospedagem from '@/components/CadastroHospedagem.vue';
import CadastroPasseio from '@/components/CadastroPasseio.vue';
import MeusClientes from '@/components/MeusClientes.vue';
import IndexPasseadores from '@/components/IndexPasseadores.vue';
import EditarPet from '@/components/EditarPet.vue';
import CadastrarMatch from '@/components/CadastrarMatch.vue';
import GerenciarHospedagens from '@/components/GerenciarHospedagens.vue';
import EditarHospedagem from '@/components/EditarHospedagem.vue';
import GerenciarProfissionais from '@/components/GerenciarProfissionais.vue';
import EditarProfissional from '@/components/EditarProfissional.vue';
import CaixaDeEntradaAdm from '@/components/CaixaDeEntradaAdm.vue';
import MeusPasseios from '@/components/MeusPasseios.vue';
import EditarPasseio from '@/components/EditarPasseio.vue';
import ReservaPasseio from '@/components/ReservaPasseio.vue';
import PasseiosContratados from '@/components/PasseiosContratados.vue';
import ComentariosAdm from '@/components/ComentariosAdm.vue';
import GerenciarComentarios from '@/components/GerenciarComentarios.vue';
import PaginaInicial from '@/components/PaginaInicial.vue';
import PerfilsCompativeisComPet from '@/components/PerfilsCompativeisComPet.vue';
import MensagemParaPerfilCompativelComPet from '@/components/MensagemParaPerfilCompativelComPet.vue';

Vue.use(VueRouter);

export default new VueRouter({
  base: '/',
  mode: 'history',
  routes: [
    { path: '/', component: Index },
    { path: '/index/:idUsuario/', component: Index },
    { path: '/login/', component: Login },
    { path: '/cadastroProfissional/', component: CadastroProfissional },
    { path: '/cadastroCliente/', component: CadastroCliente },
    { path: '/perfil/:idUsuario/', component: Perfil },
    { path: '/cadastroPets/:idUsuario/', component: CadastroPets },
    { path: '/contato/:idUsuario/', component: Contato },
    { path: '/petsDisponiveisParaAdocao/:idUsuario/', component: PetsDisponiveisParaAdocao },
    { path: '/petsCompativelParaUsuario/:idUsuario/', component: PetsCompativelParaUsuario },
    { path: '/perfilPet/:idUsuario/:idPet/', component: PerfilPet },
    { path: '/mensagem/:idUsuario/:idPet/', component: Mensagem },
    { path: '/caixaDeEntrada/:idUsuario/', component: CaixaDeEntrada },
    { path: '/indexHospedagem/:idUsuario/', component: IndexHospedagem },
    { path: '/reservaHospedagem/:idUsuario/:idHospedagem', component: ReservaHospedagem },
    { path: '/meusPets/:idUsuario/', component: MeusPets },
    { path: '/cadastroHospedagem/:idUsuario/', component: CadastroHospedagem },
    { path: '/cadastroPasseio/:idUsuario/', component: CadastroPasseio },
    { path: '/meusClientes/:idUsuario/', component: MeusClientes },
    { path: '/indexPasseadores/:idUsuario/', component: IndexPasseadores },
    { path: '/editarPet/:idUsuario/:idPet/', component: EditarPet },
    { path: '/cadastrarMatch/:idUsuario/', component: CadastrarMatch },
    { path: '/gerenciarHospedagens/:idUsuario/', component: GerenciarHospedagens },
    { path: '/editarHospedagem/:idUsuario/:idHospedagem', component: EditarHospedagem },
    { path: '/gerenciarProfissionais/:idUsuario/', component: GerenciarProfissionais },
    { path: '/editarProfissional/:idUsuario/:idProfissional', component: EditarProfissional },
    { path: '/caixaDeEntradaAdm/:idUsuario/', component: CaixaDeEntradaAdm },
    { path: '/meusPasseios/:idUsuario/', component: MeusPasseios },
    { path: '/editarPasseio/:idUsuario/:idPasseio', component: EditarPasseio },
    { path: '/reservaPasseio/:idUsuario/:idPasseio', component: ReservaPasseio },
    { path: '/PasseiosContratados/:idUsuario', component: PasseiosContratados },
    { path: '/comentariosAdm/:idUsuario', component: ComentariosAdm },
    { path: '/gerenciarComentarios/:idUsuario', component: GerenciarComentarios },
    { path: '/paginaInicial/:idUsuario', component: PaginaInicial },
    { path: '/perfilsCompativeisComPet/:idUsuario/:idPet', component: PerfilsCompativeisComPet },
    { path: '/mensagemParaPerfilCompativelComPet/:idUsuario/:idPerfilCompativel/:idPet', component: MensagemParaPerfilCompativelComPet },
  ]
});