/* sketch.js */
const sketch = (p) => {
  let buildings = [];
  let imgs = {};
  let parallaxX = 0,
    parallaxY = 0;
  let ripples = [];

  p.preload = () => {
    imgs.A = p.loadImage("images/buildingA.png");
    imgs.B = p.loadImage("images/buildingB.png");
    imgs.C = p.loadImage("images/buildingC.png");
    imgs.D = p.loadImage("images/buildingD.png");
    imgs.E = p.loadImage("images/buildingE.png");
    imgs.bg = p.loadImage("images/background.png");
  };

  p.setup = () => {
    const canvas = p.createCanvas(
      p.select("#city_container").width,
      p.select("#city_container").height
    );
    canvas.parent("city_container");

    buildings = [
      {
        rx: 0.1,
        ry: 0.1,
        rw: 0.25,
        rh: 0.25,
        maxW: 180,
        maxH: 300,
        minW: 120,
        minH: 80,
        img: imgs.B,
        name: "A",
      },
      {
        rx: 0.4,
        ry: 0.4,
        rw: 0.3,
        rh: 0.28,
        maxW: 200,
        maxH: 350,
        minW: 160,
        minH: 100,
        img: imgs.A,
        name: "B",
      },
      {
        rx: 0.15,
        ry: 0.6,
        rw: 0.22,
        rh: 0.22,
        maxW: 150,
        maxH: 280,
        minW: 100,
        minH: 100,
        img: imgs.C,
        name: "C",
      },
      {
        rx: 0.75,
        ry: 0.2,
        rw: 0.18,
        rh: 0.18,
        maxW: 120,
        maxH: 300,
        minW: 90,
        minH: 90,
        img: imgs.E,
        name: "D",
      },
      {
        rx: 0.65,
        ry: 0.65,
        rw: 0.24,
        rh: 0.22,
        maxW: 180,
        maxH: 300,
        minW: 130,
        minH: 100,
        img: imgs.D,
        name: "E",
      },
    ];

    p.textFont("Arial");
  };

  function getSize(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }

  p.draw = () => {
    p.clear();
    const w = p.width;
    const h = p.height;

    // Parallax background
    if (imgs.bg) p.image(imgs.bg, 0, 0, w, h);
    else p.background("#335C5A");

    // Draw buildings
    buildings.forEach((b) => {
      const bwRaw = w * b.rw;
      const bhRaw = h * b.rh;
      const bw = getSize(bwRaw, b.minW, b.maxW);
      const bh = getSize(bhRaw, b.minH, b.maxH);
      const bx = w * b.rx;
      const by = h * b.ry;

      const hovered =
        p.mouseX > bx &&
        p.mouseX < bx + bw &&
        p.mouseY > by &&
        p.mouseY < by + bh;

      p.push();
      // hover outline & label
      if (hovered) {
        p.noFill();
        p.stroke("#FFD700");
        p.strokeWeight(3);
        p.rect(bx, by, bw, bh);
        p.noStroke();
        p.fill(255);
        p.textSize(14);
        p.textAlign(p.CENTER, p.BOTTOM);
        p.text(`Building ${b.name}`, bx + bw / 2, by - 5);
      }

      // icon scale & draw
      p.translate(bx + bw / 2, by + bh / 2);
      p.scale(hovered ? 1.1 : 1);
      p.imageMode(p.CENTER);
      p.drawingContext.shadowOffsetX = 5;
      p.drawingContext.shadowOffsetY = 5;
      p.drawingContext.shadowBlur = 20;
      p.drawingContext.shadowColor = "rgba(0,0,0,0.5)";
      p.image(b.img, 0, 0, bw, bh);
      p.pop();
    });

    // Click ripple animations
    for (let i = ripples.length - 1; i >= 0; i--) {
      const R = ripples[i];
      p.noFill();
      p.stroke(`rgba(255,255,255,${1 - R.r / 100})`);
      p.ellipse(R.x, R.y, R.r);
      R.r += 4;
      if (R.r > 100) ripples.splice(i, 1);
    }
  };

  p.mousePressed = (e) => {
    const canvasEl = p._renderer.canvas;
    const infoDiv = document.getElementById("building_info");

    // 1) If click not on canvas, ignore
    if (e.target !== canvasEl) {
      return;
    }

    // 2) Convert click to p5 coords
    const rect = canvasEl.getBoundingClientRect();
    const scaleX = p.width / rect.width;
    const scaleY = p.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    // 3) Hit-test buildings
    let clickedBuilding = null;
    for (let b of buildings) {
      const bw = getSize(p.width * b.rw, b.minW, b.maxW);
      const bh = getSize(p.height * b.rh, b.minH, b.maxH);
      const bx = p.width * b.rx;
      const by = p.height * b.ry;
      if (mx > bx && mx < bx + bw && my > by && my < by + bh) {
        clickedBuilding = { ...b, bx, by, bw, bh };
        break;
      }
    }

    // 4) Show or hide popup
    if (clickedBuilding) {
      ripples.push({
        x: clickedBuilding.bx + clickedBuilding.bw / 2,
        y: clickedBuilding.by + clickedBuilding.bh / 2,
        r: 0,
      });
      infoDiv.innerHTML = `
        <h2>Building ${clickedBuilding.name}</h2>
        <a id="more_info_link"
           href="https://102464.stu.sd-lab.nl/Beroeps/Rolling-Loud/info-page.php/building_${clickedBuilding.name}"
           target="_blank">More Info</a>`;
      infoDiv.style.display = "block";

      // position popup
      const popupRect = infoDiv.getBoundingClientRect();
      let fx = e.clientX + 15;
      let fy = e.clientY + 15;
      const m = 10;
      if (fx + popupRect.width + m > window.innerWidth)
        fx = window.innerWidth - popupRect.width - m;
      if (fy + popupRect.height + m > window.innerHeight)
        fy = window.innerHeight - popupRect.height - m;
      if (fx < m) fx = m;
      if (fy < m) fy = m;
      infoDiv.style.left = fx + "px";
      infoDiv.style.top = fy + "px";

      document
        .getElementById("more_info_link")
        .addEventListener("click", (ev) => ev.stopPropagation());
    } else {
      infoDiv.style.display = "none";
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(
      p.select("#city_container").width,
      p.select("#city_container").height
    );
  };
};

new p5(sketch);

document.querySelector(".arrow-text").addEventListener("click", function () {
  this.classList.toggle("active");

  const popup = document.querySelector(".popup");

  if (popup.style.display === "block") {
    popup.style.display = "none";
  } else {
    popup.style.display = "block";
  }
});

document.querySelectorAll(".popup li").forEach((li) => {
  li.addEventListener("click", () => {
    const popup = document.querySelector(".popup");
    popup.style.display = "none";

    const arrow = document.querySelector(".arrow");
    arrow.style.transform = "rotate(-90deg)";

    console.log("You clicked:", li.textContent);

    // Remove the class 'active' from the arrow-text span
    const arrowText = document.querySelector(".arrow-text");
    arrowText.classList.remove("active");

    if (li.textContent.trim().toLowerCase() === "about") {
      const map = document.getElementById("defaultCanvas0");
      const building_info = document.getElementById("building_info");
      console.log(building_info);
      if (map) {
        building_info.style.display = "none";
        map.style.display = "none";
        arrowText.innerHTML = '<span class="arrow">⏷</span> About';
        arrow.style.transform = "rotate(-90deg)";

        document.getElementById("poster").style.display = "block";
        document.getElementById("city_container").style.display = "none";
        document.getElementById("about_container").style.display = "flex";
      }
    }

    if (li.textContent.trim().toLowerCase() === "map") {
      const map = document.getElementById("defaultCanvas0");
      map.style.display = "block";
      arrowText.innerHTML = '<span class="arrow">⏷</span> Map';
      arrow.style.transform = "rotate(-90deg)";

      document.getElementById("city_container").style.display = "block";
      document.getElementById("poster").style.display = "none";
      document.getElementById("about_container").style.display = "none";
    }
  });
});
