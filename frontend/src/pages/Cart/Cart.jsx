import { useSelector } from "react-redux";

export default function Cart() {
  const cartData = useSelector((store) => store.cart);
  const authorization = useSelector(store=>store.authorization)
  console.log(cartData);

  return (
    <main className="bg-[#eff3f6] px-8 py-4">
      {authorization.token ? <section></section> : <section className="p-5 grid grid-cols-3 bg-white">
            <div className="col-span-2 flex flex-col gap-4">
                  <p className="text-3xl font-bold">Your bag is empty</p>
                  <p className="">Have an account? Sign in to view any items you&apos;ve saved.</p>
                  <div className="grid grid-cols-2 gap-5 font-bold">
                        <button className="py-3  bg-blue-500 text-white">Sign In</button>
                        <button className="py-3  border-2 border-blue-500 ">Keep Shopping</button>
                  </div>
            </div>


            <div>

            </div>
            </section>}
    </main>
  );
}
