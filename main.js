import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Configuration
const PHOTO_COUNT = 30;
const PHOTO_PATH = '/images/photos/photo_';
const BACK_PATH = '/images/back/background.jpg';

// Character Data (Generated)
const CHARACTERS = [
    { name: "アイセリア", desc: "星の光を物理的な形に織りなす天界の存在。彼女の存在は混沌とした次元に静寂をもたらす。" },
    { name: "カエレン", desc: "ネオ・トーキョーのネオン輝く廃墟で贖罪を求めるサイバーサムライ。プラズマブレードの達人。" },
    { name: "ライラ", desc: "森の精霊の守護者。古木と対話し、聖域を守るために植物を操る。" },
    { name: "オリオン", desc: "深宇宙探査のために作られた戦術アンドロイド。人間の感情に対して無限の好奇心を持つ。" },
    { name: "セラフィナ", desc: "黒曜石の翼を持つ堕天使。光と影の境界を歩み、均衡を求めている。" },
    { name: "ドレイヴン", desc: "闇を操る影の暗殺者。誰にも見られることなく移動し、暴君たちの心に恐怖を植え付ける。" },
    { name: "エララ", desc: "時空を超える歴史家。多元宇宙における文明の興亡を記録している。" },
    { name: "フェンリス", desc: "黄金の心を持つ人狼の戦士。群れに対して猛烈に忠実であり、戦場では恐るべき敵となる。" },
    { name: "イゾルデ", desc: "凍てついた荒野の氷の魔術師。彼女の触れるものは時間さえも凍りつく。" },
    { name: "ジャレス", desc: "迷宮次元のゴブリン王。謎かけと幻影を愛するトリックスター。" },
    { name: "カイラ", desc: "砂嵐を操る力を持つ砂漠の遊牧民。埋もれた都市の秘密を守っている。" },
    { name: "ルシアン", desc: "何世紀も生き続ける吸血鬼の貴族。永遠の孤独を癒す方法を探している。" },
    { name: "ミラ", desc: "自我を持ったホログラフィックAI。ネットワーク内に存在し、データを破損から守っている。" },
    { name: "ネロ", desc: "激しい気性を持つ炎の魔道士。友のために戦うとき、彼の炎はより明るく燃え上がる。" },
    { name: "オフィーリア", desc: "夢を現実に変える力を持つ夢想家。彼女の現実は常に変化し、色彩に溢れている。" },
    { name: "パックス", desc: "浮遊寺院の僧侶。空中浮揚と内なる平和の術を極めている。" },
    { name: "クイン", desc: "スチームパンクの発明家。彼女のガジェットは奇抜だが効果的だ。" },
    { name: "ライラ", desc: "深淵のマーメイドプリンセス。彼女の歌は船乗りを魅了し、嵐を鎮める。" },
    { name: "サイラス", desc: "空の気流に乗るウィンドダンサー。自由奔放で、捕まえることは不可能。" },
    { name: "タリア", desc: "幻獣と心を通わせるビーストテイマー。フェニックスを相棒に旅をしている。" },
    { name: "ウルリック", desc: "伝説の武器を鍛えるドワーフの鍛冶屋。彼のハンマーの音は雷のように響く。" },
    { name: "ヴェスパー", desc: "ナイトエルフのローグ。影に溶け込み、致命的な精度で攻撃する。" },
    { name: "ウィンター", desc: "氷の巨人の女戦士。彼女の強さは、その冷徹な態度に匹敵する。" },
    { name: "ザンダー", desc: "サイキック探偵。物体の記憶を読み取ることで事件を解決する。" },
    { name: "ヤラ", desc: "精霊と語らうシャーマン。迷える魂を死後の世界へと導く。" },
    { name: "ゼファー", desc: "空賊のキャプテン。冒険と財宝を求めて雲海を航海する。" },
    { name: "アリア", desc: "傷ついた人々を癒す歌姫。希望を届けるために世界中を旅している。" },
    { name: "ブラム", desc: "優しい心を持つ石のゴーレム。雪崩から山村を守っている。" },
    { name: "シア", desc: "野生の森の魔女。彼女のポーションはあらゆる病を治し、敵を呪う。" },
    { name: "ダンテ", desc: "呪われた腕を持つデモンハンター。地獄の勢力から人類を守るために戦う。" }
];

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, -5, 30); // Adjusted: closer and from below

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('app').appendChild(renderer.domElement);

