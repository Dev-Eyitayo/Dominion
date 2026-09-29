"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import LinkExtension from "@tiptap/extension-link";
import TableExtension from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string, json: any) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = "Write detailed project description, scope of works, and technical specifications...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-[#0F2B82] underline font-semibold",
        },
      }),
      TableExtension.configure({
        resizable: true,
        HTMLAttributes: {
          class: "w-full border-collapse border border-slate-300 my-4 text-xs font-mono",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border-b border-slate-200",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-slate-300 bg-slate-100 p-2 font-bold text-slate-900 text-left",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-slate-200 p-2 text-slate-800",
        },
      }),
    ],
    content: content || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML(), editor.getJSON());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[260px] p-4 focus:outline-none text-slate-900 text-sm leading-relaxed prose max-w-none prose-slate prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-h2:text-lg prose-h3:text-base prose-p:my-2 prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:border-[#0F2B82] prose-blockquote:bg-slate-50 prose-blockquote:py-1 prose-blockquote:px-3 font-sans",
      },
    },
  });

  if (!editor) {
    return (
      <div className="border border-slate-300 p-4 min-h-[260px] bg-slate-50 text-slate-400 font-mono text-xs">
        Loading Rich Text Editor...
      </div>
    );
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter destination URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const btnClass = (isActive: boolean) =>
    `px-2.5 py-1 text-xs font-mono transition-colors border ${
      isActive
        ? "bg-[#0F2B82] text-white border-[#0F2B82] font-bold"
        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
    }`;

  return (
    <div className="border border-slate-300 bg-white">
      {/* Editor Control Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200">
        
        {/* Headings */}
        <div className="flex items-center space-x-1 pr-2 border-r border-slate-300">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={btnClass(editor.isActive("heading", { level: 2 }))}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={btnClass(editor.isActive("heading", { level: 3 }))}
            title="Heading 3"
          >
            H3
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={btnClass(editor.isActive("heading", { level: 4 }))}
            title="Heading 4"
          >
            H4
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={btnClass(editor.isActive("paragraph"))}
            title="Paragraph"
          >
            P
          </button>
        </div>

        {/* Inline Formatting */}
        <div className="flex items-center space-x-1 px-2 border-r border-slate-300">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={btnClass(editor.isActive("bold"))}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={btnClass(editor.isActive("italic"))}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={btnClass(editor.isActive("strike"))}
            title="Strikethrough"
          >
            <s>S</s>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={btnClass(editor.isActive("code"))}
            title="Inline Code"
          >
            &lt;/&gt;
          </button>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center space-x-1 px-2 border-r border-slate-300">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={btnClass(editor.isActive("bulletList"))}
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={btnClass(editor.isActive("orderedList"))}
            title="Numbered List"
          >
            1. List
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={btnClass(editor.isActive("blockquote"))}
            title="Blockquote"
          >
            &ldquo; Quote
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className={btnClass(false)}
            title="Horizontal Divider"
          >
            ― Line
          </button>
        </div>

        {/* Tables */}
        <div className="flex items-center space-x-1 px-2 border-r border-slate-300">
          <button
            type="button"
            onClick={() =>
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            }
            className={btnClass(editor.isActive("table"))}
            title="Insert Table"
          >
            + Table
          </button>
          {editor.isActive("table") && (
            <>
              <button
                type="button"
                onClick={() => editor.chain().focus().addRowAfter().run()}
                className={btnClass(false)}
                title="Add Row"
              >
                +Row
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().deleteRow().run()}
                className={btnClass(false)}
                title="Delete Row"
              >
                -Row
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                className={btnClass(false)}
                title="Add Column"
              >
                +Col
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().deleteColumn().run()}
                className={btnClass(false)}
                title="Delete Column"
              >
                -Col
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().deleteTable().run()}
                className="px-2 py-1 text-xs font-mono bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                title="Delete Entire Table"
              >
                Del Table
              </button>
            </>
          )}
        </div>

        {/* Hyperlink & Clear */}
        <div className="flex items-center space-x-1 pl-2">
          <button
            type="button"
            onClick={setLink}
            className={btnClass(editor.isActive("link"))}
            title="Hyperlink"
          >
            Link
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className={btnClass(false)}
            title="Clear Formatting"
          >
            Clear
          </button>
        </div>

      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
}
