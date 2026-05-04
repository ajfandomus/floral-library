import "./Home.css";
import HomeSidebar from "../components/home/HomeSidebar";
import HomeHero from "../components/home/HomeHero";
import HomeIntro from "../components/home/HomeIntro";
import HomeCollectionsGrid from "../components/home/HomeCollectionsGrid";
import HomePlantCollections from "../components/home/HomePlantCollections";
import HomeStorySection from "../components/home/HomeStorySection";
import HomeRespectSection from "../components/home/HomeRespectSection";

export default function Home() {
  return (
    <div className="home">
      <div className="home__layout">
        <HomeSidebar />

        <main className="home__content">
          <HomeHero />
          <HomeIntro />
          <HomeCollectionsGrid />
          {/* <HomePlantCollections /> */}
          <HomeStorySection />
          <HomeRespectSection />
        </main>
      </div>
    </div>
  );
}