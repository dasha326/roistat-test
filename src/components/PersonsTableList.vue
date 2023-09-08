<template>
    <ul class="table__list">
        <PersonsTableRow v-for="(item, i) in persons" :key="item+i" :person="item">
            <PersonsTableList :persons="item.children"/>
        </PersonsTableRow>
    </ul>
</template>

<script>
import PersonsTableRow from "@/components/PersonsTableRow";
import PersonsTableList from "@/components/PersonsTableList";

export default {
    name: "PersonsTableList",
    components: {PersonsTableRow, PersonsTableList},
    props: {
        persons: Array,
    }
}
</script>

<style scoped lang="scss">
.table__list {
    margin: 0;
    padding: 0;
    list-style: none;
    width: 100%;
}
</style>