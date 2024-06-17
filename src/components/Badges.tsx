import React from "react";

interface BadgesProps {
  img: string;
  name: string;
  category: string;
}

const Badges: React.FC<BadgesProps> = ({ img, name, category }) => {
  const getBgColor = () => {
    switch (category) {
      case "gold":
        return "from-yellow-900 to-yellow-300";
      case "silver":
        return "from-gray-800 to-gray-400";
      case "bronze":
        return "from-orange-900 to-orange-300";
      default:
        return "from-gray-500 to-gray-300";
    }
  };

  return (
    <div
      className={`rounded-md p-6 bg-gradient-to-t ${getBgColor()} flex flex-col items-center shadow-lg`}
    >
      <img src={img} alt={name} className="w-48 h-48 object-contain" />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
    </div>
  );
};

export default Badges;

