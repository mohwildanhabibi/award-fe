import { Show, createSignal, lazy, createResource } from "solid-js";
import axios from "axios";
const Card = lazy(() => import("./Card"));

function Main({ token, filter, setFilter }) {
  const [error, setError] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [data, setData] = createSignal([]);
  const [dataAward] = createResource(filter, getAwardItemsPromise);
  const [hasNextPage, setHasNextPage] = createSignal(false);

  async function getAwardItemsPromise(query) {
    setLoading(true);
    const params = { page: query.page, limit: query.limit };
    const type = [];
    if (query.vouchersType) type.push("Vouchers");
    if (query.productsType) type.push("Products");
    if (query.giftcardsType) type.push("Giftcards");
    if (query.point) {
      params.pointNeeded = query.point;
    }
    if (type.length > 0) params.type = type;
    await axios
      .get("http://localhost:8040/award", {
        headers: {
          Authorization: token(),
        },
        params: params,
      })
      .then((response) => {
        setHasNextPage(response.data.result.hasNextPage);
        setData(response.data.result.docs);
        return [];
      })
      .catch((error) => {
        return error.response.data.message;
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <main class="container">
      <Show when={!loading()} fallback={<article aria-busy="true"></article>}>
        <ul>
          <For each={data()}>
            {(award) => (
              <>
                <Card props={award}></Card>
              </>
            )}
          </For>
        </ul>
        <Show when={data().length < 1}>
          <div>No data</div>
        </Show>
        <Show when={hasNextPage()}>
          <button
            role="button"
            class="outline"
            onClick={() =>
              setFilter({
                ...filter(),
                page: filter().page,
                limit: filter().limit + filter().limit,
              })
            }
          >
            Load More
          </button>
        </Show>
      </Show>
      <Show when={error}>
        <span>{error}</span>
      </Show>
    </main>
  );
}

export default Main;
