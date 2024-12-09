import { Suspense } from "react";

import Loading from "@/app/loading.js";

import Landing from "@/components/Landing/Landing";
import MediaDisplay from "@/components/MediaDisplay/MediaDisplay";

const HomePage = () => {
  return (
    <>
      <Landing />
      <Suspense fallback={<Loading />}>
        <MediaDisplay />
      </Suspense>
    </>
  );
};

export default HomePage;