// Interaction Setup
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let hoveredPhoto = null;

// UI Elements
const uiInfo = document.getElementById('character-info');
const uiName = document.getElementById('char-name');
const uiDesc = document.getElementById('char-desc');
const closeBtn = document.getElementById('close-btn');

closeBtn.addEventListener('click', () => {
    uiInfo.classList.add('hidden');
});

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.3; // Slower auto-rotate

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Soft white light
scene.add(ambientLight);

// Texture Loader
const textureLoader = new THREE.TextureLoader();
const loadingManager = new THREE.LoadingManager();

loadingManager.onLoad = () => {
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
};

// Background
textureLoader.load(BACK_PATH, (texture) => {
    // Mapping settings for environment map feel
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // If the image is not equirectangular, this might look distorted,
    // but it fulfills the "environment map" request technically.
    // For a simple background, we can just set it directly.
    scene.background = texture;
    scene.environment = texture;
});

// Photos Group
const photosGroup = new THREE.Group();
scene.add(photosGroup);

// Create Photos
const photoGeometry = new THREE.CircleGeometry(1.5, 64);

for (let i = 0; i < PHOTO_COUNT; i++) {
    const texture = textureLoader.load(`${PHOTO_PATH}${i}.jpg`, undefined, undefined, (err) => {
        console.error(`Error loading photo ${i}:`, err);
    });

    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
    });

    const photo = new THREE.Mesh(photoGeometry, material);

    // Spiral Arrangement
    const angle = i * 0.5; // Tighter spiral for more photos
    const radius = 5 + (i * 0.4); // Increasing radius
    const height = (i - PHOTO_COUNT / 2) * 0.8; // More compressed vertical spread

    photo.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
    );

    // Look at center (roughly) but keep upright
    photo.lookAt(0, height, 0);

    // Add random floating parameters
    photo.userData = {
        id: i,
        originalY: height,
        floatSpeed: 0.001 + Math.random() * 0.002, // Even slower speed
        floatOffset: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.0005 // Very subtle rotation
    };

    photosGroup.add(photo);
}

// Event Listeners
window.addEventListener('pointermove', onPointerMove);
window.addEventListener('click', onClick);
window.addEventListener('resize', onResize);

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onClick(event) {
    // Calculate pointer position in normalized device coordinates
    // (Already updated in onPointerMove, but good to be safe if click happens without move)
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(photosGroup.children);

    if (intersects.length > 0) {
        const selectedPhoto = intersects[0].object;
        const charId = selectedPhoto.userData.id;
        const charData = CHARACTERS[charId] || { name: "Unknown", desc: "No data available." };

        // Update UI
        uiName.textContent = charData.name;
        uiDesc.textContent = charData.desc;
        uiInfo.classList.remove('hidden');

        // Optional: Stop auto-rotation briefly or permanently on interaction
        controls.autoRotate = false;
    }
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    const time = Date.now();

    // Float animation for each photo
    photosGroup.children.forEach(photo => {
        const { originalY, floatSpeed, floatOffset, rotationSpeed } = photo.userData;

        // Vertical floating
        photo.position.y = originalY + Math.sin(time * floatSpeed + floatOffset) * 0.1; // Very subtle amplitude

        // Gentle rotation
        photo.rotation.z += rotationSpeed;
    });

    // Slowly rotate the entire group
    photosGroup.rotation.y += 0.001;

    // Raycasting for hover effect (optional visual feedback)
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(photosGroup.children);

    if (intersects.length > 0) {
        document.body.style.cursor = 'pointer';
        // Could add a scale effect here
    } else {
        document.body.style.cursor = 'default';
    }

    controls.update();
    renderer.render(scene, camera);
}

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
