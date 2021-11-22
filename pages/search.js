import { useRouter } from "next/dist/client/router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import { useEffect } from "react";

function Search({ searchResults }) {
  const router = useRouter();

  const { location, startDate, endDate, numOfGuest } = router.query;

  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate} to ${formattedEndDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numOfGuest} guests`} />

      <main className="flex flex-col">
        <section className="inline-flex w-full h-80">
          <Map searchResults={searchResults} />
        </section>
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs ">
            Stays from {range} for {numOfGuest} guests
          </p>
          <p className="text-3xl font-semibold mt-2 mb-6 capitalize">
            Stays in {location}
          </p>
          <div className="hidden lg:inline-flex mb-5 space-x-4 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className="flex flex-col">
            {searchResults.map((item, i) => (
              <InfoCard key={i} item={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
