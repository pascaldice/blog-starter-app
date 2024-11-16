"use client";

export function TestButton() {
   return (
      <button
         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
         onClick={async (e) => {
            const res = await fetch("/api/test");
            const data = await res.json();
            alert(JSON.stringify(data));
         }}
      >
         Test Button
      </button>
   );
}
