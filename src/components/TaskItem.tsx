import React, { FC } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { updateTaskInput } from "../schema/todo";
import useStore from "../store";
import { useMutateTask } from "../hooks/useMutateTask";
import Link from "next/link";

export const TaskItem: FC<updateTaskInput> = (props) => {
  const { title, body, taskId } = props;

  const update = useStore((state) => state.updateEditedTask);
  const { deleteTaskMutation } = useMutateTask();

  return (
    <li>
      <Link href={`/task/${taskId}`}>
        <span className="cursor-pointer">{title}</span>
      </Link>
      <div className="float-right ml-20 flex">
        <PencilIcon
          className="mx-1 h-5 w-5 cursor-pointer text-blue-600"
          onClick={() => update({ title, body, taskId })}
        />
        <TrashIcon
          className="h-5 w-5 cursor-pointer text-blue-600"
          onClick={() => deleteTaskMutation.mutate({ taskId })}
        />
      </div>
      {deleteTaskMutation.isLoading && (
        <p className="mb-2 text-green-500">Mutation under process...</p>
      )}
    </li>
  );
};
