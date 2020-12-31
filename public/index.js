// 抽獎
const button = document.querySelector(".submit_button");
if (button) {
  button.addEventListener("click", () => {
    fetch("/draw_lottery", { method: "get" }).then((res) => {
      res.json().then((prize) => {
        console.log(prize);
        const newBg = document.querySelector(".lotterys");
        newBg.innerHTML = `
      <div class="lottery_result">
      <div class="prize">
        <div class="prize__desc">
          恭喜你中 ${prize.prize}！</br>
          ${prize.prize_name}
        </div>
        <div class="table_button">
          <a href="/lottery" class="submit_button">我要抽獎</a>
        </div>
      </div>
      </div>`;
        document
          .querySelector(".lottery_result")
          .setAttribute(
            "style",
            `height:767px;background:url(${prize.prize_img}) center/cover no-repeat;`
          );
      });
    });
  });
}

// faq
const element = document.querySelectorAll(".form");
for (let i = 0; i < element.length; i += 1) {
  element[i].addEventListener("click", () => {
    const list = document.querySelectorAll(".form");
    list[i].classList.toggle("hidden");
  });
}
