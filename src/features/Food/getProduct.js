import { dbFireStore } from "../../config/firebase";
import { getDoc, doc } from "firebase/firestore";
const getProduct = async (idProduct) => {
     const docRef = doc(dbFireStore, "products", idProduct);
     const docSnap = await getDoc(docRef);
     if (docSnap.exists()) {
       
       return docSnap.data();
     } else {
       // docSnap.data() will be undefined in this case
       console.log("No such document!");
     }
   };
export default getProduct;