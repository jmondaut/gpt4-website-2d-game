document.addEventListener("DOMContentLoaded", function () {
    const hexagons = document.querySelectorAll(".hexagon");

    hexagons.forEach((hexagon) => {
        hexagon.addEventListener("click", function () {
            const interestId = this.id;
            const description = getDescriptionForInterest(interestId);
    
            if (description) {
                alert(description);
            }
        });
    
        // Add the border with running light effect to each hexagon
        const border = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        border.classList.add("border");
        border.setAttribute("viewBox", "0 0 200 230");
        hexagon.appendChild(border);
    
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M100,0 L200,57.5 L200,172.5 L100,230 L0,172.5 L0,57.5 Z");
        path.style.animationDuration = `${Math.random() * 2 + 1}s`;
        border.appendChild(path);
    });
});

function getDescriptionForInterest(interestId) {
    const descriptions = {
        "pokemon": "I'm a huge fan of Pokemon and enjoy collecting and battling with my favorite creatures.",
        "dragon-ball": "Dragon Ball has always been a source of inspiration for me, and its influence can be seen in my work.",
        "boxing": "Boxing is my favorite sport, and I find that it helps me stay sharp and focused in my professional life as well.",
    };

    return descriptions[interestId] || "";
}
