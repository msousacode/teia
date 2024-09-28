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

    <q-dialog v-model="showGrafico">
        <q-card class="my-card q-pa-md full-width">
            <div class="text-center text-body1 text-teal">Gráfico</div>
            <div id="grafico-selecionado">
            </div>
        </q-card>
    </q-dialog>

    <q-page class="q-pa-sm">
        <q-card flat bordered class="my-card" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2'"
            v-if="storeUser.assinatura == 'FREE'">
            <q-card-section>
                <span class="text-body2 text-teal">O perído de testes termina em {{
        assinaturaService.buscarDiasRestantesAssinatura() }} dias.</span>
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
    }" @selecao="adicionaSelecao" />
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
import {
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

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

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
    gerarGraficosTela();
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

async function renderizarGraficos() {

    const uuidAprendiz = toRaw(form.value.aprendiz.value);
    const data = await service.gerarRelatorio(uuidAprendiz, periodo.value);//TODO estou chamando o serviço duas vezes verificar uma maneira de armazenar esse retorno na store do píniia paara evitar a segunda chamada.

    const graficos = data.map(item => {
        return item.treinamentos.map(tre => {
            return { treinamentoUuid: tre.uuid, chart: tre.chartData }
        });
    })

    graficos.forEach((graf) => {
        graf.forEach((chart) => {
            const canvas = document.createElement('canvas');
            canvas.id = `${chart.treinamentoUuid}`; // Adiciona um ID único para cada canvas
            canvas.style.display = 'none';

            // Define a largura e a altura do canvas para corresponder ao elemento pai
            if (chartContainer.value) {
                canvas.width = chartContainer.value;
                canvas.height = chartContainer.value;
            }

            const ctx = canvas.getContext('2d');

            new ChartJS(ctx || '', chart.chart);

            // Anexa o canvas ao elemento div
            if (chartContainer.value) {
                chartContainer.value.appendChild(canvas);
            }
        })
    })
}

function gerarGraficosTela() {
    renderizarGraficos();
}

async function imprimirPDF() {
    $q.loading.show();
    let nomeArquivo: string = '';

    const uuidAprendiz = toRaw(form.value.aprendiz.value);

    const data = await service.gerarRelatorio(uuidAprendiz, periodo.value);

    if (data[0].treinamentos.length === 0 || data === undefined) {
        $q.loading.hide();
        error("Nenhum registro encontrado para o períoodo selecionado.");
        return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');

    pdf.setFont('Helvetica');
    pdf.setProperties({
        title: 'relatorio_evolutivo',
    });

    /* const imgLogo = await loadImageData('src/assets/logo.png');
    const imgDataWithoutPrefix = imgLogo.split(",")[1]; */

    data.forEach((item) => {

        if (nomeArquivo === '') {
            nomeArquivo = 'relatorio_' + item.aprendiz.nome + '_' + new Date().toLocaleDateString();
        }

        /*  autoTable(pdf, {
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
         }); */

        autoTable(pdf, {
            head: [['PROFISSIONAL', 'CREDENCIAL', 'APRENDIZ', 'GERADO EM:']],
            body: [
                [item.profissional.nome.toUpperCase(), 'CREFITO 0000', item.aprendiz.nome.toUpperCase(), new Date().toLocaleDateString()],
            ],
            theme: 'plain',
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 50 },
                2: { cellWidth: 50 },
                3: { cellWidth: 50 },
            },
        });

        item.treinamentos.forEach(treinamento => {

            autoTable(pdf, {
                head: [['DATA ÍNICIO', 'NOME DO TREINAMENTO', 'PROTOCOLO', 'DESCRIÇÃO']],
                body: [
                    [treinamento.data, treinamento.titulo, treinamento.protocolo, 'A imitação é uma habilidade muito importante para o desenvolvimento e para a aprendizagem de novas habilidades. Quando não sabemos bem o fazer, observamos as outras pessoas e copiamos o modelo'],
                ],
                headStyles: { fillColor: '#f06c8a' }
            });

            autoTable(pdf, {
                head: [['DATA', 'OBJETIVO', 'TP. APRENDIZAGEM', 'RESPOSTA COLETA']],
                body:
                    treinamento.alvosColetados.map(alvo => {
                        return [alvo.dataColeta, alvo.nomeAlvo, alvo.tipoAprendizagem, alvo.resposta]
                    }),
                headStyles: { fillColor: '#f8a0b1' }
            });

            autoTable(pdf, {
                head: [['DATA', 'ANOTAÇÃO']],
                body:
                    treinamento.alvosColetados.flatMap(alvo => {
                        return alvo.anotacoes.map(anotacao => {
                            return [anotacao.data, anotacao.descricao]
                        })
                    }),
                headStyles: { fillColor: '#f8a0b1' }
            });

            var imgData = document.getElementById(treinamento.uuid).toDataURL('image/png');

            autoTable(pdf, {
                head: [['REPRESENTAÇÃO GRÁFICA:']],
                body: [['']],
                columnStyles: {
                    0: { cellWidth: 100, minCellHeight: treinamento.protocolo === 'Protocolo ABC' ? 100 : 50 }, // Definindo a largura da segunda coluna para 100 e a altura mínima para 200
                },
                didDrawCell: (data) => {
                    if (data.section === 'body' && data.column.index === 0) {
                        pdf.addImage(imgData, 'PNG', data.cell.x, data.cell.y, data.cell.width, data.cell.height);
                    }
                },
                theme: 'plain',
            });
        });
    });

    $q.loading.hide();
    pdf.save(`${nomeArquivo}.pdf`);
}

const adicionaSelecao = (evento: any) => {
    showGrafico.value = true;
    setTimeout(() => {
        const canvas = document.getElementById(evento) as HTMLCanvasElement;
        const clonedCanvas = document.createElement('canvas') as HTMLCanvasElement;

        // Ajuste a escala para a densidade de pixels do dispositivo
        const scale = window.devicePixelRatio;
        clonedCanvas.width = canvas.width * scale;
        clonedCanvas.height = canvas.height * scale;

        const context = clonedCanvas.getContext('2d');

        clonedCanvas.width = 320; // Define a largura do canvas
        clonedCanvas.height = 320; // Define a altura do canvas

        // Escala o contexto para que o desenho não pareça pixelado
        context!.scale(scale, scale);

        context!.drawImage(canvas, 0, 0, clonedCanvas.width / scale, clonedCanvas.height / scale);
        clonedCanvas.style.display = 'block';

        const graficoSelecionado = document.getElementById("grafico-selecionado");
        graficoSelecionado!.innerHTML = '';
        graficoSelecionado!.appendChild(clonedCanvas);
    }, 300);
};

/* async function loadImageData(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
} */

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
            return res;
        }).catch((err) => {
            error(err);
        });

        if (user) {
            await assinaturaService.validarAssinaturaPagante().then((res) => {
                if (res == 'EXPIRADO') {
                    sair();
                }
            });

            if (user.demonstracao_restore === false && user.primeiro_acesso_realizado === false) {
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
        } else {
            error('Usuário não encontrado.');
        }
    }

    const sair = async () => {
        localStorage.clear();
        router.replace({ name: 'expirada' });
    };
});

</script>