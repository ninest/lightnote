import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing ...",
      }),
    ],
    content: "",
  });

  return (
    <div className="h-full mx-auto pt-xl pb-[30%] w-full px-base md:w-4/6 md:px-0 max-w-[80ch]">
      <EditorContent className="h-full prose" editor={editor}></EditorContent>
    </div>
  );
};
