<template>
  <Transition name="fade">
    <div v-if="isLoading" class="loading-overlay">
      <div class="cube-wrapper">
        <svg viewBox="0 0 556.2 643" class="loading-svg">
          <g id="all-paths">
            <path v-for="(path, index) in cubePaths" :key="index" 
                  :d="path.d" 
                  :class="['st-common', path.originalClass]"
                  :style="{ animationDelay: (index * 0.05) + 's' }" />
          </g>
        </svg>
        <p class="loading-text">SYSTEM STARTING...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const isLoading = ref(true);

// ページ読み込み完了後に非表示にする
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 3500); // 演出を見せるために少し長めに設定
});

// SVGのパスデータを抽出（簡略化のため、元のSVGのpolygonデータをパスに変換して管理）
// ※実際にはSVGをそのままtemplateに入れて、polygonに一括でアニメーションを当てるのが一番楽です
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000; /* 黒背景でクールに */
  display: flex;
  justify-content: center;
  align-items: center;
}

.cube-wrapper {
  width: 250px;
  text-align: center;
}

.loading-svg {
  width: 100%;
  height: auto;
}

/* --- アニメーションの魔法 --- */

/* 1. 最初は全ての面を「透明 or グレー」にする */
polygon, path {
  fill: #222 !important; /* 暗いグレー */
  stroke: #444 !important;
  opacity: 0;
  animation: fillIn 0.8s forwards;
}

/* 2. 順番に色がパッと付くアニメーション */
@keyframes fillIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
    /* 元のSVGクラスに定義された色に戻るようにします */
  }
}

/* 3. 特徴的なクラス（st1〜st9）の色を復活させる */
:deep(.st1) { fill: #FBC02D !important; stroke: #000 !important; }
:deep(.st2) { fill: #00796B !important; stroke: #000 !important; }
:deep(.st3) { fill: #3F51B5 !important; stroke: #000 !important; }
:deep(.st4) { fill: #1A237E !important; stroke: #000 !important; }
:deep(.st5) { fill: #004D40 !important; stroke: #000 !important; }
:deep(.st6) { fill: #F57F17 !important; stroke: #000 !important; }
:deep(.st7) { fill: #303F9F !important; stroke: #000 !important; } /* + 部分 */
:deep(.st8) { fill: #F44336 !important; stroke: #000 !important; } /* 9 部分 */
:deep(.st9) { fill: #B71C1C !important; stroke: #000 !important; }

.loading-text {
  color: #fff;
  margin-top: 20px;
  font-family: monospace;
  letter-spacing: 4px;
  animation: blink 1s infinite;
}

@keyframes blink {
  50% { opacity: 0.3; }
}

.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>