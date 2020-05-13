import { useState, useEffect } from "react";
import { db } from "../firebase";

interface ICache {
  [key: string]: object;
}

interface IPendingCashe {
  [key: string]: Promise<any>;
}

const cache: ICache = {};
const pendingCache: IPendingCashe = {};

export default <Document>(path: string) => {
  const [document, setDocument] = useState<Document | null>(
    ((cache[path] as unknown) as Document) || null
  );

  useEffect(() => {
    let stillMounted = true;
    let promise =
      pendingCache[path] || (pendingCache[path] = db.doc(path).get());
    promise.then((doc) => {
      if (!stillMounted) return;
      const document = {
        ...((doc.data() as unknown) as Document),
        id: doc.id,
      };
      cache[path] = document;
      setDocument(document);
    });
    return () => {
      stillMounted = false;
    };
  }, [path]);

  return document;
};
