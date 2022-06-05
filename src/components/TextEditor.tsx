import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useAtom } from "jotai";
import { atomWithHash } from "jotai/utils";
import { useEffect } from "react";
import {
  compressToEncodedURIComponent as compress,
  decompressFromEncodedURIComponent as decompress,
} from "lz-string";

const titleAtom = atomWithHash("title", "");
const contentAtom = atomWithHash("content", "", {
  serialize: (s) => compress(s),
  deserialize: (s) => decompress(s) || "",
});

export const TextEditor = () => {
  const [title, setTitle] = useAtom(titleAtom);
  const [content, setContent] = useAtom(contentAtom);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing ...",
      }),
    ],
    content,
  });

  useEffect(() => {
    setContent(editor?.getHTML() || "");
  }, [editor?.state]);

  return (
    <div className="h-full mx-auto pt-xl pb-[30%] w-full px-base md:w-4/6 md:px-0 max-w-[70ch]">
      <input
        className="font-display placeholder:text-gray-lighter text-gray-dark font-black text-3xl mb-base outline-none"
        placeholder="Enter a title ..."
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <EditorContent className="h-full" editor={editor}></EditorContent>
    </div>
  );
};
