<template>
    <div class="q-ml-md q-mt-md text-teal">Barreiras - Aprendiz: {{ aprendizStore.nome_aprendiz }}</div>
    <title-custom title="Barreiras" class="q-ml-sm"></title-custom>
    <q-page>
        <div class="q-pa-md">
            <form @submit.prevent="salvar">
                <div v-for="assessment in barreiras" :key="assessment.id" class="q-mb-xl">
                    <div class="text-h6">{{ assessment.question }}</div>
                    <q-select v-model="assessment.id" @update:model-value="coletaResposta(assessment)"
                        :options="assessment.options" label="Resposta" />
                </div>

                <q-btn label="Salvar" color="primary" class="full-width q-pa-sm" no-caps type="submit" />
            </form>
        </div>
    </q-page>
</template>

<script setup lang="ts">
import TitleCustom from 'src/components/TitleCustom.vue';
import { onMounted, reactive } from 'vue';
import { Barreira, BarreiraList } from './model/barreira.model';
import useNotify from 'src/composables/UseNotify';
import { useQuasar } from 'quasar';
import { VbMappService } from 'src/services/VbMappService';
import { useAprendizStore } from 'src/stores/aprendiz';

const aprendizStore = useAprendizStore().getAprendizInfo;

const barreiraList = reactive<BarreiraList>({
    coletas: []
});

const { error, success } = useNotify();

const $q = useQuasar();

const service = new VbMappService();

function coletaResposta(item: any) {
    // Atualiza ou adiciona a resposta 
    const index = barreiraList.coletas.findIndex(resposta => resposta.codigo == item.cod);

    const coleta: Barreira = {
        vbMappBarreiraId: null,
        questao: item.question,//titulo da pergunta
        descricao: item.id.label,//descricao do item selecinado
        resposta: item.id.value,//resposta atribuída
        codigo: item.cod
    }

    if (index == 0) {
        barreiraList.coletas[index] = coleta;
    } else {
        barreiraList.coletas.push(coleta);
    }
}

async function salvar() {
    $q.loading.show();
    try {

        const { status } = await service.postColetaBarreira(barreiraList, aprendizStore.uuid);

        if (status == 200) {
            success('Barreiras salvas com sucesso!');
        } else {
            error('Erro ao salvar barreiras');
        }

    } catch (e) {
        console.log(e);
        error('Erro ao salvar barreiras');
    } finally {
        await getBarreirasColetadas();
        $q.loading.hide();
    }
}

async function getBarreirasColetadas() {
    $q.loading.show();
    try {
        const { data } = await service.getColetaBarreira(aprendizStore.uuid);

        if (data && data.coletas) {
            data.coletas.forEach((coleta: any) => {
                const assessment = barreiras.find(b => b.cod === coleta.codigo);
                if (assessment) {
                    assessment.id = { value: coleta.resposta, label: coleta.descricao };

                }
            });
            barreiraList.coletas = data.coletas;
        }

    } catch (e) {
        console.log(e);
        error('Erro ao carregar barreiras');
    } finally {
        $q.loading.hide();
    }
}

onMounted(async () => {
    await getBarreirasColetadas();
});

