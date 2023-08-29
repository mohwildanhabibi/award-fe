function Header({ setShowSidebar, setShowFilter }) {
  return (
    <header class="container">
      <nav>
        <ul>
          <li>
            <button
              role="button"
              class="outline"
              onclick={() => setShowSidebar(true)}
            >
              Menu
            </button>
          </li>
        </ul>
        <ul>
          <li>
            <strong>Awards</strong>
          </li>
        </ul>
        <ul>
          <li>
            <button
              role="button"
              class="outline"
              onclick={() => setShowFilter(true)}
            >
              Filter
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
