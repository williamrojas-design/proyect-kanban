import { useContext, useState } from 'react'; 
import { KanbanContext } from '../../context/KanbanContext';
import { BoardColumn } from '../boardColumn/BoardColumn';
import { NewTaskForm } from '../newTaskForm/NewTaskForm';
import './Board.css';

export const Board = ({ filterTerm }) => {
  const { tasks } = useContext(KanbanContext);
  
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filterTasks = (taskList) => {
    if (!filterTerm) return taskList;
    return taskList.filter((task) => 
      task.title.toLowerCase().includes(filterTerm.toLowerCase())
    );
  };

  return (
    <div className="board-wrapper" style={{ position: 'relative', height: '100%' }}>
      <div className="board">
        <BoardColumn title="TO-DO" columnId="todo" tasks={filterTasks(tasks.todo)} />
        <BoardColumn title="IN-PROGRESS" columnId="inProgress" tasks={filterTasks(tasks.inProgress)} />
        <BoardColumn title="DONE" columnId="done" tasks={filterTasks(tasks.done)} />
      </div>
      

      <div className="floating-container">
        {isFormOpen ? (
          <NewTaskForm setIsOpen={setIsFormOpen} />
        ) : (
          <button 
            className="open-form-btn"
            onClick={() => setIsFormOpen(true)}
          >
            + Nueva Tarea
          </button>
        )}
      </div>
    </div>
  );
};