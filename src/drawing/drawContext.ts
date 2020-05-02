/* 
 * A simple extracted version of comic.js library reduced for:
 * - HTML canvas
 * - rounded rectangles
 * - ellipse
 * - line
 * 
 * @author Balint Morvai <balint@morvai.de>
 * Copyright (c) 2014 Balint Morvai
 * @license http://en.wikipedia.org/wiki/MIT_License MIT License
 * @github https://github.com/balint42/comic.js/
 * @web http://www.morvai.de/comicjs/mixer.html 
 */


export class FuzzDrawing {
    fsteps? = 15;    // number of pixels per step: smaller -> fuzzier
    msteps? = 2;    // min number of steps: bigger -> fuzzier
    ff?     = 3.0;  // fuzz factor for line drawing: bigger -> fuzzier
    ffc?    = 2.0;  // fuzz factor for curve drawing: bigger -> fuzzier
}

export class DrawContext {

    fd = new FuzzDrawing();

    constructor(
        private ctx: CanvasRenderingContext2D,
        config?: FuzzDrawing
    ) {
        if(config) (<any>Object).assign(this, config);
    }

    private fuzzNormal = {
        count: 0,
        rnds : [0, 0]
    };

    private fuzz(val: number, f: number) {
        // get random number
        var i = this.fuzzNormal.count;
        var rnd = (Math.random() - 0.5);

        if(++this.fuzzNormal.count == 2)
            this.fuzzNormal.count = 0;

        var res = val + f * (rnd - this.fuzzNormal.rnds[i]);
        this.fuzzNormal.rnds[i] = rnd;

        return res;
    }

