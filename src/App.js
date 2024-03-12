import React, { useState } from "react";
import "./App.css"; // Import your CSS file

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const addTask = () => {
        if (newTask.trim() === "") {
            return;
        }

        setTasks([...tasks, { id: Date.now(), text: newTask, updateCount: 0 }]);
        setNewTask("");
    };

    const removeTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    const handleUpdateTask = (taskId, newText) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, text: newText, updateCount: task.updateCount + 1 } : task
            )
        );
    };

    const handleTaskTextChange = (taskId, newText) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, text: newText } : task
            )
        );
    };

    const handleKeyPress = (event, taskId, newText) => {
        if (event.key === 'Enter') {
            handleUpdateTask(taskId, newText);
        }
    };

    return (
        <div className="TodoApp">
            <h1 className="headingMain">Day Goals!</h1>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            addTask();
                        }
                    }}
                />
                <button onClick={addTask}>Add Todo</button>
            </div>

            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <input
                            type="text"
                            value={task.text}
                            onChange={(e) => handleTaskTextChange(task.id, e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, task.id, task.text)}
                        />
                        <button onClick={() => handleUpdateTask(task.id, task.text)}>Update</button>
                        <button className="removeBtn" onClick={() => removeTask(task.id)}> ❌</button>
                        <span> Updated: {task.updateCount} times</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
