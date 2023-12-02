import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { NODE_ENV } from "../../../_env";
import "./Particles.css"

let numParticles = 150;

if (NODE_ENV !== "development" && typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;
    const divisor = 10000;

    numParticles = (width * height) / divisor;
}

const particleParams = {
    particles: {
        number: {
            density: {
                enable: true
            },
            value: numParticles
        },
        color: {
            value: "#fff"
        },
        size: {
            value: 3,
            random: true
        },
        opacity: {
            value: 0.9,
            random: true
        },
        links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.7,
            width: 1.5
        },
        move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            },
            outModes: {
                default: "bounce"
            }
        }
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: "link"
            },
            onclick: {
                enable: true,
                mode: "push"
            }
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 0.7
                }
            }
        },
        detect_on: "window"
    }
};

export default function ParticlesContainer() {
    async function initParticles(engine) {
        await loadSlim(engine);
    }

    return (
        <div
            style={{
                position: 'fixed',
                background:
                    'linear-gradient(0deg, rgb(182, 139, 208) 0%, rgb(165, 71, 191) 100%)',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: -1
            }}
            data-aos="zoom-out"
            data-aos-duration="1500"
        >
            <Particles 
                id="tsparticles"
                style={{ position: 'absolute' }}
                init={initParticles}
                options={particleParams}
            />
        </div>
    )
}