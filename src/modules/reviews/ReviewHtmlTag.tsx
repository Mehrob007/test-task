// components/ReviewHtmlTag.tsx
"use client";

import { useMemo } from "react";
import DOMPurify from "../../lib/purifyClient";

interface Props {
  htmlString?: string | null;
}

const allowedTags = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "br",
  "strong",
  "em",
  "ul",
  "ol",
  "li",
  "a",
  "img",
];
const allowedAttr = ["href", "src", "alt", "title"];

export default function ReviewHtmlTag({ htmlString }: Props) {
  const safeHtml = useMemo(() => {
    return DOMPurify.sanitize(htmlString ?? "", {
      ALLOWED_TAGS: allowedTags,
      ALLOWED_ATTR: allowedAttr,
    });
  }, [htmlString]);

  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}
