import { useState, useCallback, useEffect } from "react";

/**
 * Use the current size of an element
 * @returns [onRefChange, size, resetSize]
 */
const useElementSize = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [node, setNode] = useState<HTMLElement>();

  const resetSize = useCallback(() => {
    if (node) {
      setSize({
        width: node.offsetWidth || 0,
        height: node.offsetHeight || 0,
      });
    }
  }, [node]);

  useEffect(() => {
    resetSize();
  }, [resetSize]);

  const onRefChange = useCallback(
    (newNode: HTMLElement) => newNode && setNode(newNode),
    [setNode]
  );

  return [onRefChange, size, resetSize];
};

export default useElementSize;
