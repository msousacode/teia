<template>

    <q-dialog v-model="showTermsDialog" persistent>
        <q-card>
            <q-card-section>
                <div class="text-body1"><b>TERMO DE USO DO APLICATIVO</b></div>
            </q-card-section>

            <q-separator />

            <q-card-section style="max-height: 50vh" class="scroll text-justify">

                <div class="q-pa-sm">
                    Última atualização: Novembro 2024<br><br>

                    Bem-vindo(a)! ao aplicativo SysABA!<br><br>

                    Este Termo de Uso estabelece as condições para utilização do
                    aplicativo e dos serviços fornecidos. Ao utilizar o aplicativo, você concorda integralmente com os
                    termos aqui descritos. Caso não concorde, não utilize o aplicativo.
                </div>

                <div class="q-pa-sm">
                    <b>1. ACEITAÇÃO DOS TERMOS</b><br>
                    <b>1.1.</b> Ao acessar e utilizar este aplicativo, o usuário declara ter lido, compreendido e
                    aceitado os
                    termos de uso aqui descritos, bem como a nossa Política de Privacidade.<br>
                    <b>1.2.</b> O aplicativo é destinado ao uso exclusivamente on-line. Para utilizá-lo, é necessário
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
                    Não realizar engenharia reversa ou tentar acessar código-fonte ou dados do aplicativo de forma não
                    autorizada;<br><br>
                    Fornecer informações verídicas e completas ao registrar-se e utilizar o serviço.<br><br>
                    <b>3.2.</b> A utilização do aplicativo deve respeitar as leis vigentes no Brasil e no local onde o
                    usuário
                    se encontra.<br>
                </div>

                <div class="q-pa-sm">
                    <b>4. CONTA DO USUÁRIO</b><br>
                    <b>4.1.</b> Para acessar determinadas funcionalidades, o usuário poderá ser solicitado a criar uma
                    conta
                    pessoal.<br>
                    <b>4.2.</b> O usuário é responsável por manter a confidencialidade de sua conta e senha, bem como
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
                    <b>7.2.</b> Alterações relevantes serão informadas por meio de notificação no próprio aplicativo ou
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
                    Ao continuar a utilizar o o aplicativo SysABA, você declara que leu, entendeu e concorda com este
                    Termo de Uso.
                </div>

                <div class="q-pa-sm">
                    SysABA<br>
                    58.024.694/0001-87
                </div>

            </q-card-section>

            <q-separator />

            <q-card-actions align="center" class="q-mt-md">
                <q-checkbox v-model="acceptTerms" label="Li e concordo com os termos" />
                <q-btn :disable="!acceptTerms" label="Li e concordo com os termos" color="primary" @click="handleAccept"
                    class="q-mt-md q-mb-md" />
            </q-card-actions>
        </q-card>
    </q-dialog>



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
        <div class="text-body1 text-teal-7 q-mt-md">Selecione o período:</div>
        <div class="row">
            <q-form class="col-md-7 col-xs-12 col-sm-12">
                <q-select outlined v-model="form.aprendiz" :options="aprendizes" label="Selecione o Aprendiz"
                    @update:model-value="pesquisar" />
            </q-form>
            <div class="col-12 q-mt-md">
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
            }" />
        </div>

        <div ref="chartContainer"></div>

        <q-btn label="Gerar Relatório" color="info" class="full-width q-pa-sm q-mt-md" no-caps
            :disabled="!exibirRelatorioBtn" />

    </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TitleCustom from 'src/components/TitleCustom.vue';
import CardCustom from 'src/components/CardCustom.vue';
import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    Title,
    LineElement,
} from 'chart.js/auto'
//import { RelatorioService } from 'src/services/RelatorioService';
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { useUserStore } from 'src/stores/user';
import { AprendizService } from 'src/services/AprendizService';
import { UsuarioService } from 'src/services/UsuarioService';
import { createStripeCustomer } from 'src/services/stripe';
import { TermoService } from 'src/services/TermoService';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

const aprendizService = new AprendizService();

const $q = useQuasar();

const gerandoRelatorio = ref(false);

const showGrafico = ref(false);

const periodo = ref(30);

//const service = new RelatorioService();

const { error } = useNotify();

const form = ref({
    aprendiz: '',
});

const aprendizes = ref<any[]>([]);

const treinamentos = ref<any[]>([]);

//const atendimentos = ref<any[]>([]);

const exibirRelatorioBtn = ref(false);

const showBoasVindas = ref(false);

const storeUser = useUserStore();

const diasRestantesTeste = ref();

const usuarioSerive = new UsuarioService();

const showTermsDialog = ref();

const acceptTerms = ref();

const termoService = new TermoService();

async function handleAccept() {

    const user = JSON.parse(localStorage.getItem("user"));

    const { aceite } = await termoService.postAceiteTermo(user.email);

    if (aceite) {
        showTermsDialog.value = !aceite;
    }
}

function pesquisar() {
    //const raw = toRaw(form.value);

    /* TODO fazer 
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
    */

    exibirRelatorioBtn.value = true;
}

/*TODO fazer
async function calcularProgresso(treinamentoUUid: string, aprendizUUid: string) {
    let valor = 0;
    await db.coletas.where({ aprendiz_uuid_fk: aprendizUUid, treinamento_uuid_fk: treinamentoUUid }).toArray((res) => {
        const total = res.length;
        const feitos = res.filter((item) => item.foi_respondido === true).length;
        valor = feitos / total;
    })

    return valor;
}**/

const chartContainer = ref(null);

//let myChart: Chart | null = null;

/*
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
}*/
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
/**
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
} */

const entendi = () => {
    showBoasVindas.value = false;
    carregarSelectAprendiz();
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
            error('Erro ao carregar aprendizes.')
        }

    } catch (e) {
        error('Erro ao carregar aprendizes.')
    } finally {
        $q.loading.hide();
    }
}

/*
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
        //Se a diferença entre o último backup for igual ou superior a 3 horas faz o backup.
        if (diferencaHoras >= 3) {
            const backupService = new BackupService();
            backupService.iniciarBackup(false);
        }
    } else {
        $q.notify("Conecte-se na Internet para usar o Aplicativo!")
    }
}*/


async function criarContaStripe() {
    try {
        $q.loading.show();

        const user = JSON.parse(localStorage.getItem("user"));

        const input = {
            name: user.fullName,
            email: user.email,
        }

        const { id } = await createStripeCustomer(input);

        if (!id) {
            error('Erro ao criar customer Stripe!');
        }
    } catch (e) {
        console.log(e);
        error('Erro ao criar customer!');
    } finally {
        $q.loading.hide();
    }
}

onMounted(async () => {
    carregarSelectAprendiz();

    await usuarioSerive.getUsuarioInfo().then(data => {
        localStorage.setItem("user", JSON.stringify(data));

        acceptTerms.value = data.termoAceite;
        showTermsDialog.value = !acceptTerms.value;

    });

    await criarContaStripe();
    /*
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

    }*/
});
</script>