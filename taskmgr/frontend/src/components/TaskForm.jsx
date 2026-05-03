import { useEffect, useState } from "react";

const empty = { title: "", description: "", priority: "Medium", deadline: "", status: "Pending" };

export default function TaskForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (initial) {
      setForm({
        title: initial.title || "",
        description: initial.description || "",
        priority: initial.priority || "Medium",
        deadline: initial.deadline ? initial.deadline.slice(0, 10) : "",
        status: initial.status || "Pending",
      });
    } else setForm(empty);
  }, [initial]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit({ ...form, deadline: form.deadline || null });
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <h3>{initial ? "Edit Task" : "New Task"}</h3>
      <input name="title" value={form.title} onChange={change} placeholder="Title" required />
      <textarea name="description" value={form.description} onChange={change} placeholder="Description" rows="3" />
      <div className="row">
        <select name="priority" value={form.priority} onChange={change}>
          <option>Low</option><option>Medium</option><option>High</option>
        </select>
        <select name="status" value={form.status} onChange={change}>
          <option>Pending</option><option>In Progress</option><option>Completed</option>
        </select>
        <input type="date" name="deadline" value={form.deadline} onChange={change} />
      </div>
      <div className="row">
        <button type="submit" className="btn btn-primary">{initial ? "Update" : "Create"}</button>
        {onCancel && <button type="button" onClick={onCancel} className="btn btn-ghost">Cancel</button>}
      </div>
    </form>
  );
}
