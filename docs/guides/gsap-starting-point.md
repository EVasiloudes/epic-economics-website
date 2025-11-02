# Gsap Starting Point

```html
<div class="screen " id="fold-effect">
	<div class="wrapper-3d">
		<div class="fold fold-top">
			<div class="fold-align">
				<div class="fold-content">
					<div class="marquee">
						<div class="track">
							Creators.Creators.<span class="-focus">Creators.</span>Creators.Creators.Creators.Creators.Creators.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Thinkers.Thinkers.<span class="-focus">Thinkers.</span>Thinkers.Thinkers.Thinkers.Thinkers.Thinkers.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Innovators.Innovators.<span class="-focus">Innovators.</span>Innovators.Innovators.Innovators.Innovators.Innovators.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Rebels.Rebels.Rebels.<span class="-focus">Rebels.</span>Rebels.Rebels.Rebels.Rebels.
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fold fold-center" id="center-fold">
			<div class="fold-align">
				<div class="fold-content" id="center-content">
					<div class="marquee">
						<div class="track">
							Creators.Creators.<span class="-focus">Creators.</span>Creators.Creators.Creators.Creators.Creators.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Thinkers.Thinkers.<span class="-focus">Thinkers.</span>Thinkers.Thinkers.Thinkers.Thinkers.Thinkers.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Innovators.Innovators.<span class="-focus">Innovators.</span>Innovators.Innovators.Innovators.Innovators.Innovators.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Rebels.Rebels.Rebels.<span class="-focus">Rebels.</span>Rebels.Rebels.Rebels.Rebels.
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="fold fold-bottom">
			<div class="fold-align">
				<div class="fold-content">
					<div class="marquee">
						<div class="track">
							Creators.Creators.<span class="-focus">Creators.</span>Creators.Creators.Creators.Creators.Creators.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Thinkers.Thinkers.<span class="-focus">Thinkers.</span>Thinkers.Thinkers.Thinkers.Thinkers.Thinkers.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Innovators.Innovators.<span class="-focus">Innovators.</span>Innovators.Innovators.Innovators.Innovators.Innovators.
						</div>
					</div>

					<div class="marquee">
						<div class="track">
							Rebels.Rebels.Rebels.<span class="-focus">Rebels.</span>Rebels.Rebels.Rebels.Rebels.
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
```

```css
:root {
  --step--2: clamp(3.13rem, 2.62rem + 2.51vw, 5.76rem);
  --step--1: clamp(3.75rem, 3.09rem + 3.29vw, 7.20rem);
  --step-0: clamp(4.50rem, 3.64rem + 4.29vw, 9.00rem);
}

body {
	background-color: #efefef;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
	font-weight: 600;
	min-height: 400vh;
}

.marquee {
	border-bottom: 1px solid #1a1a1a;
	color: #ccc;
	font-size: var(--step-0);
	font-weight: 700;
	height: calc(170px + 4rem);
	overflow: hidden;
	position: relative;
	width: 100vw;

	& img {
		object-fit: cover;
		max-height: 150px;
	}
}

.track {
	height: 100%;
	overflow: hidden;
	padding: 2rem 0;
	position: absolute;
	white-space: nowrap;

	& .text {
		animation: marquee 50000ms linear infinite;
		align-items: center;
		display: inline-flex;
		will-change: transform;
	}
}

.-focus {
	color: #1a1a1a;
	font-weight: 900;
}

.screen {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper-3d {
  position: relative;
  perspective: 20vw;
  transform-style: preserve-3d;
}

.fold {
  overflow: hidden;
  width: 100vw;
  height: 80vh;
}

.fold-top {
  position: absolute;
  transform-origin: bottom center;
  left: 0;
  right: 0;
  bottom: 100%;
}

.fold-center {
	width: 100vw;
}

.fold-bottom {
  position: absolute;
  transform-origin: top center;
  right: 0;
  left: 0;
  top: 100%;
}
.fold-align {
  width: 100%;
  height: 100%;
}
.fold-bottom .fold-align {
  transform: translateY(-100%);
}
.fold-top .fold-align {
  transform: translateY(100%);
}

.fold-bottom {
  transform-origin: top center;
  transform: rotateX(120deg);
}

.fold-top {
  transform-origin: bottom center;
  transform: rotateX(-120deg);
}
```

```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.marquee').forEach((el, index) => {
	const w = el.querySelector('.track');
	const [x, xEnd] = (index % 2 == 0) ? [-500, -1500] : [-500, 0];
	gsap.fromTo(w, {  x  }, {
		x: xEnd,
		scrollTrigger: {
			scrub: 1
		}
	});
});

const centerContent = document.getElementById('center-content');
const centerFold = document.getElementById('center-fold');
const foldsContent = Array.from(document.querySelectorAll('.fold-content'));

let targetScroll = -(
  document.documentElement.scrollTop || document.body.scrollTop
);
let currentScroll = targetScroll;

const tick = () => {
  const overflowHeight = centerContent.clientHeight - centerFold.clientHeight;

  document.body.style.height = `${overflowHeight + window.innerHeight}px`;

  targetScroll = -(
    document.documentElement.scrollTop || document.body.scrollTop
  );
  currentScroll += (targetScroll - currentScroll) * 0.1;
  foldsContent.forEach(content => {
    content.style.transform = `translateY(${currentScroll}px)`;
  });
  requestAnimationFrame(tick);
};
tick();
```
