<template>
    <q-page class="q-pa-sm">

        <q-dialog v-model="showTermsDialog" persistent>
            <q-card>
                <q-card-section>
                    <div class="text-body1"><b>TERMO DE USO DO APLICATIVO</b></div>
                </q-card-section>

                <q-separator />

                <q-card-section style="max-height: 50vh" class="scroll text-justify">

                    <div class="q-pa-sm">
                        Última atualização: Novembro 2024<br><br>

                        Este Termo de Uso estabelece as condições para utilização do
                        aplicativo e dos serviços fornecidos. Ao utilizar o aplicativo, você concorda integralmente com
                        os
                        termos aqui descritos. Caso não concorde, não utilize o aplicativo.
                    </div>

                    <div class="q-pa-sm">
                        <b>1. ACEITAÇÃO DOS TERMOS</b><br>
                        <b>1.1.</b> Ao acessar e utilizar este aplicativo, o usuário declara ter lido, compreendido e
                        aceitado os
                        termos de uso aqui descritos, bem como a nossa Política de Privacidade.<br>
                        <b>1.2.</b> O aplicativo é destinado ao uso exclusivamente on-line. Para utilizá-lo, é
                        necessário
                        acesso à
                        internet, sendo de responsabilidade do usuário prover os meios de conexão.<br>
                    </div>

                    <div class="q-pa-sm">
                        <b>2. DESCRIÇÃO DO SERVIÇO</b><br>
                        <b>2.1.</b> O aplicativo SysABA é um serviço que auxilia Profissionais da área da psicologia na
                        coleta das
                        informações de seus pacientes.<br>
                        <b>2.2.</b> O aplicativo é fornecido "como está", podendo sofrer atualizações, alterações ou
                        interrupções a
                        qualquer momento, sem aviso prévio.<br>
                    </div>

                    <div class="q-pa-sm">
                        <b>3. USO DO APLICATIVO</b><br>
                        <b>3.1.</b> O usuário compromete-se a:<br><br>

                        Não usar o aplicativo para atividades ilícitas ou que violem direitos de terceiros;<br><br>
                        Não realizar engenharia reversa ou tentar acessar código-fonte ou dados do aplicativo de forma
                        não
                        autorizada;<br><br>
                        Fornecer informações verídicas e completas ao registrar-se e utilizar o serviço.<br><br>
                        <b>3.2.</b> A utilização do aplicativo deve respeitar as leis vigentes no Brasil e no local onde
                        o
                        usuário
                        se encontra.<br>
                    </div>

                    <div class="q-pa-sm">
                        <b>4. CONTA DO USUÁRIO</b><br>
                        <b>4.1.</b> Para acessar determinadas funcionalidades, o usuário poderá ser solicitado a criar
                        uma
                        conta
                        pessoal.<br>
                        <b>4.2.</b> O usuário é responsável por manter a confidencialidade de sua conta e senha, bem
                        como
                        por todas
                        as atividades realizadas sob sua conta.<br>
                        <b>4.3.</b> Caso perceba qualquer uso não autorizado de sua conta, o usuário deve notificar
                        imediatamente a
                        equipe do aplicativo SysABA.<br>
                    </div>

                    <div class="q-pa-sm">
                        <b>5. LIMITAÇÃO DE RESPONSABILIDADE</b><br>
                        <b>5.1.</b> O aplicativo SysABA não se responsabiliza por danos decorrentes de:<br>

                        Falhas de conexão com a internet;<br>
                        Uso inadequado do aplicativo;<br>
                        Interrupções ou indisponibilidade do serviço.<br>
                        <b>5.2.</b> O aplicativo pode conter links para sites ou serviços de terceiros, pelos quais o
                        aplicativo
                        SysABA não assume qualquer responsabilidade.
                    </div>

                    <div class="q-pa-sm">
                        <b>6. PROPRIEDADE INTELECTUAL</b><br>
                        <b>6.1.</b> Todos os direitos sobre o conteúdo, layout, design, e funcionalidades do aplicativo
                        pertencem a
                        empresa SysABA.<br>
                        <b>6.2.</b> O uso do aplicativo não confere ao usuário qualquer direito sobre propriedade
                        intelectual
                        associada ao serviço.<br>
                    </div>

                    <div class="q-pa-sm">
                        <b>7. ATUALIZAÇÕES DO TERMO DE USO</b><br>
                        <b>7.1.</b> O aplicativo SysABA pode alterar este Termo de Uso a qualquer momento.<br>
                        <b>7.2.</b> Alterações relevantes serão informadas por meio de notificação no próprio aplicativo
                        ou
                        por
                        outros meios razoáveis.<br>
                    </div>
                    <div class="q-pa-sm">
                        <b>8. DISPOSIÇÕES FINAIS</b><br>
                        <b>8.1.</b> Este Termo de Uso é regido pelas leis brasileiras.<br>
                        <b>8.2.</b> Qualquer disputa será resolvida no foro da Comarca de São Paulo/SP, com exclusão de
                        qualquer
                        outro.<br>
                    </div>
                    <div class="q-pa-sm">
                        <b>9. ALTERAÇÃO OU REMOÇÃO DE FUNCIONALIDADES</b><br>
                        <b>9.1.</b> O aplicativo SysABA reserva-se o direito de modificar, suspender ou descontinuar
                        qualquer
                        funcionalidade, recurso ou serviço do aplicativo, a qualquer momento e sem aviso prévio.<br>
                        <b>9.2.</b> Caso funcionalidades relevantes sejam removidas, a SysABA poderá, a seu critério,
                        comunicar os
                        usuários por meio de notificações no aplicativo, e-mail ou outros meios razoáveis.<br>
                        <b>9.3.</b> O usuário concorda que a SysABA não será responsabilizado por quaisquer prejuízos ou
                        danos
                        decorrentes da alteração ou remoção de funcionalidades.<br>
                    </div>

                    <div class="q-pa-sm">
                        Dúvidas e Suporte<br>
                        Caso você tenha qualquer dúvida sobre os Termos de Uso, por favor, entre em contato pelo e-mail
                        sysaba.suporte@gmail.com.<br>
                    </div>

                    <div class="q-pa-sm">
                        Ao continuar a utilizar o o aplicativo SysABA, você declara que leu, entendeu e concorda com
                        este
                        Termo de Uso.
                    </div>

                    <div class="q-pa-sm">
                        SysABA<br>
                        58.024.694/0001-87
                    </div>

                </q-card-section>

                <q-separator />

                <q-checkbox v-model="acceptTerms" label="Li e concordo com os termos" class="q-mt-md q-ml-md" />

                <q-card-actions align="center" class="q-mt-md">
                    <q-btn :disable="!acceptTerms" label="Li e concordo com os termos" color="primary"
                        @click="handleAccept" class="q-mt-md q-mb-md" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-dialog v-model="showUrlDownload">
            <q-card>
                <q-card-section class="q-pa-md">
                    <div class="text-body1">Download do Relatório</div>
                    <!--div class="q-mt-md">
                        <q-input filled v-model="urlDownload" label="URL do Download" readonly dense icon="link" />
                    </div-->
                </q-card-section>

                <q-card-actions class="button-stack">

                    <q-btn label="Baixar PDF" color="primary" @click="downloadFile" class="full-width">
                        <q-icon name="cloud_download" />
                    </q-btn>

                    <q-btn label="Copiar Link" color="secondary" @click="copyLink" class="full-width">
                        <q-icon name="link" />
                    </q-btn>

                    <q-btn flat label="Fechar" @click="showUrlDownload = false" class="full-width" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <title-custom title="Gerar Relatório:" />

        <div class="text-h6 text-teal-7">Preencha o período: <div class="text-overline">
                O período da pesquisa é limitado até 6 meses.</div>
        </div>

        <div class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-md">

            <div class="row q-gutter-md">
                <div class="col">
                    <q-input label="Data de Início" outlined stack-label v-model="form.dataInicio" mask="##/##/####">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form.dataInicio" :locale="{
                                        days: dias,
                                        months: meses,
                                        daysShort: diasAbreviados,
                                        monthsShort: meses,
                                    }" mask="DD/MM/YYYY">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>

                <div class="col">
                    <q-input label="Data de Final" outlined stack-label v-model="form.dataFinal" mask="##/##/####">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form.dataFinal" :locale="{
                                        days: dias,
                                        months: meses,
                                        daysShort: diasAbreviados,
                                        monthsShort: meses,
                                    }" mask="DD/MM/YYYY">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
            </div>

            <q-select outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz"
                @update:model-value="pesquisar" />

        </div>

        <div class="text-body1 q-mb-sm q-mt-md text-teal-7 text-uppercase" v-if="habilitarRelatorioBtn">Treinamentos em
            andamento:</div>
        <div v-for="(
              item, index
            ) in treinamentos" :key="index">
            <card-custom :item="{
                id: item.uuid,
                nomeTreinamento: item.treinamento,
                nomeProtocolo: item.protocolo,
                periodoTreinamento: item.configuracoes.data_final,
                progresso: item.progresso
            }" />
        </div>

        <div ref="chartContainer"></div>

        <q-btn label="Gerar Relatório" color="info" class="full-width q-pa-sm q-mt-md" no-caps
            :disabled="!habilitarRelatorioBtn" @click="gerarRelatorio" />

    </q-page>

