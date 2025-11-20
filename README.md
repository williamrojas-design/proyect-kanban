# React Kanban Board

A modern, responsive task management application built with **React**. It features a drag-and-drop-like interface (via click actions), real-time filtering, and robust data persistence using LocalStorage and external APIs.

## Project Structure

The project follows a modular architecture, separating business logic (Context) from UI components.

```text
src/
├── components/
│   ├── board/             # Main board layout & floating action logic
│   ├── boardColumn/       # Column containers (ToDo, In-Progress, Done)
│   ├── taskCard/          # Individual task UI with delete/move logic
│   ├── newTaskForm/       # Controlled form & Floating Action Button (FAB)
│   └── searchFilter/      # Uncontrolled component (useRef) for search
├── context/
│   ├── KanbanContext.jsx  # Context definition
│   └── KanbanProvider.jsx # Global state, CRUD logic, and persistence
├── App.jsx                # Main layout and Semantic HTML structure
└── App.css                # Global styles and reset
```

## Key Technical Decisions

### 1\. Global State Management

Implemented **React Context API** (`KanbanProvider`) to manage the application state centrally. This avoids "prop drilling" and makes functions like `moveTask` or `deleteTask` accessible from any component depth.

### 2\. Robust Data Persistence (The `isLoading` Lock)

To prevent data loss, a synchronization strategy was implemented:

  * **Initialization:** The app first checks `localStorage`. If empty, it fetches data from the `dummyjson` API.
  * **Safety Lock:** An `isLoading` state prevents the `useEffect` responsible for saving data from running during the initial render. This ensures that existing data in LocalStorage is never overwritten by an empty initial state.

### 3\. Data Normalization

To ensure consistency between numeric IDs from the API and timestamp-based IDs (`Date.now()`) generated locally:

  * All IDs are strictly treated as **Strings** throughout the application.
  * API data is sanitized upon fetching to handle inconsistent field names (`item.todo` vs `item.title`).

### 4\. Component Patterns

  * **Controlled Components:** Used for the `NewTaskForm` to validate input in real-time.
  * **Uncontrolled Components:** Used `useRef` for the `SearchFilter` to optimize rendering performance, triggering updates only when necessary.

## Getting Started

1.  **Install dependencies**

    ```bash
    npm install
    ```

2.  **Run the project**

    ```bash
    npm run dev
    ```
