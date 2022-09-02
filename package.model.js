/* ---------------
// Model
--------------- */

class Package {
    constructor(params = {}) {
        params = Object.assign({
            id: Date.now(), 
            description: '', 
            length: 0, 
            height: 0, 
            wide: 0, 
            weight: 0, 
            price: 0,
            amount: 0
        }, params);
        this.id = params.id;
        this.description = params.description;
        this.length = params.length;
        this.height = params.height;
        this.wide = params.wide;        
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

