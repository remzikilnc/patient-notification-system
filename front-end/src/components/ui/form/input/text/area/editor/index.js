"use client";
import React, {useMemo, useRef, useState, useEffect} from "react";
import dynamic from "next/dynamic";
import "@/styles/quill.snow.css";
import UILoadingSkeleton from "@/components/ui/loading/skeleton";

const ContentEditor = dynamic(
  async () => {
    const {default: RQ} = await import("react-quill");

    return ({forwardedRef, onChange, oldValue,className, ...props}) => {
      const editorRef = forwardedRef || useRef(null);

      const modules = useMemo(
        () => ({
          toolbar: {
            container: [[{header: [1, 2, 3, 4, 5, 6, false]}], [{font: []}], [{header: 1}, {header: 2}], ["bold", "italic", "underline", "strike"], ["blockquote", "code-block"], [{list: "ordered"}, {list: "bullet"}], [{color: []}, {background: []}], [{align: []}], ["link", "video"]],
          },
        }),
        [editorRef]
      );

      const formats = useMemo(() => ["header", "bold", "italic", "underline", "strike", "blockquote", "code-block", "background", "color", "font", "list", "bullet", "indent", "link", "image", "align", "width"], []);

      return <RQ theme="snow" className={`gridded ${className}`} ref={editorRef} formats={formats} modules={modules} value={oldValue} onChange={(content, delta, source, editor) => onChange(editor.getHTML())} {...props} />;
    };
  },
  {ssr: false}
);

export default function UIFormInputTextAreaEditor(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComponent = async () => {
      await ContentEditor;
      setLoading(false);
    };
    loadComponent();
  }, []);

  if (loading) {
    return <UILoadingSkeleton height={645} />;
  }

  return <ContentEditor {...props} />;
}
