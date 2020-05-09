import { useState, useEffect } from "react";
import { db } from "../firebase";

export default <Document>(path: string) => {
  const [document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    return db.doc(path).onSnapshot((doc) =>
      setDocument({
        ...((doc.data() as unknown) as Document),
        id: doc.id,
      })
    );
  }, [path]);

  return document;
};
