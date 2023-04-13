import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

interface BucketItem {
  id: number;
  text: string;
  prefix: string;
  completed: boolean;
}

const BucketList: React.FC = () => {
  const [items, setItems] = useLocalStorage<BucketItem[]>("bucketList", []);
  const [inputText, setInputText] = useState("");
  const [prefix, setPrefix] = useState("will");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("bucketList", JSON.stringify(items));
  }, [items]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputText.trim().length < 3) {
      return;
    }
    setItems([
      ...items,
      {
        id: Date.now(),
        text: inputText,
        prefix,
        completed: false,
      },
    ]);
    setInputText("");
  };

  const handleDelete = (id: number) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const toggleCompleted = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-4 px-4">
      <div className="max-w-7xl mx-auto py-4 px-4">
        <form onSubmit={handleSubmit}>
          <h1 className="text-4xl font-bold mb-4">Before I Die I...</h1>
          <p className="pb-4">
            A personalized bucket list of things to do before you die.
          </p>
          <div className="mb-4">
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="border rounded mr-2 p-1"
            >
              <option value="will">will</option>
              <option value="want to">want to</option>
              <option value="should">should</option>
              <option value="must">must</option>
            </select>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="border rounded p-1 mr-2 flex-grow"
              placeholder="What would you like to do before you die?"
            />

            <button
              type="submit"
              disabled={inputText.trim().length < 3}
              className="bg-black text-white rounded p-2 px-4 disabled:opacity-50"
            >
              Add It
            </button>
          </div>
          <ul>
            {items.map((item) => (
              <li key={item.id} className="mb-2">
                <label>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleCompleted(item.id)}
                    className="mr-2"
                  />
                  <span
                    className={`${
                      item.completed
                        ? "line-through text-gray-700"
                        : "text-black"
                    }`}
                  >
                    {`Before I die I ${item.prefix} ${item.text}`}
                  </span>
                </label>
                <button
                  className="text-red-900 ml-2"
                  onClick={() => handleDelete(item.id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default BucketList;
