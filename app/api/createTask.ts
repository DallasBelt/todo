export const createTask = async (task: {
  title: string;
  description?: string;
}) => {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...task,
      status: 'PENDING', // default status
    }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data?.message || 'Error al crear tarea.');

  return data;
};
