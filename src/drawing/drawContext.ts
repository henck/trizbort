/* export class DrawContext {
  static ctx: CanvasRenderingContext2D = null;
  static handdrawn = true;

  private static fuzz(x: number, f: number) {
    return x + Math.random()*f - f/2;
  }

  private static handDrawMovement(x0: number, x1: number, t: number){
    return x0 + (x0-x1)*(
            15*Math.pow(t, 4) -
            6*Math.pow(t, 5) -
            10*Math.pow(t,3)
    );
  }

  static line(x0: number, y0: number, x1: number, y1: number) {
    if(!this.handdrawn) {
      this.ctx.moveTo(x0, y0);
      this.ctx.lineTo(x1, y1);
    } else {
      this.ctx.moveTo(x0, y0);

      var d = Math.sqrt((x1-x0)*(x1-x0)+(y1-y0)*(y1-y0));

      var steps = d/25;
      if(steps < 4) {
          steps = 4;
      }

      // fuzzyness
      var f = 8.0;
      for(var i = 1; i <= steps; i++)
      {
          var t1 = i/steps;
          var t0 = t1-1/steps
          var xt0 = this.handDrawMovement(x0, x1, t0);
          var yt0 = this.handDrawMovement(y0, y1, t0);
          var xt1 = this.handDrawMovement(x0, x1, t1);
          var yt1 = this.handDrawMovement(y0, y1, t1);
          this.ctx.quadraticCurveTo(this.fuzz(xt0, f), this.fuzz(yt0, f), xt1, yt1);
          this.ctx.moveTo(xt1, yt1);
      }
    }  
  } 
} */