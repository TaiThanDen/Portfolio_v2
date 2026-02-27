"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import skills, { type Skill } from "@/data/skills";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ══════════════════════════════════════════════════════════════
     CONFIGURATION — Chỉnh tất cả hiệu ứng ở đây
   ══════════════════════════════════════════════════════════════

*/
const CONFIG = {
  /* ┌─────────────────────────────────────────────────────────┐
     │  SPOTLIGHT — Vùng sáng lớn di chuyển theo con chuột     │
     │  (Đây là quầng sáng mờ nền, KHÔNG phải viền card)       │
     └─────────────────────────────────────────────────────────┘ */

  // 📐 Bán kính ảnh hưởng: card nằm trong bán kính này sẽ được "chiếu sáng"
  //    Tăng → nhiều card sáng cùng lúc | Giảm → chỉ card gần chuột mới sáng
  //    Khuyên: 200–400
  SPOTLIGHT_RADIUS: 300,

  // 📐 Kích thước vùng glow nền (đơn vị px)
  //    Tăng → quầng sáng nền to hơn | Giảm → quầng sáng nhỏ gọn
  //    Khuyên: 300–600
  SPOTLIGHT_SIZE: 500,

  // 🎨 Màu spotlight (dạng RGB, không có #)
  //    "255,255,255" = trắng | "140,255,46" = xanh lá | "100,150,255" = xanh dương
  SPOTLIGHT_COLOR: "255,255,255",

  // 💡 Độ sáng quầng sáng nền (0.0 = tắt, 1.0 = sáng nhất)
  //    Tăng → nền sáng rõ hơn | Giảm → nền tối hơn, tinh tế hơn
  //    Khuyên: 0.05–0.2
  SPOTLIGHT_INTENSITY: 0.2,

  // 🌫️ Độ mờ viền quầng sáng (px)
  //    Tăng → quầng sáng nền mềm mại, tán rộng | Giảm → sắc nét, tập trung
  //    Khuyên: 2–30
  SPOTLIGHT_BLUR: 4,

  /* ┌─────────────────────────────────────────────────────────┐
     │  CARD GENERAL — Cài đặt chung cho card                  │
     └─────────────────────────────────────────────────────────┘ */

  // 🔲 Opacity viền card tối thiểu (khi chuột ở xa, card ở trạng thái "tắt")
  //    Tăng → viền lúc nào cũng thấy | Giảm → viền gần như ẩn
  //    Khuyên: 0.04–0.1
  CARD_BORDER_MIN: 0.06,

  // 🔲 Opacity viền card tối đa (khi chuột ở ngay card)
  //    Tăng → viền sáng rực khi hover | Giảm → viền nhẹ nhàng
  //    Khuyên: 0.2–0.6
  CARD_BORDER_MAX: 0.9,

  // 🔲 Opacity nền card tối thiểu (trạng thái tắt)
  CARD_BG_MIN: 0.02,

  // 🔲 Opacity nền card tối đa (khi hover)
  CARD_BG_MAX: 0.06,

  /* ┌─────────────────────────────────────────────────────────┐
     │  BORDER REFLECTION — Ánh sáng phản chiếu trên VIỀN card │
     │  ⭐ Đây là hiệu ứng chính bạn yêu cầu                  │
     │  Khi di chuột, viền card sẽ sáng lên tại vị trí gần    │
     │  con chuột nhất, tạo cảm giác ánh sáng chiếu vào viền  │
     └─────────────────────────────────────────────────────────┘ */

  // 💡 Độ sáng tối đa của ánh sáng phản chiếu trên viền (0.0–1.0)
  //    Tăng → viền sáng rực rỡ | Giảm → viền nhẹ nhàng
  //    Khuyên: 0.4–1.0
  BORDER_REFLECT_INTENSITY: 2,

  // 📐 Kích thước vùng sáng trên viền (CSS value)
  //    Số nhỏ → điểm sáng nhỏ gọn, sắc nét | Số lớn → vùng sáng lan rộng
  //    Khuyên: "40%"–"80%"
  BORDER_REFLECT_SIZE: "80%",

  // 🎨 Dùng màu của skill hay màu trắng cho viền?
  //    true  → viền sáng theo màu skill (React = xanh, Vue = xanh lá...)
  //    false → viền luôn sáng trắng
  BORDER_REFLECT_USE_SKILL_COLOR: true,

  // 💡 Opacity màu skill trong viền (chỉ có tác dụng khi USE_SKILL_COLOR = true)
  //    Tăng → màu skill đậm hơn | Giảm → màu skill nhạt hơn
  //    Khuyên: 0.5–1.0
  BORDER_REFLECT_COLOR_OPACITY: 0.9,

  // 🔲 Viền phụ: độ sáng vòng sáng trắng bao quanh điểm sáng chính
  //    Tăng → có thêm viền trắng mờ xung quanh | 0 = tắt
  //    Khuyên: 0.0–0.3
  BORDER_REFLECT_WHITE_RING: 0.12,

  /* ┌─────────────────────────────────────────────────────────┐
     │  INNER GLOW — Ánh sáng mờ BÊN TRONG card               │
     │  (Nền card hơi sáng lên tại vị trí gần chuột)          │
     └─────────────────────────────────────────────────────────┘ */

  // 💡 Độ sáng inner glow (0.0 = tắt, 1.0 = sáng nhất)
  //    Tăng → nền card sáng rõ ràng | Giảm → chỉ thấy viền, nền tối
  //    Khuyên: 0.05–0.3
  INNER_GLOW_OPACITY: 0.15,

  // 📐 Kích thước vùng inner glow
  //    Nhỏ → điểm sáng nhỏ | Lớn → lan rộng ra cả card
  //    Khuyên: "40%"–"70%"
  INNER_GLOW_SIZE: "50%",

  // 💡 Opacity màu skill trong inner glow
  //    Tăng → màu nền đậm | Giảm → nhẹ nhàng
  //    Khuyên: 0.1–0.3
  INNER_GLOW_COLOR_OPACITY: 0.18,

  /* ┌─────────────────────────────────────────────────────────┐
     │  ICON — Biểu tượng skill trên card                      │
     └─────────────────────────────────────────────────────────┘ */

  // 🔅 Opacity icon khi chuột ở xa (trạng thái tắt)
  //    Tăng → icon lúc nào cũng thấy | Giảm → icon rất mờ
  //    Khuyên: 0.2–0.5
  ICON_DIM_OPACITY: 0.35,

  // 🎨 Màu icon khi chuột ở xa (hex)
  //    "#555" = xám trung | "#333" = xám tối | "#777" = xám sáng
  ICON_DIM_COLOR: "#555555",

  /* ┌─────────────────────────────────────────────────────────┐
     │  TEXT — Tên skill và category                            │
     └─────────────────────────────────────────────────────────┘ */

  // 🔅 Opacity tên skill khi tắt | 💡 Opacity khi hover
  NAME_DIM_OPACITY: 0.3,
  NAME_BRIGHT_OPACITY: 1.0,

  // 🔅 Opacity category khi tắt | 💡 Opacity khi hover
  CATEGORY_DIM_OPACITY: 0.15,
  CATEGORY_BRIGHT_OPACITY: 0.55,

  /* ┌─────────────────────────────────────────────────────────┐
     │  MOBILE — Cài đặt cho điện thoại                        │
     └─────────────────────────────────────────────────────────┘ */

  // 📱 Breakpoint: dưới giá trị này = chế độ mobile (px)
  MOBILE_BREAKPOINT: 768,

  // 📍 Vị trí X ánh sáng mobile (% từ trái)
  //    50 = chính giữa | 30 = lệch trái | 70 = lệch phải
  MOBILE_SPOTLIGHT_X_PERCENT: 50,

  // 🏃 Tốc độ ánh sáng theo scroll
  //    0.5 = chậm (ánh sáng ở giữa) | 1.0 = nhanh (theo sát scroll)
  MOBILE_SCROLL_SPEED: 0.8,
};

