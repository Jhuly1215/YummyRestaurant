/* eslint-disable */ 
<template>
    <div class="topbar">
        <div class="user-menu">
            <span class="username">Franklin Hall</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "TopbarComponent",
};
</script>

<style>
.topbar {
    height: 60px;
    background-color: #ecf0f1;
    display: flex;
    align-items: center;
    justify-content: end;
    padding: 0 20px;
    border-bottom: 1px solid #dcdcdc;
}

.user-menu {
    display: flex;
    align-items: center;
}

.username {
    margin-right: 10px;
    font-weight: bold;
}
</style>