import { regions } from "@/content/site";

/*
  A dotted world map drawn on the server. Continents are rough polygons in lon/lat;
  a 3° grid is tested against them, so the whole thing is a few hundred circles and
  no image. The 12 check regions sit on top as beacons that light up in sequence,
  and three of them draw arcs to the region that is currently degraded (Frankfurt).
*/

type Poly = [number, number][];

const land: Poly[] = [
  // North America
  [[-168, 66], [-140, 70], [-95, 73], [-75, 63], [-55, 50], [-65, 44], [-72, 41], [-76, 35], [-81, 25], [-84, 30], [-90, 29], [-97, 26], [-105, 20], [-110, 24], [-117, 32], [-124, 40], [-124, 48], [-132, 55], [-150, 60], [-165, 60]],
  // Central America
  [[-105, 20], [-97, 16], [-88, 15], [-84, 10], [-78, 8], [-83, 13], [-92, 17], [-97, 26]],
  // Greenland
  [[-55, 60], [-42, 60], [-22, 70], [-25, 80], [-60, 82], [-70, 76], [-55, 66]],
  // South America
  [[-80, 10], [-62, 11], [-50, 0], [-35, -7], [-39, -20], [-48, -29], [-55, -36], [-64, -48], [-70, -54], [-75, -45], [-71, -30], [-70, -18], [-80, -5]],
  // Europe
  [[-10, 36], [-9, 43], [-5, 48], [-2, 50], [3, 52], [5, 58], [10, 63], [15, 68], [22, 71], [30, 70], [42, 66], [40, 56], [30, 49], [29, 41], [22, 37], [15, 38], [12, 44], [3, 43], [0, 38]],
  // British Isles
  [[-6, 50], [-1, 51], [2, 53], [-2, 58], [-7, 57], [-10, 53], [-10, 51]],
  // Scandinavia / Finland fill
  [[5, 58], [12, 56], [20, 60], [25, 60], [30, 65], [28, 70], [20, 70], [15, 68], [10, 63]],
  // Africa
  [[-17, 15], [-17, 28], [-5, 36], [10, 37], [25, 32], [33, 31], [43, 12], [51, 12], [41, -2], [40, -20], [35, -34], [20, -35], [12, -18], [8, -5], [10, 4], [-8, 5], [-15, 10]],
  // Madagascar
  [[44, -12], [50, -16], [47, -26], [43, -22]],
  // Asia (mainland)
  [[29, 41], [40, 45], [50, 42], [60, 45], [70, 42], [60, 30], [50, 25], [60, 22], [72, 20], [77, 8], [80, 15], [88, 22], [92, 15], [100, 8], [104, 1], [109, 10], [110, 20], [120, 25], [122, 30], [130, 35], [140, 36], [145, 45], [135, 55], [160, 60], [180, 66], [180, 72], [100, 77], [60, 73], [40, 66], [40, 56]],
  // Arabian peninsula
  [[33, 31], [43, 12], [51, 12], [57, 20], [60, 26], [50, 30], [42, 34]],
  // Indonesia / SE Asia islands
  [[95, 5], [103, -6], [112, -8], [120, -10], [132, -6], [141, -8], [132, 0], [120, 4], [112, 2], [100, 7]],
  // New Guinea
  [[131, -3], [141, -3], [150, -8], [145, -10], [135, -8]],
  // Japan
  [[130, 31], [135, 34], [141, 40], [145, 44], [141, 45], [138, 37], [131, 33]],
  // Australia
  [[114, -22], [122, -17], [135, -12], [142, -11], [146, -18], [153, -27], [150, -37], [140, -38], [130, -32], [116, -35], [113, -28]],
  // New Zealand
  [[166, -46], [175, -41], [178, -37], [173, -41], [168, -46]],
];

function inside([x, y]: [number, number], poly: Poly) {
  let ok = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) ok = !ok;
  }
  return ok;
}

const W = 1000;
const H = 520;
const px = (lon: number) => ((lon + 180) / 360) * W;
const py = (lat: number) => ((84 - lat) / 150) * H;

const dots: [number, number][] = [];
for (let lat = 82; lat >= -56; lat -= 3) {
  for (let lon = -178; lon <= 180; lon += 3) {
    const p: [number, number] = [lon + (lat % 6 === 0 ? 0 : 1.5), lat];
    if (land.some((poly) => inside(p, poly))) dots.push([px(p[0]), py(p[1])]);
  }
}

const coords: Record<string, [number, number]> = {
  Virginia: [-78, 38],
  Oregon: [-121, 44],
  "São Paulo": [-46, -23],
  Toronto: [-79, 43],
  London: [0, 51],
  Frankfurt: [8, 50],
  Stockholm: [18, 59],
  Mumbai: [72, 19],
  Singapore: [103, 1],
  Tokyo: [139, 35],
  Sydney: [151, -33],
  Johannesburg: [28, -26],
};

const target = "Frankfurt";
const confirmers = ["London", "Stockholm", "Virginia"];

function arc(a: [number, number], b: [number, number]) {
  const [x1, y1] = a;
  const [x2, y2] = b;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.25 - 18;
  return `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
}

export function WorldMap({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const dot = dark ? "fill-signal-3/30" : "fill-ink/[0.11]";
  const t = [px(coords[target][0]), py(coords[target][1])] as [number, number];
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${W} ${H}`} className={className} preserveAspectRatio="xMidYMid meet">
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.6} className={dot} />
      ))}
      {confirmers.map((name, i) => {
        const c = coords[name];
        return (
          <path
            key={name}
            d={arc([px(c[0]), py(c[1])], t)}
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            className="draw text-signal"
            style={{ ["--d" as string]: `${1.2 + i * 0.25}s`, opacity: 0.7 }}
          />
        );
      })}
      {regions.map((name, i) => {
        const [lon, lat] = coords[name];
        const x = px(lon);
        const y = py(lat);
        const isTarget = name === target;
        return (
          <g key={name} className={isTarget ? "text-amber" : "text-signal"}>
            <circle cx={x} cy={y} r={4} fill="currentColor" className="beacon-ring" style={{ ["--d" as string]: `${i * 0.5}s`, opacity: 0 }} />
            <circle cx={x} cy={y} r={3.2} fill="currentColor" className="beacon" style={{ ["--d" as string]: `${i * 0.5}s` }} />
            {isTarget && <circle cx={x} cy={y} r={9} fill="none" stroke="currentColor" strokeWidth={1} opacity={0.6} className="pulse-ring" />}
          </g>
        );
      })}
    </svg>
  );
}
