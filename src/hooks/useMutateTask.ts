import React from "react";
import useStore from "../store";
import { trpc } from "../utils/trpc";

export const useMutateTask = () => {
  const utils = trpc.useContext();
  const reset = useStore((state) => state.resetEditedTask);

  const createTaskMutation = trpc.todo.createTask.useMutation({
    onSuccess: (res) => {
      const prevTodos = utils.todo.getTasks.getData();
      if (prevTodos) {
        utils.todo.getTasks.setData([res, ...prevTodos]);
      }
      reset();
    },
  });

  const updateTaskMutation = trpc.todo.updateTask.useMutation({
    onSuccess: (res) => {
      const prevTodos = utils.todo.getTasks.getData();
      if (prevTodos) {
        utils.todo.getTasks.setData(
          prevTodos.map((task) => (task.id === res.id ? res : task))
        );
      }
    },
  });

  const deleteTaskMutation = trpc.todo.deleteTask.useMutation({
    onSuccess: (_, variables) => {
      const prevTodos = utils.todo.getTasks.getData();
      if (prevTodos) {
        prevTodos.filter((task) => task.id !== variables.taskId);
      }
      reset();
    },
  });

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  };
};
