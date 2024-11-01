<template>
    <q-page padding>
        <q-tabs v-model="tab" dense class="text-grey" active-color="primary" indicator-color="primary" align="justify"
            narrow-indicator>
            <q-tab name="nivel1" label="Nível 1" />
            <q-tab name="nivel2" label="Nível 2" />
            <q-tab name="nivel3" label="Nível 3" />
        </q-tabs>


        <q-tab-panels v-model="tab">
            <q-tab-panel name="nivel1">
                <q-card flat bordered class="my-card" :class="'bg-orange-1'">
                    <q-card-section>
                        <div class="row items-center no-wrap">
                            <div class="col">
                                <div class="text-subtitle1"><b>(1)</b> Emite 2 palavras, sinais ou utiliza figuras, mas
                                    pode
                                    requerer dica ecóica, imitativa ou outro tipo, desde que não seja dica física(ex.
                                    biscoito, livro) (O/T)</div>
                            </div>
                        </div>
                    </q-card-section>

                    <div class="q-pa-md q-gutter-y-md items-center">
                        <q-btn-group>
                            <q-btn label="Sim" color="teal" />
                            <q-btn label="Às vezes" />
                            <q-btn label="Não" />
                            <q-btn label="NA" />
                        </q-btn-group>
                    </div>
                </q-card>
                <div class="q-mb-md"></div>
                <q-card flat bordered class="my-card" :class="'bg-grey-2'">
                    <q-card-section>
                        <div class="row items-center no-wrap">
                            <div class="col">
                                <div class="text-subtitle1"><b>(2)</b> Emite 4 mandos diferentes sem dicas (exceto O que
                                    você quer?) - o item desejado pode estar presente (ex. música, comida, bola ) (O/T)
                                </div>
                            </div>
                        </div>
                    </q-card-section>

                    <div class="q-pa-md q-gutter-y-md items-center">
                        <q-btn-group>
                            <q-btn label="Sim" color="teal" />
                            <q-btn label="Às vezes" />
                            <q-btn label="Não" />
                            <q-btn label="NA" />
                        </q-btn-group>
                    </div>
                </q-card>
                <div class="q-mb-md"></div>
                <q-card flat bordered class="my-card" :class="'bg-grey-2'">
                    <q-card-section>
                        <div class="row items-center no-wrap">
                            <div class="col">
                                <span class="text-subtitle1">1</span>
                                <div class="text-subtitle1">Emite 2 palavras, sinais ou utiliza figuras, mas pode
                                    requerer dica ecóica, imitativa ou outro tipo, desde que não seja dica física(ex.
                                    biscoito, livro) (O/T)</div>
                            </div>
                        </div>
                    </q-card-section>

                    <div class="q-pa-md q-gutter-y-md items-center">
                        <q-btn-group>
                            <q-btn label="Sim" color="teal" />
                            <q-btn label="Às vezes" />
                            <q-btn label="Não" />
                            <q-btn label="NA" />
                        </q-btn-group>
                    </div>
                </q-card>
                <div class="q-mb-md"></div>
                <q-card flat bordered class="my-card" :class="'bg-grey-2'">
                    <q-card-section>
                        <div class="row items-center no-wrap">
                            <div class="col">
                                <span class="text-subtitle1">1</span>
                                <div class="text-subtitle1">Emite 2 palavras, sinais ou utiliza figuras, mas pode
                                    requerer dica ecóica, imitativa ou outro tipo, desde que não seja dica física(ex.
                                    biscoito, livro) (O/T)</div>
                            </div>
                        </div>
                    </q-card-section>

                    <div class="q-pa-md q-gutter-y-md items-center">
                        <q-btn-group>
                            <q-btn label="Sim" color="teal" />
                            <q-btn label="Às vezes" />
                            <q-btn label="Não" />
                            <q-btn label="NA" />
                        </q-btn-group>
                    </div>
                </q-card>
            </q-tab-panel>

            <q-tab-panel name="nivel2">
                Teste 2
            </q-tab-panel>

            <q-tab-panel name="nivel3">
                Test3
            </q-tab-panel>
        </q-tab-panels>

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="save" color="green" @click="salvar" />
        </q-page-sticky>
    </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('nivel1');

function salvar() {

}
</script>