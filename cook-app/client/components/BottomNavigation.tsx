import { useNavigate, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: "home",
      label: "Home",
      path: "/dashboard",
      icon: (active: boolean) => (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.125 12.5L12.5 3.125L21.875 12.5"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.20833 10.4167V20.8333H19.7917V10.4167"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.22559 22.8748H23.2256"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 20.172C2.90395 17.871 4.10188 15.7844 5.88534 14.2753C7.6688 12.7662 9.92491 11.9302 12.2611 11.9127C14.5925 11.9181 16.8462 12.7515 18.6203 14.2643C20.3943 15.777 21.5734 17.8707 21.9471 20.172"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.2608 11.8369C13.339 11.8369 14.213 10.9628 14.213 9.88466C14.213 8.80648 13.339 7.93243 12.2608 7.93243C11.1826 7.93243 10.3086 8.80648 10.3086 9.88466C10.3086 10.9628 11.1826 11.8369 12.2608 11.8369Z"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.2617 2.00039V4.77853"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.48047 3.87668V6.57975"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.0439 3.87668V6.57975"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "menu",
      label: "Menu",
      path: "/menu",
      icon: (active: boolean) => (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.4789 3.5V15.4438H15.082V7.89688C15.082 6.73076 15.5453 5.61238 16.3698 4.78781C17.1944 3.96323 18.3128 3.5 19.4789 3.5Z"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.9199 15.3778H19.4793V20.8903C19.4793 21.2209 19.3479 21.5381 19.1141 21.7719C18.8803 22.0058 18.5631 22.1371 18.2324 22.1371H18.1668C17.8361 22.1371 17.519 22.0058 17.2851 21.7719C17.0513 21.5381 16.9199 21.2209 16.9199 20.8903V15.3778Z"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.51913 22.1411C8.11882 22.1411 7.73491 21.9821 7.45185 21.699C7.16878 21.416 7.00977 21.0321 7.00977 20.6318L7.66602 12.4286H9.43788L10.0941 20.6318C10.0943 20.8356 10.0532 21.0374 9.9733 21.2249C9.89338 21.4125 9.77628 21.5819 9.6291 21.7229C9.48191 21.864 9.30769 21.9738 9.11692 22.0456C8.92615 22.1175 8.7228 22.15 8.51913 22.1411Z"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.4719 9.47549C11.3655 10.1913 11.0054 10.8451 10.4573 11.3178C9.90927 11.7904 9.20966 12.0504 8.48595 12.0504C7.76224 12.0504 7.06261 11.7904 6.51454 11.3178C5.96646 10.8451 5.60641 10.1913 5.5 9.47549H11.4719Z"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.5 4.02788V9.47476"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.45312 4.02788V9.34351"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.4717 4.02788V9.47476"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: "earnings",
      label: "Earnings",
      path: "/earnings",
      icon: (active: boolean) => (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.40997 3.77208C8.96039 3.84333 8.65039 4.23583 8.65039 4.69167C8.65037 5.27729 8.82312 5.84991 9.14701 6.33782C9.4709 6.82572 9.93153 7.20724 10.4712 7.43458C7.22581 8.8675 4.90039 12.5987 4.90039 15.6875C4.90039 19.5996 8.63122 21 13.2337 21C17.8362 21 21.5671 19.5996 21.5671 15.6875C21.5671 12.5987 19.2408 8.8675 15.9962 7.43417C16.5359 7.20682 16.9966 6.82531 17.3204 6.3374C17.6443 5.84949 17.8171 5.27688 17.8171 4.69125C17.8171 4.23583 17.5071 3.84333 17.0575 3.77208C16.2991 3.65167 14.9941 3.5 13.2337 3.5C11.4733 3.5 10.1679 3.65167 9.40997 3.77208Z"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.7334 11.4618C15.7334 11.4618 14.7334 10.7923 13.2334 10.7923C11.9834 10.7923 10.7334 11.4618 10.7334 12.3548C10.7334 14.5868 15.7334 13.2477 15.7334 15.4798C15.7334 16.3727 14.4834 17.0423 13.2334 17.0423C11.7334 17.0423 10.7334 16.3727 10.7334 16.3727"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.2334 10.7917V9.75"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.2334 18.0839V17.0423"
            stroke={active ? "#00955d" : "#A5A5A5"}
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
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.0998 18.4496L15.5921 14.315H13.3767L11.8998 12.8381L14.8536 8.4073H20.0229M6.73057 4.715L8.29699 6.28141C9.13868 7.12311 9.39778 8.38543 8.9557 9.49063V9.49063C8.50381 10.6204 7.40964 11.3611 6.19289 11.3611H3.03827M21.4998 12.0996C21.4998 17.4015 17.2017 21.6996 11.8998 21.6996C6.59787 21.6996 2.2998 17.4015 2.2998 12.0996C2.2998 6.79768 6.59787 2.49961 11.8998 2.49961C17.2017 2.49961 21.4998 6.79768 21.4998 12.0996Z"
            stroke={active ? "#00955d" : "#A5A5A5"}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-[85px] bg-white border-t border-[#f2f2f2] flex items-center justify-center px-[18px] py-[6px]">
      <div className="flex w-full max-w-[400px] justify-between items-center h-[72px]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-[6px] flex-1 py-[12.5px] px-[8px]"
            >
              {item.icon(isActive)}
              <span
                className={`text-xs font-medium capitalize ${
                  isActive ? "text-[#00955d]" : "text-[#A5A5A5]"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
