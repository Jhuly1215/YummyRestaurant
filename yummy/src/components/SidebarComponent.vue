/* eslint-disable */ 
<template>
    <div class="sidebar">
        <h2 class="logo">Yummy</h2>
        <div class="opciones">
            <a><router-link to="/panelAdministrativo/section1" active-class="active-link" class="sidebar-link">Dashboard</router-link></a>
            <a><router-link to="/panelAdministrativo/ofertas" active-class="active-link" class="sidebar-link">Ofertas</router-link></a>
            <a><router-link to="/panelAdministrativo/platillos" active-class="active-link" class="sidebar-link">Platillos</router-link></a>
            <a><router-link to="/panelAdministrativo/reservas" active-class="active-link" class="sidebar-link">Reservas</router-link></a>
        </div>
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
.opciones {
  display: flex;
  flex-direction: column;
}

.sidebar-link {
  display: flex;
  align-items: center;
  position: relative;
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}


.sidebar-link:hover {
  background-color: #a16f23; 
}

.active-link {
  background-color: #a16f23; 
  font-weight: bold;
}

/* Triángulo decorativo en la opción activa */
.active-link::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 0 10px 10px;
  border-color: transparent transparent transparent #a16f23; /* Triángulo marrón */
}
</style>