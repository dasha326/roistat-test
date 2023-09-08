import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
interface IPerson {
  id: number,
  parameters: Record<string, string>,
  children?: Array<IPerson>
}
interface IPersonNames {
  id: number,
  name: string
}
interface IFormInput {
  name: string,
  label: string,
  type: string,
  value: string,
  required: boolean,
}
interface IState {
  formInputs: Array<IFormInput>
  persons: Array<IPerson>
  personsNames: Array<IPersonNames>
}
export default new Vuex.Store({
  state: {
    formInputs:[
      {
        name: 'name',
        label: 'Имя',
        type: 'text',
        value: '',
        required: true,
      },
      {
        name: 'phone',
        label: 'Телефон',
        type: 'tel',
        value: '',
        required: true,
      }
    ],
    persons: [],
    personsNames: [],
  } as IState,
  getters: {},
  mutations: {
    ADD_PERSON(state, parameters){
      state.persons.push(parameters);
    },
    UPDATE_INPUT(state, {id, value}){
      state.formInputs[id].value = value
    },
    UPDATE_PERSON(state, {parentId, parameters}){
      function findCurrentParent(arr:Array<IPerson>, itemId:number){
        arr.forEach(item => {
          if (item.id === itemId) {
            if (!item.children) item.children = [];
            item.children.push(parameters);
          } else if(item.children) {
            findCurrentParent(item.children, parentId);
          }
        })
      }
      findCurrentParent(state.persons, parentId);
      state.persons =  JSON.parse(JSON.stringify(state.persons));
    },
    SORT_PERSONS(state, parameter){
      function sortPerson(arr:Array<IPerson>, parameter:string){
        arr.forEach(item => {
          if (item.children) sortPerson(item.children, parameter);
        })
        return arr.sort((a, b) => {
          if (a.parameters.name.toLowerCase() > b.parameters.name.toLowerCase())  return 1;
          if (a.parameters.name.toLowerCase() < b.parameters.name.toLowerCase())  return -1;
          return 0;
        })
      }
      sortPerson(state.persons, parameter);

      state.persons =  JSON.parse(JSON.stringify(state.persons));
    }

  },
  actions: {
    sortParameters({commit}, parameter:string) {
      commit('SORT_PERSONS', parameter);
    },
    submitForm({state, commit}, parentId:null|number){
      const personId = Date.now();
      const personParameters:Record<string, string> = {};

      state.formInputs.forEach((item, id) => {
        personParameters[item.name] = item.value;
        commit('UPDATE_INPUT', {id, value:''});
      })

      state.personsNames.push({
        id: personId,
        name: personParameters.name
      })

      const parameters = {
        id: personId,
        parameters: personParameters,
      } as IPerson;

      if (parentId !== null){
        commit('UPDATE_PERSON', {parentId, parameters})
      } else {
        commit('ADD_PERSON', parameters)
      }
    }
  },
  modules: {
  }
})
