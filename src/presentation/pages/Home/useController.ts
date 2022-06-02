import { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNotification } from "react-native-hook-notification";

import { makeGetTasks } from "../../../main/factories/usecases/getTasks";
import { useQuery } from "../../hooks/useQuery";
import { useStore } from "../../store/useStore";

export const useController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSerachValue] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const tasks = useStore((state) => state.tasks);

  const onHandleSheetChanges = (index: number) => {
    setIsOpen(!!index);
  };

  const onHandleCreate = () => {
    setIsOpen(true);
    bottomSheetRef.current?.expand();
  };

  const { isError, isSuccess, isLoading, data, refetch } = useQuery(() =>
    makeGetTasks({ name: searchValue })
  );
  const notification = useNotification();
  useEffect(() => {
    if (isError) {
      notification.error({
        text: "Getting tasks error!",
      });
    }
  }, [isError, notification]);

  const initTasks = useStore((state) => state.init);
  useEffect(() => {
    const canInit = isSuccess && data;
    if (canInit) {
      initTasks(data);
    }
  }, [isSuccess, data, initTasks]);

  const onSearch = useCallback(
    (value: string) => {
      setSerachValue(value);
      setTimeout(() => {
        refetch();
      }, 500);
    },
    [refetch]
  );

  const tasks = useStore((state) => state.se);

  useEffect(() => {}, []);

  return {
    isOpen,
    bottomSheetRef,
    onHandleSheetChanges,
    onHandleCreate,
    isLoading,
    tasks,
    onSearch,
  };
};
