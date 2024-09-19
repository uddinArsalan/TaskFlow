'use client'

import { useState } from 'react';
import TaskList from '../components/TaskList';
import KanbanBoard from '../components/KanbanBoard';
import { Button } from '../components/ui/button';

export default function DashboardPage() {
  const [view, setView] = useState<'list' | 'kanban'>('list')

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <div>
          <Button 
            onClick={() => setView('list')} 
            variant={view === 'list' ? 'default' : 'outline'}
          >
            List View
          </Button>
          <Button 
            onClick={() => setView('kanban')} 
            variant={view === 'kanban' ? 'default' : 'outline'}
          >
            Kanban View
          </Button>
        </div>
      </div>
      {view === 'list' ? <TaskList /> : <KanbanBoard />}
    </div>
  )
}