const barreiras = reactive([
    {
        "cod": 0,
        "question": "1 - Comportamentos negativos que dificultam a aprendizagem",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Não apresenta comportamentos negativos que dificultam a aprendizagem" },
            { "value": "1", "label": "1 - Problema ocasional. Em algumas situações chora ou choraminga, mas recupera e volta a atividade realizada." },
            { "value": "2", "label": "2 - Problema moderado. Diferentes comportamentos negativos emitidos, não tão graves, mas que ocorrem todos os dias (Jogar-se no chão, choro)." },
            { "value": "3", "label": "3 - Problema persistente. Os comportamentos negativos já se tornam de difícil administração pelo adulto (Acesso de raiva, jogar itens, destruir objetos)." },
            { "value": "4", "label": "4 - Problema grave. Ocorrem várias vezes ao dia e representam perigo para si e para os outros." }
        ]
    },
    {
        "cod": 1,
        "question": "2 - Controle instrucional fraco",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Criança cooperativa" },
            { "value": "1", "label": "1 - Comportamento desobediente pouco frequente. Em geral é cooperativa, algumas demandas geram desobediência, mas se recupera rapidamente." },
            { "value": "2", "label": "2 - Comportamentos desobedientes menores, porém várias vezes ao dia, sendo mais difícil para o adulto manejar e fazer com que a criança volte." },
            { "value": "3", "label": "3- Os comportamentos tem se tornado mais frequentes e graves, ocorrendo em diferentes contextos." },
            { "value": "4", "label": "4 - Problema grave e diário que inclui agressão, destruição de itens caso a demanda não seja removida. Ocorrem várias vezes ao dia e representam perigo para si e para os outros." }
        ]
    },
    {
        "cod": 2,
        "question": "3 - Mando fraco, ausente ou prejudicado",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Repertório adequado e proporcional às outras habilidades." },
            { "value": "1", "label": "1- Emite mandos, porém possui uma pontuação bem maior nos outros operantes verbais." },
            { "value": "2", "label": "2- Emite pouquíssimos mandos e restritos aos itens reforçadores, embora a pontuação dos outros operantes verbais esteja bem mais alta." },
            { "value": "3", "label": "3 - Os mandos raramente são espontâneos, não correspondem à motivação, ocorrem por meio de comportamento negativo ou adivinhação." },
            { "value": "4", "label": "4 - A criança não emite nenhum tipo de mando ou emite de acordo com o n° 3, porém sem muitas outras habilidades verbais." }
        ]
    },
    {
        "cod": 3,
        "question": "4 - Tato fraco, ausente ou prejudicado",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Repertório adequado e proporcional às outras habilidades." },
            { "value": "1", "label": "1 - Consegue tatear alguns itens e tem bom repertório de ecóico." },
            { "value": "2", "label": "2 - Erros ocorrem com frequência, a criança tenta adivinhar e a emissão fica dependente de dicas." },
            { "value": "3", "label": "3 - Repertório inferior ao de outras habilidades verbais, pouco espontâneo, mecânico, com emissão de fuga durante o ensino." },
            { "value": "4", "label": "4 - A criança não emite nenhum tipo de tato ou tem um repertório muito limitado." }
        ]
    },
    {
        "cod": 4,
        "question": "5 - Imitação motora ausente, fraca ou prejudicada",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Repertório de imitar crescendo e proporcional às outras habilidades." },
            { "value": "1", "label": "1 - Imita, porém possui uma pontuação bem maior nas outras áreas." },
            { "value": "2", "label": "2 - Possui dificuldade em generalizar, dependente de dicas, imita comportamentos inadequados." },
            { "value": "3", "label": "3 - Imitação sempre dependente de dica física ou verbal, não ocorrendo caso assim não seja feito." },
            { "value": "4", "label": "4 - A criança não tem habilidades de imitação e tentativas de ensino anteriores falharam." }
        ]
    },
    {
        "cod": 5,
        "question": "6 - Ecoico ausente, fraco ou prejudicado.",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Repertório de ecoar proporcional às outras habilidades." },
            { "value": "1", "label": "1 - Ecoa, porém possui uma pontuação bem maior nas outras áreas." },
            { "value": "2", "label": "2 - Habilidades de ecoar estão ficando ainda mais atrasadas quando comparadas às outras." },
            { "value": "3", "label": "3 - Não ocorre ecoar espontâneo, aprendizado lento e ensino intensivo ou ocorre em excesso." },
            { "value": "4", "label": "4 - A criança não tem habilidades de ecoar, mesmo tendo habilidades de imitação tentativas de ensino anteriores falharam." }
        ]
    },
    {
        "cod": 6,
        "question": "7 - MTS fraco, ausente ou prejudicado",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - VP-MTS proporcional às outras habilidades, crescendo e adequado à idade." },
            { "value": "1", "label": "1 - Consegue realizar pareamento, mas possui uma pontuação bem maior nas outras áreas." },
            { "value": "2", "label": "2 - Apresenta adivinhação, falha em escanear a matriz ou em selecionar o item de acordo com o modelo." },
            { "value": "3", "label": "3 - Adquiriu algumas habilidades, mas ainda não proporcionais às outras habilidades, além de exibir comportamentos negativos. Repertório limitado à pequenas matrizes, falha em generalizar, estímulos semelhantes geram erros." },
            { "value": "4", "label": "4 - A criança não tem habilidades de VP-MTS e/ou já foram realizadas diversas tentativas de ensino. Ou habilidades adquiridas não são espontâneas, nunca ocorre de forma funcional." }
        ]
    },
    {
        "cod": 7,
        "question": "8 - Responder de ouvinte fraco, ausente ou prejudicado",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Ouvinte proporcional às outras habilidades, crescendo e adequado à idade." },
            { "value": "1", "label": "1 - Demonstra habilidades de ouvinte, mas possui uma pontuação bem maior nas outras áreas." },
            { "value": "2", "label": "2 - Não consegue executar alguma resposta necessária para a tarefa como falha em escanear a matriz, adivinha a resposta ou aponta sempre para o mesmo lado da matriz." },
            { "value": "3", "label": "3 - Exibe comportamentos negativos. Repertório limitado à pequenas matrizes, falha em generalizar, estímulos semelhantes geram erros e instruções verbais maiores." },
            { "value": "4", "label": "4 - A criança não tem habilidades de ouvinte e/ou já foram realizadas diversas tentativas de ensino. Ou habilidades adquiridas não são espontâneas, nunca ocorre de forma funcional." }
        ]
    },
    {
        "cod": 8,
        "question": "9 - Intraverbal ausente, fraco ou prejudicado",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Intraverbal proporcional às outras habilidades, crescendo e adequado à idade." },
            { "value": "1", "label": "1 - Demonstra responder Intraverbal, mas possui uma pontuação bem maior nas outras áreas, em especial tato e ouvinte." },
            { "value": "2", "label": "2 - Criança, com frequência apresenta erros, adivinha a resposta, dependente de algum tipo de dica, apresenta ecolalia, respostas espontâneas nunca ocorrem." },
            { "value": "3", "label": "3 - Exibe respostas mecânicas, respostas rapidamente esquecidas, repertório limitado e nenhuma ou poucas generalizações." },
            { "value": "4", "label": "4 - A criança não tem habilidades intraverbais e/ou já foram realizadas diversas tentativas de ensino. Ou habilidades adquiridas não são espontâneas, nunca ocorre de forma funcional." }
        ]
    },
    {
        "cod": 9,
        "question": "10 - Habilidades sociais ausentes, fracas ou prejudicadas",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Habilidades sociais proporcional às outras habilidades, crescendo e adequado à idade." },
            { "value": "1", "label": "1 - Ocorre comportamento social, mas possui uma pontuação bem maior nas outras áreas, em especial tato e ouvinte." },
            { "value": "2", "label": "2 - Raramente inicia interação social com colega, embora consiga isso com um adulto. Raramente imita, brinca ou emite mando para os colegas. Emite comportamento socialmente negativo." },
            { "value": "3", "label": "3 - Em situação de brincar, geralmente fica sozinha, não costuma compartilhar brinquedos, responder a comandos, mesmo que consiga fazer isso com adultos." },
            { "value": "4", "label": "4 - A criança TEM habilidades de linguagem, mas evita outras crianças, não responde a mandos, emite comportamento negativo quando é solicitado que ela esteja em situações sociais." }
        ]
    },
    {
        "cod": 10,
        "question": "11 - Dependente de dicas",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - A criança está aprendendo de modo consistente, sem estar dependente do uso de dicas." },
            { "value": "1", "label": "1 - São necessárias várias tentativas para o esvanecimento da dica, porém a criança está conseguindo aprender e emitir a resposta sem a dica." },
            { "value": "2", "label": "2 - Algumas dicas são difíceis de serem retiradas, especialmente." },
            { "value": "3", "label": "3 - O aplicador tem muita dificuldade em retirar a dica, estas ocorrem de modo sutil." },
            { "value": "4", "label": "4 - Extremamente difícil de retirar as dicas e a maioria das respostas são vinculadas a dicas ecóicas, imitativas ou verbais." }
        ]
    },
    {
        "cod": 11,
        "question": "12 - Resposta de adivinhação",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - A criança não emite respostas de adivinhação." },
            { "value": "1", "label": "1 - Tenta adivinhar ocasionalmente, diante de novos estímulos, mas após alguns treinos para de adivinhar, aprendendo e generalizando posteriormente." },
            { "value": "2", "label": "2 - Adivinhação é um problema frequente, principalmente quando novos estímulos são introduzidos, sendo necessários vários treinos até que o aprendizado ocorra." },
            { "value": "3", "label": "3 - Adivinhação continua a acontecer, mesmo que com habilidades já 'adquiridas', embora isso possa ocorrer apenas com as palavras mais difíceis." },
            { "value": "4", "label": "4 - Adivinhação ocorre com quase todas as tentativas." }
        ]
    },
    {
        "cod": 12,
        "question": "13 - Rastreamento Comprometido",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - A criança geralmente faz uma varredura de matrizes sem erros." },
            { "value": "1", "label": "1 - Realiza varredura de matrizes com 6 a 8 itens, mas a partir de 10 itens começa a ter dificuldades." },
            { "value": "2", "label": "2 - Geralmente não consegue selecionar um item em uma matriz maior que 5 itens ou em um livro." },
            { "value": "3", "label": "3 - A varredura ocorre apenas em uma matriz de dois ou três estímulos." },
            { "value": "4", "label": "4 - Criança não faz a varredura, responde antes da varredura ou emite comportamento de fuga quando solicitada essa resposta." }
        ]
    },
    {
        "cod": 13,
        "question": "14 - Discriminação condicional falha",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - A criança realiza discriminações condicionais de modo equilibrado com suas pontuações de outros marcos." },
            { "value": "1", "label": "1 - A criança apresenta precisa de mais esforço em matrizes maiores contendo estímulos semelhantes." },
            { "value": "2", "label": "2 - Apresenta dificuldades quando a condição possui múltiplos estímulos verbais." },
            { "value": "3", "label": "3 - Falha na maioria das tarefas que exigem discriminação condicional. Emite comportamento negativo durante essas tarefas e pode ser difícil a aquisição desta habilidade." },
            { "value": "4", "label": "4 - Apesar de demonstrar habilidades de discriminação simples, não consegue realizar tarefas que contenham discriminação condicional." }
        ]
    },
    {
        "cod": 14,
        "question": "15 - Falha em generalizar",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - A criança apresenta generalização em um nível compatível com as suas habilidades." },
            { "value": "1", "label": "1 - Apresenta algum tipo de dificuldades para generalizar (Novos estímulos, uma área específica)." },
            { "value": "2", "label": "2 - A criança precisa de treinamento formal de generalização na maioria das habilidades." },
            { "value": "3", "label": "3 - É necessário fazer um trabalho maior e diversas vezes a criança “esquece” algumas respostas." },
            { "value": "4", "label": "4 - A criança não demonstra nenhum tipo de generalização para situações não treinadas." }
        ]
    },
    {
        "cod": 15,
        "question": "16 - Operações motivadoras fracas ou atípicas",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - A criança apresenta diversas OM apropriadas à idade." },
            { "value": "1", "label": "1 - OM ligeiramente diferentes de crianças com desenvolvimento típico." },
            { "value": "2", "label": "2 - A criança tem OM fracas para itens comuns da idade ou tem OM fortes para estímulos distintos do esperado (Movimentos estereotipados, brincar de uma forma 'não funcional')." },
            { "value": "3", "label": "3 - OM atípicas para reforçadores não aprendidos ou OM que enfraquece rapidamente após contato com o item." },
            { "value": "4", "label": "4 - Criança apresenta OM muito limitadas, 2 ou 3, sendo essas atípicas." }
        ]
    },
    {
        "cod": 16,
        "question": "17 - Custo de resposta enfraquece a OM",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - A criança em geral não perde o interesse quando demandas razoáveis são exigidas." },
            { "value": "1", "label": "1 - OM ligeiramente diferentes de crianças com desenvolvimento típico." },
            { "value": "2", "label": "2 - Caso a demanda fique muito alta ou apenas a sinalização de que pode ficar alta, a criança perde o interesse algumas vezes." },
            { "value": "3", "label": "3 - A criança demonstra muito interesse em diversos itens, mas quando uma exigência mais alta é colocada, esta rapidamente se afasta." },
            { "value": "4", "label": "4 - Criança foge da demanda, mesmo que seja para conseguir o mais potente dos seus reforçadores e que a demanda seja mínima." }
        ]
    },
    {
        "cod": 17,
        "question": "18 - Dependência de reforço",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - A criança não apresenta problemas com reforço intermitente, social ou verbal." },
            { "value": "1", "label": "1 - Prefere itens tangíveis ou comestíveis, embora consiga aceitar reforço social (mesmo relutante)." },
            { "value": "2", "label": "2 - A criança fica relutante em não receber os itens preferidos e a aprendizagem é mais lenta sem estes." },
            { "value": "3", "label": "3 - É difícil manter o atendimento caso não sejam entregues reforçadores frequentes para a criança (Ex. Não consegue emitir 3 ou 4 respostas sem o tangível)." },
            { "value": "4", "label": "4 - Uma grande quantidade de reforçadores tangíveis e comestíveis é necessária para ensino de uma única habilidade, sendo necessário esse mesmo nível para manter a ocorrência da resposta." }
        ]
    },
    {
        "cod": 18,
        "question": "19 - Autoestimulação",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - A criança não apresenta movimentos de autoestimulação fora do comum." },
            { "value": "1", "label": "1 - Se envolve em respostas de autoestimulação, mas que não concorrem com outras atividades importantes." },
            { "value": "2", "label": "2 - Criança emite respostas de autoestimulação, porém embora estas possam competir com outros reforçadores, a taxa de aquisição de novas habilidades se mantém." },
            { "value": "3", "label": "3 - Criança emite respostas de autoestimulação com alta frequência, as quais competem com atividades importantes. Em geral, costuma parar após repreensões verbais." },
            { "value": "4", "label": "4 - A criança frequentemente se engaja em alguma tipo de autoestimulação e os outros reforçadores são fracos. A aquisição de novas habilidades é lenta e prejudicada." }
        ]
    },
    {
        "cod": 19,
        "question": "20 - Dificuldades articulatórias",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - A maioria dos adultos consegue entender o que a criança diz." },
            { "value": "1", "label": "1 - Apresenta dificuldade na articulação de algumas palavras, mas a grande maioria consegue entender." },
            { "value": "2", "label": "2 - Tem habilidades do nível dois, mas pessoas estranhas têm dificuldade de entender o que é dito." },
            { "value": "3", "label": "3 - Habilidades vocais muito limitadas e demonstra uma grande variedade de erros de articulação." },
            { "value": "4", "label": "4 - A criança pontua em diversas habilidades, mas não fala ou tem uma fala completamente ininteligível." }
        ]
    },
    {
        "cod": 20,
        "question": "21 - Comportamento Obsessivo Compulsivo",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Não demonstra comportamento obsessivo que atrapalhe a aprendizagem." },
            { "value": "1", "label": "1 - Obsessões menores, mas que não atrapalham o aprendizado de outras habilidades." },
            { "value": "2", "label": "2 - Várias obsessões diferentes e apresenta comportamento negativo moderado quando não pode executar essas respostas. No entanto, aceita e participa das tarefas de aprendizagem sem maiores interrupções." },
            { "value": "3", "label": "3 - Emite respostas obsessivas diversas e fortes que impedem o aprendizado. Tem dificuldade de realizar a demanda exigida sem completar a obsessão." },
            { "value": "4", "label": "4 - Obsessão bastante consistente e são o foco/ações principais do dia." }
        ]
    },
    {
        "cod": 21,
        "question": "22 - Hiperatividade",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Não apresenta respostas hiperativas quando comparadas com outras crianças da idade." },
            { "value": "1", "label": "1 - Emite comportamento hiperativo ocasional ou perde o foco em atividades em andamento, mas sem prejuízo ao aprendizado." },
            { "value": "2", "label": "2 - Anda pelo ambiente com frequência maior que a dos colegas, apresenta dificuldade em realizar tarefas mais difíceis e estes comportamentos hiperativos interferem na aquisição de habilidades importantes." },
            { "value": "3", "label": "3 - Adultos têm dificuldade de controlar o comportamento hiperativo da criança. Apresenta dificuldades em esperar, permanecer sentado ou concluir atividade que envolva atenção." },
            { "value": "4", "label": "4 - Constantemente em movimento e o comportamento hiperativo é o foco/ações principais do dia." }
        ]
    },
    {
        "cod": 22,
        "question": "23 - Falha em manter o contato visual",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Realiza contato visual adequado para a idade e atende adequadamente as pessoas." },
            { "value": "1", "label": "1 - Não realiza contato visual semelhante aos pares." },
            { "value": "2", "label": "2 - A criança não realiza contato visual com frequência ou atenta para o rosto de outras pessoas." },
            { "value": "3", "label": "3 - Não realiza nenhum contato visual quando emite mandos e dificilmente realiza em outras circunstâncias." },
            { "value": "4", "label": "4 - Quase nunca faz contato visual." }
        ]
    },
    {
        "cod": 23,
        "question": "24 - Defesa sensorial",
        "options": [
            { "value": "SR", "label": "-" },
            { "value": "0", "label": "0 - Não apresenta problemas relacionados a estímulos sensoriais." },
            { "value": "1", "label": "1 - Apresenta uma sensibilidade a diversos estímulos, o que difere dos pares." },
            { "value": "2", "label": "2 - A criança é afetada por estimulação sensorial, mas geralmente não interfere nas atividades de aprendizagem." },
            { "value": "3", "label": "3 - Frequentemente foge de determinados estímulos e fica agitado caso a demanda não seja removida." },
            { "value": "4", "label": "4 - Reage a estímulos sensoriais específicos com respostas negativas mais graves (agressão, destruir itens)." }
        ]
    }
])
</script>