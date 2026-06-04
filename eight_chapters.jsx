import { useState } from "react";

const chapters = [
  {
    id: "A", emoji: "🎯", title: "一部曲", subtitle: "開發名單", color: "#5b7cc4",
    nodes: [
      { id: "A1", name: "市場開發與曝光", hint: "研討會／異業合作／社群／轉介" },
      { id: "A2", name: "初步接觸與諮詢", hint: "主動邀約、了解背景動機" },
    ]
  },
  {
    id: "B", emoji: "🤝", title: "二部曲", subtitle: "建立信任", color: "#3a9d8c",
    nodes: [
      { id: "B1", name: "見面前準備", hint: "資料預習／場地選擇" },
      { id: "B2", name: "開場前五分鐘", hint: "暖場、說明目的、禁忌動作" },
      { id: "B3", name: "傾聽技巧", hint: "關鍵問題設計、讓客戶多說" },
    ]
  },
  {
    id: "C", emoji: "🔍", title: "三部曲", subtitle: "需求與痛點", color: "#7a6cc4",
    nodes: [
      { id: "C1", name: "需求訪談", hint: "房地產六大功能釐清購屋目的" },
      { id: "C2", name: "財務健檢", hint: "收支盤點、風險評估、貸款初判" },
    ]
  },
  {
    id: "D", emoji: "🏠", title: "四部曲", subtitle: "物件配對", color: "#c98a3a",
    nodes: [
      { id: "D1", name: "資產配置建議", hint: "依財務狀況提供合適產品規劃" },
      { id: "D2", name: "產品媒合與推薦", hint: "利弊分析、回報試算、進出策略" },
    ]
  },
  {
    id: "E", emoji: "🛡️", title: "五部曲", subtitle: "異議處理", color: "#c4564b",
    nodes: [
      { id: "E1", name: "股票族", hint: "聽懂但不動／積桿放大" },
      { id: "E2", name: "問媽媽族", hint: "凡事問媽媽／女兒主導" },
      { id: "E3", name: "價格族", hint: "教科書殺價型" },
      { id: "E4", name: "合資族", hint: "姊妹合資資金不明" },
      { id: "E5", name: "無殼族", hint: "退休焦慮無殼" },
    ]
  },
  {
    id: "F", emoji: "✍️", title: "六部曲", subtitle: "締結成交", color: "#2a9d5c",
    nodes: [
      { id: "F1", name: "簽約流程與陪同", hint: "注意事項、契約條款解說" },
      { id: "F2", name: "貸款協助", hint: "試算、銀行媒合、送件追蹤" },
    ]
  },
  {
    id: "G", emoji: "📞", title: "七部曲", subtitle: "售後服務", color: "#5a8cc4",
    nodes: [
      { id: "G1", name: "交屋驗收", hint: "點交、驗屋、過戶流程" },
      { id: "G2", name: "代租代管", hint: "出租行銷、租客篩選、租務管理" },
      { id: "G3", name: "年度資產檢視", hint: "每年檢視配置、動態調整建議" },
    ]
  },
  {
    id: "H", emoji: "💡", title: "跨部曲", subtitle: "心法", color: "#a0a0a0",
    nodes: [
      { id: "H1", name: "顧問思維 vs 業務思維", hint: "為什麼不能只想著賣" },
      { id: "H2", name: "信任感是設計出來的", hint: "每個細節都在塑造印象" },
      { id: "H3", name: "轉介紹的時機與話術", hint: "成交後最黃金的 72 小時" },
    ]
  },
];

const SYSTEM = `你是富時代房地產顧問公司的資深訓練師，專門訓練新人業務。
用繁體中文回答，風格實戰、簡潔、有畫面感。
每次回答固定格式：
【這一步的目標】一句話說清楚。
【新人該做什麼】3-4個具體動作，條列。
【常見錯誤】2個新人最容易犯的錯。
【可以直接用的話術】1-2句，加上引號。
【下一步】接到哪個環節，一句話帶過。
回答控制在200字以內，精準不廢話。`;

