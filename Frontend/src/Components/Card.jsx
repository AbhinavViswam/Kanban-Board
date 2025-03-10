import React, { useEffect, useState } from "react";
import axios from "../Config/axios";

function Card({ listID }) {
    const [cards, setCards] = useState([]);
    const [editCardId, setEditCardId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const fetchCards = async () => {
        if (listID) {
            const res = await axios.get(`/api/lists/${listID}/cards`);
            setCards(res.data.card);
        }
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return "Unknown Date";
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        }).format(new Date(timestamp));
    };

    const handleUpdate = async (e, cardId) => {
        e.preventDefault();
        await axios.put(`/api/cards/${cardId}`, {
            title: editTitle,
            description: editDescription,
        });
        setEditCardId(null);
        setEditTitle("");
        setEditDescription("");
        fetchCards();
    };

    useEffect(() => {
        fetchCards();
    }, [listID]);

    return (
        <div className="max-h-[70vh] overflow-y-auto p-2">
            {cards.length ? (
                <div className="space-y-4">
                    {cards.map((c) => (
                        <div key={c._id} className="bg-white shadow-md p-4 rounded-lg">
                            {editCardId === c._id ? (
                                <form onSubmit={(e) => handleUpdate(e, c._id)} className="space-y-2">
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none"
                                    />
                                    <textarea
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none"
                                    ></textarea>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            type="button"
                                            onClick={() => setEditCardId(null)}
                                            className="bg-gray-500 text-white px-3 py-1 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-green-500 text-white px-3 py-1 rounded-md"
                                        >
                                            ✅ Save
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-lg font-bold text-gray-800">{c.title}</h1>
                                        <p className="text-gray-600">{c.description}</p>
                                        <p className="text-gray-400 text-sm">{formatDate(c.createdAt)}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setEditCardId(c._id);
                                            setEditTitle(c.title);
                                            setEditDescription(c.description);
                                        }}
                                        className="text-gray-500 hover:text-blue-500"
                                    >
                                        ✏️
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center">No Cards Found</p>
            )}
        </div>
    );
}

export default Card;