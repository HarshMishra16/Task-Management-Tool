export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const fmt = (d) => (d ? new Date(d).toLocaleDateString() : "—");
  return (
    <div className={`task-card priority-${task.priority.toLowerCase()}`}>
      <div className="task-head">
        <h4>{task.title}</h4>
        <span className={`badge status-${task.status.replace(" ", "-").toLowerCase()}`}>{task.status}</span>
      </div>
      {task.description && <p className="task-desc">{task.description}</p>}
      <div className="task-meta">
        <span>🏷 {task.priority}</span>
        <span>📅 {fmt(task.deadline)}</span>
      </div>
      <div className="task-actions">
        <select value={task.status} onChange={(e) => onStatusChange(task, e.target.value)}>
          <option>Pending</option><option>In Progress</option><option>Completed</option>
        </select>
        <button onClick={() => onEdit(task)} className="btn btn-ghost">Edit</button>
        <button onClick={() => onDelete(task)} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}
