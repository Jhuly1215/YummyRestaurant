/* eslint-disable */
<template>
    <div id="app" class="dashboard">
        <Sidebar @navigate="currentSection = $event" />
        <div class="main-content">
            <component :is="currentSection" />
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/SidebarComponent.vue';
import Topbar from '../components/TopbarComponent.vue';
import DashboardComponent from '../ventanas/dashboardComponent.vue';
import OfertasAdminComponent from '../ventanas/OfertasAdminComponent.vue'
import PlatillosAdminComponent from '@/components/PlatillosAdminComponent.vue';

export default {
    name: "PanelAdministrativo",
    components: {
        Sidebar,
        Topbar,
        DashboardComponent,
        OfertasAdminComponent
    },
    data() {
        return {
            currentSection: 'DashboardComponent',
        };
    },
};
</script>

<style>
.dashboard {
    display: flex;
    height: 100vh;
    padding-bottom: 0;
}

.main-content {
    flex-grow: 1;
    background-color: #f8f9fa;
    overflow-y: auto;
    /* Permite desplazamiento vertical si el contenido excede */
}
</style>