</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import TitleCustom from 'src/components/TitleCustom.vue';
import CardCustom from 'src/components/CardCustom.vue';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    Title,
    LineElement,
} from 'chart.js/auto'
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { AprendizService } from 'src/services/AprendizService';
import { UsuarioService } from 'src/services/UsuarioService';
import { TermoService } from 'src/services/TermoService';
import { useRouter } from 'vue-router';
import { useManagerTokens } from 'src/composables/managerTokens';
import {
    dias,
    diasAbreviados,
    meses
} from 'src/composables/utils';
import { RelatorioService } from 'src/services/RelatorioService';
import { AcessoService } from 'src/services/AcessoService';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

const aprendizService = new AprendizService();

const $q = useQuasar();

const showUrlDownload = ref(false);

const urlDownload = ref<string>();

const { error } = useNotify();

const form = reactive({
    aprendiz: '',
    dataInicio: '',
    dataFinal: ''
});

const aprendizes = ref<any[]>([]);

const treinamentos = ref<any[]>([]);

const habilitarRelatorioBtn = computed(() => {
    return form.aprendiz != "" && form.dataInicio != "" && form.dataFinal != "";
})

const usuarioSerive = new UsuarioService();

const showTermsDialog = ref();

const acceptTerms = ref();

const termoService = new TermoService();

