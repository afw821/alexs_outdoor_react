import { purchase } from "../services/purchaseService";
import { regenerateToken, loginWithJwt } from "../services/authService";
import { sendEmailPurchase } from "../services/emailService";
import { toast } from "react-toastify";
import { updateProductQuant } from "../services/productService";
import renderEmailTemplate from "./../utils/renderEmailTemplate";

export async function makePurchase(productsInCart, handleToggleLoader, user) {
  const { firstName, lastName, email, id } = user;

  handleToggleLoader();

  productsInCart.forEach(async (product, index, array) => {
    try {
      const userQuant = product.quantity;
      const ProductId = product.product.id;
      const purchaseName = `UserId# ${id} ${lastName}, ${firstName} - ID# ${ProductId} / ${product.product.name}`;

      const { data: updateResult } = await updateProductQuant(
        userQuant,
        ProductId
      );

      if (updateResult) {
        var purchaseResult = await purchase(
          purchaseName,
          user.id,
          ProductId,
          userQuant
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
        userClone.Purchases.push(purchaseResult.data);
        if (index === 0) {
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
