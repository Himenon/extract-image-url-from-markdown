import type { Node } from "unist";

export type { Node };

export interface HasChildrenNode extends Node {
  children: Node[];
}

export interface RootNode {
  type: "root";
  children: Node[];
}

export interface TextNode {
  type: "text";
  value: string;
}

export interface HeadingNode {
  type: "heading";
  depth: number;
  children: Node[];
}

export interface HtmlNode {
  type: "html";
  value: string;
}

export interface ImageNode {
  type: "image";
  title: string | null;
  url: string;
  alt: string | null;
}
