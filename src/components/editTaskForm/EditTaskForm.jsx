import {useContext, useState} from "react";
import {KanbanContext} from "../../context/KanbanContext.jsx";
import './editTaskForm.css';

export const EditTaskForm = ({ task, setIsEditing }) => {
    const [taskTitle, setTaskTitle] = useState(task.title);
    const { editTask } = useContext(KanbanContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (taskTitle.trim() === "") return;

        editTask(task.id, taskTitle);
        setIsEditing(false);
    }

    return (
        <div className="edit-task-overlay">
            <div className="edit-task-form">
                <h3>Editar Tarea</h3>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Título de la tarea..."
                        value={taskTitle}
                        onChange={(event) => setTaskTitle(event.target.value)}
                        className="edit-task-input"
                        autoFocus
                    />

                    <div className="form-actions">
                        <button type="submit" className="save-task-button">Guardar</button>

                        <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}