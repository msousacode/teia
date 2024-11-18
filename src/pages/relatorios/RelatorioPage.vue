<template>
    <q-dialog v-model="showBoasVindas" persistent>
        <q-card class="my-card q-pa-md full-width">
            <q-card-section>

                <div class="text-h6 text-primary text-center">Seja Bem-Vindo(a)!</div>
                <br />

                <div class="text-h6 text-teal-9 text-center">Obrigada por escolher a SysABA</div>
                <br />
                <div class="text-body1 text-center text-teal-9">Durante esse período de 7 dias você poderá testar todas
                    as
                    funcionalidades do
                    sistema sem
                    limitações.</div><br />
                <div class="text-body1 text-center text-teal-9">Para melhorar a sua experiência, o sistema foi
                    configurado
                    com uma base de dados de demonstração.</div><br />
                <div class="text-body1 text-center text-teal-9">Todos os dados são fictícios e não representam
                    informações reais.
                </div>

                <q-btn label="Entendi" color="info" class="full-width q-mt-md" no-caps @click="entendi" />

            </q-card-section>
        </q-card>
    </q-dialog>

    <canvas id="graficoPDF" v-show="gerandoRelatorio" width="200" height="200"></canvas>

    <q-dialog v-model="showGrafico">
        <q-card class="my-card q-pa-md full-width">
            <canvas id="meuGrafico" width="200" height="200"></canvas>
            <div class="text-center text-body1 text-teal">Gráfico</div>
        </q-card>
    </q-dialog>

    <q-page class="q-pa-sm">
        <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
            v-if="storeUser.assinatura == 'FREE'">
            <q-card-section>
                <span class="text-body2">O período de testes termina em {{ diasRestantesTeste }}</span>
                <br />
                <q-btn label="Assinar SysABA" color="primary" no-caps flat :to="{ name: 'assinatura' }" dense />
            </q-card-section>
        </q-card>

        <title-custom title="Relatório" />
        <div class="row">
            <q-form class="col-md-7 col-xs-12 col-sm-12">
                <q-select outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz"
                    @update:model-value="pesquisar" />
            </q-form>
            <p class="text-body1 text-teal-7 q-mt-md">Selecione o período:</p>
            <div class="col-12">
                <q-radio class="text-body2" v-model="periodo" :val=30 label="Último mês" color="teal" />
            </div>
            <div class="col-12">
                <q-radio class="text-body2" v-model="periodo" :val=60 label="Últimos 2 meses" color="teal" />
            </div>
            <div class="col-12">
                <q-radio class="text-body2" v-model="periodo" :val=90 label="Últimos 3 meses" color="teal" />
            </div>
        </div>

        <div class="text-body1 q-mb-sm q-mt-md text-teal-7 text-uppercase" v-if="exibirRelatorioBtn">Treinamentos em
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
            }" @selecao="gerarGrafico(item.uuid)" />
        </div>

        <div ref="chartContainer"></div>

        <q-btn label="Gerar Relatório" color="info" class="full-width q-pa-sm q-mt-md" no-caps @click="imprimirPDF"
            :disabled="!exibirRelatorioBtn" />

    </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
import { db } from 'src/db'
import TitleCustom from 'src/components/TitleCustom.vue';
import CardCustom from 'src/components/CardCustom.vue';
import Chart, {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    Title,
    LineElement,
} from 'chart.js/auto'
import { RelatorioService } from 'src/services/RelatorioService';
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import useSupabaseApi from 'src/composables/UseSupabaseApi';
import { BackupService } from 'src/services/BackupService';
import { useUserStore } from 'src/stores/user';
import { AssinaturaService } from '../assinatura/AssinaturaService';
import { useRouter } from 'vue-router';
import useAuth from 'src/composables/useAuth';
import useUtils from 'src/utils/util';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

const gerandoRelatorio = ref(false);

const showGrafico = ref(false);

const periodo = ref(30);

const service = new RelatorioService();

const $q = useQuasar();

const { error } = useNotify();

const form = ref({
    aprendiz: '',
});

const aprendizes = ref<any[]>([]);

const treinamentos = ref<any[]>([]);

const atendimentos = ref<any[]>([]);

const exibirRelatorioBtn = ref(false);

const { getUserAuth, getByEmail, put } = useSupabaseApi();

const backupService = new BackupService();

const showBoasVindas = ref(false);

const storeUser = useUserStore();

const assinaturaService = new AssinaturaService();

const router = useRouter();

const diasRestantesTeste = ref();

const auth = useAuth();

const utils = useUtils();

function pesquisar() {
    const raw = toRaw(form.value);

    db.atendimentos.where({ aprendiz_uuid_fk: raw.aprendiz.value }).toArray().then(res => {
        atendimentos.value = toRaw(res);

        atendimentos.value.forEach((item) => {

            item.treinamentos.forEach((treinamento: any) => {
                calcularProgresso(treinamento.uuid, raw.aprendiz.value).then((progresso) => {
                    treinamento.progresso = progresso;
                });
            });

            treinamentos.value = toRaw(item.treinamentos)
        });
    });

    exibirRelatorioBtn.value = true;
}

