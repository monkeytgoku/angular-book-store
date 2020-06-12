class Product {
  title: string;
  price: number;
  constructor(title, price) {
    this.title = title;
    this.price = price;
  }

  getPrice() {
    return this.price;
  }
}

export default Product;
