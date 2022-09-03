/* ---------------
// Model
--------------- */

class Package {
    constructor(params = {}) {
        params = Object.assign({
            id: Date.now(), 
            description: '', 
            date: getDateString(),
            category: 'equipment',
            width: 0, 
            height: 0, 
            length: 0, 
            weight: 0, 
            price: 0,
            amount: 0
        }, params);
        this.id = params.id;
        this.description = params.description;
        this.date = params.date;
        this.category = params.category;
        this.width = params.width;   
        this.height = params.height; 
        this.length = params.length; 
        this.weight = params.weight;        
        this.price = params.price;        
        // this.amount = params.amount; 
        this.updateAmount();
    }

    // use formula
    updateAmount() {
        this.amount = formula(this);
    }
}

