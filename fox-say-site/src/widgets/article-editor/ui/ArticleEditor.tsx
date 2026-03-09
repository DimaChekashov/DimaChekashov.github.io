"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";

interface ArticleEditorProps {
  onChange: (content: string) => void;
  initialContent?: string;
}

const iconClassName = "h-4 w-4";

const BoldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="M8 4h6a4 4 0 0 1 0 8H8V4Zm0 8h7a4 4 0 1 1 0 8H8v-8Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const ItalicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="M14 4h4M6 20h4m4-16-4 16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StrikeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="M6 12h12M8 7.5c0-1.9 2-3.5 4-3.5s4 1.4 4 3.2c0 3.8-8 2.4-8 6.3 0 1.9 1.8 3.5 4 3.5s4-1.4 4-3.3"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const H2Icon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="M4 6v12M10 6v12M4 12h6M14 9c0-1.7 1.3-3 3-3s3 1.3 3 3c0 3-4 3-6 6h6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const H3Icon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="M4 6v12M10 6v12M4 12h6M15 7h5l-3 5a3 3 0 1 1 0 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BulletListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="M9 7h11M9 12h11M9 17h11"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="4.5" cy="7" r="1.2" fill="currentColor" />
    <circle cx="4.5" cy="12" r="1.2" fill="currentColor" />
    <circle cx="4.5" cy="17" r="1.2" fill="currentColor" />
  </svg>
);

const OrderedListIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="M10 7h10M10 12h10M10 17h10M4 6h1v2M4 11h2v2H4l2 2M4 17h2v2H4l2-2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const QuoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="M8 9H5v4h3v4H4a1 1 0 0 1-1-1v-4c0-3 2-5 5-5v2Zm10 0h-3v4h3v4h-4a1 1 0 0 1-1-1v-4c0-3 2-5 5-5v2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="m9 7-5 5 5 5M15 7l5 5-5 5M13 5l-2 14"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="M10 13a4 4 0 0 1 0-6l2-2a4 4 0 1 1 6 6l-1.5 1.5M14 11a4 4 0 0 1 0 6l-2 2a4 4 0 1 1-6-6L7.5 11.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UnlinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="m9 9 6 6M10 13a4 4 0 0 1 0-6l2-2a4 4 0 1 1 6 6l-1.5 1.5M14 11a4 4 0 0 1 0 6l-2 2a4 4 0 1 1-6-6L7.5 11.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UndoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="M9 7H4v5M4 12a8 8 0 1 0 2.3-5.7L9 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RedoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={iconClassName}>
    <path
      d="M15 7h5v5M20 12a8 8 0 1 1-2.3-5.7L15 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArticleEditor = ({
  onChange,
  initialContent = "<p>Начните писать статью...</p>",
}: ArticleEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "rich-text focus:outline-none min-h-[400px] p-4 border rounded-lg",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("Введите URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const toolbarButtonClass =
    "inline-flex items-center gap-2 rounded border border-gray-600 px-2.5 py-1.5 text-xs hover:bg-white/10";
  const toolbarButtonActiveClass = "bg-white/10 border-blue-400";
  const toolbarGroupClass =
    "flex flex-wrap items-center gap-2 rounded-md border border-gray-700 p-2";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 rounded-lg border border-gray-700 bg-black/20 p-2">
        <div className="flex flex-wrap gap-2">
          <div className={toolbarGroupClass}>
            <button
              type="button"
              className={`${toolbarButtonClass} ${editor.isActive("bold") ? toolbarButtonActiveClass : ""}`}
              onClick={() => editor.chain().focus().toggleBold().run()}
              title="Bold"
              aria-label="Bold"
            >
              <BoldIcon />
              <span>Bold</span>
            </button>
            <button
              type="button"
              className={`${toolbarButtonClass} ${editor.isActive("italic") ? toolbarButtonActiveClass : ""}`}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              title="Italic"
              aria-label="Italic"
            >
              <ItalicIcon />
              <span>Italic</span>
            </button>
            <button
              type="button"
              className={`${toolbarButtonClass} ${editor.isActive("strike") ? toolbarButtonActiveClass : ""}`}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              title="Strike"
              aria-label="Strike"
            >
              <StrikeIcon />
              <span>Strike</span>
            </button>
          </div>

          <div className={toolbarGroupClass}>
            <button
              type="button"
              className={`${toolbarButtonClass} ${editor.isActive("heading", { level: 2 }) ? toolbarButtonActiveClass : ""}`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              title="Heading 2"
              aria-label="Heading 2"
            >
              <H2Icon />
              <span>H2</span>
            </button>
            <button
              type="button"
              className={`${toolbarButtonClass} ${editor.isActive("heading", { level: 3 }) ? toolbarButtonActiveClass : ""}`}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              title="Heading 3"
              aria-label="Heading 3"
            >
              <H3Icon />
              <span>H3</span>
            </button>
          </div>

          <div className={toolbarGroupClass}>
            <button
              type="button"
              className={`${toolbarButtonClass} ${editor.isActive("bulletList") ? toolbarButtonActiveClass : ""}`}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              title="Bullet List"
              aria-label="Bullet List"
            >
              <BulletListIcon />
              <span>Bullets</span>
            </button>
            <button
              type="button"
              className={`${toolbarButtonClass} ${editor.isActive("orderedList") ? toolbarButtonActiveClass : ""}`}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              title="Ordered List"
              aria-label="Ordered List"
            >
              <OrderedListIcon />
              <span>Numbered</span>
            </button>
            <button
              type="button"
              className={`${toolbarButtonClass} ${editor.isActive("blockquote") ? toolbarButtonActiveClass : ""}`}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              title="Blockquote"
              aria-label="Blockquote"
            >
              <QuoteIcon />
              <span>Quote</span>
            </button>
          </div>

          <div className={toolbarGroupClass}>
            <button
              type="button"
              className={`${toolbarButtonClass} ${editor.isActive("codeBlock") ? toolbarButtonActiveClass : ""}`}
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              title="Code Block"
              aria-label="Code Block"
            >
              <CodeIcon />
              <span>Code</span>
            </button>
            <button
              type="button"
              className={`${toolbarButtonClass} ${editor.isActive("link") ? toolbarButtonActiveClass : ""}`}
              onClick={addLink}
              title="Add Link"
              aria-label="Add Link"
            >
              <LinkIcon />
              <span>Link</span>
            </button>
            <button
              type="button"
              className={toolbarButtonClass}
              onClick={() => editor.chain().focus().unsetLink().run()}
              title="Remove Link"
              aria-label="Remove Link"
            >
              <UnlinkIcon />
              <span>Unlink</span>
            </button>
          </div>

          <div className={toolbarGroupClass}>
            <button
              type="button"
              className={toolbarButtonClass}
              onClick={() => editor.chain().focus().undo().run()}
              title="Undo"
              aria-label="Undo"
            >
              <UndoIcon />
              <span>Undo</span>
            </button>
            <button
              type="button"
              className={toolbarButtonClass}
              onClick={() => editor.chain().focus().redo().run()}
              title="Redo"
              aria-label="Redo"
            >
              <RedoIcon />
              <span>Redo</span>
            </button>
          </div>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};
