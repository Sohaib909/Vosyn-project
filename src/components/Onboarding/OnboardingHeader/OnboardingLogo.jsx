import Image from "next/image";

const OnboardingLogo = () => {
  return (
    <Image
      src={"/mediaFiles/Logos/vosyn-logo-dark.svg"}
      alt="Vosyn logo"
      width={160}
      height={40}
    />
  );
};

export default OnboardingLogo;
