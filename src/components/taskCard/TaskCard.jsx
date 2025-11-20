import { useContext, useState } from 'react';
import { KanbanContext } from '../../context/KanbanContext';
import './taskCard.css';

export const TaskCard = ({ task, column }) => {
  const { moveTask, deleteTask } = useContext(KanbanContext);
  const [showConfirm, setShowConfirm] = useState(false);

  const borderColors = {
    todo: '#007bff',      
    inProgress: '#fd7e14',
    done: '#28a745'   
  };

  const handleDeleteClick = () => {
    deleteTask(task.id);
  };

  return (
    <div 
      className="task-card" 
      style={{ borderColor: borderColors[column] }}
    >
      <button 
        className="delete-x-btn"
        onClick={() => setShowConfirm(true)}
        title="Eliminar tarea"
      >
        ×
      </button>

      <h3 className="task-title">{task.title}</h3>

      <div className="task-actions">
        {column !== 'todo' && (
          <button className="action-btn" onClick={() => moveTask(task.id, 'todo')}>
            To TO-DO
          </button>
        )}
        {column !== 'inProgress' && (
            <button className="action-btn" onClick={() => moveTask(task.id, 'inProgress')}>
            To In-Prog
            </button>
        )}
        {column !== 'done' && (
            <button className="action-btn" onClick={() => moveTask(task.id, 'done')}>
            To Done
            </button>
        )}
      </div>

      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-content">
            <p>¿Eliminar esta tarea?</p>
            <div className="confirm-actions">
              <button 
                className="confirm-btn delete" 
                onClick={handleDeleteClick}
              >
                Eliminar
              </button>
              <button 
                className="confirm-btn cancel" 
                onClick={() => setShowConfirm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};