export default function App() {
  const [openChapter, setOpenChapter] = useState(null);
  const [loading, setLoading] = useState(null);
  const [result, setResult] = useState(null);
  const [activeNode, setActiveNode] = useState(null);

  const ask = async (chapter, node) => {
    setActiveNode(node.id);
    setResult(null);
    setLoading(node.id);

    const prompt = `請說明「${chapter.title}${chapter.subtitle} → ${node.name}」這個環節（${node.hint}）。針對房地產新人業務訓練。`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find(b => b.type === "text")?.text || "無法取得內容";
      setResult({ node, chapter, text });
    } catch (e) {
      setResult({ node, chapter, text: "⚠️ 連線失敗，請再試一次。" });
    }
    setLoading(null);
  };

  return (
    <div style={{ background: "#f7f7f5", minHeight: "100vh", fontFamily: "'PingFang TC','Microsoft JhengHei',sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#1a1a2e", padding: "24px 20px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#666", marginBottom: 6 }}>RICHTIMES 富時代</div>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "0.06em", margin: 0 }}>八部曲訓練系統</h1>
        <p style={{ fontSize: 12, color: "#888", marginTop: 8, margin: "8px 0 0" }}>點選任一節點，AI 即時生成訓練內容</p>
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "16px 16px 80px" }}>
        {chapters.map((ch, ci) => {
          const isOpen = openChapter === ch.id;
          return (
            <div key={ch.id} style={{ marginBottom: 8 }}>
              {/* Chapter header */}
              <div onClick={() => { setOpenChapter(isOpen ? null : ch.id); setResult(null); setActiveNode(null); }}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 18px", borderRadius: 12, cursor: "pointer",
                  background: isOpen ? ch.color : "#fff",
                  color: isOpen ? "#fff" : "#333",
                  border: `1.5px solid ${isOpen ? ch.color : "#e8e8e8"}`,
                  boxShadow: isOpen ? `0 4px 20px ${ch.color}40` : "0 1px 4px rgba(0,0,0,0.05)",
                  transition: "all 0.25s", userSelect: "none",
                }}>
                <span style={{ fontSize: 22 }}>{ch.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.08em" }}>{ch.title}</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{ch.subtitle}</div>
                </div>
                <span style={{ fontSize: 11, opacity: 0.6, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}>▼</span>
              </div>

              {/* Nodes */}
              {isOpen && (
                <div style={{ paddingLeft: 12, borderLeft: `2px dashed ${ch.color}55`, marginLeft: 20, marginTop: 6 }}>
                  {ch.nodes.map((node) => {
                    const isActive = activeNode === node.id;
                    const isLoading = loading === node.id;
                    return (
                      <div key={node.id} style={{ marginBottom: 6 }}>
                        <div onClick={() => ask(ch, node)}
                          style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "12px 16px", borderRadius: 10, cursor: "pointer",
                            background: isActive ? ch.color + "15" : "#fff",
                            border: `1px solid ${isActive ? ch.color : "#e8e8e8"}`,
                            transition: "all 0.2s",
                          }}>
                          <div style={{
                            width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                            background: isActive ? ch.color : ch.color + "20",
                            color: isActive ? "#fff" : ch.color,
                            fontWeight: 700, fontSize: 11,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            transition: "all 0.2s",
                          }}>{node.id}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: 14, color: "#333" }}>{node.name}</div>
                            <div style={{ fontSize: 11.5, color: "#999", marginTop: 2 }}>{node.hint}</div>
                          </div>
                          <span style={{ fontSize: 14, color: isLoading ? ch.color : "#ccc" }}>
                            {isLoading ? "⏳" : "▶"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {ci < chapters.length - 1 && (
                <div style={{ textAlign: "center", padding: "2px 0 4px", color: "#d0d0d0", fontSize: 13 }}>↓</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Result panel */}
      {(result || loading) && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "#fff",
          borderTop: "2px solid " + (result ? chapters.find(c => c.id === result.chapter.id)?.color || "#333" : "#eee"),
          padding: "20px 20px 32px",
          maxHeight: "55vh", overflowY: "auto",
          boxShadow: "0 -8px 32px rgba(0,0,0,0.12)",
        }}>
          {loading && (
            <div style={{ textAlign: "center", color: "#999", fontSize: 14, padding: "20px 0" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>⏳</div>
              AI 正在生成訓練內容…
            </div>
          )}
          {result && !loading && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{
                  padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700,
                  background: result.chapter.color + "20", color: result.chapter.color,
                }}>
                  {result.chapter.title} {result.chapter.subtitle}
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{result.node.name}</span>
                <button onClick={() => { setResult(null); setActiveNode(null); }}
                  style={{ marginLeft: "auto", background: "none", border: "none", fontSize: 18, color: "#bbb", cursor: "pointer" }}>✕</button>
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 2, color: "#444", whiteSpace: "pre-wrap" }}>
                {result.text}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
