import { useState } from 'react';
import { KanbanProvider } from './context/KanbanProvider.jsx';
import { Board } from './components/board/Board';
import { SearchFilter } from './components/searchFilter/SearchFilter';
import './App.css';

function App() {
  const [filterTerm, setFilterTerm] = useState('');

  return (

    <KanbanProvider>
      <div className="app-container">
        
        <header className="app-header">
          <h1 className="app-title">Kanban Board</h1>
          <SearchFilter onFilter={setFilterTerm} />
        </header>

        <main className="app-main">
          <Board filterTerm={filterTerm} />
        </main>
        
      </div>
    </KanbanProvider>
  );
}

export default App;
