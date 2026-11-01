import Banner from "@/components/homepage/Banner";
import HowItWorks from "@/components/homepage/HowItWorks";
import TopCategories from "@/components/homepage/TopCategories";
import Image from "next/image";

export default function Home() {
  return (
    <div>
       <Banner/>
       <HowItWorks/>
       <TopCategories/>
    </div>
  );
}
