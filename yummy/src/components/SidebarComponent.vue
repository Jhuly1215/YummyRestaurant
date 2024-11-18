/* eslint-disable */ 
<template>
    <div class="sidebar">
        <h2 class="logo">Yummy</h2>
        <ul>
            <li @click="navigate('Section1')">Dashboard</li>
            <li>Usuarios</li>
            <li @click="navigate('OfertasAdminComponent')">Ofertas</li>
            <li>Platillos</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "SidebarComponent",
    methods: {
        navigate(section) {
            this.$emit('navigate', section);
        },
    },
};
</script>

<style>
.sidebar {
    width: 250px;
    background-color: #FE9900;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    padding: 10px 0;
    cursor: pointer;
    transition: background 0.3s;
}

li:hover {
    background: #A16F23;
}
</style>