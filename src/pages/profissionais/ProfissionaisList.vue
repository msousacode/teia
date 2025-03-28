<template>
    <q-page class="q-pa-sm">
        <div class="row justify-center">
            <div class="row col-md-7 col-xs-12 col-sm-12">
                <q-table :rows="list" :columns="columns" row-key="id" class="col-12"
                    :rows-per-page-options="[50, 100, 150, 200]" :rows-per-page="50">
                    <template v-slot:top>
                        <div class="text-h6">Profissionais</div>
                    </template>
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props" class="q-gutter-x-sm">
                            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="editar(props.row)">
                                <q-tooltip> Edit </q-tooltip>
                            </q-btn>
                            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm"
                                @click="excluir(props.row)">
                                <q-tooltip> Delete </q-tooltip>
                            </q-btn>
                        </q-td>
                    </template>
                </q-table>
            </div>
        </div>

        <div class="row justify-center">
            <q-card class="q-pa-md q-mt-sm col-md-7 col-xs-12 col-sm-12">
                <div class="q-gutter-x-md row justify-end">
                    <q-btn color="secondary" :to="{ name: 'cadastrar' }">Incluir</q-btn>
                </div>
            </q-card>
        </div>
    </q-page>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import useNotify from 'src/composables/UseNotify';
import { ProfissionalService } from 'src/services/ProfissionalService';
import { onMounted, ref, toRaw } from 'vue';
import { useRouter } from 'vue-router';

const { success, error } = useNotify();

const $q = useQuasar();

const router = useRouter();

const service = new ProfissionalService();

const list = ref<any[]>([]);

function excluir(row: any) {

    $q.dialog({
        title: 'Confirma a exclusão do Profissional?',
        ok: true,
        cancel: true,
    })
        .onOk(async () => {

            const { status } = await service.delete(toRaw(row).email);

            if (status == 200) {
                success('Profissional excluído com sucesso!');
                await getProfissionais();
            }
        })
        .onDismiss(() => { });
}

function editar(row: any) {
    const email = row.email;
    router.push({ name: 'cadastrar', params: { email } });
}

async function getProfissionais() {
    const usuarioId = JSON.parse(localStorage.getItem('user') || '').usuarioId;

    if (!usuarioId) {
        error('Erro ao recuperar userId');
        return;
    }

    const { data } = await service.getProfissionais(usuarioId);
    list.value = data;
}

onMounted(async () => {

    try {
        $q.loading.show();
        await getProfissionais();
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