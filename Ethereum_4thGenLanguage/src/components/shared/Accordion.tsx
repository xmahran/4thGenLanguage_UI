import React, { useState } from "react";

interface AccordionProps {
  title: string;
  children: any;
  size?: any;
}
const Accordion: React.FC<AccordionProps> = ({ title, children, size }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion w-full">
      <div className="accordion-item">
        <div className="accordion-title">
          <button
            className="flex items-center justify-between w-full h-[60px] p-4 border-b border-gray-200"
            onClick={toggleAccordion}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <h1 className="text-lg">{title}</h1>
            <span className="icon ">
              {isOpen ? (
                <img
                  src={`/svgs/${isHovered ? `blueUp` : `darkUp`}.svg`}
                  className="w-8 h-8 mt-1"
                />
              ) : (
                <img
                  src={`/svgs/${isHovered ? `blueDown` : `darkDown`}.svg`}
                  className="w-8 h-8 mt-1"
                />
              )}
            </span>
          </button>
        </div>
        <div
          className={`accordion-content text-start text-sm font-bold transition-opacity duration-300 ease-in-out ${
            isOpen ? "" : "hidden"
          } p-4`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
