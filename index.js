window.onload = function () {
  const player = document.getElementById("dino");
  const barrier = document.getElementById("barrier");
  const result = document.getElementById("result");
  const replay = document.getElementById("replayBtn");
  const start = document.getElementById("startBtn");
  const jumpBtn = document.getElementById("jumpBtn");
  let collisionInterval;

  start.addEventListener("click", function () {
    start.style.display = "none";
    barrier.style.display = "block";
    jumpBtn.style.display = "block";
    barrier.classList.add("barriershow");
    window.addEventListener("keydown", spaceJump);
    jumpBtn.addEventListener("click", jumpMove); //每隔10ms执行一次检测碰撞
    collisionInterval = setInterval(deletecollision, 10);
  });
  function jumpMove() {
    //控制跳跃
    player.classList.add("dinojump");
    setTimeout(function () {
      player.classList.remove("dinojump");
    }, 500);
  }
  //当触发“keydown”时，执行函数event
  function spaceJump(event) {
    if (event.code === "Space") {
      console.log("space");
      jumpMove();
    }
  }

  function deletecollision() {
    const distanceLevel =
      player.getBoundingClientRect().left -
      barrier.getBoundingClientRect().left;
    const distanceLong =
      player.getBoundingClientRect().top - barrier.getBoundingClientRect().top;
    console.log("player " + player.getBoundingClientRect().left);
    console.log("barrier  " + barrier.getBoundingClientRect().left);
    console.log("distanceLevel " + distanceLevel);
    console.log("distanceLong " + distanceLong);
    //如果人和障碍物相交，则视为碰撞
    if (Math.abs(distanceLevel) <= 50 && Math.abs(distanceLong) <= 50) {
      //提示结束
      result.innerHTML = "Game Over!!!";
      //停止检测碰撞
      clearInterval(collisionInterval);
      //移除keydown事件监听
      window.removeEventListener("keydown", spaceJump);
      jumpBtn.removeEventListener("click", jumpMove);
      //移除障碍物
      barrier.style.display = "none";
      //显示重新开始按钮
      replay.style.display = "block";
      jumpBtn.style.display = "none";
      //重新开始游戏
      replay.addEventListener("click", function () {
        location.reload();
      });
    }
  }
};
