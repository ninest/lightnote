import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import clsx from "clsx";
import { useAtom } from "jotai";
import { atomWithHash } from "jotai/utils";
import {
  compressToEncodedURIComponent as compress,
  decompressFromEncodedURIComponent as decompress,
} from "lz-string";
import { useEffect } from "react";
import type { IconType } from "react-icons";
import {
  FaBold,
  FaCode,
  FaFileCode,
  FaHeading,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteRight,
  FaRedo,
  FaStrikethrough,
  FaUndo,
  FaLink,
} from "react-icons/fa";
import { Icon } from "./Icon";

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
      Link.configure({
        HTMLAttributes: {
          class: "underline",
        },
      }),
    ],
    content,
  });

  useEffect(() => {
    setContent(editor?.getHTML() || "");
  }, [editor?.state]);

  return (
    editor && (
      <div className="h-full mx-auto pt-xl pb-[30%] w-full px-base md:w-4/6 md:px-0 max-w-[70ch]">
        <input
          className="bg-light font-display placeholder:text-gray-lighter text-gray-dark font-black text-3xl mb-base outline-none"
          placeholder="Enter a title ..."
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <EditorContent className="h-full" editor={editor}></EditorContent>
        <div className="bg-light opacity-90 lg:hidden border-t fixed bottom-0 left-0 right-0">
          <div className="p-base overflow-x-scroll">
            <div className="inline-flex space-x-lg pr-xl">
              <FormatButton
                icon={FaBold}
                action={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive("bold")}
              />
              <FormatButton
                icon={FaItalic}
                action={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive("italic")}
              />
              <FormatButton
                icon={FaStrikethrough}
                action={() => editor.chain().focus().toggleStrike().run()}
                active={editor.isActive("strike")}
              />
              <FormatButton
                icon={FaCode}
                action={() => editor.chain().focus().toggleCode().run()}
                active={editor.isActive("code")}
              />
              <FormatButton
                icon={FaLink}
                action={() =>
                  editor.isActive("link")
                    ? // @ts-ignore
                      editor.commands.unsetLink()
                    : // @ts-ignore
                      editor.commands.toggleLink({
                        href: window.prompt("URL", "") ?? "",
                      })
                }
                active={editor.isActive("link")}
              />
              <span className="w-0 border-gray-200 border-r"></span>
              <FormatButton
                icon={FaHeading}
                action={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                active={editor.isActive("heading", { level: 2 })}
              />
              <FormatButton
                icon={FaListUl}
                action={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive("bulletList")}
              />
              <FormatButton
                icon={FaListOl}
                action={() => editor.chain().focus().toggleOrderedList().run()}
                active={editor.isActive("orderedList")}
              />
              <FormatButton
                icon={FaFileCode}
                action={() => editor.chain().focus().toggleCodeBlock().run()}
                active={editor.isActive("codeBlock")}
              />
              <FormatButton
                icon={FaQuoteRight}
                action={() => editor.chain().focus().toggleBlockquote().run()}
                active={editor.isActive("blockquote")}
              />
              <span className="w-0 border-gray-200 border-r"></span>
              <FormatButton
                icon={FaUndo}
                action={() => editor.chain().focus().undo().run()}
              />
              <FormatButton
                icon={FaRedo}
                action={() => editor.chain().focus().redo().run()}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const FormatButton = ({
  icon,
  action,
  active = false,
}: {
  icon: IconType;
  action: () => void;
  active?: boolean;
}) => {
  return (
    <div>
      <button
        onClick={action}
        className={clsx("-m-xs p-xs rounded-md hover:bg-gray-50", {
          "bg-gray-100": active,
        })}
      >
        <Icon icon={icon} />
      </button>
    </div>
  );
};
