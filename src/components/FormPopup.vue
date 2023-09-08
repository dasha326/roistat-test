<template>
    <div class="form-popup">
        <button class="button button--primary" type="button" @click="showModal()">Добавить</button>

        <dialog ref="formPopup" class="form-popup__content">
            <form ref="form" action="" class="form-popup__form form" @submit.prevent="submit()">
                <label
                    class="form__group"
                    v-for="(input, id) in inputs" :key="input.name"
                >
                    <span class="form__label">{{input.label}}</span>
                    <input
                        class="form__input"
                        :type="input.type"
                        :name="input.name"
                        :value="input.value"
                        :required="input.required"
                        @input="updateInput(id, $event.target.value)">
                </label>

                <label class="form__group" v-if="hasPersonsName">
                    <span class="form__label">Начальник</span>
                    <select class="form__select" name="parent" v-model="currentPersonId">
                        <option value="">Выберите начальника</option>
                        <option
                            v-for="(option, i) in currentPersonsNames"
                            :key="option+i"
                            :value="option.id"
                        >{{option.name}}</option>
                    </select>
                </label>

                <button class="form__button button button--primary" type="submit">Сохранить</button>
            </form>

            <div class="form-popup__bottom">
                <button class="button button--secondary" @click="closeModal()">Закрыть окно</button>
            </div>
        </dialog>
    </div>
</template>

<script>
import {mapState, mapMutations, mapActions} from 'vuex';
export default {
    name: "FormPopup",
    data(){
        return{
            currentPersonId: '',
        }
    },
    computed:{
        ...mapState(['formInputs', 'personsNames']),
        inputs(){
            return this.formInputs;
        },
        hasPersonsName(){
            return this.personsNames.length > 0;
        },
        currentPersonsNames(){
            return this.personsNames;
        }
    },
    methods: {
        ...mapMutations(['UPDATE_INPUT']),
        ...mapActions(['submitForm']),
        showModal(){
            this.$refs.formPopup.showModal();
        },
        closeModal(){
            this.$refs.formPopup.close();
        },
        updateInput(id, value){
            this.UPDATE_INPUT({id, value});
        },
        submit(){
            this.submitForm(this.currentPersonId);
            this.currentPersonId = '';
        }
    }
}
</script>

<style scoped lang="scss">
dialog::backdrop {
    background: rgba(#000000, .5);
}
.form-popup{
    &__content{
        border: 0;
        min-width: 400px;
        padding: 25px 20px;
    }
    &__bottom{
        text-align: right;
        margin-top: 30px;
    }
}
.form{
   &__group{
       display: block;
       margin-bottom: 20px;
   }
    &__label{
        display: block;
        font-weight: 700;
        margin-bottom: 10px;
    }
    &__input{
        padding: 5px 15px;
    }
    &__input,
    &__select{
        min-height: 40px;
        border: 1px solid #e3aa5e;
        width: 100%;
    }
    &__button{
        width: 100%;
    }
}
</style>