<template>
    <div id="app">
        <FormPopup/>
        <PersonsTable/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PersonsTable from "@/components/PersonsTable.vue";
import FormPopup from "@/components/FormPopup.vue";

export default Vue.extend({
    name: 'App',
    components: {
        FormPopup,
        PersonsTable,
    },
});
</script>

<style lang="scss">

body{
    margin: 15px;
    background-color: #efe3d8;
}
*,
*:before,
*:after{
    box-sizing: border-box;
}
.button{
    min-height: 40px;
    border: 0;
    padding: 10px 20px;
    font-weight: 700;
    text-transform: uppercase;
}
.button--primary{
    background-color: #e3aa5e;
}
.button--secondary{
    background-color: #a6a29d;
}
</style>
