window.onload = function () {
  const player = document.getElementById("dino");
  const barrier = document.getElementById("barrier");
  const result = document.getElementById("result");
  const replay = document.getElementById("replayBtn");
  const start = document.getElementById("startBtn");
  const jumpBtn = document.getElementById("jumpBtn");
  const forward = document.getElementById("forwardBtn");
  const backward = document.getElementById("backwardBtn");
  const door = document.getElementById("door");
  const distance = 10; // 每次前进或后退的距离
  let collisionInterval;
  let doorInterval;

  start.addEventListener("click", function () {
    start.style.display = "none";
    barrier.style.display = "block";
    jumpBtn.style.display = "block";
    forward.style.display = "block";
    backward.style.display = "block";
    barrier.classList.add("barriershow");
    window.addEventListener("keydown", spaceJump);
    jumpBtn.addEventListener("click", jumpMove); //每隔10ms执行一次检测碰撞
    forward.addEventListener("click", forwardMove);
    backward.addEventListener("click", backwardMove);
    collisionInterval = setInterval(deletecollision, 10);
    doorInterval = setInterval(reachDoor, 1000);
  });

  // 控制跳跃
  function jumpMove() {
    player.classList.add("dinojump");
    setTimeout(function () {
      player.classList.remove("dinojump");
    }, 500);
  }

  // 当触发“keydown”时，执行函数event
  function spaceJump(event) {
    if (event.code === "Space") {
      console.log("space");
      jumpMove();
    }
  }

  // 前进
  function forwardMove() {
    console.log("forward");
    let playerLeft = parseInt(player.style.left || 0); // 获取左边距
    const boxWidth = document.getElementById("box").clientWidth;
    const playerWidth = player.offsetWidth; // 玩家宽度
    if (playerLeft + playerWidth + distance <= boxWidth) {
      player.style.left = playerLeft + distance + "px";
    } else {
      console.log("reach the end");
    }
  }

  // 后退
  function backwardMove() {
    console.log("backward");
    let playerLeft = parseInt(player.style.left || 0); // 获取左边距
    if (playerLeft - distance >= 0) {
      player.style.left = playerLeft - distance + "px";
    } else {
      console.log("reach the beginning");
    }
  }
  function deletecollision() {
    const distanceLevel =
      player.getBoundingClientRect().left -
      barrier.getBoundingClientRect().left;
    const distanceLong =
      player.getBoundingClientRect().top - barrier.getBoundingClientRect().top;
    // console.log("player " + player.getBoundingClientRect().left);
    // console.log("barrier  " + barrier.getBoundingClientRect().left);
    // console.log("distanceLevel " + distanceLevel);
    // console.log("distanceLong " + distanceLong);
    //如果人和障碍物相交，则视为碰撞
    if (Math.abs(distanceLevel) <= 50 && Math.abs(distanceLong) <= 50) {
      //提示结束
      result.innerHTML = "Game Over!!!";
      //停止检测碰撞
      clearInterval(collisionInterval);
      //移除keydown事件监听
      window.removeEventListener("keydown", spaceJump);
      jumpBtn.removeEventListener("click", jumpMove);
      forward.removeEventListener("click", forwardMove);
      backward.removeEventListener("click", backwardMove);
      //移除障碍物
      barrier.style.display = "none";
      //显示重新开始按钮
      replay.style.display = "block";
      jumpBtn.style.display = "none";
      forward.style.display = "none";
      backward.style.display = "none";
      //重新开始游戏
      replay.addEventListener("click", function () {
        location.reload();
      });
    }
  }
  function reachDoor() {
    const playerRect = player.getBoundingClientRect();
    const doorRect = door.getBoundingClientRect();
    const playerRightEdge = playerRect.right;
    const doorLeftEdge = doorRect.left;
    const tolerance = 10;
    if (playerRightEdge + tolerance >= doorLeftEdge) {
      result.innerHTML = "Congratulations!!! You Win!!!";
      clearInterval(doorInterval);
      window.removeEventListener("keydown", spaceJump);
      jumpBtn.removeEventListener("click", jumpMove);
      forward.removeEventListener("click", forwardMove);
      backward.removeEventListener("click", backwardMove);
      barrier.style.display = "none";
      jumpBtn.style.display = "none";
      forward.style.display = "none";
      backward.style.display = "none";
    }
  }
};
