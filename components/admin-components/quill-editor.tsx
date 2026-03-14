"use client"; // Required for App Router components that use client-side features

import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css"; // Import the styles

// Dynamically import ReactQuill, disabling SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const ReactEditor = () => {
  const [value, setValue] = useState("");

  return (
    <div
      className="w-full"
      style={{
        height: "300px",
        marginBottom: "40px",
        maxWidth: "500px",
      }}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        placeholder="Write something awesome..."
        className="h-full w-full"
      />
    </div>
  );
};

export default ReactEditor;
