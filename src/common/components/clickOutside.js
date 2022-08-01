import React, { useEffect, useRef } from "react";

function ClickOutside({ isOpen = true, onClickOutside, children, className = "" }) {
  const ref = useRef();
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        onClickOutside();
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [onClickOutside, isOpen]);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}

export default ClickOutside;
