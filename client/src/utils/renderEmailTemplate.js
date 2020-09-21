export default function renderEmailTemplate(purchasObj) {
  console.log("purchase obj", purchasObj);

  purchasObj.map(function (item, index) {
    console.log(item.product);
    const { product } = item;
    const id = product.id;
    const productName = product.name;
    const price = product.price;
    const imgSrc = product.imgSrc;
    console.log(id, productName, price, imgSrc);
    //const row
  });
}
