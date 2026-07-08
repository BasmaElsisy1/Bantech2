import Image from "next/image";
import ButtonComp from "./_components/button";
export const runtime = "edge";
export default function NotFound() {

  return (
    <div className=" bg-lightGery md:space-y-[72px] lg:space-y-20 space-y-5 px-4 max-w-[1437px] mx-auto xl:px-20 ">

      <div className="max-w-[924px] w-full relative lg:h-[392px] h-[150px] mx-auto">
        <Image
          src={'/Images/404Image.png'}
          alt="404 image"
          fill
          className="lg:object-cover object-contain"
        />
      </div>
      <div className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="md:text-[40px] text-2xl font-bold text-primary">Page Not Found</h1>
          <p className="text-primary md:text-xl text-base text-center">Lorem ipsum dolor sit amet consectetur. Aenean et lectus quam sagittis ac sit. Vitae enim nunc egestas elementum venenatis quis amet. Donec aliquam faucibus nibh justo. Varius praesent magna mus venenatis suspendisse quis lobortis proin. </p>
        </div>
        <ButtonComp
          link="/"
          text="Back to Homepage"
          white
          center
        />
      </div>
    </div>
  );
}
