"use client"

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles for the editor

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
  ['link'],
  ['clean'] // remove formatting button
];

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  console.log(content)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    

    console.log({ title, content });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-lg font-medium text-gray-700">Job Title</label>
        <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter the blog title"
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700">Content</label>
        <ReactQuill
        value={content}
        modules={{ toolbar: toolbarOptions }}
        onChange={setContent}
        placeholder="Write your blog post here..."
        theme="snow"
        className="mt-1"
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
      </form>

      <div className="mt-8 prose prose-indigo">
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    </div>
  );
};

export default BlogForm;