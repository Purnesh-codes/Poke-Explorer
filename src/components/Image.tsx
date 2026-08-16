import { useState } from "react";
import Loading from "./Loading";

type ImageProps = {
  imageUrl: string;
};

export default function Image({ imageUrl }: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative flex w-full items-center justify-center">
      {/* The Spinner (Shows while isLoaded is false) */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loading />
        </div>
      )}

      {/* The Actual Image */}
      <img
        src={imageUrl}
        alt="Profile"
        //The Trigger!
        onLoad={() => setIsLoaded(true)}
        // The CSS Swap (Invisible until loaded)
        className={`${
          isLoaded ? "opacity-100" : "opacity-0"
        } aspect-square h-auto w-full overflow-hidden object-cover transition-transform duration-300 group-hover:scale-125`}
      />
    </div>
  );
}
