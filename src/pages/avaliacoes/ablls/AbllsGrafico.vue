<template>
    <q-card class="my-card q-pa-md full-width">
        <canvas id="grafico" width="200" height="200"></canvas>
        <div class="text-center text-body1 text-teal">{{ titulo }}</div>
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
import { AbllsService } from 'src/services/AbllsService';

// Registre as escalas e elementos que você pretende usar  
ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

export interface GraficoPortageProps {
    label: string;
    avaliacaoId: string;
    titulo: string;
    idade?: string;
    nivel: string
}

const props = withDefaults(defineProps<GraficoPortageProps>(), {
    label: '',
    avaliacaoId: '',
    nivel: '',
    idade: ''
});

const labelGrafico = props.label;

const dataGrafico = ref<any[]>([]);

const abllsService = new AbllsService();

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
                    const labels = [`TOTAL ATINGIDO ${dataGrafico.value[0]}`, `TOTAL ESPERADO ${dataGrafico.value[1]}`];
                    const data = {
                        labels: labels,
                        datasets: [
                            {
                                label: labelGrafico,
                                data: dataGrafico.value,
                                backgroundColor: [
                                    '#66c266', // Cor da barra 1  
                                    '#5fb0d8', // Cor da barra 2                                      
                                ]
                            }
                        ],
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
                                        // Formatação dos ticks do eixo Y para mostrar uma casa decimal  
                                        callback: function (value) {
                                            return value.toFixed(1); // Exibe uma casa decimal  
                                        }
                                    }
                                },
                            },
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
    const { data } = await abllsService.getColetaPontuacoes(props.avaliacaoId, props.nivel);
    const aa = data.map(i => i.toFixed(0));
    dataGrafico.value = aa;
}

onMounted(async () => {
    await getColetaPontuacoes();
    abrirGrafrico();
}) 
</script>