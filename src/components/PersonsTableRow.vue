<template>
    <li class="table__item table-item">
        <div class="table-item__row">
            <button v-if="isParent" class="table-item__button" @click="buttonClickHandler">+</button>

            <div class="table-item__cell" v-for="(parameter, i) in person.parameters" :key="parameter+i">
                {{ parameter }}
            </div>
        </div>
        <div class="table-item__dropdown" v-show="childIsOpen">
            <slot></slot>
        </div>
    </li>
</template>

<script>
export default {
    name: "PersonsTableRow",
    props: {
        person: Object,
    },
    data() {
        return {
            childIsOpen: false,
        }
    },
    computed: {
        isParent() {
            return !!this.person.children;
        }
    },
    methods: {
        buttonClickHandler() {
            this.childIsOpen = !this.childIsOpen;
        }
    }
}
</script>

<style scoped lang="scss">
.table-item {
    $root: &;
    margin-top: 2px;

    &__row {
        display: grid;
        grid-template-columns: repeat(var(--table-colum), 1fr);
        position: relative;
    }

    &__cell {
        display: table-cell;
        border: 1px solid #8f8f8f;
        padding: 10px;

        &:not(:last-child) {
            margin-right: 2px;
        }
    }

    &__button {
        position: absolute;
        height: 100%;

        + #{$root}__cell {
            padding-left: 30px;
        }
    }

    &__dropdown {
        padding: 0 5px;
    }
}
</style>