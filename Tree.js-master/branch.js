function Branch(begin, end, parent, mass) {
    //Position
    this.begin = begin;
    this.end = end;
    if (! parent == null){
    this.currentEnd = begin;
    }
    else {
        this.currentEnd = begin;
    }
    this.parent = parent;

    //HyperParameters
    this.finished = false;
    this.growth = 0;
    this.growthRate = PI/300;
    this.growing = true;
    this.limit = PI/2;
    this.leaf = false;
    //this.branchRules = [[PI/6, 0.67], [-PI/4, 0.67]]; // [rotation, length]
    this.branchRules = [[PI/6, 0.67], [-PI/4, 0.67], [-PI/7, 0.5]];

    //Physics
    this.mass = mass;
    this.displacement = createVector(0,0);
    this.realEnd = p5.Vector.add(this.currentEnd, this.displacement);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);


    this.physics = function(force) {
        //Takes in a force (vector) and
        var k = -0.001; // Spring constant to get the branch to its original position
        this.acceleration = force.div(this.mass);
        this.velocity.add(this.acceleration);
        var cp = this.displacement;
        cp.mult(k);
        this.velocity.add(cp);
        this.displacement.add(this.velocity);

    }

    this.grow = function() {
        //extends and draws the branch
        stroke(255);
        strokeWeight(Math.pow(this.mass,3)*15);
        if (parent == null){
            if (this.growth <= this.limit) {
                this.growth += this.growthRate;
                var realGrowth = 0;
                if (this.growing) {
                    realGrowth = 1 + Math.sin(this.growth - PI/2)
                }
                else {
                    realGrowth = Math.sin(this.growth)
                }
                this.currentEnd = p5.Vector.add(this.begin,p5.Vector.sub(this.end, this.begin).mult(Math.sin(realGrowth)));
            }
            else {
                this.growing = false
            }
        this.realEnd = p5.Vector.add(this.currentEnd, this.displacement) ;
        line(this.begin.x, this.begin.y, this.realEnd.x, this.realEnd.y);}
        else {
            if (this.growth <= this.limit) {
                this.growth += this.growthRate;
                if (this.growing) {
                    realGrowth = 1 + Math.sin(this.growth - PI/2)
                }
                else {
                    realGrowth = Math.sin(this.growth)
                }
                this.currentEnd = p5.Vector.add(this.parent.realEnd,p5.Vector.sub(this.end, this.parent.realEnd).mult(realGrowth));
            }
            else {
                this.growing = false
            }

            this.realEnd = p5.Vector.add(this.currentEnd, this.displacement) ;
            line(this.parent.realEnd.x, this.parent.realEnd.y, this.realEnd.x, this.realEnd.y);}
    }



    this.branchOut = function() {
        var branches = [];
        for (var i = 0; i < this.branchRules.length; i++) {
            var dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(this.branchRules[i][0]);
            dir.mult(this.branchRules[i][1]);
            var newEnd = p5.Vector.add(this.end, dir);
            var b = new Branch(this.end, newEnd, this, this.mass * 0.80);
            branches.push(b);
        }
        return branches;
    }

}

function Leaf(branch) {
    this.branch = branch;
    this.position = branch.end.copy();
    this.currentSize = 1;
    this.maxSize = 50;
    this.growthRate = 0.2*Math.random();
    this.status = true;
    this.compost = 0;

    this.mass = 0.5;
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

    this.physics = function(force) {
        if (!this.status && this.position.y < height) {
            var g = createVector(0, Math.random()*0.05);
            this.acceleration = force.div(this.mass);
            this.acceleration.add(g);
            this.velocity.add(this.acceleration);
            this.position.add(this.velocity);
        }

    }

    this.show = function() {
        var size;
        var oldAge = Math.random();
        if (oldAge < 0.00005) {
            this.status = false;
            this.branch.leaf = false;
        }
        if (this.status) {
            fill(255, 0, 100, 100);
            noStroke();

            if (this.currentSize <= this.maxSize) {
                this.currentSize = this.currentSize + this.growthRate;
                size = this.currentSize;
            }
            else {
                size = this.maxSize;
            }
            ellipse(this.branch.realEnd.x, this.branch.realEnd.y, size, size);
    }
        else{
            fill(255, 0, 100, 100 - this.compost/7);
            this.compost++;
            noStroke();
            size = this.currentSize;
            ellipse(this.position.x, this.position.y, size, size);
        }

    }
}