/* ─── Types ─── */
export interface ToolsAndTechnologiesProps {
  sectionLabel?: string;
  heading?: string;
  subheading?: string;
  items?: Skill[];
}

/* ─── Hex to RGB helper ─── */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 255, g: 255, b: 255 };
}

/* ─── Single skill card ─── */
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      data-skill-card
      data-skill-color={skill.color}
      className="relative rounded-xl p-px will-change-transform"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.05 * index, ease }}
      style={{
        background: `rgba(255, 255, 255, 0.06)`,
      }}
    >
      {/* Border reflection overlay — ánh sáng phản chiếu trên viền */}
      <div
        data-border-glow
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0"
        style={{ zIndex: 1 }}
      />

      {/* Inner card */}
      <div
        className="relative rounded-[11px] bg-[#161616] p-5 flex items-center gap-4 overflow-hidden"
        style={{ zIndex: 2 }}
      >
        {/* Inner glow — ánh sáng mờ bên trong card */}
        <div
          data-inner-glow
          className="pointer-events-none absolute inset-0 rounded-[11px] opacity-0"
          style={{ zIndex: 0 }}
        />

        {/* Icon */}
        <div className="relative z-10 shrink-0">
          <skill.icon
            data-icon
            size={36}
            style={{
              color: CONFIG.ICON_DIM_COLOR,
              filter: "grayscale(100%)",
              opacity: CONFIG.ICON_DIM_OPACITY,
            }}
          />
        </div>

        {/* Text */}
        <div className="relative z-10 min-w-0">
          <p
            data-name
            className="font-semibold text-sm md:text-base leading-tight truncate"
            style={{ color: `rgba(255, 255, 255, ${CONFIG.NAME_DIM_OPACITY})` }}
          >
            {skill.name}
          </p>
          <p
            data-category
            className="text-xs mt-0.5 truncate"
            style={{
              color: `rgba(255, 255, 255, ${CONFIG.CATEGORY_DIM_OPACITY})`,
            }}
          >
            {skill.category}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ─── */
