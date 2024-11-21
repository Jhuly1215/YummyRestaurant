/* eslint-disable */ 
<template>
    <div id="app" class="dashboard">
        <Sidebar @navigate="currentSection = $event" />
        <div class="main-content">
            <Topbar />
            <component :is="currentSection" />
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/SidebarComponent.vue';
import Topbar from '../components/TopbarComponent.vue';
import Section1 from '../ventanas/Section1Page.vue';
import Section2 from '../ventanas/Section2Page.vue';
import OfertasAdminComponent from '../ventanas/OfertasAdminComponent.vue'
import PlatillosAdminComponent from '@/components/PlatillosAdminComponent.vue';
import JReservasAdminComponent from '@/ventanas/reservas/Reservas.vue';

export default {
    name: "PanelAdministrativo",
    components: {
        Sidebar,
        Topbar,
        Section1,
        Section2,
        OfertasAdminComponent ,
        PlatillosAdminComponent,
        JReservasAdminComponent, 
    },
    data() {
        return {
            currentSection: 'Section1',
        };
    },
};
</script>

<style>
.dashboard {
    display: flex;
    height: 100vh;
}

.main-content {
    flex-grow: 1;
    background-color: #f8f9fa;
}
</style>