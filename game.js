class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.player1 = new Player(this.ctx, 50, this.ctx.canvas.height - 50, {
            left: "ArrowLeft",
            right: "ArrowRight",
            jump: "ArrowUp",
            punch: "KeyZ",
            kick: "KeyX",
            special: "KeyC",
        });
        
        this.player2 = new Player(this.ctx, this.ctx.canvas.width - 50, this.ctx.canvas.height - 50, {
            left: "KeyA",
            right: "KeyD",
            jump: "KeyW",
            punch: "KeyF",
            kick: "KeyG",
            special: "KeyH",
        });


        // Health and Power meters for Player 1
        this.healthMeter1 = new StatusBar(this.ctx, 10, 10, 200, 20, "red");
        this.powerMeter1 = new StatusBar(this.ctx, 10, 40, 200, 20, "blue");

        // Health and Power meters for Player 2
        this.healthMeter2 = new StatusBar(this.ctx, this.ctx.canvas.width - 210, 10, 200, 20, "red");
        this.powerMeter2 = new StatusBar(this.ctx, this.ctx.canvas.width - 210, 40, 200, 20, "blue");


        this.loop();
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }

    update() {
        this.player1.update();
        this.player2.update();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player1.draw();
        this.player2.draw();
        this.healthMeter1.draw();
        this.powerMeter1.draw();
        this.healthMeter2.draw();
        this.powerMeter2.draw();
    }
}

class StatusBar {
    constructor(ctx, x, y, width, height, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.currentValue = 100;
        this.maxValue = 100;
    }

    update(currentValue) {
        this.currentValue = currentValue;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width * (this.currentValue / this.maxValue), this.height);
        this.ctx.strokeStyle = "white";
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}


class Player {
    constructor(ctx, x, y, controls) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.attackState = "idle";
        this.direction = "right";
        this.gravity = 0.5;
        this.velocityY = 0;
        this.isJumping = false;
        this.controls = controls;
    }

    jump() {
        if (!this.isJumping) {
            this.velocityY = -this.jumpStrength;
            this.isJumping = true;
        }
    }

    update() {
        const isKeyPressed = (key) => {
            return keyState[key] === true;
        };

        if (isKeyPressed(this.controls.left)) {
            this.x -= this.speed;
            this.direction = "left";
        }
        if (isKeyPressed(this.controls.right)) {
            this.x += this.speed;
            this.direction = "right";
        }
        if (isKeyPressed(this.controls.jump)) {
            this.jump();
        }
        if (isKeyPressed(this.controls.punch)) {
            this.punch();
        }
        if (isKeyPressed(this.controls.kick)) {
            this.kick();
        }
        if (isKeyPressed(this.controls.special)) {
            this.specialAttack();
        }
        this.y += this.velocityY;
        this.velocityY += this.gravity;
    
        // Check if player is on the ground
        if (this.y >= this.ctx.canvas.height - 50) {
            this.y = this.ctx.canvas.height - 50;
            this.isJumping = false;
        }

        // Boundary checks
        this.x = Math.max(0, Math.min(this.ctx.canvas.width - 50, this.x));
        this.y = Math.max(0, Math.min(this.ctx.canvas.height - 50, this.y));
    }

    punch() {
        if (this.attackState !== "idle") return;
        this.attackState = "punch";
        setTimeout(() => {
            this.attackState = "idle";
        }, 200);
    }

    kick() {
        if (this.attackState !== "idle") return;
        this.attackState = "kick";
        setTimeout(() => {
            this.attackState = "idle";
        }, 300);
    }

    specialAttack() {
        if (this.attackState !== "idle") return;
        this.attackState = "special";
        setTimeout(() => {
            this.attackState = "idle";
        }, 500);
    }

    draw() {
        this.ctx.fillStyle = "purple";
        this.ctx.fillRect(this.x, this.y, 50, 50);

        if (this.attackState === "punch") {
            this.ctx.fillStyle = "red";
            if (this.direction === "right") {
                this.ctx.fillRect(this.x + 50, this.y + 20, 30, 10);
            } else {
                this.ctx.fillRect(this.x - 30, this.y + 20, 30, 10);
            }
        } else if (this.attackState === "kick") {
            this.ctx.fillStyle = "blue";
            if (this.direction === "right") {
                this.ctx.fillRect(this.x + 50, this.y + 35, 40, 10);
            } else {
                this.ctx.fillRect(this.x - 40, this.y + 35, 40, 10);
            }
        } else if (this.attackState === "special") {
            this.ctx.fillStyle = "yellow";
            if (this.direction === "right") {
                this.ctx.beginPath();
                this.ctx.arc(this.x + 80, this.y + 25, 15, 0, Math.PI * 2, true);
                this.ctx.fill();
            } else {
                this.ctx.beginPath();
                this.ctx.arc(this.x - 30, this.y + 25, 15, 0, Math.PI * 2, true);
                this.ctx.fill();
            }
        }
    }
}

const keyState = {};

document.addEventListener("keydown", (event) => {
    keyState[event.code] = true;
});

document.addEventListener("keyup", (event) => {
    keyState[event.code] = false;
});

document.addEventListener("DOMContentLoaded", () => {
    const gameCanvas = document.getElementById("gameCanvas");
    const game = new Game(gameCanvas);
});
