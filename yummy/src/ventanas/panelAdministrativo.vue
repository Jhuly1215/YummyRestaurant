/* eslint-disable */ 
<template>
    <div id="app" class="dashboard">
        <Sidebar />
            <div class="main-content">
            <Topbar />
            <router-view />
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/SidebarComponent.vue';
import Topbar from '../components/TopbarComponent.vue';


export default {
    name: "PanelAdministrativo",
    components: {
        Sidebar,
        Topbar,

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