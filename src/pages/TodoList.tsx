import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addTodo, toggleTodo, deleteTodo, updateTodo } from '../store/todoSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.items);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo.trim()));
      setNewTodo('');
      toast.success('Todo added successfully');
    }
  };

  const handleEdit = (id: string, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleUpdate = (id: string) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, text: editText.trim() }));
      setEditingId(null);
      setEditText('');
      toast.success('Todo updated successfully');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo List</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1"
        />
        <Button type="submit">Add Todo</Button>
      </form>

      <div className="space-y-4">
        {todos.map((todo) => (
          <Card key={todo.id} className="p-4">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => dispatch(toggleTodo(todo.id))}
              />
              
              {editingId === todo.id ? (
                <div className="flex-1 flex gap-2">
                  <Input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleUpdate(todo.id)}>Save</Button>
                  <Button variant="outline" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-between">
                  <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                    {todo.text}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEdit(todo.id, todo.text)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        dispatch(deleteTodo(todo.id));
                        toast.success('Todo deleted successfully');
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TodoList;