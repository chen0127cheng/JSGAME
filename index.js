window.onload = function () {
  const player = document.getElementById("dino");
  const barrier = document.getElementById("barrier");
  const result = document.getElementById("result");
  const replay = document.getElementById("replayBtn");
  const start = document.getElementById("startBtn");
  let collisionInterval;

  start.addEventListener("click", function () {
    start.style.display = "none";
    barrier.style.display = "block";
    barrier.classList.add("barriershow");
    window.addEventListener("keydown", jump);
    collisionInterval = setInterval(deletecollision, 10);
  });
  //当触发“keydown”时，执行函数event
  function jump(event) {
    if (event.code === "Space") {
      console.log("space");
      //点击空格小恐龙跳跃
      player.classList.add("dinojump");
    }
    setTimeout(function () {
      player.classList.remove("dinojump");
    }, 300);
  }
  //每隔10ms执行一次检测碰撞
  function deletecollision() {
    const distance =
      player.getBoundingClientRect().left -
      barrier.getBoundingClientRect().left;
    console.log("player " + player.getBoundingClientRect().left);
    console.log("barrier  " + barrier.getBoundingClientRect().left);
    console.log("distance " + distance);
    //如果小恐龙和障碍物相交，则视为碰撞
    if (Math.abs(distance) <= 100) {
      //提示结束
      result.innerHTML = "Game Over!!!";
      //停止检测碰撞
      clearInterval(collisionInterval);
      //移除keydown事件监听
      window.removeEventListener("keydown", jump);
      //移除障碍物
      barrier.style.display = "none";
      //显示重新开始按钮
      replay.style.display = "block";
      //重新开始游戏
      replay.addEventListener("click", function () {
        location.reload();
      });
    }
  }
};
