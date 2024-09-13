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

luckyDraw("Caroline")
  .then((win) => {
    console.log(win);
  })
  .catch((error) => {
    console.log(error.message);
  });

luckyDraw("Joe")
  .then((win) => {
    console.log(win);
  })
  .catch((error) => {
    console.log(error.message);
  });

luckyDraw("Sabrina")
  .then((win) => {
    console.log(win);
  })
  .catch((error) => {
    console.log(error.message);
  });
