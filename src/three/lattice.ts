import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  DynamicDrawUsage,
  Euler,
  InstancedMesh,
  MathUtils,
  Matrix4,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Quaternion,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

const COUNT_DESKTOP = 120;
const COUNT_MOBILE = 64;

const INK = 0x0a0a0b;
const BLOCK = 0x23232b;
const SIGNAL = 0xf5a524;

type Keyframes = {
  /** Scattered: the parts before anything is assembled. */
  scattered: Vector3;
  scatteredRotation: Euler;
  /** Monolith: the same parts locked into one dense block. */
  monolith: Vector3;
  monolithRotation: Euler;
  /** Frame: rebuilt as an open structure — the system, reconfigured. */
  frame: Vector3;
  frameRotation: Euler;
  scale: number;
  accent: boolean;
};

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

/** Deterministic pseudo-random, so the layout is identical on every load. */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function buildKeyframes(count: number): Keyframes[] {
  const random = seeded(20260923);
  const frames: Keyframes[] = [];

  // The monolith is a solid grid; the frame keeps only its shell, so the
  // structure reads as hollow once it reassembles.
  const cols = Math.ceil(Math.cbrt(count));
  const spacing = 0.54;
  const offset = ((cols - 1) * spacing) / 2;

  for (let i = 0; i < count; i += 1) {
    const x = i % cols;
    const y = Math.floor(i / cols) % cols;
    const z = Math.floor(i / (cols * cols));

    const onShell = x === 0 || x === cols - 1 || y === 0 || y === cols - 1 || z === 0;
    const angle = (i / count) * Math.PI * 2;
    const ring = 2.6 + (i % 3) * 0.28;

    frames.push({
      scattered: new Vector3(
        (random() - 0.5) * 18,
        (random() - 0.5) * 12,
        (random() - 0.5) * 14 - 2
      ),
      scatteredRotation: new Euler(random() * Math.PI, random() * Math.PI, random() * Math.PI),
      monolith: new Vector3(x * spacing - offset, y * spacing - offset, z * spacing - offset),
      monolithRotation: new Euler(0, 0, 0),
      frame: onShell
        ? new Vector3(
            Math.cos(angle) * ring,
            (y - (cols - 1) / 2) * spacing * 1.5,
            Math.sin(angle) * ring
          )
        : new Vector3(
            Math.cos(angle) * 0.35,
            (y - (cols - 1) / 2) * spacing * 1.5,
            Math.sin(angle) * 0.35
          ),
      frameRotation: new Euler(0, -angle, 0),
      scale: 0.34 + random() * 0.14,
      accent: i % 11 === 0,
    });
  }

  return frames;
}

export type LatticeScene = {
  setProgress: (progress: number) => void;
  resize: () => void;
  setPaused: (paused: boolean) => void;
  dispose: () => void;
};

export function createLatticeScene(canvas: HTMLCanvasElement): LatticeScene {
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  const count = mobile ? COUNT_MOBILE : COUNT_DESKTOP;
  const keyframes = buildKeyframes(count);

  const renderer = new WebGLRenderer({ canvas, antialias: !mobile, alpha: false, powerPreference: "high-performance" });
  renderer.setClearColor(INK, 1);

  const scene = new Scene();
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  scene.add(new AmbientLight(0xffffff, 0.7));

  const key = new DirectionalLight(0xffffff, 3.2);
  key.position.set(5, 6, 7);
  scene.add(key);

  const rim = new PointLight(SIGNAL, 60, 28);
  rim.position.set(-4, -2, 5);
  scene.add(rim);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshStandardMaterial({ color: BLOCK, roughness: 0.34, metalness: 0.3 });
  const mesh = new InstancedMesh(geometry, material, count);
  mesh.instanceMatrix.setUsage(DynamicDrawUsage);
  // On wide screens the structure sits clear of the copy on the left.
  mesh.position.x = mobile ? 0 : 2.6;
  scene.add(mesh);

  const accent = new Color(SIGNAL);
  const base = new Color(BLOCK);
  keyframes.forEach((frame, i) => mesh.setColorAt(i, frame.accent ? accent : base));
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

  const matrix = new Matrix4();
  const position = new Vector3();
  const quaternion = new Quaternion();
  const rotation = new Euler();
  const scale = new Vector3();

  let progress = 0;
  let paused = false;
  let frameId = 0;
  let disposed = false;

  function layout(time: number) {
    // 0–45% assemble, 45–70% inspect the solid, 70–95% rebuild as a frame.
    const assemble = smoothstep(0.02, 0.45, progress);
    const rebuild = smoothstep(0.68, 0.95, progress);
    const drift = time * 0.00012;

    for (let i = 0; i < count; i += 1) {
      const frame = keyframes[i];

      position.copy(frame.scattered).lerp(frame.monolith, assemble);
      position.lerp(frame.frame, rebuild);
      // A slow idle float keeps the scattered state from looking frozen.
      position.y += Math.sin(drift * 6 + i) * 0.14 * (1 - assemble);

      rotation.set(
        MathUtils.lerp(frame.scatteredRotation.x, frame.monolithRotation.x, assemble),
        MathUtils.lerp(frame.scatteredRotation.y, frame.frameRotation.y, Math.max(assemble * 0.4, rebuild)),
        MathUtils.lerp(frame.scatteredRotation.z, frame.monolithRotation.z, assemble)
      );
      quaternion.setFromEuler(rotation);

      const size = frame.scale * (0.7 + 0.3 * assemble);
      scale.set(size, size, size);

      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(i, matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;

    // The group turns to reveal the structure, then the camera pulls back.
    mesh.rotation.y = progress * Math.PI * 0.85 + drift;
    mesh.rotation.x = Math.sin(progress * Math.PI) * 0.18;
    camera.position.z = 12 - smoothstep(0, 0.5, progress) * 3.8 + rebuild * 2.4;
    camera.position.y = smoothstep(0.85, 1, progress) * 2.2;
    camera.lookAt(mesh.position.x * 0.45, 0, 0);
  }

  function render(time: number) {
    frameId = requestAnimationFrame(render);
    if (paused) return;
    layout(time);
    renderer.render(scene, camera);
  }

  function resize() {
    const { clientWidth, clientHeight } = canvas;
    if (!clientWidth || !clientHeight) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(clientWidth, clientHeight, false);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  }

  resize();
  frameId = requestAnimationFrame(render);

  return {
    setProgress: (value: number) => {
      progress = MathUtils.clamp(value, 0, 1);
    },
    resize,
    setPaused: (value: boolean) => {
      paused = value;
    },
    dispose: () => {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(frameId);
      geometry.dispose();
      material.dispose();
      mesh.dispose();
      renderer.dispose();
    },
  };
}
