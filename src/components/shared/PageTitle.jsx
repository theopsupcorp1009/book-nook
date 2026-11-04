"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const toAaFormat = (text) => {
  const words = text.split(" ");
  const modifiedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );
  const inAaFormat = modifiedWords.join(" ");
  return inAaFormat;
};

const PageTitle = () => {
  let pathName = usePathname();
  useEffect(() => {
    const pageName = pathName.split("/")[1].replace("-", " ");
    const page = toAaFormat(pageName);
    const title = page ? page : "A Small Online Library";

    document.title = `BookNook - ${title}`;
  }, [pathName]);

  return null;
};

export default PageTitle;
