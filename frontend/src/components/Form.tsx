import { useState } from "react";

export default function Form() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    message: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("http://localhost:5001/api/forms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) alert("Form submitted successfully!");
  }

  return (
    <form onSubmit={handleSubmit} className=" mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <div className="flex gap-4 mb-4">
      <input 
        name="name" 
        placeholder="Name" 
        onChange={handleChange} 
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input 
        name="email" 
        placeholder="Email" 
        onChange={handleChange} 
        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      </div>
      <input 
      name="age" 
      placeholder="Age" 
      onChange={handleChange} 
      className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea 
      name="message" 
      placeholder="Message" 
      onChange={handleChange} 
      className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
      Submit
      </button>
    </form>
  );
}
