function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()));

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`);
      } else {
        reject(new Error(`${player} lost the draw.`));
      }
    });
  });
}

async function getResult() {
  try {
    const user = await luckyDraw("Tina");
    const user2 = await luckyDraw("Jorge");
    const user3 = await luckyDraw("Julien");
    console.log(user, user2, user3);
  } catch (error) {
    console.error(error);
  }
}

getResult();
