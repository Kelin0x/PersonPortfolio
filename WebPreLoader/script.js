// 定义基础配置常量
const ROWS = 6;
const COLS = 6;
const BLOCK_SIZE = 50;
const COOLDOWN = 500;
let isFlipped = false;

// 创建瓦片函数
function createTiles(row, col){
    const tile = document.createElement('div');
    tile.className = 'tile';
    
    tile.innerHTML = `
    <div class="tile-face tile-front"></div>
    <div class="tile-face tile-back"></div>
    `;
    
    const bgPosition = `${col*20}% ${row*20}%`;
    tile.querySelector('.tile-front').style.backgroundPosition = bgPosition;
    tile.querySelector('.tile-back').style.backgroundPosition = bgPosition;
    
    return tile;
}

// 创建瓦片板
function createBoard(){
    const board = document.querySelector('.board');
    for(let i = 0; i < ROWS; i++){
        const row = document.createElement('div');
        row.className = 'row';
        for(let j = 0; j < COLS; j++){
            row.appendChild(createTiles(i, j));
        }
        board.appendChild(row);
    }
}

// 初始化瓦片动画
function initializeTileAnimations(){
    const tiles = document.querySelectorAll('.tile');
    
    tiles.forEach((tile, index) => {
        let lastEnterTime = 0;
        let isAnimating = false;
        
        tile.addEventListener('mouseenter', () => {
            const currentTime = Date.now();
            if(currentTime - lastEnterTime > COOLDOWN && !isAnimating){
                lastEnterTime = currentTime;
                isAnimating = true;
                
                let tiltY;
                if(index % 6 === 0) tiltY = -40;
                else if(index % 6 === 5) tiltY = 40;
                else if(index % 6 === 1) tiltY = -20;
                else if(index % 6 === 2) tiltY = -10;
                else tiltY = 10;
                
                animateTile(tile, tiltY);
                
                setTimeout(() => {
                    isAnimating = false;
                }, 1200);
            }   
        });
    });
    
    const flipButton = document.querySelector('#flipButton');
    flipButton.addEventListener('click', () => {
        flipAllTiles(tiles);
    });
}

// 单个瓦片动画
function animateTile(tile, tiltY) {
    const frontFace = tile.querySelector('.tile-front');
    const backFace = tile.querySelector('.tile-back');
    const startRotation = isFlipped ? 180 : 0;
    
    gsap.timeline()
        .set(tile, {
            rotateX: startRotation,
            rotateY: 0,
            transformPerspective: 1000  // 添加透视效果
        })
        .to(tile, {
            duration: 0.3,
            ease: "power2.out"
        })
        .to(tile, {
            rotateX: startRotation + 180,
            duration: 0.6,
            ease: "power2.inOut",
            onUpdate: function() {
                if (this.progress() > 0.5) {
                    frontFace.style.visibility = isFlipped ? 'visible' : 'hidden';
                    backFace.style.visibility = isFlipped ? 'hidden' : 'visible';
                }
            }
        })
        .to(tile, {
            rotateX: startRotation + 360,
            duration: 0.6,
            ease: "power2.inOut",
            onUpdate: function() {
                if (this.progress() > 0.5) {
                    frontFace.style.visibility = isFlipped ? 'hidden' : 'visible';
                    backFace.style.visibility = isFlipped ? 'visible' : 'hidden';
                }
            }
        });
}

