import Head from "next/head";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LargeCard from "../components/LargeCard";
import MediumCard from "../components/MediumCard";
import SmallCard from "../components/SmallCard";

export default function Home({ exploreData, cardData }) {
  return (
    <div className="">
      <Head>
        <title>Airbnb Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* Pull some data from server - API endpoints */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map((item, i) => {
              return (
                <SmallCard
                  key={i}
                  img={item.img}
                  location={item.location}
                  distance={item.distance}
                />
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
          <div className="flex space-x-4 overflow-scroll scrollbar-hide p-3 -ml-3">
            {cardData?.map((item, i) => {
              return <MediumCard key={i} title={item.title} img={item.img} />;
            })}
          </div>
        </section>

        <LargeCard
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlist curated by Airbnb."
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const exploreData = await fetch("https://links.papareact.com/pyp").then(
    (res) => {
      return res.json();
    }
  );

  const cardData = await fetch("https://links.papareact.com/zp1").then(
    (res) => {
      return res.json();
    }
  );

  return {
    props: {
      exploreData,
      cardData,
    },
  };
}
