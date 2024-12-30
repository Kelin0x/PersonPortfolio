const ROWS = 6;
const COLS = 6;
const BLOCK_SIZE = 50;
const COOLDOWN = 1000;
let isFlipped = false;

function createTiles(row, col){
    const tile=document.createElement('div');
    tile.className='tile';
    tile.innerHTML=`
    <div class="tile-face tile-front"></div>
    <div class="tile-face tile-back"></div>
    `
    const bgPosition=`${col*20}% ${row*20}%`;
    tile.querySelector('.tile-front').style.backgroundPosition=bgPosition;
    tile.querySelector('.tile-back').style.backgroundPosition=bgPosition;
    return tile;
}

function createBoard(){
    const board=document.querySelector('.board');
    for(let i=0; i<ROWS; i++){
        const row=document.createElement('div');
        row.className='row';
        for(let j=0; j<COLS; j++){
            row.appendChild(createTiles(i, j));
        }
        board.appendChild(row);
    }
}
function initializeTileAnimations(){
    const tiles=document.querySelectorAll('.tile');
    tiles.forEach((tile, index)=>{
        let lastEnterTime=0;
        let isAnimating = false;

        tile.addEventListener('mouseenter', ()=>{
            const currentTime=Date.now();
            if(currentTime-lastEnterTime>COOLDOWN && !isAnimating){
                lastEnterTime=currentTime;
                isAnimating = true;

                let tiltY;
                if(index%6===0){
                    tiltY=-40;
                }else if(index%6===5){
                    tiltY=40;
                }else if(index%6===1){
                    tiltY=-20;
                }else if(index%6===2){
                    tiltY=-10;
                }else{
                    tiltY=10;
                }

                animateTile(tile, tiltY);
                
                setTimeout(() => {
                    isAnimating = false;
                }, 1200);
            }   
        });
    });
    const flipButton=document.querySelector('#flipButton');
    flipButton.addEventListener('click', ()=>{flipAllTiles(tiles);});
}

function animateTile(tile, tiltY) {
    const frontFace = tile.querySelector('.tile-front');
    const backFace = tile.querySelector('.tile-back');
    const startRotation = isFlipped ? 180 : 0;  // 基于当前翻转状态
    
    gsap.timeline()
        .set(tile, {
            rotateX: startRotation
        })
        // 第一次翻转180度
        .to(tile, {
            rotateX: startRotation + 180,
            duration: 0.6,
            ease: "power2.inOut",
            onUpdate: function() {
                if (this.progress() > 0.5) {
                    // 如果当前是正面，显示背面；如果当前是背面，显示正面
                    frontFace.style.visibility = isFlipped ? 'visible' : 'hidden';
                    backFace.style.visibility = isFlipped ? 'hidden' : 'visible';
                }
            }
        })
        // 继续翻转180度回到原位
        .to(tile, {
            rotateX: startRotation + 360,
            duration: 0.6,
            ease: "power2.inOut",
            onUpdate: function() {
                if (this.progress() > 0.5) {
                    // 恢复到原始状态
                    frontFace.style.visibility = isFlipped ? 'hidden' : 'visible';
                    backFace.style.visibility = isFlipped ? 'visible' : 'hidden';
                }
            }
        });
}

function flipAllTiles(tiles) {
    isFlipped = !isFlipped;
    
    // 创建一个包含所有索引的数组并打乱顺序
    const indices = Array.from({length: tiles.length}, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    
    // 使用打乱后的索引顺序来翻转瓦片
    indices.forEach((index, i) => {
        const tile = tiles[index];
        const frontFace = tile.querySelector('.tile-front');
        const backFace = tile.querySelector('.tile-back');
        
        gsap.to(tile, {
            rotateX: isFlipped ? 180 : 0,
            duration: 1,
            delay: i * 0.05, // 使用循环索引i而不是瓦片索引
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

function createBlocks(){
    const blocksContainer=document.getElementById('blocks');
    const screenWidth=window.innerWidth;
    const screenHeight=window.innerHeight;
    const numCols=Math.ceil(screenWidth/BLOCK_SIZE);
    const numRows=Math.ceil(screenHeight/BLOCK_SIZE);
    const numBlocks=numCols*numRows;
    for(let i=0; i<numBlocks; i++){
        const block=document.createElement('div');
        block.classList.add('block');
        block.dataset.index=i;
        blocksContainer.appendChild(block);
    }
    return {numCols, numRows};
}

function createRipple(x, y, container) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    container.appendChild(ripple);
    
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
}

function initCursor() {
    const cursor = document.getElementById('cursor-circle');
    const text = "Create • Design • Develop • Dream";
    const characters = text.split('');
    const degree = 360 / characters.length;
    const radius = 40;

    // 创建环形文字
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

    // 初始化鼠标位置
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

function init() {
    createBoard();
    initializeTileAnimations();
    window.blocksInfo = createBlocks();
    initCursor();
    const blocksContainer = document.getElementById('blocks');
    
    // 简化事件监听，只保留涟漪效果
    let throttleTimer;
    blocksContainer.addEventListener('mousemove', (event) => {
        if (!throttleTimer) {
            throttleTimer = setTimeout(() => {
                const rect = blocksContainer.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                createRipple(x, y, blocksContainer);
                throttleTimer = null;
            }, 50);
        }
    });
    
    // 点击事件也只保留涟漪效果
    blocksContainer.addEventListener('click', (event) => {
        const rect = blocksContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        createRipple(x, y, blocksContainer);
    });
}

document.addEventListener('DOMContentLoaded', init);