import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const TextEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  return (
    <EditorContent
      editor={editor}
      placeholder="Start writing here ..."
    ></EditorContent>
  );
};
