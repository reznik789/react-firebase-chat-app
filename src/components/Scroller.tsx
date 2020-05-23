import React, { useRef, useEffect, useCallback, SyntheticEvent } from "react";

type useScrollType = [
  React.MutableRefObject<HTMLDivElement | null>,
  React.MutableRefObject<boolean>
];

function useScrollerRef(): useScrollType {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const shouldScroll = useRef<boolean>(true);
  useEffect(() => {
    if (scrollerRef.current && shouldScroll.current) {
      scrollerRef.current.scrollTop = scrollerRef.current?.scrollHeight;
    }
  });
  return [scrollerRef, shouldScroll];
}

const Scroller: React.FC<React.HTMLProps<HTMLDivElement>> = props => {
  const [scrollerRef, shouldScrollRef] = useScrollerRef();

  const handleScroll = useCallback(
    (e: SyntheticEvent) => {
      const element = e.target as HTMLDivElement;
      shouldScrollRef.current =
        element.scrollHeight - element.scrollTop === element.clientHeight;
    },
    [shouldScrollRef]
  );

  return <div onScroll={handleScroll} ref={scrollerRef} {...props} />;
};

export default Scroller;
