<template>
    <q-card class="my-card q-pa-md full-width">
        <canvas id="grafico" width="200" height="200"></canvas>
        <div class="text-center text-body1 text-teal">{{ nivel }}</div>
    </q-card>
</template>
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';

let myChart: ChartJS | null = null; // Declare myChart fora da função para manter o contexto  

import {
    Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale,
    PointElement,
    Title,
    LineElement,
} from 'chart.js/auto'
import { VbMappService } from 'src/services/VbMappService';

// Registre as escalas e elementos que você pretende usar  
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

export interface GraficoProps {
    label: string;
    avaliacaoId: string;
    nivel: string;
}

const props = withDefaults(defineProps<GraficoProps>(), {
    label: '',
    avaliacaoId: '',
    nivel: '',
});

const labelGrafico = props.label;

const dataGrafico = ref<any[]>([]);

const colorGrafico = ref('');

const vbmappService = new VbMappService();

function abrirGrafrico() {

    setTimeout(async () => {

        nextTick(() => { // Espera o próximo tick para garantir que o canvas esteja no DOM  
            const canvas = document.getElementById("grafico") as HTMLCanvasElement;

            if (canvas) {
                const ctx = canvas.getContext('2d');

                if (ctx) {
                    // Destruir o gráfico existente se houver  
                    if (myChart) {
                        myChart.destroy(); // Destroi o gráfico anterior  
                    }

                    // Definição dos dados  
                    const labels = props.nivel == 'Nível 1' ? ['Imitação', 'Ecoico', 'Ouvinte', 'VP/MTS', 'Mando', 'Tato', 'Brincar', 'Social', 'Vocal'] : props.nivel == 'Nível 2' ? ['Imitação', 'Ecoico', 'Ouvinte', 'VP/MTS', 'Mando', 'Tato', 'Brincar', 'Social', 'LRFFC', 'Interverbal', 'Grupo', 'Linguística'] : ['Mando', 'Tato', 'Ouvinte', 'VP/MTS', 'Brincar', 'Social', 'Leitura', 'Escrita', 'LRFFC', 'Interverbal', 'Vocal', 'Grupo', 'Linguística', 'Matemática'];
                    const data = {
                        labels: labels,
                        datasets: [
                            {
                                label: labelGrafico,
                                data: dataGrafico.value,
                                backgroundColor: colorGrafico.value,
                            },
                        ]
                    };

                    // Configurações do gráfico  
                    const config = {
                        type: 'bar',
                        data: data,
                        options: {
                            animation: false,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 0.5,
                                    },
                                },
                            }
                        }
                    };

                    // Criação do gráfico com as configurações apropriadas  
                    myChart = new ChartJS(ctx, config);
                } else {
                    console.error("Falha ao obter o contexto 2D do canvas.");
                }
            } else {
                console.error("Canvas não encontrado.");
            }
        });
    }, 700);
}

async function getColetaPontuacoes() {
    dataGrafico.value = (await vbmappService.getColetaPontuacoes(props.avaliacaoId)).data;
}

onMounted(async () => {
    abrirGrafrico();
    await getColetaPontuacoes();

    switch (props.nivel) {
        case 'Nível 1':
            colorGrafico.value = '#f2c037';
            break;
        case 'Nível 2':
            colorGrafico.value = '#228B22';
            break;
        case 'Nível 3':
            colorGrafico.value = '#00BFFF';
            break;
        default:
            return '';
    }
}) 
</script>