    private dist2(x0: number, y0: number, x1: number, y1: number) {
        var dx = x1 - x0;
        var dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy);
    }

    hdLine(x0:number, y0:number, x1:number, y1:number) {
        let ft: any; // store this outside function to preserve

        function handMovement(x0:number, x1:number, t?:number) {
            // calculate ft or use old value if no "t" given
            if(typeof t != "undefined") {
                var pow3 = Math.pow(t, 3);
                var pow4 = pow3 * t;
                var pow5 = pow4 * t;
                ft = (15 * pow4 -
                        6 * pow5 -
                        10 * pow3);
            }

            return x0 + (x0 - x1) * ft;
        }

        // calculate number of steps
        let d = this.dist2(x0, y0, x1, y1);
        let steps = Math.ceil(d / this.fd.fsteps);
        if(steps < this.fd.msteps) {
            steps = this.fd.msteps;
        }
        // fuzz factor
        let f = this.fd.ff / ((steps == this.fd.msteps) ? 1.4 : 1); // reduce for small lines
        // draw line step by step using quadratic Bézier path
        var xt1 = handMovement(x0, x1, 0); // bezier control point
        var yt1 = handMovement(y0, y1); // bezier control point (reuse t0)

        for(var i = 1; i <= steps; i++) {
            let t1 = i / steps;
            var xt0 = xt1; // bezier control point
            var yt0 = yt1; // bezier control point
            var xt1 = handMovement(x0, x1, t1); // bezier end point
            var yt1 = handMovement(y0, y1); // bezier end point (reuse t1)

            //path.call(this, xt0, yt0, fuzz((xt0 + xt1) / 2, f), fuzz((yt0 + yt1) / 2, f), xt1, yt1);
            //this.ctx.moveTo(this.fd.doodle?x0:xt0, this.fd.doodle?y0:yt0);
            this.ctx.quadraticCurveTo(this.fuzz((xt0 + xt1) / 2, f), this.fuzz((yt0 + yt1) / 2, f), xt1, yt1);
        }

        return this;
    }

    hdRoundedRect(x: number, y: number, width: number, height: number, rh?: number, rv?: number) {
        let halfPI = Math.PI / 2;
        let x0 = x;
        let y0 = y;
        let x1 = x + width;
        let y1 = y + height;

        rh = rh || 0;
        rv = rv || (rh || 0);

        this.hdLine(x0+rh, y0, x1-rh, y0);
        if(rh > 0) {
            halfPI = Math.PI / 2;
            this.hdEllipse(x1-rh, y0+rv, rh, rv, 0, halfPI*3, Math.PI*2);
        }
        this.hdLine(x1, y0+rv, x1, y1-rv);
        if(rh > 0) {
            this.hdEllipse(x1-rh, y1-rv, rh, rv, 0, 0, halfPI);
        }
        this.hdLine(x1-rh, y1, x0+rh, y1);
        if(rh > 0) {
            this.hdEllipse(x0+rh, y1-rv, rh, rv, 0, halfPI, Math.PI);
        }
        this.hdLine(x0, y1-rv, x0, y0+rv);
        if(rh > 0) {
            this.hdEllipse(x0+rh, y0+rv, rh, rv, 0, Math.PI, halfPI*3);
        }

        return this;
    }

    hdEllipse (x: number, y: number, rh: number, rv: number, rot?: number, start?: number, end?: number) {
        var PI2 = Math.PI * 2;
        // sanitize input
        start = start || 0;
        end = end || PI2;
        rot = rot || 0;
        // rotation
        var cosRot = Math.cos(rot);
        var sinRot = Math.sin(rot);
        // number of steps
        var steps = this.fd.msteps + ((rh + rv) / 2) * this.fd.fsteps / 10;
        // fuzzyness dependent on on radius
        var fh = this.fd.ffc * Math.pow(rh, 0.5) * 0.3 / Math.pow(steps, 0.25);
        var fv = this.fd.ffc * Math.pow(rv, 0.5) * 0.3 / Math.pow(steps, 0.25);
        // distortion of the ellipse
        var xs = 0.95 + Math.random() * 0.1;
        var ys = 0.95 + Math.random() * 0.1;
        var rxs = rh * xs;
        var rys = rv * ys;
        // lenght of one segment
        var arcLength = end - start;
        var segLength = arcLength / steps;

        // initial values for i = 0
        var t1 = start;
        var cosT1rxs = rxs * Math.cos(t1);
        var sinT1rys = rys * Math.sin(t1);
        var x1 = x + cosT1rxs * cosRot - sinT1rys * sinRot;
        var y1 = y + cosT1rxs * sinRot + sinT1rys * cosRot;

        // correct startpoint deviation (through fuzzed radius) by drawing a line
        this.hdLine( 
            x + rh * Math.cos(t1) * cosRot - rv * Math.sin(t1) * sinRot, // would be start x
            y + rh * Math.cos(t1) * sinRot + rv * Math.sin(t1) * cosRot, // would be start y
            x1,  // actual start x
            y1   // actual start y
        ); 

        for(var i = 1; i <= steps; i++) {
            t1 = t1 + segLength;
            var x0 = x1;
            var y0 = y1;
            var cosT1rxs = rxs * Math.cos(t1);
            var sinT1rys = rys * Math.sin(t1);
            x1 = x + cosT1rxs * cosRot - sinT1rys * sinRot;
            y1 = y + cosT1rxs * sinRot + sinT1rys * cosRot;

            //this.ctx.moveTo(x0, y0);
            this.ctx.quadraticCurveTo(this.fuzz((x0 + x1) / 2, fh), this.fuzz((y0 + y1) / 2, fv), x1, y1);
        }
        // correct endpoint deviation (through fuzzed radius) by drawing a line
        this.hdLine(
            x1, // actual end x
            y1, // actual end y
            x + rh * Math.cos(end) * cosRot - rv * Math.sin(end) * sinRot,  // would be end x
            y + rh * Math.cos(end) * sinRot + rv * Math.sin(end) * cosRot   // would be end y
        ); 

        return this;
    }

    hdOctagon(x: number, y: number, width: number, height: number) {

        this.hdLine(x, y+ height*0.25, x + width * 0.25, y);
        this.hdLine(x + width * 0.25, y, x + width * 0.75, y);
        this.hdLine(x + width * 0.75, y, x + width, y + height * 0.25);
        this.hdLine(x + width, y + height * 0.25, x + width, y + height * 0.75);
        this.hdLine(x + width, y + height * 0.75, x + width * 0.75, y + height);
        this.hdLine(x + width * 0.75, y + height, x + width * 0.25, y + height);
        this.hdLine(x + width * 0.25, y + height, x, y + height * 0.75);
        this.hdLine(x, y + height * 0.75, x, y+ height*0.25);

        return this;
    }

    private bsplit (points: any[], t0: number) {
        let n = points.length - 1; // number of control points
        let b = [];       // coefficients as in De Casteljau's algorithm
        let res1: any[] = [];    // first curve resulting control points
        let res2: any[] = [];    // second curve resulting control points
        var t1 = 1 - t0;

        // multiply point with scalar factor
        function pf(p: any[], f: number) {
            var res = [];
            for(var i = 0; i < p.length; i++) {
                res.push(f * p[i]);
            }
            return res;
        };
        // add points as vectors
        function pp(p1: any[], p2: any[]) {
            var res = [];
            for(var i = 0; i < Math.min(p1.length, p2.length); i++) {
                res.push(p1[i] + p2[i]);
            }
            return res;
        };

        // set original coefficients: b[i][0] = points[i]
        for(var i = 0; i <= n; i++) {
            points[i] = (typeof points[i] == "object") ? points[i] : [points[i]];
            b.push([ points[i] ]);
        }
        // get all coefficients
        for(var j = 1; j <= n; j++) {
            for(var i = 0; i <= (n-j); i++) {
                b[i].push( pp(
                        pf(b[i][j-1], t1),
                        pf(b[i+1][j-1], t0)
                ));
            }
        }
        // set result: res1 & res2
        for(var j = 0; j <= n; j++) {
            res1.push(b[0][j]);
            res2.push(b[j][n-j]);
        }

        return [res1, res2];
    };

    hdBezier3(x0: number, y0: number, cx0: number, cy0: number, cx1: number, cy1: number, x1: number, y1: number) {
        // number of steps - this is a very primitive approach to
        // estimate the Bezier arc length
        let d = this.dist2(x0, y0, x1, y1) * 3;
        let steps = Math.ceil(Math.pow(d / this.fd.fsteps, 0.9));
        // fuzzyness
        let f = this.fd.ff * 0.8;

        let p0 = [x0, y0];
        let pc0 = [cx0, cy0];
        let pc1 = [cx1, cy1];
        let p1 = [x1, y1];
        var curve2 = [p0, pc0, pc1, p1];
        for(var i = steps; i > 0; i--) {
            // split curve2
            let points = this.bsplit(curve2, 1/i);
            let curve1 = points[0];
            var curve2 = points[1] as number[][];
            // set points for drawing from curve1
            p0 = curve1[0]; pc0 = curve1[1];  pc1 = curve1[2]; p1 = curve1[3];

            /* path.call(this, p0[0], p0[1],
                fuzz((pc0[0]+pc1[0])/2, f), // just make one control point
                fuzz((pc0[1]+pc1[1])/2, f),
                p1[0], p1[1]); */

            this.ctx.moveTo(p0[0], p0[1]);
            this.ctx.quadraticCurveTo(this.fuzz((pc0[0]+pc1[0])/2, f), this.fuzz((pc0[1]+pc1[1])/2, f), p1[0], p1[1]);
        }

        return this;
    }

    hdBezier2(x0: number, y0: number, cx: number, cy: number, x1: number, y1: number) {
        // number of steps - this is a very primitive approach to
        // estimate the Bezier arc length
        var d = this.dist2(x0, y0, x1, y1) * 3;
        var steps = Math.ceil(Math.pow(d / this.fd.fsteps, 0.9));
        // fuzzyness
        var f = this.fd.ff * 0.8;

        let p0 = [x0, y0];
        let pc = [cx, cy];
        let p1 = [x1, y1];
        let curve2 = [p0, pc, p1];
        for(var i = steps; i > 0; i--) {
            // split curve2
            let points = this.bsplit(curve2, 1/i);
            let curve1 = points[0];
            curve2 = points[1];
            // set points for drawing from curve1
            p0 = curve1[0]; pc = curve1[1]; p1 = curve1[2];

            //path.call(this, p0[0], p0[1], fuzz(pc[0], f), fuzz(pc[1], f), p1[0], p1[1]);
            this.ctx.moveTo(p0[0], p0[1]);
            this.ctx.quadraticCurveTo(this.fuzz(pc[0], f), this.fuzz(pc[1], f), p1[0], p1[1]);
        }

        return this;
    }

}