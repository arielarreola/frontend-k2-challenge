import LandingLayout from "../../components/layout/LandingLayout";
import Welcome from "../../components/ui/Welcome";

const WelcomePage = () => {
  return (
    <LandingLayout>
      <section className="flex flex-col items-center justify-center ">
        <Welcome />
      </section>
    </LandingLayout>
  );
};

export default WelcomePage;