export default function ToolsAndTechnologies({
  sectionLabel = "{03} — Tools & Technologies",
  heading = "Tools & Technologies",
  subheading = "My Skills",
  items = skills,
}: ToolsAndTechnologiesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const isInsideRef = useRef(false);
  const isMobileRef = useRef(false);

  /* ── Update all cards ── */
  const updateCards = useCallback(() => {
    const container = containerRef.current;
    const spotlight = spotlightRef.current;
    const mouse = mouseRef.current;

    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>("[data-skill-card]");

    if (!mouse) {
      if (spotlight) spotlight.style.opacity = "0";
      cards.forEach((card) => {
        card.style.background = `rgba(255, 255, 255, ${CONFIG.CARD_BORDER_MIN})`;

        const borderGlow =
          card.querySelector<HTMLElement>("[data-border-glow]");
        if (borderGlow) borderGlow.style.opacity = "0";

        const innerGlow = card.querySelector<HTMLElement>("[data-inner-glow]");
        if (innerGlow) innerGlow.style.opacity = "0";

        const icon = card.querySelector<HTMLElement>("[data-icon]");
        if (icon) {
          icon.style.color = CONFIG.ICON_DIM_COLOR;
          icon.style.filter = "grayscale(100%)";
          icon.style.opacity = `${CONFIG.ICON_DIM_OPACITY}`;
        }

        const name = card.querySelector<HTMLElement>("[data-name]");
        if (name)
          name.style.color = `rgba(255, 255, 255, ${CONFIG.NAME_DIM_OPACITY})`;

        const category = card.querySelector<HTMLElement>("[data-category]");
        if (category)
          category.style.color = `rgba(255, 255, 255, ${CONFIG.CATEGORY_DIM_OPACITY})`;
      });
      return;
    }

    // Spotlight position
    const halfSize = CONFIG.SPOTLIGHT_SIZE / 2;
    if (spotlight) {
      spotlight.style.opacity = "1";
      spotlight.style.left = `${mouse.x - halfSize}px`;
      spotlight.style.top = `${mouse.y - halfSize}px`;
    }

    // Update each card
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mouse.x - cx;
      const dy = mouse.y - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - distance / CONFIG.SPOTLIGHT_RADIUS);
      const skillColor = card.dataset.skillColor || "#ffffff";
      const rgb = hexToRgb(skillColor);

      // Mouse position relative to card (% for gradient positioning)
      const localX = mouse.x - rect.left;
      const localY = mouse.y - rect.top;
      const percentX = (localX / rect.width) * 100;
      const percentY = (localY / rect.height) * 100;

      // Determine border reflection color
      const brR = CONFIG.BORDER_REFLECT_USE_SKILL_COLOR ? rgb.r : 255;
      const brG = CONFIG.BORDER_REFLECT_USE_SKILL_COLOR ? rgb.g : 255;
      const brB = CONFIG.BORDER_REFLECT_USE_SKILL_COLOR ? rgb.b : 255;

      // ── Border reflection glow (ánh sáng chiếu lên viền) ──
      const borderGlow = card.querySelector<HTMLElement>("[data-border-glow]");
      if (borderGlow) {
        borderGlow.style.opacity = `${proximity * CONFIG.BORDER_REFLECT_INTENSITY}`;
        borderGlow.style.background = `radial-gradient(${CONFIG.BORDER_REFLECT_SIZE} circle at ${percentX}% ${percentY}%, rgba(${brR}, ${brG}, ${brB}, ${CONFIG.BORDER_REFLECT_COLOR_OPACITY}), rgba(255,255,255,${CONFIG.BORDER_REFLECT_WHITE_RING}) 50%, transparent 70%)`;
      }

      // Card outer bg (p-px trick = viền card, gradient theo vị trí chuột)
      const borderOp =
        CONFIG.CARD_BORDER_MIN +
        proximity * (CONFIG.CARD_BORDER_MAX - CONFIG.CARD_BORDER_MIN);
      card.style.background =
        proximity > 0.01
          ? `radial-gradient(${CONFIG.BORDER_REFLECT_SIZE} circle at ${percentX}% ${percentY}%, rgba(${brR}, ${brG}, ${brB}, ${borderOp}), rgba(255,255,255,${CONFIG.CARD_BORDER_MIN}) 70%)`
          : `rgba(255, 255, 255, ${CONFIG.CARD_BORDER_MIN})`;

      // ── Inner glow (ánh sáng nhẹ bên trong card) ──
      const innerGlow = card.querySelector<HTMLElement>("[data-inner-glow]");
      if (innerGlow) {
        innerGlow.style.opacity = `${proximity * CONFIG.INNER_GLOW_OPACITY}`;
        innerGlow.style.background = `radial-gradient(${CONFIG.INNER_GLOW_SIZE} circle at ${percentX}% ${percentY}%, rgba(${brR}, ${brG}, ${brB}, ${CONFIG.INNER_GLOW_COLOR_OPACITY}), transparent 70%)`;
      }

      // ── Icon (chỉ đổi màu + grayscale, KHÔNG có drop-shadow/glow) ──
      const icon = card.querySelector<HTMLElement>("[data-icon]");
      if (icon) {
        icon.style.color = proximity > 0 ? skillColor : CONFIG.ICON_DIM_COLOR;
        icon.style.filter =
          proximity > 0
            ? `grayscale(${(1 - proximity) * 100}%)`
            : "grayscale(100%)";
        icon.style.opacity = `${CONFIG.ICON_DIM_OPACITY + proximity * (1 - CONFIG.ICON_DIM_OPACITY)}`;
      }

      // Name
      const name = card.querySelector<HTMLElement>("[data-name]");
      if (name) {
        const op =
          CONFIG.NAME_DIM_OPACITY +
          proximity * (CONFIG.NAME_BRIGHT_OPACITY - CONFIG.NAME_DIM_OPACITY);
        name.style.color = `rgba(255, 255, 255, ${op})`;
      }

      // Category
      const category = card.querySelector<HTMLElement>("[data-category]");
      if (category) {
        const op =
          CONFIG.CATEGORY_DIM_OPACITY +
          proximity *
            (CONFIG.CATEGORY_BRIGHT_OPACITY - CONFIG.CATEGORY_DIM_OPACITY);
        category.style.color = `rgba(255, 255, 255, ${op})`;
      }
    });
  }, []);

  /* ── RAF loop ── */
  const tick = useCallback(() => {
    const loop = () => {
      updateCards();
      rafRef.current = requestAnimationFrame(loop);
    };

    loop();
  }, [updateCards]);

  /* ── Desktop mouse handlers ── */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isMobileRef.current) return;
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobileRef.current) return;

      // Có ánh sáng ngay cả khi chuột đang đứng yên
      if (!mouseRef.current) {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }

      isInsideRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    },
    [tick],
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobileRef.current) return;
    isInsideRef.current = false;
    mouseRef.current = null;
    cancelAnimationFrame(rafRef.current);
    updateCards();
  }, [updateCards]);

  /* ── Mobile: spotlight follows scroll ── */
  useEffect(() => {
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < CONFIG.MOBILE_BREAKPOINT;
    };
    checkMobile();

    let mobileRaf = 0;

    const onScroll = () => {
      if (!isMobileRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportH = window.innerHeight;

      if (rect.bottom < 0 || rect.top > viewportH) {
        mouseRef.current = null;
        updateCards();
        return;
      }

      const spotX =
        rect.left + rect.width * (CONFIG.MOBILE_SPOTLIGHT_X_PERCENT / 100);

      const scrollProgress = Math.max(
        0,
        Math.min(1, (viewportH - rect.top) / (viewportH + rect.height)),
      );
      const spotY =
        viewportH * (1 - CONFIG.MOBILE_SCROLL_SPEED) +
        scrollProgress * viewportH * CONFIG.MOBILE_SCROLL_SPEED;

      mouseRef.current = { x: spotX, y: spotY };

      cancelAnimationFrame(mobileRaf);
      mobileRaf = requestAnimationFrame(() => updateCards());
    };

    const onResize = () => {
      checkMobile();
      if (!isMobileRef.current) {
        mouseRef.current = null;
        updateCards();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(mobileRaf);
    };
  }, [updateCards]);

  /* Lưu vị trí chuột toàn cục (last known position) */
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (isMobileRef.current) return;
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  /* ── Cleanup ── */
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="relative w-full bg-[#111111] py-24 px-8 md:px-16 xl:px-52">
      {/* Section label */}
      <motion.div
        className="flex items-center gap-2 mb-8"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      >
        <span className="w-2 h-2 rounded-full bg-btn-primary shrink-0" />
        <span className="text-sm font-medium text-white/50 tracking-wide">
          {sectionLabel}
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        className="text-5xl md:text-6xl xl:text-7xl font-medium text-white leading-[1.08] mb-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.15, ease }}
      >
        {heading}
      </motion.h2>

      {/* Subheading */}
      <motion.p
        className="text-lg md:text-xl text-white/40 font-medium mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25, ease }}
      >
        {subheading}
      </motion.p>

      {/* Grid */}
      <div
        ref={containerRef}
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Spotlight glow — quầng sáng nền theo chuột */}
        <div
          ref={spotlightRef}
          className="pointer-events-none fixed z-20 rounded-full opacity-0"
          style={{
            width: `${CONFIG.SPOTLIGHT_SIZE}px`,
            height: `${CONFIG.SPOTLIGHT_SIZE}px`,
            background: `radial-gradient(circle, rgba(${CONFIG.SPOTLIGHT_COLOR}, ${CONFIG.SPOTLIGHT_INTENSITY}) 0%, rgba(${CONFIG.SPOTLIGHT_COLOR}, ${CONFIG.SPOTLIGHT_INTENSITY * 0.3}) 40%, transparent 70%)`,
            filter: `blur(${CONFIG.SPOTLIGHT_BLUR}px)`,
            willChange: "left, top, opacity",
          }}
        />

        {items.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
}
