import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw, Eye, Grid } from 'lucide-react';
import './ComicGenerator.css';

// 技术系统 - 从SVG示例中提取
const mangaTechniques = [
    {
        name: "速度线 Speed Lines",
        type: "line",
        render: (ctx, width, height) => {
            const lineCount = 5 + Math.floor(Math.random() * 10);
            const startX = width * 0.3;
            const startY = height * 0.3;
            const endX = width * 0.7;
            const endY = height * 0.7;

            for (let i = 0; i < lineCount; i++) {
                const offsetX = Math.random() * width * 0.3;
                const offsetY = Math.random() * height * 0.2;
                const strokeWidth = 0.5 + Math.random() * 2;

                ctx.beginPath();
                ctx.moveTo(startX + offsetX, startY + offsetY);
                ctx.lineTo(endX + offsetX, endY + offsetY);
                ctx.strokeStyle = "black";
                ctx.lineWidth = strokeWidth;
                ctx.stroke();
            }
        }
    },
    {
        name: "二分光影 Two-tone",
        type: "shading",
        render: (ctx, width, height) => {
            // Character outline
            ctx.beginPath();
            ctx.arc(width / 2, height * 0.4, width * 0.15, 0, Math.PI * 2);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Features
            ctx.beginPath();
            ctx.ellipse(width * 0.45, height * 0.35, width * 0.02, height * 0.03, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.ellipse(width * 0.55, height * 0.35, width * 0.02, height * 0.03, 0, 0, Math.PI * 2);
            ctx.fill();

            // Mouth
            ctx.beginPath();
            ctx.moveTo(width * 0.45, height * 0.45);
            ctx.quadraticCurveTo(width / 2, height * 0.48, width * 0.55, height * 0.45);
            ctx.stroke();

            // Shading
            ctx.beginPath();
            ctx.moveTo(width * 0.3, height * 0.4);
            ctx.quadraticCurveTo(width / 2, height * 0.3, width * 0.7, height * 0.4);
            ctx.lineTo(width * 0.7, height * 0.7);
            ctx.lineTo(width * 0.3, height * 0.7);
            ctx.closePath();
            ctx.fillStyle = "#e0e0e0";
            ctx.fill();
        }
    },
    {
        name: "特写表情 Expression",
        type: "closeup",
        render: (ctx, width, height) => {
            // Face outline
            ctx.beginPath();
            ctx.ellipse(width / 2, height / 2, width * 0.3, height * 0.35, 0, 0, Math.PI * 2);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Shocked eyes
            ctx.beginPath();
            ctx.ellipse(width * 0.4, height * 0.4, width * 0.05, height * 0.08, 0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(width * 0.6, height * 0.4, width * 0.05, height * 0.08, 0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(width * 0.4, height * 0.4, width * 0.02, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.arc(width * 0.6, height * 0.4, width * 0.02, 0, Math.PI * 2);
            ctx.fill();

            // Sweat drop
            ctx.beginPath();
            ctx.moveTo(width * 0.7, height * 0.35);
            ctx.quadraticCurveTo(width * 0.72, height * 0.45, width * 0.65, height * 0.5);
            ctx.stroke();

            ctx.beginPath();
            ctx.ellipse(width * 0.7, height * 0.35, width * 0.02, height * 0.03, 0, 0, Math.PI * 2);
            ctx.fillStyle = "#d0d0d0";
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
    },
    {
        name: "声效字 Sound FX",
        type: "text",
        render: (ctx, width, height) => {
            const sounds = ["ドガ!", "バン!", "ザザ", "ドド", "ボン!", "ガシャーン!"];
            const randomSound = sounds[Math.floor(Math.random() * sounds.length)];

            ctx.save();
            ctx.translate(width * 0.5, height * 0.5);
            ctx.rotate(-0.1);
            ctx.font = `bold ${width * 0.15}px Arial`;
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(randomSound, 0, 0);
            ctx.restore();

            // Impact circles
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, width * 0.3, 0, Math.PI * 2);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 0.5;
            ctx.setLineDash([2, 2]);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(width / 2, height / 2, width * 0.2, 0, Math.PI * 2);
            ctx.stroke();

            ctx.setLineDash([]);
        }
    },
    {
        name: "分格过渡 Transition",
        type: "panel",
        render: (ctx, width, height) => {
            // Multiple panels
            const panelSize = Math.min(width, height) * 0.4;

            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;

            // Panel 1
            ctx.strokeRect(width * 0.2, height * 0.2, panelSize, panelSize);

            // Panel 2
            ctx.strokeRect(width * 0.6, height * 0.2, panelSize, panelSize);

            // Panel 3
            ctx.strokeRect(width * 0.2, height * 0.7, panelSize * 2, panelSize * 0.6);

            // Character in motion
            ctx.beginPath();
            ctx.arc(width * 0.2 + panelSize * 0.5, height * 0.2 + panelSize * 0.5, panelSize * 0.25, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(width * 0.6 + panelSize * 0.5, height * 0.2 + panelSize * 0.5, panelSize * 0.25, 0, Math.PI * 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(width * 0.2 + panelSize, height * 0.7 + panelSize * 0.3, panelSize * 0.25, 0, Math.PI * 2);
            ctx.stroke();

            // Motion lines
            ctx.beginPath();
            ctx.moveTo(width * 0.2 + panelSize * 0.75, height * 0.2 + panelSize * 0.5);
            ctx.lineTo(width * 0.6 + panelSize * 0.25, height * 0.2 + panelSize * 0.5);
            ctx.setLineDash([2, 2]);
            ctx.lineWidth = 0.5;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(width * 0.6 + panelSize * 0.5, height * 0.2 + panelSize * 0.75);
            ctx.lineTo(width * 0.2 + panelSize, height * 0.7 + panelSize * 0.05);
            ctx.stroke();

            ctx.setLineDash([]);
        }
    },
    {
        name: "对话框 Dialogue",
        type: "text",
        render: (ctx, width, height) => {
            // Character sketch
            ctx.beginPath();
            ctx.arc(width * 0.3, height * 0.6, width * 0.1, 0, Math.PI * 2);
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(width * 0.3, height * 0.7);
            ctx.lineTo(width * 0.3, height * 0.85);
            ctx.stroke();

            // Dialogue balloon
            ctx.beginPath();
            ctx.moveTo(width * 0.4, height * 0.4);
            ctx.quadraticCurveTo(width * 0.6, height * 0.35, width * 0.7, height * 0.4);
            ctx.quadraticCurveTo(width * 0.75, height * 0.5, width * 0.7, height * 0.6);
            ctx.quadraticCurveTo(width * 0.55, height * 0.65, width * 0.4, height * 0.6);
            ctx.quadraticCurveTo(width * 0.35, height * 0.5, width * 0.4, height * 0.4);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.stroke();

            // Speech pointer
            ctx.beginPath();
            ctx.moveTo(width * 0.4, height * 0.575);
            ctx.lineTo(width * 0.35, height * 0.625);
            ctx.lineTo(width * 0.375, height * 0.575);
            ctx.fill();
            ctx.stroke();

            // Text
            const texts = ["なるほど!", "本当に?", "まさか!", "そうか!", "えええ?"];
            const randomText = texts[Math.floor(Math.random() * texts.length)];

            ctx.font = `${width * 0.06}px Arial`;
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(randomText, width * 0.55, height * 0.5);
        }
    },
    {
        name: "环境细节 Environment",
        type: "background",
        render: (ctx, width, height) => {
            // Window frame
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(width * 0.2, height * 0.3, width * 0.6, height * 0.5);

            // Window dividers
            ctx.beginPath();
            ctx.moveTo(width * 0.5, height * 0.3);
            ctx.lineTo(width * 0.5, height * 0.8);
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(width * 0.2, height * 0.55);
            ctx.lineTo(width * 0.8, height * 0.55);
            ctx.stroke();

            // Outside view - simple landscape
            ctx.beginPath();
            ctx.moveTo(width * 0.2, height * 0.55);
            ctx.lineTo(width * 0.3, height * 0.45);
            ctx.lineTo(width * 0.5, height * 0.5);
            ctx.lineTo(width * 0.7, height * 0.4);
            ctx.lineTo(width * 0.8, height * 0.55);
            ctx.lineWidth = 1;
            ctx.stroke();

            // Tree silhouette
            ctx.beginPath();
            ctx.moveTo(width * 0.4, height * 0.55);
            ctx.quadraticCurveTo(width * 0.4, height * 0.7, width * 0.5, height * 0.75);
            ctx.quadraticCurveTo(width * 0.6, height * 0.7, width * 0.6, height * 0.55);
            ctx.stroke();
        }
    },
    {
        name: "冲击动作 Impact",
        type: "action",
        render: (ctx, width, height) => {
            // Impact center
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, width * 0.03, 0, Math.PI * 2);
            ctx.fillStyle = "black";
            ctx.fill();

            // Impact lines radiating
            const lineCount = 6;
            const angleStep = (Math.PI * 2) / lineCount;
            const lineLength = width * 0.3;

            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";

            for (let i = 0; i < lineCount; i++) {
                const angle = i * angleStep;
                ctx.beginPath();
                ctx.moveTo(width / 2, height / 2);
                ctx.lineTo(
                    width / 2 + Math.cos(angle) * lineLength,
                    height / 2 + Math.sin(angle) * lineLength
                );
                ctx.stroke();
            }
        }
    },
    {
        name: "情感对比 Contrast",
        type: "emotion",
        render: (ctx, width, height) => {
            // Split panel
            ctx.beginPath();
            ctx.moveTo(width / 2, 0);
            ctx.lineTo(width / 2, height);
            ctx.setLineDash([4, 4]);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.stroke();
            ctx.setLineDash([]);

            // Happy face
            ctx.beginPath();
            ctx.arc(width * 0.25, height / 2, width * 0.15, 0, Math.PI * 2);
            ctx.lineWidth = 1;
            ctx.stroke();

            // Smiling eyes
            ctx.beginPath();
            ctx.moveTo(width * 0.2, height * 0.425);
            ctx.lineTo(width * 0.23, height * 0.45);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(width * 0.3, height * 0.425);
            ctx.lineTo(width * 0.27, height * 0.45);
            ctx.stroke();

            // Smile
            ctx.beginPath();
            ctx.moveTo(width * 0.2, height * 0.55);
            ctx.quadraticCurveTo(width * 0.25, height * 0.6, width * 0.3, height * 0.55);
            ctx.stroke();

            // Angry face
            ctx.beginPath();
            ctx.arc(width * 0.75, height / 2, width * 0.15, 0, Math.PI * 2);
            ctx.stroke();

            // Angry eyes
            ctx.beginPath();
            ctx.moveTo(width * 0.7, height * 0.45);
            ctx.lineTo(width * 0.73, height * 0.425);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(width * 0.8, height * 0.45);
            ctx.lineTo(width * 0.77, height * 0.425);
            ctx.stroke();

            // Straight mouth
            ctx.beginPath();
            ctx.moveTo(width * 0.7, height * 0.55);
            ctx.lineTo(width * 0.8, height * 0.55);
            ctx.stroke();
        }
    },
    {
        name: "剪影表现 Silhouette",
        type: "shading",
        render: (ctx, width, height) => {
            // Background
            ctx.fillStyle = "#f0f0f0";
            ctx.fillRect(width * 0.1, height * 0.2, width * 0.8, height * 0.6);

            // Character silhouette
            ctx.beginPath();
            ctx.moveTo(width / 2, height * 0.2);
            ctx.lineTo(width * 0.55, height * 0.3);
            ctx.lineTo(width / 2, height * 0.7);
            ctx.lineTo(width * 0.45, height * 0.3);
            ctx.closePath();
            ctx.fillStyle = "black";
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(width * 0.3, height * 0.3);
            ctx.quadraticCurveTo(width / 2, height * 0.25, width * 0.7, height * 0.3);
            ctx.lineTo(width * 0.65, height * 0.5);
            ctx.quadraticCurveTo(width / 2, height * 0.45, width * 0.35, height * 0.5);
            ctx.closePath();
            ctx.fill();
        }
    },
    {
        name: "象征元素 Symbolism",
        type: "symbol",
        render: (ctx, width, height) => {
            // Triangle
            ctx.beginPath();
            ctx.moveTo(width * 0.3, height * 0.3);
            ctx.lineTo(width * 0.5, height * 0.3);
            ctx.lineTo(width * 0.4, height * 0.6);
            ctx.closePath();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "black";
            ctx.stroke();

            // Circle
            ctx.beginPath();
            ctx.arc(width * 0.7, height * 0.45, width * 0.1, 0, Math.PI * 2);
            ctx.lineWidth = 1.5;
            ctx.stroke();

            // Curve
            ctx.beginPath();
            ctx.moveTo(width * 0.3, height * 0.7);
            ctx.quadraticCurveTo(width * 0.45, height * 0.4, width * 0.6, height * 0.7);
            ctx.lineWidth = 1;
            ctx.stroke();

            // Vertical line
            ctx.beginPath();
            ctx.moveTo(width * 0.7, height * 0.2);
            ctx.lineTo(width * 0.7, height * 0.7);
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    },
    {
        name: "视觉隐喻 Metaphor",
        type: "symbol",
        render: (ctx, width, height) => {
            // Cracked glass effect
            ctx.beginPath();
            ctx.moveTo(width * 0.3, height * 0.3);
            ctx.lineTo(width * 0.5, height * 0.5);
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(width * 0.7, height * 0.3);
            ctx.lineTo(width * 0.5, height * 0.5);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(width * 0.5, height * 0.5);
            ctx.lineTo(width * 0.5, height * 0.7);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(width * 0.4, height * 0.4);
            ctx.lineTo(width * 0.6, height * 0.4);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(width * 0.4, height * 0.6);
            ctx.lineTo(width * 0.6, height * 0.6);
            ctx.stroke();

            // Subtle curve
            ctx.beginPath();
            ctx.moveTo(width * 0.75, height * 0.4);
            ctx.quadraticCurveTo(width * 0.85, height * 0.5, width * 0.75, height * 0.6);
            ctx.setLineDash([1, 1]);
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.setLineDash([]);

            // Symbolic circle
            ctx.beginPath();
            ctx.arc(width * 0.8, height * 0.5, width * 0.05, 0, Math.PI * 2);
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
    }
];

// 面板布局配置 - 从DeepSeek的建议中选出20种最有代表性的布局
const panelLayouts = [
    // 标准3×4布局（12格）
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    // 强调型3×4布局
    [
        [2, 1],
        [1, 1, 1],
        [1, 2],
        [1, 1, 1]
    ],
    // 重点突出型3×4布局
    [
        [3],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ],
    // 中部焦点型3×4布局
    [
        [1, 1, 1],
        [3],
        [1, 1, 1],
        [1, 1, 1]
    ],
    // 结尾强调型3×4布局
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [3]
    ],
    // 交错强调型3×4布局
    [
        [2, 1],
        [1, 2],
        [2, 1],
        [1, 1, 1]
    ],
    // 起承转合型3×4布局
    [
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [3]
    ],
    // 标准4×3布局（12格）
    [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
    ],
    // 上部双重焦点型4×3布局
    [
        [2, 2],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
    ],
    // 下部双重焦点型4×3布局
    [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [2, 2]
    ],
    // 交错节奏型4×3布局
    [
        [2, 1, 1],
        [1, 1, 2],
        [1, 2, 1]
    ],
    // 突出开场型布局
    [
        [4],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
    ],
    // 突出中场型布局
    [
        [1, 1, 1, 1],
        [4],
        [1, 1, 1, 1]
    ],
    // 突出结尾型布局
    [
        [1, 1, 1, 1],
        [1, 1, 1, 1],
        [4]
    ],
    // 日本漫画传统布局
    [
        [1, 1],
        [1, 1],
        [2],
        [1, 1, 1, 1]
    ],
    // 欧美漫画传统布局
    [
        [1, 1, 1],
        [2, 2],
        [1, 1, 1, 1],
        [3]
    ],
    // 情感爆发型布局
    [
        [2],
        [1, 1],
        [3],
        [1, 1, 1, 1]
    ],
    // 心理空间型布局
    [
        [1],
        [4],
        [1],
        [1, 1, 1]
    ],
    // 并行叙事型布局
    [
        [2, 2],
        [2, 2],
        [1, 1, 1, 1],
        [1, 1, 1, 1]
    ],
    // 螺旋叙事型布局
    [
        [1, 1, 1, 1],
        [1, 2, 1],
        [1, 2, 1],
        [1, 1, 1, 1]
    ]
];

// 根据DeepSeek建议添加的符号系统
const symbolSystem = [
    // 节奏控制符号
    "⏱️ 大格=情感焦点", "⏱️ 密集小格=时间减缓", "⏱️ 留白=心理停顿",
    "⏱️ 横向延伸=时间拉长", "⏱️ 竖向分割=同时发生", "⏱️ 节奏断裂=情绪转变",

    // 视线流动符号
    "➡️ 左上至右下=顺畅", "➡️ 右上至左下=阻力", "➡️ 环形布局=循环事件",
    "➡️ Z字形视线=紧张感", "➡️ 中心辐射=关键时刻", "➡️ 螺旋式布局=深入内心",

    // 空间切割符号
    "◯→◯ 循环事件结构", "⤵️↗️ 对角线动态冲突", "▦▦▦ 密集情报区",
    "◫◫◫ 视觉层次递进", "▣▢▣ 虚实交替空间", "□□□ 平行事件线",

    // 情感表达符号
    "💢 对比鲜明=内心冲突", "💧 渐变过渡=情绪流动", "✨ 突破边框=爆发点",
    "⚡ 斜线切割=心理裂痕", "🔄 重复元素=心理强调", "⚫ 留白环绕=孤立感",

    // 特写技巧符号
    "👁️ 瞳孔特写=心理窗口", "👄 嘴角微动=情绪暗示", "👋 手部动作=性格展示",
    "👣 脚步特写=心理状态", "💭 物品特写=隐喻象征", "⌚ 时间指示物=转折点",

    // 转场技巧符号
    "🔀 黑白交替=时空转换", "🔁 重复元素=记忆闪回", "⏳ 形状变形=现实扭曲",
    "🌓 明暗对比=内外世界", "🧩 碎片拼接=记忆碎片", "🌊 流动线条=意识流动"
];

// 布局分类 - 从DeepSeek的分类中提取
const layoutCategories = [
    { name: "标准布局", indexes: [0, 7] },
    { name: "焦点强调型", indexes: [2, 3, 4, 11, 12, 13] },
    { name: "交错对比型", indexes: [1, 5, 10] },
    { name: "情感爆发型", indexes: [6, 16] },
    { name: "心理空间型", indexes: [17] },
    { name: "叙事转换型", indexes: [8, 9, 14, 15, 18, 19] }
];

// 布局应用场景 - 参考DeepSeek的建议
const layoutSuggestions = [
    "适合稳定叙事节奏，均匀展示场景与对话",
    "适合有起伏的对话场景，重点在左上角和右中位置",
    "适合突出开场震撼画面或关键场景",
    "适合展示中间过程的重要转折",
    "适合戏剧性结尾或悬念设置",
    "适合多个角色互动的场景",
    "适合完整故事弧的单页表现",
    "适合平稳叙事节奏，横向展示场景",
    "适合上部有核心对话或关键场景",
    "适合下部有结论或关键反转",
    "适合不规则节奏，创造视觉变化",
    "适合以全景开场后细化展开",
    "适合中间高潮，前后铺垫",
    "适合最后高潮或情感爆发",
    "适合日本漫画风格的节奏控制",
    "适合美漫风格的宏大场景与细节",
    "适合情感爆发与释放的表现",
    "适合表现角色内心世界",
    "适合同时展示两条叙事线",
    "适合环形叙事结构"
];

// 灵感提示库 - 基于DeepSeek的分类
const inspirationPrompts = {
    // 动作场景提示
    action: [
        "冲突爆发", "转身逃跑", "突然坠落", "迎面相撞", "手指轻触", "攻击姿态",
        "眼神对决", "跃起瞬间", "伸手阻拦", "意外发现", "第一次接触", "最后一击",
        "突然出现", "慢动作变化", "撞击瞬间", "疯狂奔跑", "极限闪避", "力量对抗",
        "奋力推开", "不可思议的跳跃", "光影交错", "意外跌倒", "毫厘之差", "爆发时刻"
    ],

    // 情感表达提示
    emotion: [
        "震惊表情", "无声哭泣", "怒火中烧", "欢笑爆发", "痛苦挣扎", "恍然大悟",
        "悲伤低垂", "内心碎裂", "嘴角微笑", "眼神变化", "表情凝固", "懊悔低头",
        "满脸通红", "眼泪滑落", "牙关紧咬", "眉头紧锁", "得意微笑", "内心独白",
        "瞳孔放大", "快乐旋转", "哽咽瞬间", "若有所思", "目光躲闪", "意外惊喜"
    ],

    // 转场技巧提示
    transition: [
        "时空转换", "视角变化", "场景切换", "梦境进入", "记忆闪回", "镜像反射",
        "分屏对比", "时间跳跃", "黑白交替", "光影变幻", "远近转换", "平行展示",
        "焦点转移", "心声独白", "虚实交错", "过去未来", "倒影映射", "视野拉远",
        "急速拉近", "一息之间", "时间静止", "多重视角", "若隐若现", "意识流动"
    ],

    // 氛围营造提示
    atmosphere: [
        "雨中倾谈", "黄昏背影", "灯光之下", "风中凌乱", "窗外景象", "阴影处的",
        "孤影摇曳", "繁星之下", "拥挤人潮", "空无一人", "秘密角落", "走廊尽头",
        "光线倾泻", "雾气弥漫", "黑暗深处", "明暗对比", "寂静空间", "高处俯瞰",
        "水面倒影", "地底秘密", "城市之巅", "荒野广阔", "困境绝境", "安全之所"
    ],

    // 细节表现提示
    detail: [
        "手指细节", "眼神交汇", "物品特写", "关键证据", "象征符号", "隐藏线索",
        "伤痕展示", "轻微变化", "背景细节", "关键按钮", "神秘标记", "意义重大的小物件",
        "时间指示", "关键文字", "细微表情", "手部动作", "掉落之物", "易被忽视的角落",
        "最后一页", "第一线索", "双重含义", "暗示未来", "过去痕迹", "关键转折"
    ],

    // 构图技巧提示
    composition: [
        "中心构图", "三分法则", "对角线张力", "框架套叠", "左右平衡", "上下对称",
        "黄金分割", "空间留白", "前景框架", "背景对比", "透视深度", "水平线引导",
        "垂直线肃穆", "斜线动感", "环形和谐", "重复节奏", "放射状注目", "曲线柔和",
        "色块分割", "明暗对比", "大小对比", "疏密变化", "虚实层次", "主次关系"
    ],

    // 新增：对白对话框提示
    dialogue: [
        "震惊对白", "喃喃自语", "愤怒斥责", "温柔安慰", "幽默调侃", "严肃训诫",
        "疑问探寻", "畅想未来", "回忆往事", "内心独白", "群体讨论", "意外告白",
        "重要宣告", "秘密低语", "无声表达", "强调重复", "关键说明", "背景对话"
    ],

    // 新增：分格技巧提示
    panels: [
        "横向延展", "纵向延伸", "交叠面板", "不规则边框", "破框而出", "页面通透",
        "视角切换", "时间延展", "速度线条", "同步并行", "碎片拼接", "画中画效果",
        "焦点放大", "多重视角", "漏斗式聚焦", "放射状分格", "交错时序", "层次分隔"
    ],

    // 新增：声效字提示
    soundfx: [
        "巨大爆炸", "急促脚步", "玻璃碎裂", "金属撞击", "雷鸣闪电", "风声呼啸",
        "低声窃语", "心跳加速", "刺耳尖叫", "沉重呼吸", "流水潺潺", "门扉吱呀",
        "电子嗡鸣", "沉闷撞击", "枪弹出膛", "纸张翻动", "机械运转", "刀剑出鞘"
    ],

    // 新增：注解技巧提示
    annotation: [
        "背景说明", "时间标记", "地点指示", "人物介绍", "情绪说明", "关键提示",
        "事件前情", "意义解释", "物品说明", "能力解析", "历史回顾", "未来暗示",
        "旁白叙述", "科学解释", "文化背景", "角色思考", "场景转换", "故事节点"
    ],

    // 新增：角色表演提示
    acting: [
        "微妙表情", "肢体语言", "目光交流", "姿势变化", "情绪变迁", "性格体现",
        "关系展示", "地位对比", "年龄差异", "身份暗示", "心理变化", "习惯动作",
        "职业特征", "情感流露", "主次关系", "角色对立", "互动反应", "个性突出"
    ]
};

// Canvas渲染函数 - 将漫画技术绘制到canvas上
const renderTechniqueToCanvas = (canvas, technique) => {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // 清空画布
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // 绘制技术效果
    technique.render(ctx, width, height);

    return canvas;
};

// 主组件
const EnrichedComicGenerator = () => {
    const totalPages = 34; // 用户要求的34页

    const [currentPage, setCurrentPage] = useState(0);
    const [layoutIndex, setLayoutIndex] = useState(0);
    const [showSymbols, setShowSymbols] = useState(true);
    const [viewMode, setViewMode] = useState('standard'); // 'standard', 'rhythm'
    const [canvasRefs, setCanvasRefs] = useState([]);

    // 根据面板大小选择合适的提示类型
    const getPromptCategory = (size, rowIndex, colIndex, totalRows) => {
        // 分析面板位置和重要性
        const isFirstPanel = rowIndex === 0 && colIndex === 0;
        const isLastRow = rowIndex === totalRows - 1;
        const isCenter = Math.floor(totalRows / 2) === rowIndex;

        // 根据位置和大小选择提示类别
        if (size === 1) {
            if (isFirstPanel) {
                return 'transition';
            } else if (isLastRow) {
                return 'detail';
            } else {
                return Math.random() > 0.5 ? 'detail' : 'emotion';
            }
        } else if (size === 2) {
            if (isCenter) {
                return 'emotion';
            } else {
                return Math.random() > 0.5 ? 'action' : 'composition';
            }
        } else if (size === 3) {
            return Math.random() > 0.5 ? 'atmosphere' : 'transition';
        } else {
            return Math.random() > 0.6 ? 'atmosphere' : 'action';
        }
    };

    // 为特定布局生成随机提示和技术
    const generatePromptsForLayout = (layoutIdx) => {
        const layout = panelLayouts[layoutIdx];
        const prompts = [];
        const techniques = [];

        layout.forEach((row, rowIndex) => {
            row.forEach((panelSize, colIndex) => {
                const category = getPromptCategory(panelSize, rowIndex, colIndex, layout.length);
                const selectedPrompts = inspirationPrompts[category];
                const prompt = {
                    text: selectedPrompts[Math.floor(Math.random() * selectedPrompts.length)],
                    category: category
                };
                prompts.push(prompt);

                // 为每个面板选择一个随机的漫画技术
                let techniqueType;
                switch (category) {
                    case 'action':
                        techniqueType = ['action', 'line', 'impact'];
                        break;
                    case 'emotion':
                        techniqueType = ['emotion', 'closeup', 'contrast'];
                        break;
                    case 'transition':
                        techniqueType = ['panel', 'transition', 'symbol'];
                        break;
                    case 'detail':
                        techniqueType = ['detail', 'closeup', 'shading'];
                        break;
                    case 'atmosphere':
                        techniqueType = ['background', 'shading', 'panel'];
                        break;
                    case 'dialogue':
                        techniqueType = ['text', 'dialogue'];
                        break;
                    case 'soundfx':
                        techniqueType = ['text', 'sound'];
                        break;
                    default:
                        techniqueType = ['line', 'symbol', 'shading'];
                }

                // 过滤符合类型的技术
                const filteredTechniques = mangaTechniques.filter(tech =>
                    techniqueType.includes(tech.type)
                );

                // 随机选择一个技术
                const randomTechnique = filteredTechniques[Math.floor(Math.random() * filteredTechniques.length)];
                techniques.push(randomTechnique);
            });
        });

        return { prompts, techniques };
    };

    // 生成随机符号提示
    const generateSymbolsForLayout = () => {
        // 随机选择3个符号作为提示
        const selected = [];
        while (selected.length < 3) {
            const randomIndex = Math.floor(Math.random() * symbolSystem.length);
            if (!selected.includes(symbolSystem[randomIndex])) {
                selected.push(symbolSystem[randomIndex]);
            }
        }
        return selected;
    };

    // 初始化页面数据
    const [pageData, setPageData] = useState(
        Array(totalPages).fill().map(() =>
            Array(panelLayouts.length).fill().map((_, layoutIdx) => {
                const { prompts, techniques } = generatePromptsForLayout(layoutIdx);
                return {
                    prompts,
                    techniques,
                    symbols: generateSymbolsForLayout()
                };
            })
        )
    );

    // 重新生成提示
    const regeneratePrompts = () => {
        const newPageData = [...pageData];
        const { prompts, techniques } = generatePromptsForLayout(layoutIndex);
        newPageData[currentPage][layoutIndex] = {
            prompts,
            techniques,
            symbols: generateSymbolsForLayout()
        };
        setPageData(newPageData);
    };

    // 在组件挂载后设置canvas引用并渲染
    useEffect(() => {
        if (canvasRefs.length > 0) {
            renderAllPanels();
        }
    }, [canvasRefs, currentPage, layoutIndex, pageData]);

    // 在布局或页面变化时更新canvas引用数组
    useEffect(() => {
        const currentLayout = panelLayouts[layoutIndex];
        let totalPanels = 0;

        currentLayout.forEach(row => {
            totalPanels += row.length;
        });

        setCanvasRefs(Array(totalPanels).fill().map(() => React.createRef()));
    }, [layoutIndex, currentPage]);

    // 渲染所有面板的canvas
    const renderAllPanels = () => {
        const currentTechniques = pageData[currentPage][layoutIndex].techniques;

        canvasRefs.forEach((ref, index) => {
            if (ref.current && currentTechniques[index]) {
                renderTechniqueToCanvas(ref.current, currentTechniques[index]);
            }
        });
    };

    // 导航函数
    const goToNextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages);
    const goToPrevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    const goToNextLayout = () => setLayoutIndex((prev) => (prev + 1) % panelLayouts.length);
    const goToPrevLayout = () => setLayoutIndex((prev) => (prev - 1 + panelLayouts.length) % panelLayouts.length);

    // 切换视图模式
    const toggleViewMode = () => {
        setViewMode(viewMode === 'standard' ? 'rhythm' : 'standard');
    };

    // 当前数据
    const currentLayout = panelLayouts[layoutIndex];
    const currentPageData = pageData[currentPage][layoutIndex];
    const currentPrompts = currentPageData.prompts;
    const currentTechniques = currentPageData.techniques;
    const currentSymbols = currentPageData.symbols;

    // 追踪提示索引
    let promptIndex = 0;
    let canvasIndex = 0;

    // 找到当前布局的分类
    const currentCategory = layoutCategories.find(cat =>
        cat.indexes.includes(layoutIndex))?.name || "标准布局";

    // 获取面板颜色 (用于节奏视图)
    const getPanelColor = (panelSize) => {
        if (viewMode !== 'rhythm') {
            return 'bg-gray-50';
        }

        // 基于面板大小着色，显示节奏
        if (panelSize === 1) return 'bg-blue-100';
        if (panelSize === 2) return 'bg-blue-200';
        if (panelSize === 3) return 'bg-blue-300';
        return 'bg-blue-400';
    };

    // 获取提示类别颜色
    const getCategoryColor = (category) => {
        const colors = {
            'detail': 'text-yellow-600',
            'emotion': 'text-red-600',
            'action': 'text-orange-600',
            'transition': 'text-purple-600',
            'atmosphere': 'text-blue-600',
            'composition': 'text-green-600',
            'dialogue': 'text-sky-600',
            'panels': 'text-gray-600',
            'soundfx': 'text-pink-600',
            'annotation': 'text-amber-600',
            'acting': 'text-teal-600'
        };
        return colors[category] || 'text-gray-600';
    };

    // 获取提示类别中文名称
    const getCategoryName = (category) => {
        const names = {
            'detail': '细节表现',
            'emotion': '情感表达',
            'action': '动作场景',
            'transition': '转场技巧',
            'atmosphere': '氛围营造',
            'composition': '构图技巧',
            'dialogue': '对白对话框',
            'panels': '分格技巧',
            'soundfx': '声效字',
            'annotation': '注解技巧',
            'acting': '角色表演'
        };
        return names[category] || category;
    };

    // 获取面板跨度类名，根据窗口大小调整
    const getPanelColSpan = (panelSize) => {
        // 在小屏幕上，每个面板都占据更多空间
        if (windowSize.width < 640) {
            if (panelSize === 1) return "col-span-12"; // 小屏幕上1单位面板占整行
            if (panelSize === 2) return "col-span-12"; // 小屏幕上2单位面板占整行
            if (panelSize === 3) return "col-span-12"; // 小屏幕上3单位面板占整行
        } else if (windowSize.width < 1024) {
            if (panelSize === 1) return "col-span-6"; // 中等屏幕上1单位面板占半行
            if (panelSize === 2) return "col-span-12"; // 中等屏幕上2单位面板占整行
            if (panelSize === 3) return "col-span-12"; // 中等屏幕上3单位面板占整行
        } else {
            if (panelSize === 1) return "col-span-4"; // 大屏幕上1单位面板占1/3行
            if (panelSize === 2) return "col-span-8"; // 大屏幕上2单位面板占2/3行
            if (panelSize === 3) return "col-span-12"; // 大屏幕上3单位面板占整行
        }
        return "col-span-12"; // 默认为更大尺寸
    };

    // 窗口大小响应式处理
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    // 监听窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 根据窗口大小调整布局
    const getResponsiveClasses = () => {
        if (windowSize.width < 640) {
            return {
                container: "p-2",
                title: "text-xl",
                controls: "gap-1 flex-col",
                panels: "p-2",
                infoBox: "p-2"
            };
        } else if (windowSize.width < 1024) {
            return {
                container: "p-3",
                title: "text-xl",
                controls: "gap-2",
                panels: "p-3",
                infoBox: "p-2"
            };
        } else {
            return {
                container: "p-4",
                title: "text-2xl",
                controls: "gap-2",
                panels: "p-4",
                infoBox: "p-3"
            };
        }
    };

    const responsiveClasses = getResponsiveClasses();

    return (
        <div className={`flex flex-col items-center ${responsiveClasses.container} bg-gray-100 min-h-screen`}>
            <h1 className={`${responsiveClasses.title} font-bold mb-2`}>符号驱动型漫画分镜生成器</h1>
            <p className="text-sm text-gray-600 mb-4">基于符号系统的灵感触发工具 - 第 {currentPage + 1}/{totalPages} 页</p>

            {/* 控制按钮 */}
            <div className={`mb-4 flex flex-wrap items-center ${responsiveClasses.controls} justify-center`}>
                {/* 页面导航 */}
                <div className="flex items-center">
                    <button
                        onClick={goToPrevPage}
                        className="bg-blue-500 text-white p-2 rounded-l-lg hover:bg-blue-600"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="px-3 py-2 bg-white border border-gray-300 text-sm">
                        页面 {currentPage + 1}/{totalPages}
                    </span>
                    <button
                        onClick={goToNextPage}
                        className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* 布局导航 */}
                <div className="flex items-center">
                    <button
                        onClick={goToPrevLayout}
                        className="bg-purple-500 text-white p-2 rounded-l-lg hover:bg-purple-600"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="px-3 py-2 bg-white border border-gray-300 text-sm whitespace-nowrap">
                        布局 {layoutIndex + 1}/{panelLayouts.length}
                    </span>
                    <button
                        onClick={goToNextLayout}
                        className="bg-purple-500 text-white p-2 rounded-r-lg hover:bg-purple-600"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                {/* 重新生成按钮 */}
                <button
                    onClick={regeneratePrompts}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 flex items-center gap-1"
                >
                    <RefreshCw size={16} />
                    <span>重新生成提示</span>
                </button>

                {/* 符号显示切换 */}
                <button
                    onClick={() => setShowSymbols(!showSymbols)}
                    className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 flex items-center gap-1"
                >
                    <Eye size={16} />
                    <span>{showSymbols ? '隐藏符号' : '显示符号'}</span>
                </button>

                {/* 视图模式切换 */}
                <button
                    onClick={toggleViewMode}
                    className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 flex items-center gap-1"
                >
                    <Grid size={16} />
                    <span>{viewMode === 'standard' ? '节奏视图' : '标准视图'}</span>
                </button>
            </div>

            {/* 布局信息 */}
            <div className={`mb-4 w-full max-w-4xl bg-white border border-gray-200 rounded-lg ${responsiveClasses.infoBox}`}>
                <div className="flex flex-wrap gap-2 justify-between">
                    <div>
                        <span className="font-semibold">布局类型:</span>
                        <span className="ml-2 text-purple-600">{currentCategory}</span>
                    </div>
                    <div>
                        <span className="font-semibold">适用场景:</span>
                        <span className="ml-2 text-blue-600">{layoutSuggestions[layoutIndex]}</span>
                    </div>
                </div>

                {/* 符号提示 */}
                {showSymbols && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="font-semibold">建议符号:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {currentSymbols.map((symbol, idx) => (
                                <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">{symbol}</span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* 主内容: 布局网格 */}
            <div className={`w-full max-w-4xl bg-white border border-gray-300 rounded-lg ${responsiveClasses.panels} mb-4`}>
                {currentLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-12 gap-2 mb-2">
                        {row.map((panelSize, colIndex) => {
                            const prompt = currentPrompts[promptIndex++];
                            const technique = currentTechniques[canvasIndex];
                            const canvasRef = canvasRefs[canvasIndex++];
                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`${getPanelColSpan(panelSize)} border border-gray-300 rounded ${getPanelColor(panelSize)} p-2 flex flex-col items-center justify-center min-h-24`}
                                >
                                    {/* 技术预览 */}
                                    <div className="w-full mb-2 relative" style={{ height: panelSize === 1 ? '80px' : panelSize === 2 ? '120px' : '180px' }}>
                                        <canvas
                                            ref={canvasRef}
                                            width={200}
                                            height={200}
                                            className="w-full h-full object-contain border border-gray-200"
                                        />
                                        <div className="absolute top-1 left-1 bg-gray-800 bg-opacity-60 text-white text-xs px-1 rounded">
                                            {technique?.name || "漫画技法"}
                                        </div>
                                    </div>

                                    {/* 提示文本 */}
                                    <p className={`text-center ${getCategoryColor(prompt.category)} text-sm`}>
                                        {prompt.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* 提示分类图例 */}
            <div className={`w-full max-w-4xl bg-white border border-gray-200 rounded-lg ${responsiveClasses.infoBox} mt-6`}>
                <p className="font-semibold mb-2">提示分类:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                    {Object.keys(inspirationPrompts).map(category => (
                        <div key={category} className="border rounded p-2 bg-gray-50">
                            <div className="flex items-center">
                                <span className={`inline-block w-3 h-3 rounded-full mr-2 ${getCategoryColor(category).replace('text-', 'bg-')}`}></span>
                                <span className={`font-medium ${getCategoryColor(category)} text-sm`}>{getCategoryName(category)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 漫画技术图例 */}
            <div className={`w-full max-w-4xl bg-white border border-gray-200 rounded-lg ${responsiveClasses.infoBox} mt-4`}>
                <p className="font-semibold mb-2">漫画技术:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                    {mangaTechniques.map((technique, index) => (
                        <div key={index} className="border rounded p-1 bg-gray-50 text-xs text-center">
                            {technique.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EnrichedComicGenerator;