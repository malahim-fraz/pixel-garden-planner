import React, { useState } from "react";
import { Plus, Search, Check, Trash2, Edit3, Save } from "lucide-react";
import { getTodayString } from "../utils/helpers";

export default function TaskManager({
  tasks,
  addTask,
  completeTask,
  deleteTask,
  editTask,
}) {
  const [text, setText] = useState("");
  const [type, setType] = useState("daily");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const today = getTodayString();

  const handleAdd = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text.trim(), type);
      setText("");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "daily"
          ? task.type === "daily"
          : task.type === "once" && !task.archived;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <h2 className="font-pixel text-lg text-earth-dark dark:text-sky-light">
        Tasks
      </h2>

      {/* Add Task Form */}
      <form onSubmit={handleAdd} className="pixel-card space-y-4">
        <div className="flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="New task..."
            className="pixel-input flex-grow"
          />
          <button
            type="submit"
            className="pixel-btn flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              checked={type === "daily"}
              onChange={() => setType("daily")}
              className="w-4 h-4"
            />
            <span className="font-sans">Daily</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              checked={type === "once"}
              onChange={() => setType("once")}
              className="w-4 h-4"
            />
            <span className="font-sans">One-Time</span>
          </label>
        </div>
      </form>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-2 top-2.5 w-5 h-5 text-earth-dark/50" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="pixel-input w-full pl-8"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <FilterButton
            label="All"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          <FilterButton
            label="Daily"
            active={filter === "daily"}
            onClick={() => setFilter("daily")}
          />
          <FilterButton
            label="One-Time"
            active={filter === "once"}
            onClick={() => setFilter("once")}
          />
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 && (
          <p className="text-center font-sans text-earth-dark/70 dark:text-sky-light/70 py-8">
            No tasks found.
          </p>
        )}
        {filteredTasks.map((task) => {
          const isCompletedToday =
            task.type === "daily" && task.completedDates.includes(today);
          const isArchived = task.type === "once" && task.archived;

          return (
            <div
              key={task.id}
              className={`pixel-card flex items-center justify-between gap-4 ${isCompletedToday || isArchived ? "opacity-50" : ""}`}
            >
              <div className="flex items-center gap-3 flex-grow">
                <button
                  onClick={() =>
                    !isCompletedToday && !isArchived && completeTask(task.id)
                  }
                  disabled={isCompletedToday || isArchived}
                  className={`w-8 h-8 border-2 border-earth-dark dark:border-earth-light flex items-center justify-center ${isCompletedToday || isArchived ? "bg-nature-dark" : "bg-white dark:bg-earth"}`}
                >
                  {(isCompletedToday || isArchived) && (
                    <Check className="w-5 h-5 text-white" />
                  )}
                </button>

                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="pixel-input flex-grow"
                  />
                ) : (
                  <div className="flex-grow">
                    <span
                      className={`font-sans text-lg ${isCompletedToday || isArchived ? "line-through" : ""}`}
                    >
                      {task.text}
                    </span>
                    <span className="block font-pixel text-[8px] text-nature-dark dark:text-nature-light">
                      {task.type === "daily" ? "DAILY" : "ONE-TIME"} • +
                      {task.points} NP
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {editingId === task.id ? (
                  <button
                    onClick={() => {
                      editTask(task.id, editText);
                      setEditingId(null);
                    }}
                    className="pixel-btn !p-2"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(task.id);
                      setEditText(task.text);
                    }}
                    className="pixel-btn !p-2"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="pixel-btn pixel-btn-danger !p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pixel-btn flex-grow md:flex-grow-0 ${active ? "bg-nature-dark" : ""}`}
    >
      {label}
    </button>
  );
}
