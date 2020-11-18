import { purchase } from "../services/purchaseService";
import { regenerateToken, loginWithJwt } from "../services/authService";
import { sendEmailPurchase } from "../services/emailService";
import { toast } from "react-toastify";
import { updateProductQuant } from "../services/productService";
import renderEmailTemplate from "./../utils/renderEmailTemplate";
//This is called after Stripe payment is successful
export async function makePurchase(
  productsInCart,
  handleToggleLoader,
  user,
  stripePaymentId
) {
  const { firstName, lastName, email, id } = user;

  handleToggleLoader();

  productsInCart.forEach(async (product, index, array) => {
    try {
      const userQuant = product.quantity;
      const ProductId = product.product.id;
      const purchaseName = `UserId# ${id} ${lastName}, ${firstName} - ID# ${ProductId} / ${product.product.name}`;
      //first we update the product for new quantity
      const { data: updateResult } = await updateProductQuant(
        userQuant,
        ProductId
      );
      //if that's successful then we post the purchase
      if (updateResult) {
        var purchaseResult = await purchase(
          purchaseName,
          user.id,
          ProductId,
          userQuant,
          stripePaymentId
        );
      }

      if (purchaseResult.status === 200 && index === 0) {
        setTimeout(() => {
          toast.info("Purchase was successful!");
          handleToggleLoader(); //this removes loader
        }, 2000);
      }
      if (purchaseResult.status === 200) {
        const userClone = { ...user };
        //when all is successful then we update user infor and regenerate a new token on the server
        userClone.Purchases.push(purchaseResult.data);
        if (index === 0) {
          //only need to regenerate token once / do it on first iteration
          const { data: token } = await regenerateToken(userClone);
          if (token) loginWithJwt(token);
        }
        if (index === array.length - 1) {
          //last iteration send email only once with all items in purchase(array)
          const html = await renderEmailTemplate(array, lastName, firstName);
          sendEmailPurchase(`${lastName}, ${firstName}`, email, html, id);
        }
      }
    } catch (ex) {
      if (ex.response.status === 400) toast.error(ex.response.data);
    }
  });
}
