import { Suspense } from "react";

import Landing from "@/components/Landing/Landing";
import MediaDisplay from "@/components/MediaDisplay/MediaDisplay";

const HomePage = () => {
  return (
    <>
      <Landing />
      <Suspense>
        <MediaDisplay />
      </Suspense>
    </>
  );
};

export default HomePage;
