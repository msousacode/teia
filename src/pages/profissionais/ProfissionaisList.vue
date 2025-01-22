<template>
    <q-page class="q-pa-sm">

        <div class="row">
            <q-table :rows="list" :columns="columns" row-key="id" class="col-12"
                :rows-per-page-options="[50, 100, 150, 200]" :rows-per-page="50">
                <template v-slot:top>
                    <div class="text-h6 text-teal">Profissionais</div>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props" class="q-gutter-x-sm">
                        <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="editar(props.row)">
                            <q-tooltip> Edit </q-tooltip>
                        </q-btn>
                        <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="excluir(props.row)">
                            <q-tooltip> Delete </q-tooltip>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="mdi-plus" color="blue-9" :to="{ name: 'cadastrar' }" />
        </q-page-sticky>
    </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { ProfissionalService } from 'src/services/ProfissionalService';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const { error } = useNotify();

const $q = useQuasar();

const router = useRouter();

const service = new ProfissionalService();

const list = ref<any[]>([]);

function excluir(row: any) {
    console.log('Excluir', row);
}

function editar(row: any) {
    const email = row.email;
    router.push({ name: 'cadastrar', params: { email } });
}

onMounted(async () => {

    try {
        $q.loading.show();

        const usuarioId = JSON.parse(localStorage.getItem('user') || '').usuarioId;

        if (!usuarioId) {
            error('Erro ao recuperar userId');
            return;
        }

        const { data } = await service.getProfissionais(usuarioId);

        list.value = data;

    } catch (e) {
        error('Erro ao recuperar profissionais');
    } finally {
        $q.loading.hide();
    }
});

const columns = [
    {
        name: 'full_name',
        align: 'left',
        label: 'Nome',
        field: 'full_name',
        sortable: true,
    },
    {
        name: 'email',
        align: 'left',
        label: 'Email',
        field: 'email',
        sortable: true,
    },
    {
        name: 'perfil',
        align: 'left',
        label: 'Perfil',
        field: 'perfil',
        sortable: true,
    },
    {
        name: 'actions',
        align: 'right',
        label: 'Actions',
        field: 'actions',
        sortable: true,
    },
];

</script>