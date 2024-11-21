/* eslint-disable */
<template>
    <div class="sidebar">
        <h2 class="logo">Yummy</h2>
        <ul>
            <li :class="{ active: selectedSection === 'DashboardComponent' }" @click="navigate('DashboardComponent')">
                Dashboard
            </li>
            <li :class="{ active: selectedSection === 'Usuarios' }" @click="navigate('Usuarios')">
                Usuarios
            </li>
            <li :class="{ active: selectedSection === 'OfertasAdminComponent' }"
                @click="navigate('OfertasAdminComponent')">
                Ofertas
            </li>
            <li :class="{ active: selectedSection === 'Platillos' }" @click="navigate('Platillos')">
                Platillos
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    name: "SidebarComponent",
    data() {
        return {
            selectedSection: 'DashboardComponent', // Define una sección predeterminada
        };
    },
    methods: {
        navigate(section) {
            this.selectedSection = section;
            this.$emit('navigate', section);
        },
    },
};
</script>

<style scoped>
.sidebar {
    width: 250px;
    background-color: #FE9900;
    color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    animation: slideInFromLeft 1s ease-out;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
    opacity: 0;
    animation: fadeIn 1s ease-in forwards;
    /* Aparece con un desvanecimiento */
    animation-delay: 0.3s;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    padding: 10px 0;
    cursor: pointer;
    transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;
    opacity: 0;
    animation: fadeIn 1s ease-in forwards;
    /* Cada elemento aparece con retraso */
}

li:hover {
    background: #A16F23;
    transform: translateX(5px);
    /* Mueve ligeramente hacia la derecha */
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
    /* Efecto glow */
}

li.active {
  background-color: #A16F23; /* Color para la opción seleccionada */
  font-weight: bold; /* Resalta el texto */
  border-left: 4px solid white; /* Indicador visual adicional */
  transform: translateX(0); /* Evita el movimiento al pasar el mouse */
}

li:nth-child(1) {
    animation-delay: 0.5s;
}

li:nth-child(2) {
    animation-delay: 0.7s;
}

li:nth-child(3) {
    animation-delay: 0.9s;
}

li:nth-child(4) {
    animation-delay: 1.1s;
}

/* Keyframes para animaciones */
@keyframes slideInFromLeft {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>
