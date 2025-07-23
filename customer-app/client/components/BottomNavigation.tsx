import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const { logout } = useAuth(); // No longer needed

  const navItems = [
    {
      id: "home",
      label: "Home",
      path: "/home",
      icon: (active: boolean) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.72145 3.81506C10.9746 2.84434 12.9595 2.73618 14.3484 3.52893L14.6179 3.69983L20.3787 7.7301C20.8477 8.05857 21.2915 8.59723 21.6189 9.22424C21.9463 9.85142 22.1345 10.5245 22.1345 11.1002V17.8805C22.1344 20.1541 20.289 22.0004 18.0154 22.0006H7.23512C4.96281 22.0006 3.11523 20.1458 3.115 17.8707V10.9703L3.12281 10.7653C3.1595 10.2766 3.32283 9.72096 3.58375 9.19104C3.88179 8.58576 4.28625 8.05684 4.71266 7.72424L9.72145 3.81506ZM12.6248 14.2506C11.9387 14.2507 11.3748 14.8145 11.3748 15.5006V18.5006C11.3749 19.1865 11.9388 19.7505 12.6248 19.7506C13.3108 19.7506 13.8746 19.1866 13.8748 18.5006V15.5006C13.8748 14.8145 13.3109 14.2506 12.6248 14.2506Z"
            fill={active ? "#00955D" : "none"}
            stroke={active ? "#00955D" : "#A5A5A5"}
          />
        </svg>
      ),
    },
    {
      id: "orders",
      label: "Orders",
      path: "/orders",
      icon: (active: boolean) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 23.2018H24"
            stroke={active ? "#00955D" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.27415 20.499C3.6781 18.1979 4.87603 16.1113 6.65949 14.6023C8.44295 13.0932 10.6991 12.2571 13.0352 12.2396C15.3667 12.2451 17.6204 13.0785 19.3944 14.5912C21.1685 16.104 22.3475 18.1977 22.7212 20.499"
            stroke={active ? "#00955D" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.0352 12.1638C14.1134 12.1638 14.9874 11.2898 14.9874 10.2116C14.9874 9.13344 14.1134 8.2594 13.0352 8.2594C11.957 8.2594 11.083 9.13344 11.083 10.2116C11.083 11.2898 11.957 12.1638 13.0352 12.1638Z"
            stroke={active ? "#00955D" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.0364 2.32739V5.10554"
            stroke={active ? "#00955D" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.25468 4.20374V6.90681"
            stroke={active ? "#00955D" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.8182 4.20374V6.90681"
            stroke={active ? "#00955D" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "community",
      label: "Community",
      path: "/community",
      icon: (active: boolean) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.9246 18.4499L15.4169 14.3153H13.2015L11.7246 12.8383L14.6784 8.40757H19.8477M6.55537 4.71526L8.12178 6.28167C8.96348 7.12337 9.22258 8.38569 8.7805 9.4909V9.4909C8.32861 10.6206 7.23444 11.3614 6.01769 11.3614H2.86306M21.3246 12.0999C21.3246 17.4018 17.0265 21.6999 11.7246 21.6999C6.42267 21.6999 2.1246 17.4018 2.1246 12.0999C2.1246 6.79794 6.42267 2.49988 11.7246 2.49988C17.0265 2.49988 21.3246 6.79794 21.3246 12.0999Z"
            stroke={active ? "#00955D" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      icon: (active: boolean) => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.77499 21.0127C2.77499 17.2371 5.92928 14.1765 12.375 14.1765C18.8207 14.1765 21.975 17.2371 21.975 21.0127C21.975 21.6133 21.5368 22.1003 20.9962 22.1003H3.75382C3.21323 22.1003 2.77499 21.6133 2.77499 21.0127Z"
            fill={active ? "#00955D" : "none"}
            stroke={active ? "#00955D" : "#A5A5A5"}
          />
          <path
            d="M15.975 6.50027C15.975 8.48849 14.3632 10.1003 12.375 10.1003C10.3868 10.1003 8.77499 8.48849 8.77499 6.50027C8.77499 4.51204 10.3868 2.90027 12.375 2.90027C14.3632 2.90027 15.975 4.51204 15.975 6.50027Z"
            fill={active ? "#00955D" : "none"}
            stroke={active ? "#00955D" : "#A5A5A5"}
          />
        </svg>
      ),
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-sm mx-auto px-4 py-1">
        <div className="flex justify-between items-center h-[72px]">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center p-3 flex-1 gap-2"
              >
                {item.icon(isActive)}
                <span
                  className={`text-xs font-normal font-urbanist capitalize ${
                    isActive ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
