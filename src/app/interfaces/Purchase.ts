export class OrderItem{
    productName:string;
    quantity:number;
    unitPrice:number;
    imageUrl:string;
    constructor(productName:string,quantity:number,unitPrice:number,imageUrl:string){
        this.imageUrl=imageUrl;
        this.productName=productName;
        this.quantity=quantity;
        this.unitPrice=unitPrice;
    }
}

export class Address{
    street:string;
    city:string;
    state:string;
    country:string;
    zipCode:string;
    constructor(street:string,city:string,state:string,country:string,zipCode:string){
        this.street=street;
        this.state=state;
        this.country=country;
        this.zipCode=zipCode;
        this.city=city;
    }
}

export class Customer{
    firstName:string;
    lastName:string;
    email:string;
    constructor(firstName:string,lastName:string,email:string){
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;
    }
}

export class Order{
    customer:Customer;
    shippingAddress:Address;
    billingAddress:Address;
    order:Object;
    orderItems:OrderItem[];
    constructor(customer:Customer,shippingAddress:Address,billingAddress:Address,
        order:Object, orderItems:OrderItem[]
    ){
        this.billingAddress=billingAddress;
        this.customer=customer;
        this.shippingAddress=shippingAddress;
        this.order=order;
        this.orderItems=orderItems;
    }
}

