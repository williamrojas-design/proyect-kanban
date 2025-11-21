import { useState, useContext } from 'react';
import { KanbanContext } from '../../context/KanbanContext';
import './newTaskForm.css'; 

export const NewTaskForm = ({ setIsOpen }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const { addTask } = useContext(KanbanContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim() === '') return;

    addTask(taskTitle);
    setTaskTitle('');
    setIsOpen(false); 
  };

  return (
    <div className="new-task-form">
      <h3>Crear nueva tarea</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="new-task-input"
          autoFocus
        />
        
        <div className="form-actions" style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
          <button type="submit" className="new-task-button">
            Añadir
          </button>
          
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => setIsOpen(false)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};