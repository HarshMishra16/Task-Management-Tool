import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const params = {};
      if (status) params.status = status;
      if (search) params.search = search;
      const { data } = await api.get("/tasks", { params });
      setTasks(data);
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [status]);
  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line
  }, [search]);

  const stats = useMemo(() => ({
    total: tasks.length,
    completed: tasks.filter(t => t.status === "Completed").length,
    pending: tasks.filter(t => t.status === "Pending").length,
    inProgress: tasks.filter(t => t.status === "In Progress").length,
  }), [tasks]);

  const create = async (payload) => {
    await api.post("/tasks", payload);
    setShowForm(false); load();
  };
  const update = async (payload) => {
    await api.put(`/tasks/${editing._id}`, payload);
    setEditing(null); load();
  };
  const remove = async (task) => {
    if (!confirm(`Delete "${task.title}"?`)) return;
    await api.delete(`/tasks/${task._id}`); load();
  };
  const changeStatus = async (task, newStatus) => {
    await api.put(`/tasks/${task._id}`, { status: newStatus }); load();
  };

  return (
    <div className="dashboard">
      <section className="stats">
        <div className="stat"><span>Total</span><strong>{stats.total}</strong></div>
        <div className="stat"><span>Pending</span><strong>{stats.pending}</strong></div>
        <div className="stat"><span>In Progress</span><strong>{stats.inProgress}</strong></div>
        <div className="stat"><span>Completed</span><strong>{stats.completed}</strong></div>
      </section>

      <section className="toolbar">
        <input placeholder="🔍 Search by title..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option>Pending</option><option>In Progress</option><option>Completed</option>
        </select>
        <button className="btn btn-primary" onClick={() => { setEditing(null); setShowForm(true); }}>+ New Task</button>
      </section>

      {(showForm || editing) && (
        <TaskForm
          initial={editing}
          onSubmit={editing ? update : create}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      {loading ? <div className="center">Loading...</div> : (
        <div className="task-grid">
          {tasks.length === 0 && <p className="muted center">No tasks yet. Create your first one!</p>}
          {tasks.map(t => (
            <TaskCard key={t._id} task={t}
              onEdit={(t) => { setEditing(t); setShowForm(false); }}
              onDelete={remove}
              onStatusChange={changeStatus} />
          ))}
        </div>
      )}
    </div>
  );
}
