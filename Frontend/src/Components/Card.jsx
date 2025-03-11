import React, { useContext, useEffect, useState } from "react";
import axios from "../Config/axios";
import { BoardContext } from "../context/BoardContext";

function Card({ listID, fetchLists }) {
    const { boardId } = useContext(BoardContext);
    const [cards, setCards] = useState([]);
    const [editCardId, setEditCardId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lists, setLists] = useState([]);
    const [moveTo, setMoveTo] = useState(null);
    const [moveCardId, setMoveCardId] = useState(null)

    const fetchCards = async () => {
        if (listID) {
            const res = await axios.get(`/api/lists/${listID}/cards`);
            setCards(res.data.card);
        }
    };

    const fetchListsForCards = async () => {
        const res = await axios.get(`/api/boards/${boardId}/lists`);
        setLists(res.data.list);
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

    const handleDelete = async (cardId) => {
        await axios.delete(`/api/cards/${cardId}`);
        fetchCards();

    };

    const handleAddCard = async (e) => {
        e.preventDefault();
        await axios.post(`/api/lists/${listID}/cards`, {
            title,
            description: desc,
            position: 0,
        });
        setTitle("");
        setDesc("");
        setIsModalOpen(false);
        fetchCards();

    };

    const handleMove = async (e) => {
        e.preventDefault();
        await axios.put(`/api/cards/${moveCardId}/move`, {
            newListId: `${moveTo}`,
            newPosition: 0
        })
        fetchCards();
        fetchLists();
    }

    useEffect(() => {
        fetchListsForCards();
    }, []);

    useEffect(() => {
        fetchCards();
    }, [listID]);

    return (
        <div className="relative flex flex-col">
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition duration-300"
            >
                ➕ Add Card
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Add a New Card</h2>
                        <form onSubmit={handleAddCard} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Card Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded-md focus:outline-none"
                            />
                            <textarea
                                placeholder="Description"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                className="w-full p-2 border rounded-md focus:outline-none"
                            ></textarea>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-400 text-white px-3 py-1 rounded-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition duration-300"
                                >
                                    ✅ Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="max-h-[70vh] overflow-y-auto p-2 mt-3">
                {cards.length ? (
                    <div className="space-y-4">
                        {cards.map((c) => (
                            <div key={c._id} className="bg-white shadow-md p-4 rounded-lg border border-red-200">
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
                                            <form className="mt-2 flex items-center space-x-2" onSubmit={handleMove}>
                                                <select
                                                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                                    onChange={(e) => setMoveTo(e.target.value)}
                                                >
                                                    <option value={null}>Move To</option>
                                                    {lists.map((l, i) => (
                                                        <option value={l._id} key={i}>
                                                            {l.title}
                                                        </option>
                                                    ))}
                                                </select>
                                                <button
                                                    type="submit"
                                                    onClick={() => setMoveCardId(c._id)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
                                                >
                                                    Move
                                                </button>
                                            </form>

                                        </div>
                                        <div className="space-x-2">
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
                                            <button
                                                onClick={() => handleDelete(c._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">No Cards Found</p>
                )}
            </div>
        </div>
    );
}

export default Card;
