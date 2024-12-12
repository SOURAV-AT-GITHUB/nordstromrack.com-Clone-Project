import giftIcon from "/Navbar/gift.svg";

export default function CategoryNavigationMenu() {
  return (
    <nav className="flex gap-4 justify-around">
      <div className="cursor-pointer flex gap-2 hover:underline">
        <img src={giftIcon} alt="Gift Guide" />
        <p>Gift Guide</p>
      </div>
      <p className="cursor-pointer hover:underline text-blue-500 ">New</p>
      <p className="cursor-pointer hover:underline">Women</p>
      <p className="cursor-pointer hover:underline">Men</p>
      <p className="cursor-pointer hover:underline">Kids</p>
      <p className="cursor-pointer hover:underline">Shoes</p>
      <p className="cursor-pointer hover:underline">Bags & Accessories</p>
      <p className="cursor-pointer hover:underline">Home</p>
      <p className="cursor-pointer hover:underline">Beauty</p>
      <p className="cursor-pointer hover:underline text-red-500">Clearance</p>
      <p className="cursor-pointer hover:underline text-blue-500">
        Flash Events
      </p>
    </nav>
  );
}
