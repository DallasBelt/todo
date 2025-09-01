export const updateTask = async (
  id: string,
  task: {
    title: string;
    description?: string;
    status?: 'PENDING' | 'ONGOING' | 'FINISHED';
  }
) => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data?.message || 'Error al editar tarea.');

  return data;
};
