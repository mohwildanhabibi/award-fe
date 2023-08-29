function Sidebar({ setToken, setShowSidebar }) {
  return (
    <>
      <div class="z-10 fixed w-3/4 h-full top-0 left-0 bg-white text-black py-20 px-10">
        <h3 class="text-black">Award Menu</h3>
        <ul class="list-none text-black">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a disabled href="#">
              Cards
            </a>
          </li>
          <li>
            <a disabled href="#">
              Profile
            </a>
          </li>
          <li>
            <a href="#" onClick={() => setToken(null)}>
              Logout
            </a>
          </li>
        </ul>
      </div>
      <div
        class="z-10 fixed w-1/4 h-full top-0 right-0 bg-gray-500/40"
        onClick={() => setShowSidebar(false)}
      ></div>
    </>
  );
}

export default Sidebar;
