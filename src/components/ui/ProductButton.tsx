import { FaBox } from "react-icons/fa";
import type { MouseEventHandler } from "react";

type ProductButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const ProductButton = ({ onClick }: ProductButtonProps) => {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-row items-center gap-2">
        <span>Agregar</span>
        <FaBox />
        <span>+</span>
      </div>
    </button>
  );
};

export default ProductButton;
