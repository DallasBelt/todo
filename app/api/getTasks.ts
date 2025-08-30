export const getTasks = async () => {
  const res = await fetch('/api/tasks', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || 'Error al obtener tareas.');
  }
  return data;
};
