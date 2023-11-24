import Container from "@/components/Layout/Container";
import EventCard from "@/components/Layout/EventCard";
import { Helmet } from "react-helmet";

const Events = () => {
  return (
    <>
      <Helmet>
        <title>Events</title>
      </Helmet>
      <Container>
        <div className="space-y-4 mt-12">
          <EventCard />
          <EventCard active={true} />
          <EventCard />
          <EventCard active={true} />
        </div>
      </Container>
    </>
  );
};

export default Events;
