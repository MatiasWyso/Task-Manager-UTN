import React, { useState } from 'react';
import Swal from 'sweetalert2';

const TaskItem = ({ task, onToggleComplete, onDelete, onDeletePermanently }) => {
  const [completed, setCompleted] = useState(task.completed);

  const handleToggleComplete = () => {
    const newCompletedState = !completed;

    // Mostrar la alerta de SweetAlert2 al completar/desmarcar la tarea
    Swal.fire({
      position: 'top-end',
      icon: newCompletedState ? 'success' : 'warning',
      title: newCompletedState ? 'Tarea Completada' : 'Tarea Desmarcada',
      showConfirmButton: false,
      timer: 1500,
    });

    setCompleted(newCompletedState);
    onToggleComplete(task.id);
  };

  const handleDelete = () => {
    onDelete(task.id);

    // Mostrar la alerta de SweetAlert2 al eliminar la tarea
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Tarea eliminada',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDeletePermanently = () => {
    // Mostrar el cuadro de diálogo con dos opciones: Eliminar o Cancelar
    Swal.fire({
      title: '¿Deseas eliminar permanentemente esta tarea?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario elige "Eliminar", realiza la eliminación permanente
        onDeletePermanently(task.id);
        setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Tarea eliminada permanentemente',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="bg-black border border-gray-300 p-4 mb-4 flex justify-between items-center">
      <span className={`flex-grow mr-4 ${completed ? 'line-through text-green' : ''}`}>
        {task.text} {completed && '(completado)'}
      </span>
      {!task.deleted && (
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded mr-4" onClick={handleToggleComplete}>
          {completed ? '✔️ Desmarcar Tarea' : '✔️ Completar Tarea'}
        </button>
      )}
      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={() => (task.deleted ? handleDeletePermanently() : handleDelete())}>
        {task.deleted ? 'Eliminar Permanentemente' : '❌ Eliminar Tarea'}
      </button>
    </div>
  );
};

export default TaskItem;
