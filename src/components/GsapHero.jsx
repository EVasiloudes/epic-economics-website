import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GsapHero.css';

gsap.registerPlugin(ScrollTrigger);

function GsapHero() {
  const foldEffectRef = useRef(null);

  useEffect(() => {
    const foldEffect = foldEffectRef.current;
    if (!foldEffect) return;

    // Animate marquee elements
    gsap.utils.toArray('.marquee', foldEffect).forEach((el, index) => {
      const w = el.querySelector('.track');
      if (!w) return;

      const [x, xEnd] = (index % 2 === 0) ? [-500, -1500] : [-500, 0];
      gsap.fromTo(w, { x }, {
        x: xEnd,
        scrollTrigger: {
          trigger: foldEffect,
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
      if (!centerContent || !centerFold) return;
      
      const overflowHeight = centerContent.clientHeight - centerFold.clientHeight;

      document.body.style.height = `${overflowHeight + window.innerHeight}px`;

      targetScroll = -(
        document.documentElement.scrollTop || document.body.scrollTop
      );
      currentScroll += (targetScroll - currentScroll) * 0.1;
      foldsContent.forEach(content => {
        if (content && content.style) {
          content.style.transform = `translateY(${currentScroll}px)`;
        }
      });
      requestAnimationFrame(tick);
    };
    tick();

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      if (document.body.style.height) {
        document.body.style.height = '';
      }
    };
  }, []);

  return (
    <div className="screen" id="fold-effect" ref={foldEffectRef}>
      <div className="wrapper-3d">
        <div className="fold fold-top">
          <div className="fold-align">
            <div className="fold-content">
              <div className="marquee">
                <div className="track">
                  Economics.Economics.<span className="-focus">Economics.</span>Economics.Economics.Economics.Economics.Economics.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Markets.Markets.<span className="-focus">Markets.</span>Markets.Markets.Markets.Markets.Markets.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Value.Value.<span className="-focus">Value.</span>Value.Value.Value.Value.Value.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Capital.Capital.<span className="-focus">Capital.</span>Capital.Capital.Capital.Capital.Capital.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Labor.Labor.<span className="-focus">Labor.</span>Labor.Labor.Labor.Labor.Labor.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Power.Power.<span className="-focus">Power.</span>Power.Power.Power.Power.Power.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Crisis.Crisis.<span className="-focus">Crisis.</span>Crisis.Crisis.Crisis.Crisis.Crisis.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fold fold-center" id="center-fold">
          <div className="fold-align">
            <div className="fold-content" id="center-content">
              <div className="marquee">
                <div className="track">
                  Economics.Economics.<span className="-focus">Economics.</span>Economics.Economics.Economics.Economics.Economics.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Markets.Markets.<span className="-focus">Markets.</span>Markets.Markets.Markets.Markets.Markets.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Value.Value.<span className="-focus">Value.</span>Value.Value.Value.Value.Value.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Capital.Capital.<span className="-focus">Capital.</span>Capital.Capital.Capital.Capital.Capital.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Labor.Labor.<span className="-focus">Labor.</span>Labor.Labor.Labor.Labor.Labor.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Power.Power.<span className="-focus">Power.</span>Power.Power.Power.Power.Power.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Crisis.Crisis.<span className="-focus">Crisis.</span>Crisis.Crisis.Crisis.Crisis.Crisis.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fold fold-bottom">
          <div className="fold-align">
            <div className="fold-content">
              <div className="marquee">
                <div className="track">
                  Economics.Economics.<span className="-focus">Economics.</span>Economics.Economics.Economics.Economics.Economics.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Markets.Markets.<span className="-focus">Markets.</span>Markets.Markets.Markets.Markets.Markets.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Value.Value.<span className="-focus">Value.</span>Value.Value.Value.Value.Value.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Capital.Capital.<span className="-focus">Capital.</span>Capital.Capital.Capital.Capital.Capital.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Labor.Labor.<span className="-focus">Labor.</span>Labor.Labor.Labor.Labor.Labor.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Power.Power.<span className="-focus">Power.</span>Power.Power.Power.Power.Power.
                </div>
              </div>

              <div className="marquee">
                <div className="track">
                  Crisis.Crisis.<span className="-focus">Crisis.</span>Crisis.Crisis.Crisis.Crisis.Crisis.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GsapHero;