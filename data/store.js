/* ---------------
// Vuex Store
--------------- */

const pkgDemo1 = new Package({ 
  // id: Date.now(), 
  description: 'Demo package', 
  category: 'equipment',
  date: getDateString(),
  width: 20, 
  height: 20, 
  length: 10, 
  weight: 1, 
  price: 100,  
  // amount: 0
});

const store = new Vuex.Store({
    state: {
      packages: [ pkgDemo1 ],
    },

    getters: {
      getPackages: (state) => () => {
        return state.packages;
      },
      getPackageByID: (state, id) => () => {
        return state.packages.find(p => p.id === id);
      },
    },

    mutations: {
      ADD_PACKAGE(state, value) {
        console.log('ADD_PACKAGE', value);
        state.packages.push(value);
      },
      DELETE_PACKAGE(state, id) {
        console.log('DELETE_PACKAGE', id);
        state.packages = state.packages.filter(p => p.id !== id);
      },
    },
    
    actions: {
      addPackage(context, value) {
        context.commit("ADD_PACKAGE", value);
      },
      deletePackage(context, id) {
        context.commit("DELETE_PACKAGE", id);
      },
    },
  });