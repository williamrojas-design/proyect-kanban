import { useRef } from 'react';
import './searchFilter.css';

export const SearchFilter = ({ onFilter }) => {

  const searchInputRef = useRef(null);

  const handleSearch = () => {

    const searchTerm = searchInputRef.current.value;
    

    onFilter(searchTerm);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-filter-container">
      <input
        ref={searchInputRef} 
        type="text"
        placeholder="Buscar tarea..."
        className="search-input"
        onKeyDown={handleKeyDown}
      />
      <button 
        onClick={handleSearch} 
        className="search-button"
      >
        Filtrar
      </button>
    </div>
  );
};