"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import LinkExtension from "@tiptap/extension-link";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";

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
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline font-semibold",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "tiptap-table border-collapse border border-slate-200 my-4 text-xs w-full",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border-b border-slate-200",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-slate-300 bg-slate-100 p-2 font-semibold text-slate-800 text-left",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-slate-200 p-2 text-slate-700",
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
          "tiptap min-h-[240px] p-4 focus:outline-none text-slate-900 text-xs sm:text-sm leading-relaxed",
      },
    },
  });

  if (!editor) {
    return (
      <div className="border border-slate-200 rounded-sm p-4 min-h-[240px] bg-slate-50 text-slate-400 text-xs flex items-center justify-center">
        Loading editor...
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
    `px-2.5 py-1 text-xs rounded-sm font-medium transition cursor-pointer select-none ${
      isActive
        ? "bg-blue-600 text-white font-semibold"
        : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
    }`;

  const currentHtml = editor.getHTML();

  return (
    <div className="border border-slate-200 rounded-sm bg-white overflow-hidden">
      {/* Top Header: Edit / Preview Switcher & Actions */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-sm">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`px-3 py-1 text-xs font-medium rounded-sm transition cursor-pointer ${
              activeTab === "edit"
                ? "bg-white text-slate-900 font-semibold shadow-none"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Edit Mode
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1 text-xs font-medium rounded-sm transition cursor-pointer ${
              activeTab === "preview"
                ? "bg-white text-slate-900 font-semibold shadow-none"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Live Preview
          </button>
        </div>

        <span className="text-[11px] text-slate-400 font-medium">
          {activeTab === "edit" ? "WYSIWYG Editor" : "Rendered Output Preview"}
        </span>
      </div>

      {activeTab === "edit" ? (
        <>
          {/* Editor Control Toolbar */}
          <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border-b border-slate-200">
            {/* Headings */}
            <div className="flex items-center space-x-1 pr-2 border-r border-slate-200">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleHeading({ level: 2 }).run();
                }}
                className={btnClass(editor.isActive("heading", { level: 2 }))}
                title="Heading 2"
              >
                H2
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleHeading({ level: 3 }).run();
                }}
                className={btnClass(editor.isActive("heading", { level: 3 }))}
                title="Heading 3"
              >
                H3
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleHeading({ level: 4 }).run();
                }}
                className={btnClass(editor.isActive("heading", { level: 4 }))}
                title="Heading 4"
              >
                H4
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().setParagraph().run();
                }}
                className={btnClass(editor.isActive("paragraph") && !editor.isActive("heading"))}
                title="Paragraph"
              >
                P
              </button>
            </div>

            {/* Inline Formatting */}
            <div className="flex items-center space-x-1 px-2 border-r border-slate-200">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBold().run();
                }}
                className={btnClass(editor.isActive("bold"))}
                title="Bold"
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleItalic().run();
                }}
                className={btnClass(editor.isActive("italic"))}
                title="Italic"
              >
                <em>I</em>
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleStrike().run();
                }}
                className={btnClass(editor.isActive("strike"))}
                title="Strikethrough"
              >
                <s>S</s>
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleCode().run();
                }}
                className={btnClass(editor.isActive("code"))}
                title="Inline Code"
              >
                &lt;/&gt;
              </button>
            </div>

            {/* Lists & Quotes */}
            <div className="flex items-center space-x-1 px-2 border-r border-slate-200">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBulletList().run();
                }}
                className={btnClass(editor.isActive("bulletList"))}
                title="Bullet List"
              >
                • List
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleOrderedList().run();
                }}
                className={btnClass(editor.isActive("orderedList"))}
                title="Numbered List"
              >
                1. List
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().toggleBlockquote().run();
                }}
                className={btnClass(editor.isActive("blockquote"))}
                title="Blockquote"
              >
                &ldquo; Quote
              </button>
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().setHorizontalRule().run();
                }}
                className={btnClass(false)}
                title="Divider Line"
              >
                ―
              </button>
            </div>

            {/* Tables */}
            <div className="flex items-center space-x-1 px-2 border-r border-slate-200">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run();
                }}
                className={btnClass(editor.isActive("table"))}
                title="Insert Table"
              >
                + Table
              </button>
              {editor.isActive("table") && (
                <>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().addRowAfter().run();
                    }}
                    className={btnClass(false)}
                    title="Add Row"
                  >
                    +Row
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().deleteRow().run();
                    }}
                    className={btnClass(false)}
                    title="Delete Row"
                  >
                    -Row
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().addColumnAfter().run();
                    }}
                    className={btnClass(false)}
                    title="Add Column"
                  >
                    +Col
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().deleteColumn().run();
                    }}
                    className={btnClass(false)}
                    title="Delete Column"
                  >
                    -Col
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      editor.chain().focus().deleteTable().run();
                    }}
                    className="px-2 py-1 text-xs rounded-sm bg-red-50 text-red-700 hover:bg-red-100 font-medium"
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
                onMouseDown={(e) => {
                  e.preventDefault();
                  editor.chain().focus().unsetAllMarks().clearNodes().run();
                }}
                className={btnClass(false)}
                title="Clear Formatting"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Editor Content Area */}
          <EditorContent editor={editor} />
        </>
      ) : (
        /* Live Rendered Preview Pane */
        <div className="p-5 min-h-[260px] bg-slate-50">
          {!currentHtml || currentHtml === "<p></p>" ? (
            <p className="text-xs text-slate-400 italic">
              No content to preview yet. Switch back to Edit Mode to format your content.
            </p>
          ) : (
            <div
              className="tiptap-content bg-white p-6 rounded-sm border border-slate-200"
              dangerouslySetInnerHTML={{ __html: currentHtml }}
            />
          )}
        </div>
      )}
    </div>
  );
}
