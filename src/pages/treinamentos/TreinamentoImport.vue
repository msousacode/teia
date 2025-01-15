<template>
    <q-page padding>
        <div class="q-pa-md row items-start q-gutter-md">
            <q-card class="my-card bg-grey-2 full-width" v-for="item in treinamentos" :key="item.id">
                <q-card-section>
                    <q-chip color="blue-9" class="text-white" dense>{{ item.habilidade }}</q-chip>
                    <q-chip color="orange-10" class="text-white" dense>Protocolo ABC</q-chip>
                    <div class="text-body1 q-mb-md q-mt-md"><b>{{ item.titulo }}</b></div>

                    <div class="text-body2 text-justify">{{ item.descricao }}</div>
                </q-card-section>

                <q-separator dark />

                <q-card-actions>
                    <q-checkbox v-model="val" label="Selecionar para importar" />
                </q-card-actions>
            </q-card>
        </div>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="mdi-plus" color="blue-9" :to="{ name: 'aprendiz-novo' }" />
        </q-page-sticky>
    </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';

interface Treinamento {
    id: number;
    titulo: string;
    habilidade: "Atenção" | "Imitação" | "Linguagem Receptiva" | "Linguagem Expressiva" | "Pré-acadêmicas" | "Memória" | "Coordenação" | "Raciocínio" | "Socialização" | "Autoajuda";
    descricao: string;
    //procololo: "ABC" | "Ocorrência de Resposta"
}

const val = ref<boolean>(false);

const treinamentos = ref<Treinamento[]>([{ id: 1, titulo: 'Seguir Instruções de Dois Passos', habilidade: 'Atenção', descricao: 'A área da linguagem receptiva abrange habilidades relacionadas à compreensão da fala de outras pessoas. Para que esse tipo de compreensão aconteça é necessário relacionar aquilo que é ouvido a outros estímulos do ambiente ou a ações. Por exemplo, para atender ao pedido de alguém que diz "me dê" a bola é necessário que a pessoa que escuta a instrução consiga relacionar a palavra falada bola ao objeto bola, assim como relacionar a frase "me dê" à ação de entregar algo a alguém que faz o pedido. Crianças com autismo podem apresentar dificuldades em relacionar aquilo que é ouvido a outros estímulos do ambiente dou ações. Isso dificulta tanto a compreensão da linguagem quanto a interação social. Porém, é possível ensinar a elas habilidades que envolvam esse tipo de relação. O objetivo geral dos programas de ensino dessa área é ensinar comportamentos que vão melhorar a capacidade de fazer relações entre instruções verbais e ações ou outros estímulos do ambiente.' }, { id: 2, titulo: 'Imitar Movimentos Motores Grossos', habilidade: 'Linguagem Receptiva', descricao: 'A imitação é uma habilidade muito importante para o desenvolvimento e para a aprendizagem de novas habilidades. Quando não sabemos bem o fazer, observamos as outras pessoas e copiamos o modelo. Imagine que você nunca tenha viajando de abião; você chega ao aeroporto, não sabe o que fazer. observar as pessoas se direcionando para a fila e faz o mesmo que elas, se direcionando para a fila também. Nesse contexto, você aprende rapidamente o que deve s fazer sem que alguém tenha que te explicar. Assim, imitar e uma maneira de aprender habilidades novas quase que espontaneamente, sem a necessidade de instrução verbal, partindo da observação do comportamento de outas pessoas.' }, { id: 3, titulo: 'Sentar', habilidade: 'Imitação', descricao: 'Permanecer sentado é necessário em várias situações do cotidiano; na sala de aula, na sala de espera de um consultório, no ônibus, enquanto estamos almoçando ou quando estamos assistindo a um filme. Além disso, sentar é requisito para aprendizagens mais complexas como a leitura, a escrita e a matemática.\nConsidera-se que a criança aprendeu o comportamento de sentar quando ela é capaz de permanecer sentada por 30 minutos, levantando-se no máximo cinco vezes nesse período e voltando a se sentar imediatamente após o educador deve fazer e registrar a atividade diariamente.' }]);
</script>