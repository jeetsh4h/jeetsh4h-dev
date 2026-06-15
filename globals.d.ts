declare module "*.css";
declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { DiaryEntryMetadata } from "@/lib/diary/metadata";

  export const metadata: DiaryEntryMetadata;

  const MDXContent: ComponentType;
  export default MDXContent;
}
