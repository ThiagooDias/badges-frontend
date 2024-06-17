import React, { useEffect, useState } from "react";
import Badges from "../components/Badges";
import SkeletonLoader from "../components/SkeletonLoader";
import api from "../api/api";

interface Badge {
  id: number;
  img: string;
  name: string;
  category: string;
}

const Dashboard = () => {
  const fetchBadges = async () => {
    try {
      const response = await api.get("/user/badges");
      setBadges(response.data);
    } catch (error) {
      console.error("Erro ao buscar emblemas:", error);
    } finally {
      setLoading(false); 
    }
  };
  
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {

    fetchBadges();
  }, []);

  return (
    <div className="flex justify-center py-8">
      <div className="bg-slate-800 min-w-[1280px] max-w-7xl p-6 rounded-md shadow-2xl">
        <h2 className="font-semibold text-3xl">Minha coleção</h2>
        {badges.length === 0 && !loading && (
          <p className="text-center text-2xl font-medium mt-10">Nenhum emblema resgatado.</p>
        )}
        <div className="grid grid-cols-4 p-6 gap-4">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : (
            badges.map((badge) => (
              <Badges
                key={badge.id}
                img={badge.img}
                name={badge.name}
                category={badge.category}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
