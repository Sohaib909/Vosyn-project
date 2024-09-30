import React from "react";

const HomePage = () => {
  const test = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/audio/${1}`);
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error fetching video by ID:", error);
    }
  };

  test();
  return <div>HomePage</div>;
};

export default HomePage;
