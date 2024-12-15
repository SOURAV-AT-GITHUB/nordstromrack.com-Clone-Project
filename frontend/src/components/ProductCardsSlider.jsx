import { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import SkeletonCard from "./SkeletonCard";
import axios from "axios";

export default function ProductCardsSlider({ URL = false }) {
  const [data, setData] = useState(false);
  const getData = async () => {
    if (!URL) {
      alert("Something went wrong.");
      return;
    }
    try {
      const response = await axios.get(URL);

      setData(response.data.data);
    } catch (error) {
      setData(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex   gap-6  overflow-x-auto ">
      {(data ? data : Array.from({ length: 10 })).map((product, index) =>
        product ? (
          <ProductCards data={product} key={index} />
        ) : (
          <SkeletonCard key={index} />
        )
      )}
    </div>
  );
}
