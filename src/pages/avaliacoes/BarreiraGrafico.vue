<template>
    <q-card class="my-card q-pa-md full-width">
        <canvas id="grafico" width="200" height="400"></canvas>
        <div class="text-center text-body1 text-teal">Barreiras</div>
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
    aprendizId: string;
    label: string;
    avaliacaoId: string;
    nivel: string;
}

const props = withDefaults(defineProps<GraficoProps>(), {
    aprendizId: '',
    label: '',
    avaliacaoId: '',
    nivel: '',
});

const labelGrafico = props.label;

const dataGrafico = ref<any[]>([]);

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
                    const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'];
                    const data = {
                        labels: labels,
                        datasets: [
                            {
                                label: labelGrafico,
                                data: dataGrafico.value,
                                backgroundColor: '#00BFFF',
                            },
                        ]
                    };

                    // Configurações do gráfico  
                    const config = {
                        type: 'bar', // Mantenha 'bar' para o Chart.js  
                        data: data,
                        options: {
                            animation: false,
                            indexAxis: 'y', // Altera o eixo para horizontal  
                            scales: {
                                x: { // Eixo X para o gráfico horizontal  
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 0.5,
                                    },
                                },
                                y: { // Eixo Y para o gráfico horizontal  
                                    beginAtZero: true,
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
    dataGrafico.value = (await vbmappService.getChartBarreiras(props.aprendizId)).data;
    console.log(dataGrafico.value);
}

onMounted(async () => {
    abrirGrafrico();
    await getColetaPontuacoes();
}) 
</script>