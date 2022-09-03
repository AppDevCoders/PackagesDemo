/* ---------------
// Vue App
--------------- */

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  store: store,
  data: () => ({    
    // menu
    manuItems: [
      { id: "menuSettings", title: "Settings", icon: 'mdi-cog' },
      { id: "menuProfile", title: "Profile", icon: 'mdi-account' },
      { id: "menuAbout", title: "About", icon: 'mdi-information' },
    ],
    // images
    images: [
      { src: './assets/images/pak1.png', },
      { src: './assets/images/pak2.jpg', },
      { src: './assets/images/pak3.jpg', },
      { src: './assets/images/pak4.png', },
    ],
    // table headers
    tableHeaders: [
      // {
      //   text: "ID",
      //   align: "center",
      //   sortable: true,
      //   value: "id",
      // },
      {
        text: "Description",
        align: "center",
        sortable: true,
        value: "description",
      },
      {
        text: "Category",
        align: "center",
        sortable: true,
        value: "category",
      },
      {
        text: "Date",
        align: "center",
        sortable: true,
        value: "date",
      },
      {
        text: "Width",
        align: "center",
        sortable: true,
        value: "width",
      },
      {
        text: "Height",
        align: "center",
        sortable: true,
        value: "height",
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
        text: "Price",
        align: "center",
        sortable: true,
        value: "price",
      },
      {
        text: "Amount", 
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
    // form 
    valid: false,
    description: '',
    descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length >= 5) || 'Description must be at less 5 characters',
    ],
    category: '',
    categoryRules: [
      v => !!v || 'Required',      
      v => (v && v.length > 0) || 'Required',
    ],
    categories: [
      "equipment", "electronic", "art", "material", "organic", "other"
    ], 
    datePicker1: false,
    date: '', 
    dateFormatted: '',
    dateRules: [
      v => !!v || 'Required',      
      v => (v && v.length === 10) || 'Enter a date',
    ],
    price: '',
    priceRules: [
      v => !!v || 'Required',      
      v => !isNaN(v) || 'Must be a number',
      v => (v && +v > 0) || 'Must be positive',
    ],
    width: '',
    widthRules: [
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
    length: '',
    lengthRules: [
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
    // snackbar related
    snackbar: false,
    snackbarText: "",
    // dialog
    deleteItem: {},
    dialog: false,
    // alert
    alert: false,
    // spinner
    spinner: false,
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

  // Observable
  watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
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
        category: this.category,
        date: this.date,
        width: +this.width, 
        height: +this.height, 
        length: +this.length, 
        weight: +this.weight,
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

    // DD/MM/YYYY
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    // DD/MM/YYYY -> YYYY/MM/DD
    parseDate (date) {
      if (!date) return null
      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
});
