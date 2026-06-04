<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>富時代｜八部曲訓練系統</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: 'PingFang TC', 'Microsoft JhengHei', sans-serif; background: #f7f7f5; min-height: 100vh; }
.header { background: #1a1a2e; padding: 24px 20px 20px; text-align: center; }
.header-label { font-size: 11px; letter-spacing: 0.2em; color: #666; margin-bottom: 6px; }
.header h1 { font-size: 20px; font-weight: 800; color: #fff; letter-spacing: 0.06em; }
.header p { font-size: 12px; color: #888; margin-top: 8px; }
.container { max-width: 560px; margin: 0 auto; padding: 16px 16px 100px; }
.chapter { margin-bottom: 8px; }
.chapter-header {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 18px; border-radius: 12px; cursor: pointer;
  background: #fff; color: #333; border: 1.5px solid #e8e8e8;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  transition: all 0.25s; user-select: none;
}
.chapter-header.open { color: #fff; }
.chapter-emoji { font-size: 22px; }
.chapter-info { flex: 1; }
.chapter-title { font-size: 11px; opacity: 0.7; letter-spacing: 0.08em; }
.chapter-subtitle { font-size: 16px; font-weight: 700; }
.chapter-arrow { font-size: 11px; opacity: 0.6; transition: transform 0.25s; }
.chapter-arrow.open { transform: rotate(180deg); }
.nodes { padding-left: 12px; margin-left: 20px; margin-top: 6px; display: none; }
.nodes.open { display: block; }
.node {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 16px; border-radius: 10px; cursor: pointer;
  background: #fff; border: 1px solid #e8e8e8;
  margin-bottom: 6px; transition: all 0.2s;
}
.node-dot {
  width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
  font-weight: 700; font-size: 11px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.node-info { flex: 1; }
.node-name { font-weight: 600; font-size: 14px; color: #333; }
.node-hint { font-size: 11.5px; color: #999; margin-top: 2px; }
.node-arrow { font-size: 14px; color: #ccc; }
.divider { text-align: center; padding: 2px 0 4px; color: #d0d0d0; font-size: 13px; }
.result-panel {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: #fff; padding: 20px 20px 32px;
  max-height: 55vh; overflow-y: auto;
  box-shadow: 0 -8px 32px rgba(0,0,0,0.12);
  display: none; border-top: 2px solid #eee;
}
.result-panel.show { display: block; }
.result-header { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.result-badge { padding: 3px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; }
.result-title { font-size: 14px; font-weight: 600; color: #333; flex: 1; }
.result-close { background: none; border: none; font-size: 18px; color: #bbb; cursor: pointer; }
.result-content { font-size: 13.5px; line-height: 2; color: #444; white-space: pre-wrap; }
.loading { text-align: center; color: #999; font-size: 14px; padding: 20px 0; }
.loading-icon { font-size: 24px; margin-bottom: 8px; }
</style>
</head>
<body>

<div class="header">
  <div class="header-label">RICHTIMES 富時代</div>
  <h1>八部曲訓練系統</h1>
  <p>點選任一節點，AI 即時生成訓練內容</p>
</div>

<div class="container" id="app"></div>

<div class="result-panel" id="resultPanel">
  <div class="result-header">
    <div class="result-badge" id="resultBadge"></div>
    <div class="result-title" id="resultTitle"></div>
    <button class="result-close" onclick="closeResult()">✕</button>
  </div>
  <div id="resultContent"></div>
</div>

<script>
const WORKER_URL = "https://futime-training.richtime90117277.workers.dev";

const SYSTEM = `你是富時代房地產顧問公司的資深訓練師，專門訓練新人業務。
用繁體中文回答，風格實戰、簡潔、有畫面感。
每次回答固定格式：
【這一步的目標】一句話說清楚。
【新人該做什麼】3-4個具體動作，條列。
【常見錯誤】2個新人最容易犯的錯。
【可以直接用的話術】1-2句，加上引號。
【下一步】接到哪個環節，一句話帶過。
回答控制在200字以內，精準不廢話。`;

const chapters = [
  { id:"A", emoji:"🎯", title:"一部曲", subtitle:"開發名單", color:"#5b7cc4",
    nodes:[{id:"A1",name:"市場開發與曝光",hint:"研討會／異業合作／社群／轉介"},{id:"A2",name:"初步接觸與諮詢",hint:"主動邀約、了解背景動機"}]},
  { id:"B", emoji:"🤝", title:"二部曲", subtitle:"建立信任", color:"#3a9d8c",
    nodes:[{id:"B1",name:"見面前準備",hint:"資料預習／場地選擇"},{id:"B2",name:"開場前五分鐘",hint:"暖場、說明目的、禁忌動作"},{id:"B3",name:"傾聽技巧",hint:"關鍵問題設計、讓客戶多說"}]},
  { id:"C", emoji:"🔍", title:"三部曲", subtitle:"需求與痛點", color:"#7a6cc4",
    nodes:[{id:"C1",name:"需求訪談",hint:"房地產六大功能釐清購屋目的"},{id:"C2",name:"財務健檢",hint:"收支盤點、風險評估、貸款初判"}]},
  { id:"D", emoji:"🏠", title:"四部曲", subtitle:"物件配對", color:"#c98a3a",
    nodes:[{id:"D1",name:"資產配置建議",hint:"依財務狀況提供合適產品規劃"},{id:"D2",name:"產品媒合與推薦",hint:"利弊分析、回報試算、進出策略"}]},
  { id:"E", emoji:"🛡️", title:"五部曲", subtitle:"異議處理", color:"#c4564b",
    nodes:[{id:"E1",name:"股票族",hint:"聽懂但不動／積桿放大"},{id:"E2",name:"問媽媽族",hint:"凡事問媽媽／女兒主導"},{id:"E3",name:"價格族",hint:"教科書殺價型"},{id:"E4",name:"合資族",hint:"姊妹合資資金不明"},{id:"E5",name:"無殼族",hint:"退休焦慮無殼"}]},
  { id:"F", emoji:"✍️", title:"六部曲", subtitle:"締結成交", color:"#2a9d5c",
    nodes:[{id:"F1",name:"簽約流程與陪同",hint:"注意事項、契約條款解說"},{id:"F2",name:"貸款協助",hint:"試算、銀行媒合、送件追蹤"}]},
  { id:"G", emoji:"📞", title:"七部曲", subtitle:"售後服務", color:"#5a8cc4",
    nodes:[{id:"G1",name:"交屋驗收",hint:"點交、驗屋、過戶流程"},{id:"G2",name:"代租代管",hint:"出租行銷、租客篩選、租務管理"},{id:"G3",name:"年度資產檢視",hint:"每年檢視配置、動態調整建議"}]},
  { id:"H", emoji:"💡", title:"跨部曲", subtitle:"心法", color:"#a0a0a0",
    nodes:[{id:"H1",name:"顧問思維 vs 業務思維",hint:"為什麼不能只想著賣"},{id:"H2",name:"信任感是設計出來的",hint:"每個細節都在塑造印象"},{id:"H3",name:"轉介紹的時機與話術",hint:"成交後最黃金的 72 小時"}]},
];

let openChapter = null;
let currentColor = "#333";

function render() {
  const app = document.getElementById("app");
  app.innerHTML = chapters.map((ch, ci) => `
    <div class="chapter">
      <div class="chapter-header ${openChapter===ch.id?'open':''}"
           style="${openChapter===ch.id?`background:${ch.color};border-color:${ch.color};box-shadow:0 4px 20px ${ch.color}40`:''}"
           onclick="toggleChapter('${ch.id}')">
        <span class="chapter-emoji">${ch.emoji}</span>
        <div class="chapter-info">
          <div class="chapter-title">${ch.title}</div>
          <div class="chapter-subtitle">${ch.subtitle}</div>
        </div>
        <span class="chapter-arrow ${openChapter===ch.id?'open':''}">▼</span>
      </div>
      <div class="nodes ${openChapter===ch.id?'open':''}"
           style="border-left: 2px dashed ${ch.color}55">
        ${ch.nodes.map(node => `
          <div class="node" onclick="askAI('${ch.id}','${node.id}')">
            <div class="node-dot" style="background:${ch.color}20;color:${ch.color}">${node.id}</div>
            <div class="node-info">
              <div class="node-name">${node.name}</div>
              <div class="node-hint">${node.hint}</div>
            </div>
            <span class="node-arrow">▶</span>
          </div>
        `).join('')}
      </div>
      ${ci < chapters.length-1 ? '<div class="divider">↓</div>' : ''}
    </div>
  `).join('');
}

function toggleChapter(id) {
  openChapter = openChapter === id ? null : id;
  render();
}

async function askAI(chapterId, nodeId) {
  const ch = chapters.find(c => c.id === chapterId);
  const node = ch.nodes.find(n => n.id === nodeId);
  currentColor = ch.color;

  const panel = document.getElementById("resultPanel");
  const content = document.getElementById("resultContent");
  const badge = document.getElementById("resultBadge");
  const title = document.getElementById("resultTitle");

  panel.style.borderTopColor = ch.color;
  panel.classList.add("show");
  badge.style.background = ch.color + "20";
  badge.style.color = ch.color;
  badge.textContent = `${ch.title} ${ch.subtitle}`;
  title.textContent = node.name;
  content.innerHTML = `<div class="loading"><div class="loading-icon">⏳</div>AI 正在生成訓練內容…</div>`;

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: SYSTEM,
        messages: [{ role: "user", content: `請說明「${ch.title}${ch.subtitle} → ${node.name}」這個環節（${node.hint}）。針對房地產新人業務訓練。` }],
      }),
    });
    const data = await res.json();
    const text = data.content?.find(b => b.type === "text")?.text || "無法取得內容";
    content.innerHTML = `<div class="result-content">${text}</div>`;
  } catch(e) {
    content.innerHTML = `<div class="result-content">⚠️ 連線失敗，請再試一次。</div>`;
  }
}

function closeResult() {
  document.getElementById("resultPanel").classList.remove("show");
}

render();
</script>
</body>
</html>
