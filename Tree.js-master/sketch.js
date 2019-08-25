// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/fcdNSZ9IzJM

var tree = [];
var leaves = [];
var life = false;

var count = 0;

function setup() {
    createCanvas(screen.width, screen.height - 100);
}

function mousePressed() {
    var welcome = document.getElementById("clickHere");
    welcome.innerHTML = "";
    if (life){
        life = false;
    for (var i = tree.length - 1; i >= 0; i--) {
        tree[i].limit = PI;
    }
        for (var i = 0; i < leaves.length; i++) {
                leaves[i].status = false;
        }
    }

    else {
        tree = [];
        leaves = [];
        life = true;
        var a = createVector(width / 2, height);
        var b = createVector(width / 2, height - 200);
        var root = new Branch(a, b, null, 1);

        tree[0] = root;

        for (var j = 0; j < 5; j++) {
            for (var i = tree.length - 1; i >= 0; i--) {
                if (!tree[i].finished) {
                    var branches = tree[i].branchOut();
                    console.log(branches);
                    tree[i].finished = true;
                    for (var k = 0; k < branches.length; k++) {
                        tree.push(branches[k])
                    }
                }
            }
        }
    }

}

function wind() {

    return createVector(Math.sin(frameCount*0.05)*Math.random()*0.1, Math.cos(frameCount*0.05)*Math.random()*0.01)
}

function draw() {
    var label = document.getElementById("frameRate");
    label.innerHTML = frameRate();
    background(51);
    for (var i = 0; i < tree.length; i++) {
        tree[i].grow();
        tree[i].physics(wind());
        if (!tree[i].finished && !tree[i].leaf) {
            tree[i].leaf = true;
            var leaf = new Leaf(tree[i]);
            leaves.push(leaf);
        }
    }

    for (var i = 0; i < leaves.length; i++) {
        if (leaves[i].branch.finished) {
            leaves[i].status = false;
            leaves[i].branch.leaf = false;
        }
        leaves[i].physics(wind());
        leaves[i].show();
    }
    for (var i = leaves.length - 1; i >= 0; i--) {
        if (!leaves[i].status && leaves[i].compost > 30*25) {
            leaves.splice(i,1);
        }
    }

}