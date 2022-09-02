/* ---------------
// Vue App
--------------- */

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  store: store,
  data: () => ({
    // spinner
    spinner: false,
    // menu
    manuItems: [
      { id: "menuSettings", title: "Settings", icon: 'mdi-cog' },
      { id: "menuProfile", title: "Profile", icon: 'mdi-account' },
      { id: "menuAbout", title: "About", icon: 'mdi-information' },
    ],
    // table headers
    tableHeaders: [
      {
        text: "ID",
        align: "center",
        sortable: true,
        value: "id",
      },
      {
        text: "Description",
        align: "center",
        sortable: true,
        value: "description",
      },
      {
        text: "Length",
        align: "center",
        sortable: true,
        value: "length",
      },
      {
        text: "Weight",
        align: "center",
        sortable: true,
        value: "weight",
      },
      {
        text: "Height",
        align: "center",
        sortable: true,
        value: "height",
      },
      {
        text: "Price",
        align: "center",
        sortable: true,
        value: "price",
      },
      {
        text: "Amount", // Virtual
        align: "center",
        sortable: true,
        value: "amount",
      },
      {
        text: "Actions", // Buttons
        align: "center",
        sortable: false,
        value: "actions",
      },
    ],
    totalAmount: 0,
    // snackbar related
    snackbar: false,
    snackbarText: "",
    // dialog
    deleteItem: {},
    dialog: false,
    // alert
    alert: false,
    // form 
    valid: false,
    description: '',
    descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length >= 5) || 'Description must be at less 5 characters',
    ],
    price: '',
    priceRules: [
        v => !!v || 'Required',      
        v => !isNaN(v) || 'Must be a number',
        v => (v && +v > 0) || 'Must be positive',
    ],
    length: '',
    lengthRules: [
        v => !!v || 'Required',      
        v => !isNaN(v) || 'Must be a number',
        v => (v && +v > 0) || 'Must be positive',
    ],
    height: '',
    heightRules: [
        v => !!v || 'Required',      
        v => !isNaN(v) || 'Must be a number',
        v => (v && +v > 0) || 'Must be positive',
    ],
    wide: '',
    wideRules: [
        v => !!v || 'Required',      
        v => !isNaN(v) || 'Must be a number',
        v => (v && +v > 0) || 'Must be positive',
    ],
    weight: '',
    weightRules: [
        v => !!v || 'Required',      
        v => !isNaN(v) || 'Must be a number',
        v => (v && +v > 0) || 'Must be positive',
    ],
    // images
    images: [
      { src: './assets/images/pak1.png', },
      { src: './assets/images/pak2.jpg', },
      { src: './assets/images/pak3.jpg', },
      { src: './assets/images/pak4.png', },
    ],
  }),

  // Run at the start
  created() {
    console.log("created()");
  },

  // Dynamic properties 
  computed: {
    getPackages() {
      const list = this.$store.getters.getPackages();
      this.totalAmount = list.reduce((acum, item) => { 
        return acum + item.amount;
      }, 0);
      return list;
    },
  },

  // Methods
  methods: {

    resetForm() {
      // clear from
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    },

    addPackage() {
      console.log("add package");
      const package = new Package({
        description: this.description,
        length: +this.length,
        weight: +this.weight,
        height: +this.height,
        price: +this.price,
      });
      this.$store.dispatch("addPackage", package);
      this.resetForm();            
      this.showSpinner(1000); // simulate delay 1 second
    },

    showSpinner(duration = 1000) {
      this.spinner = true; // activate spinner
      // deactivate spinner after 1 second
      setTimeout(() => { this.spinner = false }, duration); 
    },

    deleteDialog(item) {
      console.log("delete dialog", JSON.stringify(item));      
      this.dialog = true;
      this.deleteItem = item;
    },

    deletePackage(id) {
      console.log("delete package", id);
      this.$store.dispatch("deletePackage", id);
      this.dialog = false;
      this.showSpinner(1000); // simulate delay 1 second
    },

    menu(option) {
      this.showMessage("Menu -> " + option.title);
    },

    showMessage(message) {
      if (message) {
        console.log("showMessage()", message);
        this.snackbarText = message;
        this.snackbar = true;
      }
    },

    openAlert() {
        console.log("alert");
        this.alert = true;
    },
  },
});
