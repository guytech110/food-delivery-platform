import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AllergySelection() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);

  const allergies = [
    "Peanuts",
    "Soybeans",
    "Milk",
    "Fish",
    "Eggs",
    "Crustacean Shellfish",
    "Sesame",
    "Wheat",
    "Tree Nuts",
  ];

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy)
        ? prev.filter((a) => a !== allergy)
        : [...prev, allergy],
    );
  };

  const handleSave = () => {
    // Update user allergies in global state
    updateUser({ allergies: selectedAllergies });
    // Navigate to home page after allergy selection
    navigate("/home");
  };

  const handleNoAllergies = () => {
    // Update user allergies as empty array
    updateUser({ allergies: [] });
    // Navigate to home page after allergy selection
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-white w-full max-w-sm mx-auto relative">
      {/* Gradient Background */}
      <div
        className="w-full h-[170px] absolute left-0 top-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(80, 186, 108, 0.50) 0%, rgba(80, 186, 108, 0.00) 100%)",
        }}
      ></div>

      {/* Content Container */}
      <div className="relative z-10 pt-[182px] px-5">
        {/* Header Section */}
        <div className="flex flex-col items-center gap-4 mb-[100px] px-2.5">
          <h1 className="text-[#191919] text-center text-2xl font-medium leading-normal">
            Let's Keep You Safe!
          </h1>
          <p className="text-[#5e5e5e] text-center text-base font-normal leading-normal max-w-[281px] line-clamp-2">
            Tell us about any food allergies so we can help you enjoy meals
            worry-free
          </p>
        </div>

        {/* Allergy Selection Grid */}
        <div className="flex flex-col justify-center items-center gap-2.5 mb-[204px]">
          {/* Row 1 */}
          <div className="flex justify-center items-center gap-2.5">
            {allergies.slice(0, 3).map((allergy) => (
              <button
                key={allergy}
                onClick={() => toggleAllergy(allergy)}
                className={`flex h-[35px] px-3 justify-center items-center gap-1.5 rounded-[25px] transition-colors ${
                  selectedAllergies.includes(allergy)
                    ? "bg-[#00955d] text-white"
                    : "bg-[#f6f6f5] text-[#333] hover:bg-gray-200"
                }`}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[10.75px] h-[10.75px]"
                >
                  <path
                    d="M6.875 1.125L6.875 11.875M12.25 6.5L1.5 6.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-sm font-medium leading-normal capitalize">
                  {allergy}
                </span>
              </button>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex justify-center items-center gap-2.5">
            {allergies.slice(3, 6).map((allergy) => (
              <button
                key={allergy}
                onClick={() => toggleAllergy(allergy)}
                className={`flex h-[35px] px-3 justify-center items-center gap-1.5 rounded-[25px] transition-colors ${
                  selectedAllergies.includes(allergy)
                    ? "bg-[#00955d] text-white"
                    : "bg-[#f6f6f5] text-[#333] hover:bg-gray-200"
                }`}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[10.75px] h-[10.75px]"
                >
                  <path
                    d="M6.875 1.125L6.875 11.875M12.25 6.5L1.5 6.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-sm font-medium leading-normal capitalize">
                  {allergy}
                </span>
              </button>
            ))}
          </div>

          {/* Row 3 */}
          <div className="flex justify-center items-center gap-2.5">
            {allergies.slice(6, 9).map((allergy) => (
              <button
                key={allergy}
                onClick={() => toggleAllergy(allergy)}
                className={`flex h-[35px] px-3 justify-center items-center gap-1.5 rounded-[25px] transition-colors ${
                  selectedAllergies.includes(allergy)
                    ? "bg-[#00955d] text-white"
                    : "bg-[#f6f6f5] text-[#333] hover:bg-gray-200"
                }`}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[10.75px] h-[10.75px]"
                >
                  <path
                    d="M6.875 1.125L6.875 11.875M12.25 6.5L1.5 6.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-sm font-medium leading-normal capitalize">
                  {allergy}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col justify-end items-center gap-2.5">
          {/* Save Button */}
          <button
            onClick={handleSave}
            className="flex h-[60px] px-3.5 justify-center items-center gap-3 w-full rounded-[14px] border border-[#149f61] text-white font-bold text-base leading-normal capitalize transition-colors hover:opacity-90"
            style={{
              background:
                "linear-gradient(96deg, #ABE57D 8.98%, #00955D 83.24%)",
            }}
          >
            Save
          </button>

          {/* No Allergies Button */}
          <button
            onClick={handleNoAllergies}
            className="flex h-[60px] px-3.5 justify-center items-center gap-3 w-full rounded-[14px] text-[#afb1b6] font-bold text-base leading-normal capitalize hover:text-[#8a8c91] transition-colors"
          >
            I Don't Have Allergies
          </button>
        </div>
      </div>
    </div>
  );
}
