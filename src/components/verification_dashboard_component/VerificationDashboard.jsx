import React, { useState } from "react";
import "./VerificationDashboard.css";

const initialQuestions = [
    {
        id: 1,
        question: "What is the purpose of setup time in STA?",
        type: "MCQ",
        category: "Practical Application",
        difficulty: "Easy",
        tags: ["STA", "Timing"],
        weight: 5,
        answerOptions: {
            A: "Stability",
            B: "Propagation",
            C: "Hold",
            D: "Stability before edge"
        },
        correctAnswer: "D",
        shortExplanation: "Ensures data is stable before clock edge.",
        reviewStatus: "not-reviewed"
    }
];

function VerificationDashboard() {
    const [questions, setQuestions] = useState(initialQuestions);
    const [filters, setFilters] = useState({
        type: "all",
        category: "all",
        difficulty: "all",
        weight: "all",
        reviewStatus: "all",
        search: ""
    });
    const [editModal, setEditModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [currentEdit, setCurrentEdit] = useState(null);
    const [newQuestion, setNewQuestion] = useState({
        question: "",
        type: "MCQ",
        category: "Error Identification",
        difficulty: "Easy",
        tags: "",
        weight: 1,
        answerOptions: { A: "", B: "", C: "", D: "" },
        correctAnswer: "A",
        shortExplanation: "",
        reviewStatus: "not-reviewed"
    });

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const applyFilters = () => {
        return questions.filter((q) => {
            return (
                (filters.type === "all" || q.type === filters.type) &&
                (filters.category === "all" || q.category === filters.category) &&
                (filters.difficulty === "all" || q.difficulty === filters.difficulty) &&
                (filters.weight === "all" || q.weight === parseInt(filters.weight)) &&
                (filters.reviewStatus === "all" || q.reviewStatus === filters.reviewStatus) &&
                (filters.search === "" ||
                    q.question.toLowerCase().includes(filters.search.toLowerCase()) ||
                    q.tags.some((tag) => tag.toLowerCase().includes(filters.search.toLowerCase())))
            );
        });
    };

    const filteredQuestions = applyFilters();

    const handleEdit = (question) => {
        setCurrentEdit(question);
        setEditModal(true);
    };

    const handleUpdate = (field, value) => {
        setCurrentEdit({ ...currentEdit, [field]: value });
    };

    const saveEdit = () => {
        setQuestions(questions.map((q) => (q.id === currentEdit.id ? currentEdit : q)));
        setEditModal(false);
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { id: questions.length + 1, ...newQuestion }]);
        setAddModal(false);
    };

    return (
        <div className="container">
            <h1>Question Review Dashboard</h1>

            {/* Filter Bar */}
            <div className="filter-bar">
                <select name="type" onChange={handleFilterChange}>
                    <option value="all">Filter by Type</option>
                    <option value="MCQ">MCQ</option>
                    <option value="Descriptive">Descriptive</option>
                </select>
                <select name="category" onChange={handleFilterChange}>
                    <option value="all">Filter by Category</option>
                    <option value="Error Identification">Error Identification</option>
                    <option value="Practical Application">Practical Application</option>
                </select>
                <input type="text" name="search" placeholder="Search by keyword..." onChange={handleFilterChange} />
                <button className="btn-primary" onClick={() => setAddModal(true)}>Add Question</button>
            </div>

            {/* Question Table */}
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Difficulty</th>
                        <th>Weight</th>
                        <th>Review Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredQuestions.map((q) => (
                        <tr key={q.id} className={`row-${q.reviewStatus}`}>
                            <td>{q.id}</td>
                            <td>{q.question}</td>
                            <td>{q.type}</td>
                            <td>{q.category}</td>
                            <td>{q.difficulty}</td>
                            <td>{q.weight}</td>
                            <td>{q.reviewStatus}</td>
                            <td>
                                <button onClick={() => handleEdit(q)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {editModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit Question</h2>
                        <textarea
                            value={currentEdit.question}
                            onChange={(e) => handleUpdate("question", e.target.value)}
                        />
                        <button onClick={saveEdit}>Save Changes</button>
                        <button onClick={() => setEditModal(false)}>Close</button>
                    </div>
                </div>
            )}

            {/* Add Question Modal */}
            {addModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Add New Question</h2>
                        <textarea
                            placeholder="Enter question"
                            onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                        />
                        <button onClick={handleAddQuestion}>Add Question</button>
                        <button onClick={() => setAddModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VerificationDashboard;
