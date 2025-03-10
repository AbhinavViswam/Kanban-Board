import React, { useContext, useEffect, useState } from "react";
import { BoardContext } from "../context/BoardContext";
import axios from "../Config/axios";
import Card from "./Card";

function List() {
    const { boardId } = useContext(BoardContext);
    const [lists, setLists] = useState([]);
    const [list, setList] = useState("");
    const [editListId, setEditListId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchLists = async () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`/api/boards/${boardId}/lists`, { title: list });
        setList("");
        setIsModalOpen(false);
        fetchLists();
    };

    const handleRename = async (e, listId) => {
        e.preventDefault();
        await axios.put(`/api/lists/${listId}`, { title: editTitle });
        setEditListId(null);
        setEditTitle("");
        fetchLists();
    };

    useEffect(() => {
        if (boardId) {
            fetchLists();
        }
    }, [boardId]);

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-600">Lists</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                >
                    + Add List
                </button>
            </div>

            <div className="flex overflow-x-auto space-x-4 pb-4">
                {lists.length ? (
                    lists.map((l) => (
                        <div key={l._id} className="bg-blue-50 shadow-md p-5 rounded-lg w-80 min-w-80 h-screen flex flex-col">
                            {editListId === l._id ? (
                                <form onSubmit={(e) => handleRename(e, l._id)} className="mb-3 flex">
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        className="ml-2 bg-green-500 text-white px-3 py-1 rounded-md"
                                    >
                                        ✅
                                    </button>
                                </form>
                            ) : (
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex flex-col items-center justify-center">
                                    <h1 className="text-lg font-bold text-gray-800">{l.title}</h1>
                                    <h6 className="text-sm text-gray-500">{formatDate(l.createdAt)}</h6>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setEditListId(l._id);
                                            setEditTitle(l.title);
                                        }}
                                        className="text-gray-500 hover:text-blue-500"
                                    >
                                        ✏️
                                    </button>
                                </div>
                            )}
                            <Card listID={l._id} />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 text-lg text-center mt-10">No Lists Found</p>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Add New List</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="List title"
                                value={list}
                                onChange={(e) => setList(e.target.value)}
                                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-gray-600 transition duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default List;