'use client';

import { Check, Cog, Hourglass, Loader2, Pencil, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { useTasks } from '@/app/hooks/useTasks';
import { useTasksStore } from '@/app/useTasksStore';
import { NewTaskDialog } from '@/app/components/NewTaskDialog';
import { DeleteTaskDialog } from '@/app/components/DeleteTaskDialog';

const statuses = [
  { key: 'PENDING', label: 'Pendientes' },
  { key: 'ONGOING', label: 'En Proceso' },
  { key: 'FINISHED', label: 'Finalizadas' },
] as const;

export default function Tasks() {
  const { tasksQuery, markTaskFinished, markTaskOngoing, markTaskPending } =
    useTasks();

  const tasks = tasksQuery?.data || [];

  const {
    setCreateTaskDialog,
    setTask,
    setDeleteTaskDialog,
    setIsEditingTask,
  } = useTasksStore();

  return (
    <>
      <header className='text-center py-8 bg-gray-100'>
        <h1 className='text-3xl font-bold'>Gestor de Tareas</h1>
        <p className='text-gray-600 mt-2'>
          Administra tus tareas de manera eficiente
        </p>
      </header>
      <div className='flex flex-col px-8 py-12 md:flex-row gap-4 md:px-36'>
        {statuses.map((status) => {
          const filteredTasks = tasks.filter(
            (task: any) => task.status === status.key
          );

          return (
            <div key={status.key} className='flex-1 min-w-[250px]'>
              <h2 className='text-lg font-bold mb-2 text-center'>
                {status.label}
              </h2>
              <div className='min-h-[200px] grid gap-2 mb-8 auto-rows-fr'>
                {/* Loading */}
                {tasksQuery.isLoading && (
                  <div className='flex justify-center items-center py-8'>
                    <Loader2 size={30} className='animate-spin text-gray-500' />
                  </div>
                )}

                {/* Tasks */}
                {!tasksQuery.isLoading &&
                  filteredTasks.map((task: any) => (
                    <Card key={task.id} className='mb-3 mx-2.5 group relative'>
                      <CardHeader>
                        <CardTitle>{task.title}</CardTitle>
                        <p className='text-gray-600 text-sm'>
                          {task.description}
                        </p>
                      </CardHeader>
                      <CardContent className='flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                        {/* Pending Button. Show only if task is ongoing or finished */}
                        {task.status !== 'PENDING' && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant='outline'
                                size='icon'
                                className='cursor-pointer'
                                onClick={() => {
                                  markTaskPending(task);
                                }}
                              >
                                <Hourglass />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Mover a 'Pendientes'</p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {/* Ongoing Button. Show only if task is pending or finished */}
                        {task.status !== 'ONGOING' && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant='outline'
                                size='icon'
                                className='cursor-pointer'
                                onClick={() => {
                                  markTaskOngoing(task);
                                }}
                              >
                                <Cog />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Mover a 'En Proceso'</p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {/* Complete Button. Show only if task is pending or ongoing */}
                        {task.status !== 'FINISHED' && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant='outline'
                                size='icon'
                                className='cursor-pointer'
                                onClick={() => {
                                  markTaskFinished(task);
                                }}
                              >
                                <Check />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Finalizar</p>
                            </TooltipContent>
                          </Tooltip>
                        )}

                        {/* Edit Button*/}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant='outline'
                              size='icon'
                              className='cursor-pointer'
                              onClick={() => {
                                setIsEditingTask(true);
                                setTask({
                                  id: task.id,
                                  title: task.title,
                                  description: task.description,
                                  status: task.status,
                                });
                                setCreateTaskDialog(true);
                              }}
                            >
                              <Pencil />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Editar</p>
                          </TooltipContent>
                        </Tooltip>

                        {/* Delete Button */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant='outline'
                              size='icon'
                              className='cursor-pointer'
                              onClick={() => {
                                setDeleteTaskDialog(true);
                                setTask({ id: task.id });
                              }}
                            >
                              <Trash2 />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Eliminar</p>
                          </TooltipContent>
                        </Tooltip>
                      </CardContent>
                    </Card>
                  ))}

                {/* New Task Button */}
                <div className='flex justify-start mx-2.5'>
                  <NewTaskDialog status={status.key} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <DeleteTaskDialog />
    </>
  );
}