async function calcularProgresso(treinamentoUUid: string, aprendizUUid: string) {
    let valor = 0;
    await db.coletas.where({ aprendiz_uuid_fk: aprendizUUid, treinamento_uuid_fk: treinamentoUUid }).toArray((res) => {
        const total = res.length;
        const feitos = res.filter((item) => item.foi_respondido === true).length;
        valor = feitos / total;
    })

    return valor;
}

const chartContainer = ref(null);

let myChart: Chart | null = null;

async function gerarGrafico(itemId: string) {

    showGrafico.value = true;

    setTimeout(async () => {

        const canvas = document.getElementById('meuGrafico') as HTMLCanvasElement;

        if (canvas) {
            const ctx = canvas.getContext('2d');

            if (ctx) {
                const uuidAprendiz = toRaw(form.value.aprendiz.value);

                const treinamentos = await service.buscarTreinamentos(uuidAprendiz, periodo.value);

                const graficos = treinamentos
                    .filter(item => item.uuid == itemId)
                    .map(i => i.chartData)[0];

                // Antes de criar um novo gráfico, destrua o existente se houver
                if (myChart) {
                    myChart.destroy(); // Destroi o gráfico anterior
                }

                // Certifique-se de que graficos possui a estrutura correta de configuração para Chart.js
                const config = {
                    type: graficos.type || 'line', // Certifique-se de que o tipo do gráfico está presente
                    data: graficos.data, // Dados do gráfico (labels e datasets)
                    options: graficos.options || { // Opções do gráfico
                        animation: false,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                };
                // Cria o gráfico com as configurações apropriadas
                myChart = new Chart(ctx, config);
            } else {
                console.error("Falha ao obter o contexto 2D do canvas.");
            }
        } else {
            console.error("Canvas não encontrado.");
        }

    }, 800);
}

async function imprimirPDF() {
    $q.loading.show();
    let nomeArquivo: string = '';

    const uuidAprendiz = toRaw(form.value.aprendiz.value);
    const data = await service.gerarRelatorio(uuidAprendiz, periodo.value);

    if (data[0].treinamentos.length === 0 || data === undefined) {
        $q.loading.hide();
        error("Nenhum registro encontrado para o período selecionado.");
        return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.setFont('Helvetica');
    pdf.setProperties({
        title: 'relatorio_evolutivo',
    });

    for (const item of data) {

        if (nomeArquivo === '') {
            nomeArquivo = 'relatorio_' + item.aprendiz.nome + '_' + new Date().toLocaleDateString();
        }

        /*
        const imgLogo = await loadImageData('src/assets/logo.png');
        
        const imgDataWithoutPrefix = imgLogo.split(",")[1];

        autoTable(pdf, {
            head: [['']],
            headStyles: {
                cellWidth: 30, minCellHeight: 10,
            },
            didDrawCell: (data) => {
                if (data.section === 'head' && data.column.index === 0) {
                    pdf.addImage(imgDataWithoutPrefix, 'PNG', data.cell.x, data.cell.y, data.cell.width, data.cell.height);
                }
            },
            theme: 'plain',
        });*/

        autoTable(pdf, {
            head: [['PROFISSIONAL', 'REGISTRO PROF.', 'APRENDIZ', 'GERADO EM:']],
            body: [
                [item.profissional.nome.toUpperCase(), item.profissional.documento, item.aprendiz.nome.toUpperCase(), new Date().toLocaleDateString()],
            ],
            theme: 'plain',
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 50 },
                2: { cellWidth: 50 },
                3: { cellWidth: 50 },
                //4: { cellWidth: 50 },
            },
        });

        for (const treinamento of item.treinamentos) {

            autoTable(pdf, {
                head: [['DATA ÍNICIO', 'NOME DO TREINAMENTO', 'PROTOCOLO', 'DESCRIÇÃO']],
                body: [
                    [treinamento.data, treinamento.titulo, treinamento.protocolo, treinamento.descricao],
                ],
                headStyles: { fillColor: '#f06c8a' }
            });

            autoTable(pdf, {
                head: [['DATA', 'OBJETIVO', 'TP. APRENDIZAGEM', 'RESPOSTA COLETA']],
                body: treinamento.alvosColetados.map(alvo => {
                    return [alvo.dataColeta, alvo.nomeAlvo, alvo.tipoAprendizagem, alvo.resposta];
                }),
                headStyles: { fillColor: '#f8a0b1' }
            });

            autoTable(pdf, {
                head: [['DATA', 'ANOTAÇÃO']],
                body: treinamento.alvosColetados.flatMap(alvo => {
                    return alvo.anotacoes.map(anotacao => {
                        return [anotacao.data, anotacao.descricao];
                    });
                }),
                headStyles: { fillColor: '#f8a0b1' }
            });

            let chartBase64: string;
            // Gera o gráfico como imagem base64            
            await gerarGraficoPDF(treinamento.uuid).then(res => {
                chartBase64 = res || '';
            });

            autoTable(pdf, {
                head: [['REPRESENTAÇÃO GRÁFICA:']],
                body: [['']],
                columnStyles: {
                    0: { cellWidth: 100, minCellHeight: treinamento.protocolo === 'Protocolo ABC' ? 100 : 50 },
                },
                didDrawCell: (data) => {
                    if (data.section === 'body' && data.column.index === 0) {
                        pdf.addImage(chartBase64, 'PNG', data.cell.x, data.cell.y, data.cell.width, data.cell.height);
                    }
                },
                theme: 'plain',
            });
        }
    }

    gerandoRelatorio.value = false;
    $q.loading.hide();
    pdf.save(`${nomeArquivo}.pdf`);
}
/*
async function loadImageData(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}*/

