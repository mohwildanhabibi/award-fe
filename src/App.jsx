import { Show, createSignal } from "solid-js";
import Header from "./Header";
import Login from "./Login";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Filter from "./Filter";

function App() {
  const [showSidebar, setShowSidebar] = createSignal(false);
  const [showFilter, setShowFilter] = createSignal(false);
  const [filter, setFilter] = createSignal({
    point: null,
    vouchersType: false,
    productsType: false,
    giftcardsType: false,
    page: 1,
    limit: 5,
  });
  const [token, setToken] = createSignal(null);

  return (
    <>
      <Show when={token()} fallback={<Login setToken={setToken}></Login>}>
        <Header
          setShowSidebar={setShowSidebar}
          setShowFilter={setShowFilter}
        ></Header>
        <Main token={token} filter={filter} setFilter={setFilter}></Main>
        <Show when={showSidebar()}>
          <Sidebar
            setToken={setToken}
            setShowSidebar={setShowSidebar}
          ></Sidebar>
        </Show>
        <Show when={showFilter()}>
          <Filter
            setShowFilter={setShowFilter}
            setFilter={setFilter}
            filter={filter}
          ></Filter>
        </Show>
      </Show>
    </>
  );
}

export default App;
