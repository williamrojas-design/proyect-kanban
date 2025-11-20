import { TaskCard } from '../taskCard/TaskCard';
import './boardColumn.css';

export const BoardColumn = ({ title, tasks, columnId }) => {
  return (
    <div className="board-column">
      <h2 className="column-title">{title}</h2>
      <div className="column-content">
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            column={columnId}
          />
        ))}
        {tasks.length === 0 && (
          <p className="empty-column-msg">No hay tareas</p>
        )}
      </div>

    </div>
  );
};