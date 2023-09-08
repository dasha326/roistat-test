<template>
    <section :style="cssVars">
        <h1>Таблица данных</h1>
        <div class="table">
            <div class="table__head">
                <div
                    class="table__title"
                    v-for="(item, i) in headers"
                    :key="item.name+i"
                    @click="$store.dispatch('sortParameters', item.name)"
                >{{ item.label }}</div>
            </div>
            <PersonsTableList :persons="currentPersons"/>
        </div>
    </section>
</template>

<script>
import {mapState} from 'vuex';
import PersonsTableList from "@/components/PersonsTableList";
export default {
    name: "PersonsTable",
    components: {PersonsTableList},
    data(){
        return{
        }
    },
    computed: {
        ...mapState(['formInputs', 'persons']),
        headers(){
            return this.formInputs
        },
        currentPersons(){
            return this.persons
        },
        cssVars () {
            return {
                '--table-colum': this.formInputs.length
            }
        }
    }
}
</script>

<style lang="scss">
.table{
    display: table;
    border-collapse: separate;
    border-spacing: 2px;
    border: 1px solid #000;
    min-width: 500px;
    &__head{
        display: grid;
        grid-template-columns: repeat(var(--table-colum), 1fr);
    }
    &__title{
        border: 1px solid #8f8f8f;
        padding: 10px;
        font-weight: 700;
        &:not(:last-child){
            margin-right: 2px;
        }
    }
    &__item:nth-child(even){
        background-color: #e8c799;
    }
}
</style>