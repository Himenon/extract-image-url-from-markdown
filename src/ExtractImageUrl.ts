import { parse as htmlParse } from "node-html-parser";
import type { Plugin } from "unified";
import type { Node } from "unist";
import { remark } from "remark";
import * as typeGuard from "./typeGuard.js";

export interface ImageToBase64Option {
  setImageUrl: (url: string) => void;
}

/** 調整チュ */
const extactImageUrlPlugin: Plugin = (option: ImageToBase64Option) => {
  const visit = (node: Node): Node => {
    if (typeGuard.isHasChildrenNode(node)) {
      node.children.forEach(visit);
    }
    if (typeGuard.isImageNode(node)) {
      option.setImageUrl(node.url);
    } else if (typeGuard.isHtmlNode(node)) {
      const root = htmlParse(node.value);
      Array.from(root.querySelectorAll("img")).forEach((element) => {
        if (typeof element.attributes.src === "string") {
          option.setImageUrl(element.attributes.src);
        }
      });
    }
    return node;
  };
  return (node) => {
    visit(node);
  };
};

export const extractImageUrls = async (text: string): Promise<string[]> => {
  const imageUrls: string[] = [];
  const setImageUrl = (newUrl: string) => {
    imageUrls.push(newUrl);
  }
  await remark().use(extactImageUrlPlugin, { setImageUrl }).process(text);
  return imageUrls;
};
