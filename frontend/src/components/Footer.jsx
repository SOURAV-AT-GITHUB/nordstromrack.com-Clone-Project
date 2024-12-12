import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MessageIcon from "@mui/icons-material/Message";

export default function Footer() {
  const options = [
    [
      "Customer Service",
      [
        "Customer Service",
        "Order Status",
        "Guest Returns",
        "Shipping & Return Policy",
        "Gift Cards",
        "Product Recalls",
        "FAQ",
        "Contact Us",
      ],
    ],
    [
      " About Us",

      [
        "About Our Brand",
        "The Nordy Club",
        "Store Locator",
        "All Brands",
        "Careers",
        "Get Email Updates",
        "Nordstrom Blog",
        "Nordy Podcast",
        "Store Openings",
      ],
    ],
    [
      "Nordstrom Rack & the Community",

      [
        "Corporate Social Responsibility",
        "Diversity, Equity, Inclusion & Belonging",
        "Big Brothers Big Sisters",
        "Donate Clothes",
      ],
    ],
    [
      " Nordstrom Card",

      ["Apply for a Nordstrom Card", "Pay My Bill", "Manage my Nordstrom Card"],
    ],
    [
      " Nordstrom, Inc.",
      [
        "Nordstrom",
        "HauteLook",
        "Investor Relations",
        "Press Releases",
        "Nordstrom Media Network",
      ],
    ],
  ];
  return (
    <footer className="p-6 relative bg-[#eff3f6]">
      <div className="grid grid-cols-7 gap-">
        {options.map((column, index) => (
          <div key={index} className="flex flex-col gap-2">
            <p className="font-bold">{column[0]}</p>
            {column[1].map((item) => (
              <p key={item} className="text-slate-600">
                {item}
              </p>
            ))}
          </div>
        ))}
        <div className="col-span-2 ">
          <div className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              fill="none"
              viewBox="0 0 24 24"
              data-testid="svg_IconPhoneArrow"
            >
              <path
                fill="#191A1B"
                d="M12 9a1 1 0 0 1 1 1v6.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 16.586V10a1 1 0 0 1 1-1M10 3a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2z"
              ></path>
              <path
                fill="#191A1B"
                fillRule="evenodd"
                d="M3 3a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm3-1a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Download Our App
          </div>
          <ul className="flex mt-4 gap-2">
            <li>
              <a
                aria-label="Facebook"
                href="https://facebook.com/NordstromRack"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="none"
                  viewBox="0 0 24 24"
                  data-testid="svg_IconFacebook"
                >
                  <g clipPath="url(#clip0_916_4290)">
                    <path
                      fill="#191A1B"
                      d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.791-4.668 4.533-4.668 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_916_4290">
                      <path fill="#fff" d="M0 0h24v24H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>

            <li>
              <a
                aria-label="Twitter"
                href="https://twitter.com/nordstromrack"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="none"
                  viewBox="0 0 24 24"
                  data-testid="svg_IconX"
                >
                  <path
                    fill="#191A1B"
                    d="M13.847 10.469 21.132 2h-1.726L13.08 9.353 8.027 2H2.2l7.64 11.12L2.2 22h1.727l6.68-7.765L15.943 22h5.827zm-2.365 2.748-.774-1.107-6.16-8.81H7.2l4.971 7.11.774 1.107 6.462 9.242h-2.652z"
                  ></path>
                </svg>
              </a>
            </li>

            <li>
              <a
                aria-label="Pinterest"
                href="https://pinterest.com/nordstromrack"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="none"
                  viewBox="0 0 24 24"
                  data-testid="svg_IconPinterest"
                >
                  <g clipPath="url(#clip0_916_4227)">
                    <path
                      fill="#191A1B"
                      d="M11.995 0C5.361 0 0 5.37 0 11.995c0 5.084 3.16 9.428 7.622 11.176-.109-.948-.198-2.41.039-3.446.217-.938 1.402-5.963 1.402-5.963s-.355-.72-.355-1.777c0-1.668.967-2.912 2.172-2.912 1.026 0 1.52.77 1.52 1.688 0 1.027-.652 2.567-.997 3.998-.287 1.195.602 2.172 1.777 2.172 2.132 0 3.771-2.25 3.771-5.489 0-2.873-2.063-4.877-5.015-4.877-3.416 0-5.42 2.557-5.42 5.203 0 1.027.395 2.132.888 2.735a.36.36 0 0 1 .08.345c-.09.375-.297 1.195-.336 1.363-.05.217-.178.266-.405.158-1.481-.711-2.409-2.903-2.409-4.66 0-3.781 2.745-7.257 7.928-7.257 4.156 0 7.394 2.962 7.394 6.931 0 4.137-2.606 7.464-6.22 7.464-1.214 0-2.36-.632-2.744-1.383l-.75 2.854c-.267 1.046-.998 2.35-1.491 3.149a12 12 0 0 0 3.554.533C18.629 24 24 18.63 24 12.005 23.99 5.37 18.62 0 11.995 0"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_916_4227">
                      <path fill="#fff" d="M0 0h24v24H0z"></path>
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </li>

            <li>
              <a
                aria-label="Instagram"
                href="https://instagram.com/nordstromrack"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="none"
                  viewBox="0 0 24 24"
                  data-testid="svg_IconInstagram"
                >
                  <path
                    fill="#191A1B"
                    fillRule="evenodd"
                    d="M7 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0m5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fill="#191A1B"
                    d="M17.25 8a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5"
                  ></path>
                  <path
                    fill="#191A1B"
                    fillRule="evenodd"
                    d="M7.858 2.07c-1.064.05-1.79.22-2.425.47-.658.256-1.215.6-1.77 1.156a4.9 4.9 0 0 0-1.15 1.772c-.246.637-.413 1.364-.46 2.429s-.057 1.407-.052 4.122c.005 2.716.017 3.056.069 4.123.05 1.064.22 1.79.47 2.426.256.657.6 1.214 1.156 1.769a4.9 4.9 0 0 0 1.774 1.15c.636.245 1.363.413 2.428.46 1.064.046 1.407.057 4.122.052s3.056-.017 4.123-.068c1.552-.074 3.073-.5 4.194-1.626 1.121-1.127 1.542-2.647 1.61-4.2.046-1.068.057-1.409.052-4.124s-.018-3.056-.068-4.122c-.074-1.554-.5-3.072-1.626-4.196-1.125-1.122-2.648-1.542-4.201-1.61-1.065-.045-1.407-.057-4.123-.052s-3.056.017-4.123.069m.098 1.998h-.003c-.876.041-1.383.174-1.789.333l-.005.002a2.9 2.9 0 0 0-1.079.705c-.345.347-.54.664-.701 1.081-.158.409-.289.919-.328 1.796-.044 1.018-.055 1.324-.05 4.03s.017 3.01.067 4.03v.002c.042.876.174 1.384.333 1.79l.002.003c.162.417.358.734.705 1.08a2.9 2.9 0 0 0 1.082.7c.41.159.92.29 1.795.328 1.019.045 1.326.056 4.03.05 2.706-.004 3.012-.016 4.033-.065 1.281-.06 2.235-.4 2.871-1.04.638-.64.974-1.595 1.03-2.876.044-1.021.055-1.327.05-4.032s-.017-3.01-.066-4.031c-.06-1.282-.4-2.236-1.04-2.875-.638-.636-1.594-.972-2.876-1.027-1.02-.044-1.328-.056-4.032-.05-2.707.004-3.01.016-4.03.066"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <ul className="flex gap-2 mt-4 lg:w-3/4 justify-between ">
        <li className="hover:underline hover:text-blue-500 cursor-pointer">
          Privacy
        </li>
        <li className="hover:underline hover:text-blue-500 cursor-pointer">
          Your Privacy Rights
        </li>
        <li className="hover:underline hover:text-blue-500 cursor-pointer">
          Terms & Conditions
        </li>
        <li className="hover:underline hover:text-blue-500 cursor-pointer">
          California Supply Chain Act
        </li>
        <li>©2024 Nordstrom Rack</li>
      </ul>
      <button className='absolute top-5 right-5 bg-white p-2 '>
            <a href="#navbar">
                <KeyboardArrowUpIcon/>  
                <p>Top</p>
            </a>
      </button>
      <button className="absolute bottom-5 right-8 p-3 border border-black ">
        <MessageIcon fontSize="large"/>
      </button>
      
    </footer>
  );
}
