function Card({ props }) {
  return (
    <div class="my-10">
      <div
        class="w-auto bg-gray-500 p-4 rounded-lg"
        style={props.imgUrl ? `background-image:url(${props.imgUrl})` : ""}
      >
        <div class="flex flex-row-reverse mb-20">
          <div
            class={
              props.type == "Vouchers"
                ? "bg-blue-500 text-white rounded-lg px-2 py-1"
                : props.type == "Products"
                ? "bg-red-500 text-white rounded-lg px-2 py-1"
                : "bg-yellow-500 text-white rounded-lg px-2 py-1"
            }
          >
            {props.type}
          </div>
        </div>
        <div class="flex flex-row text-md text-slate-300">
          {props.pointNeeded} Poin
        </div>
      </div>
      <div class="text-xl text-bold mt-2">{props.name}</div>
    </div>
  );
}

export default Card;
