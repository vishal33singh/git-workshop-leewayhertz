import React, { useEffect, useRef } from "react";

function CloseIfClickOutside({ isOpen = true, setIsOpen, children, className="" }) {
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen, setIsOpen]);
  return <div className={className} ref={ref}>{children}</div>;
}

export default CloseIfClickOutside;
