import diaryEntryMetadata from "./diary-entry-metadata.mjs";
import mdxTypecheck from "./mdx-typecheck.mjs";

const localMdxPlugin = {
  rules: {
    "diary-entry-metadata": diaryEntryMetadata,
    "mdx-typecheck": mdxTypecheck,
  },
};

export default localMdxPlugin;
