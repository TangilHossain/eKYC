import React, { useEffect, useState } from "react";

interface FormDataType {
  _id: string;
  name: string;
  email: string;
  age: string;
  message: string;
  description: string;
  gptResponse: string;
}

const AdminDashboard: React.FC = () => {
  const [data, setData] = useState<FormDataType[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/forms")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">eKYC List</h2>
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">ID</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Name</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Email</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Age</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">Message</th>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">gptResponse</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, i) => (
            <tr key={entry._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-900 border-b">{i + 1}</td>
              <td className="px-4 py-3 text-sm text-gray-900 border-b">{entry.name}</td>
              <td className="px-4 py-3 text-sm text-gray-900 border-b">{entry.email}</td>
              <td className="px-4 py-3 text-sm text-gray-900 border-b">{entry.age}</td>
              <td className="px-4 py-3 text-sm text-gray-900 border-b">{entry.message}</td>
              <td className="px-4 py-3 text-sm text-gray-900 border-b">{entry.gptResponse}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
