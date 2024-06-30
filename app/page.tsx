import Container from "@/app/components/Container";
import ListingCard from "@/app/components/listings/ListingCard";
import EmptyState from "@/app/components/EmptyState";

import getListings, {
  IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import FilterIndex from "./components/filters/Index";
import OfferList from "./components/Offer";
import Heading from "./components/Heading";
import PropertyFilter from "./components/property-filter";

interface HomeProps {
  searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {
  const premiumlisting = await getListings({ ...searchParams, isReserved: true, isPremium: true });
  const listings = await getListings({ ...searchParams, isReserved: true });
  const currentUser = await getCurrentUser();
  const startTime = new Date(); // Example start time (replace with actual start time)
  const duration = 60;

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="lg:pt-5 pb-10">
          <OfferList data={premiumlisting} />
        </div>
        <Heading title="Property Types" subtitle="Filter by property type" />
        <PropertyFilter />
        <div
          className="
          pt-5
            grid 
            grid-cols-1 
            sm:grid-cols-1 
            md:grid-cols-2
            lg:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-8
          
          "
        >

          {listings.map((listing: any) => (
            <ListingCard
              currentUser={currentUser}
              key={listing._id}
              data={listing}

            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home;