// 翻转所有瓦片
function flipAllTiles(tiles) {
    isFlipped = !isFlipped;
    
    const indices = Array.from({length: tiles.length}, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    indices.forEach((index, i) => {
        const tile = tiles[index];
        const frontFace = tile.querySelector('.tile-front');
        const backFace = tile.querySelector('.tile-back');
        
        gsap.to(tile, {
            rotateX: isFlipped ? 180 : 0,
            duration: 1,
            delay: i * 0.05,
            ease: 'power2.inOut',
            onUpdate: function() {
                if (this.progress() > 0.5) {
                    frontFace.style.visibility = isFlipped ? 'hidden' : 'visible';
                    backFace.style.visibility = isFlipped ? 'visible' : 'hidden';
                }
            }
        });
    });
}

// 创建背景方块
function createBlocks(){
    const blocksContainer = document.getElementById('blocks');
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;
    const numCols = Math.ceil(screenWidth/BLOCK_SIZE);
    const numRows = Math.ceil(screenHeight/BLOCK_SIZE);
    const numBlocks = numCols * numRows;
    
    for(let i = 0; i < numBlocks; i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.dataset.index = i;
        blocksContainer.appendChild(block);
    }
    
    return {numCols, numRows};
}

// 初始化光标
function initCursor() {
    const cursor = document.getElementById('cursor-circle');
    const text = "Create • Design • Develop • Dream";
    const characters = text.split('');
    const degree = 360 / characters.length;
    const radius = 40;

    characters.forEach((char, i) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.className = 'circle-text';
        
        const angle = degree * i * (Math.PI / 180);
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);
        
        span.style.transform = `
            translate3d(${x}px, ${y}px, 0)
            rotate(${degree * i}deg)
            translateY(-${radius}px)
            rotate(90deg)
        `;
        
        span.style.transitionDelay = `${i * 50}ms`;
        
        cursor.appendChild(span);
    });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let rotation = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        cursor.style.left = currentX + 'px';
        cursor.style.top = currentY + 'px';
        
        rotation += 0.7;
        cursor.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        
        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

// 计算方块的距离
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// 更新方块高亮效果
function updateBlocksHighlight(mouseX, mouseY, blocks, numCols) {
    const HIGHLIGHT_RADIUS = 200;  // 增大高亮范围
    const GLOW_RADIUS = 100;      // 增大发光范围
    const MAX_OPACITY = 0.9;      // 增加最大不透明度
    const MIN_OPACITY = 0.4;      // 增加最小不透明度

    blocks.forEach((block, index) => {
        // 计算方块的位置
        const row = Math.floor(index / numCols);
        const col = index % numCols;
        const blockX = col * BLOCK_SIZE + BLOCK_SIZE / 2;
        const blockY = row * BLOCK_SIZE + BLOCK_SIZE / 2;
        
        // 计算鼠标和方块的距离
        const distance = calculateDistance(mouseX, mouseY, blockX, blockY);
        
        // 根据距离添加不同的效果
        if (distance < HIGHLIGHT_RADIUS) {
            block.classList.add('highlight');
            
            if (distance < GLOW_RADIUS) {
                block.classList.add('glow');
                // 为最近的方块添加特殊效果
                if (distance < GLOW_RADIUS / 2) {
                    block.style.transform = `scale(${1 + (1 - distance/(GLOW_RADIUS/2)) * 0.1})`;
                }
            } else {
                block.classList.remove('glow');
                block.style.transform = '';
            }
            
            // 使用更强的不透明度渐变
            const opacity = 1 - (distance / HIGHLIGHT_RADIUS);
            block.style.opacity = MIN_OPACITY + (opacity * (MAX_OPACITY - MIN_OPACITY));
            
        } else {
            block.classList.remove('highlight', 'glow');
            block.style.opacity = '';
            block.style.transform = '';
        }
    });
}

// 初始化
function init() {
    createBoard();
    initializeTileAnimations();
    window.blocksInfo = createBlocks();
    initCursor();
    
    const blocksContainer = document.getElementById('blocks');
    const blocks = document.querySelectorAll('.block');
    
    let throttleTimer;
    blocksContainer.addEventListener('mousemove', (event) => {
        if (!throttleTimer) {
            throttleTimer = setTimeout(() => {
                const rect = blocksContainer.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                
                // 更新方块高亮效果
                updateBlocksHighlight(x, y, blocks, window.blocksInfo.numCols);
                
                throttleTimer = null;
            }, 16); // 约60fps的更新频率
        }
    });
    
    // 添加鼠标离开容器的处理
    blocksContainer.addEventListener('mouseleave', () => {
        blocks.forEach(block => {
            block.classList.remove('highlight', 'glow');
            block.style.opacity = '';
        });
    });
}

document.addEventListener('DOMContentLoaded', init);

// 添加窗口大小改变事件处理
window.addEventListener('resize', () => {
    const blocksContainer = document.getElementById('blocks');
    blocksContainer.innerHTML = ''; // 清空现有方块
    window.blocksInfo = createBlocks(); // 重新创建方块
}); 