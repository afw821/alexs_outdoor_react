import React, { Component } from "react";
import { getProductByPKId } from "../services/productService";
import _arrayBufferToBase64 from "../utils/toBase64String";

class OrderInfo extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const productsArray = [];
    const { user } = this.props;
    for (let i = 0; i < user.Purchases.length; i++) {
      const productId = user.Purchases[i].id;
      let { data: product } = await getProductByPKId(productId);
      product.imgSrc = _arrayBufferToBase64(product.data.data);
      productsArray.push(product);
    }

    this.setState({ products: productsArray });
  }

  render() {
    const { user } = this.props;
    if (user.Purchases.length === 0)
      return <div>{`You have no purchases ${user.firstName}!`}</div>;
    else {
      return (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Purchase Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product) => (
              <tr key={product.id}>
                <th>{product.name}</th>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>{product.createdAt}</td>
                <td>
                  <img
                    style={{ maxHeight: "100px", maxWidth: "100px" }}
                    src={`data:image/png;base64,${product.imgSrc}`}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }
}

export default OrderInfo;

// const OrderInfo = (props) => {
//   const [products, setProducts] = useState([]);
//   const { user } = props;
//   console.log('order info user', user);
//   useEffect(() => {

//   }, []);
//   //first render then when it re renders after getting user it falls into else if block not sure why
//   if (user.Purchases.length == 0)
//     return <div>{`You have no purchases ${user.firstName}!`}</div>;
//   else {
//     console.log('made it into the else gyt!!');

//     return (
//       <table className="table">
//         <thead className="thead-dark">
//           <tr>
//             <th scope="col">Name</th>
//             <th scope="col">Price</th>
//             <th scope="col">Description</th>
//             <th scope="col">Purchase Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <th>{product.name}</th>
//               <td>${product.price}</td>
//               <td>{product.description}</td>
//               <td>{product.createdAt}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   }

// };

// export default OrderInfo;
