import React, { useRef } from 'react';

type Props = {
  children: React.ReactNode;
  maxTiltDeg?: number;
  className?: string;
  style?: React.CSSProperties;
};

const TiltCard: React.FC<Props> = ({ children, maxTiltDeg = 10, className, style }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const tiltX = (py - 0.5) * 2 * maxTiltDeg;
    const tiltY = (0.5 - px) * 2 * maxTiltDeg;
    el.style.transform = `perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
    const shine = el.querySelector('.tilt-shine') as HTMLDivElement | null;
    if (shine) {
      const angle = Math.atan2(e.clientY - rect.top - rect.height / 2, e.clientX - rect.left - rect.width / 2) * 180 / Math.PI - 90;
      const opacity = Math.max(Math.abs(px - 0.5), Math.abs(py - 0.5)) * 0.4 + 0.1;
      shine.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,${opacity}) 0%, rgba(255,255,255,0) 80%)`;
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: 'transform 120ms ease-out', transformStyle: 'preserve-3d', ...style }}
      className={className}
    >
      <div className="tilt-shine" style={{ position: 'absolute', inset: 0, borderRadius: 8, pointerEvents: 'none', mixBlendMode: 'overlay' }} />
      {children}
    </div>
  );
};

export default TiltCard; 