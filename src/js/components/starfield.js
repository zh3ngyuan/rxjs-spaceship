import { Observable } from "rxjs";

import { canvas, ctx } from "./canvas";
import { STAR_NUMBER, SPEED } from "../Constants";

function paintStars(stars) {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  stars.forEach(star => {
    ctx.fillRect(star.x, star.y, star.size, star.size);
  });
}

const StarStream$ = Observable.range(1, STAR_NUMBER)
  .map(() => ({
    x: parseInt(Math.random() * canvas.width, 10),
    y: parseInt(Math.random() * canvas.height, 10),
    size: Math.random() * 3 + 1
  }))
  .toArray()
  .flatMap(starArray =>
    Observable.interval(SPEED).map(() => {
      starArray.map(star => {
        if (star.y >= canvas.height) {
          star.y = 0; // Reset star to top of the screen
        }
        star.y += star.size; // Move star
      });
      return starArray;
    })
  );

export { paintStars, StarStream$ };