async function gerarGraficoPDF(treinamentoUUID: string): Promise<string | null> {

    gerandoRelatorio.value = true;
    return new Promise(async (resolve, reject) => {
        const canvas = document.getElementById('graficoPDF') as HTMLCanvasElement;

        if (!canvas) {
            console.error("Canvas não encontrado.");
            reject(null);
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("Falha ao obter o contexto 2D do canvas.");
            reject(null);
            return;
        }

        const uuidAprendiz = toRaw(form.value.aprendiz.value);
        const treinamentos = await service.buscarTreinamentos(uuidAprendiz, periodo.value);

        const graficos = treinamentos
            .filter(item => item.uuid === treinamentoUUID)
            .map(i => i.chartData)[0];

        if (!graficos) {
            console.error("Dados do gráfico não encontrados.");
            reject(null);
            return;
        }

        // Antes de criar um novo gráfico, destrua o existente se houver
        if (myChart) {
            myChart.destroy(); // Destroi o gráfico anterior
        }

        // Configuração do gráfico com `onComplete` para resolver após renderização
        const config = {
            type: graficos.type || 'line',
            data: graficos.data,
            options: {
                ...graficos.options,
                animation: {
                    animation: false,
                    onComplete: () => {
                        // Converte o canvas para imagem base64 após a renderização
                        const chartBase64 = canvas.toDataURL('image/png');
                        resolve(chartBase64); // Retorna a imagem base64 após renderização completa
                    }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        };

        // Cria o gráfico com as configurações apropriadas
        myChart = new Chart(ctx, config);
    });
}


async function getUserAuthSupbase() {
    return getUserAuth().then((user) => {
        return user.data.user;
    }).catch((err) => {
        console.error(err);
    });
}

const entendi = () => {
    showBoasVindas.value = false;
    carregarSelectAprendiz();
}

const carregarSelectAprendiz = () => {
    db.aprendizes.toArray().then((res) => {
        res.filter(i => i.ativo === true).forEach((aprendiz) => {
            aprendizes.value.push({
                label: aprendiz.nome_aprendiz,
                value: aprendiz.uuid,
            });
        });
    });
}

function backupSegundoPlano() {

    if (navigator.onLine) {

        if (localStorage.getItem('ultimo_backup') == null) {
            localStorage.setItem('ultimo_backup', new Date().getTime().toString());
        }

        const dateUltimoBackup = localStorage.getItem('ultimo_backup') || '';

        const diferencaHoras = utils.calculateHoursBetween(dateUltimoBackup);

        if (isNaN(Number(diferencaHoras))) {
            localStorage.setItem('ultimo_backup', new Date().getTime().toString());
        }
        //Se a diferença entre o último backup for igual ou superior a 12 horas faz o backup.
        if (diferencaHoras >= 12) {
            const backupService = new BackupService();
            backupService.iniciarBackup(false);
        }
    }
}


onMounted(async () => {
    carregarSelectAprendiz();

    if (navigator.onLine) {

        const userAuth = await getUserAuthSupbase() as any;

        const user = await getByEmail('usuarios', userAuth.email).then((res) => {
            storeUser.setUser({
                id: res.id,
                nome: res.full_name,
                email: res.email
            });
            localStorage.setItem('user', JSON.stringify(res));
            return res;
        }).catch((err) => {
            error(err);
        });

        if (user) {

            let isAssinante = true;

            await assinaturaService.validarAssinaturaPagante().then((res) => {
                if (res == 'EXPIRADO' || res == 'NEGADO') {
                    auth.logout();
                    localStorage.clear();
                    router.replace({ name: 'expirada' });
                    isAssinante = false;
                }
            });

            if (isAssinante) {
                assinaturaService.salvaDiasRestantesAssinatura();
                diasRestantesTeste.value = localStorage.getItem("periodoTeste")
                if (user.demonstracao_restore == false && user.primeiro_acesso_realizado == false) {
                    //restaurar base de dados
                    await backupService.restaurarBackup(user.banco_demonstracao);

                    //atualizar informações do usuário no supabase.
                    user.demonstracao_restore = true;
                    user.primeiro_acesso_realizado = true;

                    //Atualize as informações do usuário no supabase.
                    await put('usuarios', user).then(() => {
                        showBoasVindas.value = true;
                    }).catch((err) => {
                        error(err);
                    });
                }
            }
        } else {
            error('Usuário não encontrado.');
        }

        backupSegundoPlano();
    } else {
        $q.notify('Conecte-se a Internet para usar o aplicativo.')
    }
});
</script>