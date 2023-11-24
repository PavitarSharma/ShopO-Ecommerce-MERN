import { Footer } from "@/components/Root";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/utils/data";
import { Helmet } from "react-helmet";

const Faq = () => {
  return (
    <>
    <Helmet>
        <title>Faqs</title>
      </Helmet>
      <div className="mt-20 mb-24 px-4">
        <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto px-2 shadow bg-white rounded-md">
          {faqs.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="text-lg">{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Footer />
    </>
  );
};

export default Faq;
