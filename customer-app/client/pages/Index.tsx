import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-end items-center bg-white w-full max-w-sm mx-auto pt-16 pb-8 px-4 relative sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl sm:pt-20 md:pt-24 lg:pt-32">
      {/* Animated Food Carousel */}
      <div className="h-[402px] w-full relative overflow-hidden mb-8 sm:h-[450px] md:h-[500px] lg:h-[550px]">
        {/* First row - scrolling right */}
        <div className="flex h-48 items-center gap-2.5 absolute left-0 top-0 animate-scroll-right sm:h-52 md:h-56 lg:h-60">
          {/* First set of images */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/06198e2da79b74ee4d73b3b1d6af7a79d939a411?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/745737e8d966896639afaacad597c5ce010230c4?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9bb28e5c3d777f489b3547fb53d1a5f6eeb2b76a?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fcba38e2468b89c971ec9a4d47c9a030c78cd6a?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/87da3d209d07817b5a9f3f0ace5d186734d19ddc?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a97b8889cbfdcf00e95250349b8d61b125f47a6?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />

          {/* Duplicate set for seamless loop */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/06198e2da79b74ee4d73b3b1d6af7a79d939a411?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/745737e8d966896639afaacad597c5ce010230c4?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9bb28e5c3d777f489b3547fb53d1a5f6eeb2b76a?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fcba38e2468b89c971ec9a4d47c9a030c78cd6a?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/87da3d209d07817b5a9f3f0ace5d186734d19ddc?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a97b8889cbfdcf00e95250349b8d61b125f47a6?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
        </div>

        {/* Second row - scrolling left */}
        <div className="flex h-48 items-center gap-2.5 absolute left-0 top-52 animate-scroll-left sm:h-52 sm:top-56 md:h-56 md:top-60 lg:h-60 lg:top-64">
          {/* First set of images */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fcba38e2468b89c971ec9a4d47c9a030c78cd6a?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/87da3d209d07817b5a9f3f0ace5d186734d19ddc?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a97b8889cbfdcf00e95250349b8d61b125f47a6?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/06198e2da79b74ee4d73b3b1d6af7a79d939a411?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/745737e8d966896639afaacad597c5ce010230c4?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9bb28e5c3d777f489b3547fb53d1a5f6eeb2b76a?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />

          {/* Duplicate set for seamless loop */}
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2fcba38e2468b89c971ec9a4d47c9a030c78cd6a?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/87da3d209d07817b5a9f3f0ace5d186734d19ddc?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a97b8889cbfdcf00e95250349b8d61b125f47a6?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/06198e2da79b74ee4d73b3b1d6af7a79d939a411?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/745737e8d966896639afaacad597c5ce010230c4?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9bb28e5c3d777f489b3547fb53d1a5f6eeb2b76a?width=280"
            alt="Delicious food"
            className="w-36 h-48 rounded-[14px] flex-shrink-0 object-cover sm:w-40 sm:h-52 md:w-44 md:h-56 lg:w-48 lg:h-60"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full space-y-6">
        {/* Text Content */}
        <div className="flex flex-col items-center gap-4 px-2.5 sm:gap-6 md:gap-8">
          <h1 className="w-full text-[#191919] text-center font-normal text-[28px] leading-normal sm:text-[32px] md:text-[36px] lg:text-[40px]">
            A Taste of Home, Delivered to You!
          </h1>
          <p className="w-full text-[#5e5e5e] text-center font-normal text-base leading-normal overflow-hidden text-ellipsis line-clamp-2 sm:text-lg md:text-xl">
            Discover fresh, homemade meals crafted by passionate home cooks in
            your community
          </p>
        </div>

        {/* Login Section */}
        <div className="flex flex-col gap-4 w-full sm:gap-6 md:gap-8">
          {/* Login Button */}
          <button
            onClick={() => navigate("/login")}
            className="flex h-[60px] px-5 py-3.5 justify-center items-center w-full rounded-[14px] bg-[#00955d] text-white cursor-pointer hover:bg-[#00835a] transition-colors sm:h-[68px] md:h-[76px] sm:px-6 md:px-8"
          >
            <span className="font-normal text-base leading-[140%] tracking-[0.32px] sm:text-lg md:text-xl">
              Login
            </span>
          </button>

          {/* Sign up link */}
          <div className="text-center">
            <span className="text-[#5e5e5e] font-normal text-sm sm:text-base">
              Don't have an account?
            </span>
            <button
              onClick={() => navigate("/signup")}
              className="text-[#00955d] font-normal text-sm sm:text-base underline decoration-solid decoration-1 underline-offset-[25%] ml-1 hover:text-[#00835a] transition-colors"
            >
              Sign up
            </button>
          </div>
        </div>

        {/* Terms and Privacy */}
        <p className="w-full text-[#5e5e5e] text-center font-normal text-xs leading-normal overflow-hidden text-ellipsis line-clamp-2 sm:text-sm md:text-base">
          <span>By continuing you agree to our </span>
          <span className="text-[#00955d] underline decoration-solid decoration-1 underline-offset-[25%]">
            Terms of Service
          </span>
          <span> and </span>
          <span className="text-[#00955d] underline decoration-solid decoration-1 underline-offset-[25%]">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
}