const router = useRouter();

const managerTokens = useManagerTokens();

const relatorioService = new RelatorioService();

const acessoService = new AcessoService();

const chartContainer = ref(null);

async function handleAccept() {

    const user = JSON.parse(localStorage.getItem("user"));

    const { aceite } = await termoService.postAceiteTermo(user.email);

    if (aceite) {
        showTermsDialog.value = !aceite;
    }
}

async function gerarRelatorio() {

    const aprendizId = form.aprendiz.value;
    const dataInicio = form.dataInicio.replaceAll('/', '-');
    const dataFinal = form.dataFinal.replaceAll('/', '-');

    $q.loading.show();
    const data = await relatorioService.gerarRelatorio(aprendizId, dataInicio, dataFinal);
    $q.loading.hide();

    if (data.error != null) {
        error("Erro ao gerar reltório contate o Suporte.");
    }

    if (data.data == 'Não foi localizado treinamentos para o aprendiz') {
        error("Dentro do período especifícado não foi encontrado dados para gerar o relatório.");
    }

    urlDownload.value = data.data.url;
    showUrlDownload.value = true;
}

const carregarSelectAprendiz = async () => {

    try {
        $q.loading.show();
        const { data } = await aprendizService.getAprendizes();

        if (data) {
            data.filter(i => i.ativo === true).forEach((item: any) => {
                aprendizes.value.push({
                    label: item.nome_aprendiz,
                    value: item.uuid,
                });
            });
        } else {
            managerTokens.limparLocalStorage();
            router.push({ name: 'login' });
        }

    } catch (e) {
        error('Erro ao carregar aprendizes.')
    } finally {
        $q.loading.hide();
    }
}

function downloadFile() {
    window.open(urlDownload.value, '_blank');
    showUrlDownload.value = false;
}

function copyLink() {
    navigator.clipboard.writeText(urlDownload.value || '')
        .then(() => {
            $q.notify({
                message: 'Link copiado para a área de transferência!',
                color: 'green',
                position: 'top'
            });
        })
        .catch(() => {
            $q.notify({
                message: 'Falha ao copiar o link.',
                color: 'red',
                position: 'top'
            });
        });
}


onMounted(async () => {
    carregarSelectAprendiz();

    await usuarioSerive.getUsuarioInfo().then(data => {
        localStorage.setItem("user", JSON.stringify(data));

        acceptTerms.value = data.termoAceite;
        showTermsDialog.value = !acceptTerms.value;

    });

    const user = JSON.parse(localStorage.getItem("user"));

    await acessoService.subscriptionInfoByEmail(user.email).then(data => {
        localStorage.setItem("userInfo", JSON.stringify(data));
    })

});
</script>

<style>
.button-stack {
    display: flex;
    flex-direction: column;
    /* Empilha os botões verticalmente */
    gap: 10px;
}
</style>