

// import {
//   featuresData,
//   statsData,
//   howItWorksData,
//   testimonialsData,
// } from "@/data/landing";

import {
  featuresData,
  statsData,
  howItWorksData,
  testimonialsData,
} from "../data/landing"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroSection from "components/herosection";

export default function Home() {
  return (
    <>
      <div className="mt-30">
        <HeroSection/>
      </div>

      <section className="py-18 bg-gradient-to-br from-white via-yellow-10 to-yellow-50 ">
        <div className="container mx-auto px-6 md:px-20">
          <h2 className="text-3xl text-center font-bold mb-12">
            Trusted by Thousands Worldwide
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 border border-yellow-100"
              >
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-700 text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10   my-5">
        <div className="container mx-auto px-6 md:px-20">
          <h2 className="text-3xl text-center font-bold mb-12">
            Smarter Tools for Smarter Finance
          </h2>

          <Carousel>
            <CarouselContent className="p-3">
              {featuresData.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full p-3 rounded-3xl bg-white/95 shadow-md border border-yellow-100 hover:shadow-xl hover:scale-[1.03] transition duration-300">
                    <CardContent className="p-8 flex flex-col gap-4">
                      <div className="text-yellow-700 text-4xl">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* bg-gradient-to-bl from-yellow-50 via-white to-yellow-100  */}

      <section className="py-10 bg-gradient-to-br from-white via-yellow-10 to-yellow-50 ">
        <div className="container mx-auto px-10">
          <h2 className="text-3xl text-center font-bold mb-10">
            How it's work
          </h2>
          <div className="grid grid-cols-1 gap-12   md:grid-cols-3">
            {howItWorksData.map((work, index) => (
              <Card key={index} className="pt-2">
                <CardContent className="space-y-4 pt-2">
                  {work.icon}
                  <h3 className="text-xl font-semibold">{work.title}</h3>
                  <p className="text-gray-600">{work.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10  my-5">
        <div className="container mx-auto px-10">
          <h2 className="text-3xl text-center font-bold mb-10">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 gap-12   md:grid-cols-3">
            {testimonialsData.map((testimonial, index) => (
              <Card
                key={index}
                className="pt-6 rounded-3xl shadow-md hover:shadow-xl hover:scale-[1.03] transition duration-300"
              >
                <CardContent className="space-y-4 pt-4">
                  <div className="flex items-center mb-5">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="ml-10 ">
                      <div className="font-semibold my-1">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-800">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-gradient-to-br from-yellow via-yellow-50 to-yellow-100 my-2  ">
        <div className="container mx-auto px-10 text-center">
          <h2 className="text-3xl text-center font-bold mb-5">
            Ready to Take Control of Your Finances ?
          </h2>
          <p className="text-200 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing thier finances
            smarter with Luxora
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-gray-500 hover:bg-gray-50 animate-bounce"
            >
              Start Free Trail
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
