import Image from "next/image";

import styles from "./ComingSoon.module.css";

const ComingSoon = () => {
  return (
    <Image
      className={styles["background"]}
      src="/mediaFiles/ComingSoon/Coming_soon_overlay.png"
      width={1920}
      height={1080}
    ></Image>
  );
};

export default ComingSoon;
