import React from 'react'
import { doc, deleteDoc, query, collection, getDocs } from "firebase/firestore";
import { dbFireStore } from '../../config/firebase';

export async function deleteFood(id) {
     await deleteDoc(doc(dbFireStore, "products", `${id}`));
     console.log('sucess');
}
export async function getListFood() {
     const q = query(collection(dbFireStore, "products"));
     const querySnapshot = await getDocs(q);
     const data = querySnapshot.docs.map((doc) => {
       return {
         id: doc.id,
          name:doc.data().name
       };
     });
     console.log(data);
     return data
   };

