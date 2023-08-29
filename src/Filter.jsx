import { Show, createSignal, onMount } from "solid-js";

function Filter({ setFilter, setShowFilter, filter }) {
  const [point, setPoint] = createSignal(filter().point);
  const [allType, setAllType] = createSignal(false);
  const [vouchersType, setVouchersType] = createSignal(filter().vouchersType);
  const [productsType, setProductsType] = createSignal(filter().productsType);
  const [giftcardsType, setGiftcardsType] = createSignal(
    filter().giftcardsType
  );

  onMount(() => {
    if (vouchersType() && giftcardsType() && productsType()) {
      setAllType(true);
    } else {
      setAllType(false);
    }
  });

  return (
    <>
      <div class="z-10 fixed w-full h-full top-0 left-0 bg-white text-black p-5">
        <div class="flex flex-col justify-between h-full">
          <div class="flex flex-col space-y-5">
            <div class="flex flex-row justify-between text-lg font-bold">
              <div>
                <span>Filter</span>
              </div>
              <div>
                <span onClick={() => setShowFilter(false)}>X</span>
              </div>
            </div>
            {/* Filter Showcase */}
            <div class="flex flex-col space-y-3">
              <Show when={point()}>
                <div class="p-2 text-sm text-blue-500 border border-blue-500 w-max rounded-lg">
                  Poin 0 - {point()}
                  <span onClick={() => setPoint(null)}> X</span>
                </div>
              </Show>
              <Show when={vouchersType() || productsType() || giftcardsType()}>
                <div class="p-2 text-sm text-blue-500 border border-blue-500 w-max rounded-lg">
                  Type: {vouchersType() ? `Vouchers` : ""}
                  {productsType() ? `, ` : " "}
                  {productsType() ? `Products` : ""}
                  {giftcardsType() ? `, ` : " "}
                  {giftcardsType() ? `Giftcards` : ""}
                  <span
                    onClick={() => {
                      setVouchersType(false);
                      setProductsType(false);
                      setGiftcardsType(false);
                      setAllType(false);
                    }}
                  >
                    {" "}
                    X
                  </span>
                </div>
              </Show>
              <Show
                when={
                  point() || vouchersType() || productsType() || giftcardsType()
                }
              >
                <div
                  class="p-2 text-sm text-blue-500 border border-blue-500 w-max rounded-lg"
                  onClick={() => {
                    setPoint(null);
                    setVouchersType(false);
                    setProductsType(false);
                    setGiftcardsType(false);
                    setAllType(false);
                  }}
                >
                  Clear All Filter
                </div>
              </Show>
            </div>
            {/* Point Filter */}
            <div>
              <div>Point Needed</div>
              <div class="flex flex-row justify-between text-blue-500">
                <div>IDR 0</div>
                <div>IDR {point()}</div>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                value={point()}
                id="range"
                name="range"
                onChange={(e) => {
                  setPoint(e.target.value);
                }}
              ></input>
            </div>
            {/* Type Filter */}
            <div class="flex flex-col">
              <div>Awards Type</div>
              <fieldset>
                <label for="all">
                  <input
                    type="checkbox"
                    id="all"
                    name="all"
                    checked={allType()}
                    onChange={() => {
                      setAllType(!allType());
                      setVouchersType(allType());
                      setGiftcardsType(allType());
                      setProductsType(allType());
                    }}
                  ></input>
                  All Type
                </label>
                <label for="vouchers">
                  <input
                    type="checkbox"
                    id="vouchers"
                    name="vouchers"
                    checked={vouchersType()}
                    onChange={() => setVouchersType(!vouchersType())}
                  ></input>
                  Vouchers
                </label>
                <label for="products">
                  <input
                    type="checkbox"
                    id="products"
                    name="products"
                    checked={productsType()}
                    onChange={() => setProductsType(!productsType())}
                  ></input>
                  Products
                </label>
                <label for="giftcards">
                  <input
                    type="checkbox"
                    id="giftcards"
                    name="giftcards"
                    checked={giftcardsType()}
                    onChange={() => setGiftcardsType(!giftcardsType())}
                  ></input>
                  Giftcards
                </label>
              </fieldset>
            </div>
          </div>
          <div>
            <button
              class="mb-0"
              onClick={() => {
                setFilter({
                  page: 1,
                  limit: 5,
                  point: point(),
                  vouchersType: vouchersType(),
                  productsType: productsType(),
                  giftcardsType: giftcardsType(),
                });
                setShowFilter(false);
              }}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filter;
