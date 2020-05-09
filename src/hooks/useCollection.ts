import { useState, useEffect } from "react";
import { db } from "../firebase";

export default <Collection = { id: string }>(
  path: string,
  orderBy: string = ""
) => {
  const [collection, setCollection] = useState<Collection[]>([]);

  useEffect(() => {
    let request:
      | firebase.firestore.CollectionReference
      | firebase.firestore.Query = db.collection(path);
    if (orderBy !== "") {
      request = request.orderBy(orderBy);
    }
    return request.onSnapshot((snapshot) => {
      const collection: Collection[] = [];
      snapshot.forEach((doc) => {
        collection.push({
          ...((doc.data() as unknown) as Collection),
          id: doc.id,
        });
      });
      setCollection(collection);
    });
  }, [path, orderBy]);

  return collection;
};
