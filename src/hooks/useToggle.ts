import { useCallback, useEffect, useRef, useState } from "react";

const useToggle = (initialValue?: boolean) => {
  const [open, setOpen] = useState<boolean | undefined>(initialValue);
  const toggleRef = useRef<HTMLDivElement>(null);

  const onToggle = useCallback(() => setOpen((prevValue) => !prevValue), []);

  const onClose = useCallback(() => setOpen(false), []);

  const onOpen = useCallback(() => setOpen(true), []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return {
    open,
    setOpen,
    onToggle,
    onClose,
    toggleRef,
    onOpen,
  };
};

export default useToggle;
