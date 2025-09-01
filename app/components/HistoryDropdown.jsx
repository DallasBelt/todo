import { UndoDot } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useTasksStore } from '@/app/useTasksStore';

export const HistoryDropdown = () => {
  const { dropdownMenu, setDropdownMenu } = useTasksStore();

  return (
    <DropdownMenu open={dropdownMenu} onOpenChange={setDropdownMenu}>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon' className='cursor-pointer'>
          <UndoDot />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Cambiar a...</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Pendiente</DropdownMenuItem>
        <DropdownMenuItem>En Proceso</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
