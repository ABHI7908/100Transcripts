import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import digilockerLogo from "../../assets/digilocker_logo.png";
import { API_BASE_URL as API_BASE } from "../../services/api";
import { validateName, validateEmail, validatePhone, restrictNameInput, restrictPhoneInput } from "../../utils/validation";

/* ─────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

html, body, #root {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: #fff;
  min-height: 100vh;
}

/* ══ Keyframes ══ */
@keyframes fadeDown  { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeUp    { from{opacity:0;transform:translateY(24px)}  to{opacity:1;transform:translateY(0)} }
@keyframes cardIn    { from{opacity:0;transform:translateY(32px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
@keyframes pulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.8)} }
@keyframes pop       { from{transform:scale(0) rotate(-20deg)} to{transform:scale(1) rotate(0)} }
@keyframes slideUp   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
@keyframes float     { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-9px)} }
@keyframes drawRoad  { from{stroke-dashoffset:var(--road-len,2000)} to{stroke-dashoffset:0} }
@keyframes nodeIn    { from{opacity:0;transform:scale(0) rotate(-20deg)} to{opacity:1;transform:scale(1) rotate(0)} }
@keyframes shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
@keyframes modalIn   { from{opacity:0;transform:scale(0.92) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
@keyframes overlayIn { from{opacity:0} to{opacity:1} }
@keyframes spin      { to{transform:rotate(360deg)} }
@keyframes stepPulse { 0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,0.45)} 50%{box-shadow:0 0 0 8px rgba(59,130,246,0)} }
@keyframes lineGrow  { from{height:0} to{height:100%} }
@keyframes checkPop  { 0%{transform:scale(0) rotate(-30deg);opacity:0} 70%{transform:scale(1.2) rotate(5deg);opacity:1} 100%{transform:scale(1) rotate(0deg);opacity:1} }
@keyframes iconBounce { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-4px)} 60%{transform:translateY(-1px)} }
@keyframes dashMove  { to{stroke-dashoffset:-20} }

/* Active traveler pulse */
.active-traveler-pulse {
  pointer-events: none;
}

/* ══ Layout ══ */
.app-shell {
  padding-top: 110px;
  background: #f8fafc;
  min-height: 100vh;
  display: block;
}

.portal-panel {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 0px;
}

@media (min-width: 1025px) {
  .app-shell {
    height: calc(100vh - 0px);
    overflow-y: auto;
    scrollbar-width: thin;
  }
  .portal-panel {
    height: auto;
  }
}

/* Brand */
.panel-brand {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.15);
}
.panel-brand-badge { display: none; }
.live-dot { display: none; }
.panel-brand h2 {
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  line-height: 1.2;
}
.panel-brand p {
  font-size: 13px;
  color: #6366f1;
  margin-top: 6px;
  font-weight: 600;
  letter-spacing: 0.3px;
}

/* ══ Horizontal Roadmap ══ */
.roadmap {
  display: flex;
  justify-content: space-between;
  margin: 40px auto 60px;
  max-width: 1000px;
  position: relative;
}

.rm-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex: 1;
  position: relative;
}

.rm-node {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  border: 2px solid #e2e8f0;
  background: #ffffff;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.rm-step.is-done .rm-node { border-color: #34d399; background: #ecfdf5; }
.rm-step.is-active .rm-node { border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59,130,246,0.15); }

.rm-connector {
  position: absolute;
  top: 24px;
  left: 50%;
  right: -50%;
  height: 2px;
  background: #e2e8f0;
  z-index: 1;
}

.rm-step.is-done .rm-connector { background: #34d399; }

.rm-step-label {
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  text-align: center;
}
.rm-step.is-active .rm-step-label { color: #0f172a; }
.rm-step.is-done .rm-step-label { color: #047857; }

/* ══ Stats ══ */
.panel-stats {
  display: flex;
  gap: 8px;
  margin-top: 6px;
  padding-top: 16px;
  border-top: 1.5px solid #f1f5f9;
  flex-shrink: 0;
}
.panel-stat {
  flex: 1;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px 6px;
  text-align: center;
}
.panel-stat-num {
  font-size: 16px;
  font-weight: 900;
  color: #0f172a;
  line-height: 1;
}
.panel-stat-lbl {
  font-size: 9px;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  margin-top: 3px;
}

/* SVG road nodes */
.rnode { opacity: 0; animation: nodeIn .55s cubic-bezier(.34,1.56,.64,1) forwards; }
.image-panel::before, .image-panel::after { display: none; }



/* ══ Portal wrap ══ */
.portal-wrap { max-width: 1200px; margin: 0 auto; padding: 0px 32px 72px; }

/* ══ Hero ══ */
.hero-header { text-align:center; padding: 8px 0 6px; animation:fadeDown .7s ease both; }
.hero-header h1 {
  font-size: clamp(24px,4vw,40px); font-weight:800;
  color:#0f172a; letter-spacing:-1px; line-height:1.15;
}
.hero-header h1 em { font-style:normal; background: linear-gradient(135deg, #3b82f6, #6366f1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-header p { color:#64748b; font-size:15px; margin-top:12px; }

/* ══ Track bar ══ */
.track-bar {
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  padding: 10px;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(15, 23, 42, 0.06);
  border: 1px solid rgba(148, 163, 184, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.track-bar:focus-within {
  transform: translateY(-3px);
  box-shadow: 0 16px 48px rgba(59, 130, 246, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
}
.track-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 14px 18px;
  font-size: 14px;
  border-radius: 18px;
  background: #f8fafc;
  color: #0f172a;
  font-family: inherit;
  font-weight: 500;
}
.track-input::placeholder { color: #94a3b8; font-weight: 400; }
.track-btn {
  background: linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6);
  color: white;
  border: none;
  padding: 13px 26px;
  border-radius: 18px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
  white-space: nowrap;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
}
.track-btn:hover { transform: scale(1.03); box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4); }

/* ══ Horizontal Progress Bar ══ */
.hp-container {
  position: relative;
  margin: 8px auto 40px;
  max-width: 1000px;
  padding: 0 20px;
  animation: fadeUp 0.8s 0.2s ease both;
}
.hp-track-bg {
  position: absolute;
  top: 16px;
  left: 80px;
  right: 80px;
  height: 4px;
  background: #e2e8f0;
  border-radius: 4px;
  z-index: 0;
}
.hp-track-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
.hp-steps {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
}
.hp-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 160px;
}
.hp-circle {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: #fff;
  border: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 800;
  color: #94a3b8;
  position: relative;
  transition: all 0.4s ease;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
}

.hp-badge {
  position: absolute;
  top: -6px; right: -6px;
  width: 20px; height: 20px;
  border-radius: 50%;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff;
  line-height: 1;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.hp-step.active .hp-circle {
  animation: float 3s ease-in-out infinite;
}
.hp-step.done .hp-circle {
  background: #ffffff;
}
.hp-label {
  font-size: 13px;
  font-weight: 700;
  color: #64748b;
  text-align: center;
  transition: color 0.4s ease;
}
.hp-step.active .hp-label { color: #0f172a; }
.hp-step.done .hp-label { color: #059669; }

@media (max-width: 640px) {
  .hp-container {
    max-width: 100%;
  }
  .hp-track-bg { display: none; }
  .hp-steps {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    padding-left: 20px;
    border-left: 3px solid #e2e8f0;
    margin-left: 26px;
  }
  .hp-step {
    flex-direction: row;
    width: auto;
  }
  .hp-circle {
    margin-left: -48px;
  }
}

/* ══ Main card ══ */
.main-card { 
  background:#ffffff; 
  border-radius:28px; 
  padding:40px 36px; 
  box-shadow:0 8px 40px rgba(15, 23, 42, 0.06); 
  border:1px solid rgba(148, 163, 184, 0.15); 
  margin-top:28px; 
}
.card-anim { animation:cardIn .5s cubic-bezier(.34,1.2,.64,1) both; }

.step-header { display:flex; align-items:center; gap:18px; margin-bottom:32px; padding-bottom:24px; border-bottom:1px solid rgba(148, 163, 184, 0.15); }
.step-icon { width:56px; height:56px; border-radius:18px; display:flex; align-items:center; justify-content:center; font-size:26px; flex-shrink:0; box-shadow: 0 4px 12px rgba(15,23,42,0.04); }
.icon-blue   { background:linear-gradient(135deg,#eff6ff,#dbeafe); color:#1d4ed8; }
.icon-sky  { background:linear-gradient(135deg,#f0f9ff,#e0f2fe); color:#0369a1; }
.icon-purple { background:linear-gradient(135deg,#faf5ff,#ede9fe); color:#7c3aed; }
.icon-amber  { background:linear-gradient(135deg,#fffbeb,#fef3c7); color:#d97706; }
.step-title    { font-size:22px; font-weight:800; color:#0f172a; letter-spacing: -0.3px; }
.step-subtitle { font-size:14px; color:#64748b; margin-top:4px; line-height: 1.4; }

/* ══ Form ══ */
.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
.field { display:flex; flex-direction:column; gap:8px; }
.field label { font-size:13px; font-weight:700; color:#374151; letter-spacing: -0.1px; }
.field input, .field select {
  padding:14px 16px; 
  border:1.5px solid #e2e8f0; 
  border-radius:16px;
  font-size:14px; 
  font-family:inherit; 
  outline:none; 
  color:#1e293b; 
  background:#ffffff;
  transition:all .2s cubic-bezier(.4,0,.2,1);
  -webkit-appearance: none;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
}
.field input:hover,.field select:hover { border-color:#cbd5e1; }
.field input:focus,.field select:focus { 
  border-color:#6366f1; 
  box-shadow:0 0 0 4px rgba(99, 102, 241, 0.12); 
}
.req { color:#dc2626; }

.sec-title { font-size:15px; font-weight:800; color:#1e293b; margin:24px 0 12px; display:flex; align-items:center; gap:10px; }
.sec-title::before { content:''; width:4px; height:18px; background:linear-gradient(180deg,#3b82f6,#2563eb); border-radius:2px; display:inline-block; }

.degree-card { background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:14px; padding:16px; margin-bottom:12px; transition:border .2s; }
.degree-card:hover { border-color:#bfdbfe; }
.deg-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; }
.deg-num { font-size:12px; font-weight:700; color:#3b82f6; background:#eff6ff; padding:3px 10px; border-radius:6px; }
.btn-rm { background:none; border:none; color:#ef4444; cursor:pointer; font-size:12px; font-weight:700; padding:4px 8px; border-radius:6px; transition:background .2s; font-family:inherit; }
.btn-rm:hover { background:#fef2f2; }

/* ══ Upload box ══ */
.upload-box { 
  background:linear-gradient(135deg,#f8fafc,#ffffff); 
  border:1.5px solid rgba(148, 163, 184, 0.2); 
  border-radius:20px; 
  padding:22px; 
  margin-bottom:18px; 
  transition:all .3s cubic-bezier(.4,0,.2,1); 
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.03);
}
.upload-box:hover { 
  border-color:#93c5fd; 
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.08);
  transform: translateY(-2px);
}
.upload-lbl { 
  font-size:14px; 
  font-weight:700; 
  color:#1e293b; 
  margin-bottom:14px; 
  display:flex; 
  align-items:center; 
  gap:10px; 
}
.upload-row { display:flex; gap:12px; flex-wrap:wrap; }
.upload-row input[type=file] { 
  flex:1; 
  min-width:200px; 
  padding:12px 16px; 
  border:1.5px solid #e2e8f0; 
  border-radius:14px; 
  font-size:13px; 
  font-family:inherit; 
  background:#ffffff; 
  cursor:pointer; 
  transition:all .2s cubic-bezier(.4,0,.2,1);
}
.upload-row input[type=file]:hover { border-color:#cbd5e1; }
.upload-row select { 
  padding:12px 16px; 
  border:1.5px solid #e2e8f0; 
  border-radius:14px; 
  font-size:13px; 
  font-family:inherit; 
  background:#ffffff; 
  color:#1e293b; 
  cursor:pointer; 
  transition:all .2s cubic-bezier(.4,0,.2,1);
}
.upload-row select:hover { border-color:#cbd5e1; }
.prog-wrap { margin-top:14px; }
.prog-bar  { 
  height:6px; 
  background:#e2e8f0; 
  border-radius:100px; 
  overflow:hidden; 
  margin-bottom:6px; 
}
.prog-fill { 
  height:100%; 
  border-radius:100px; 
  transition:width .5s cubic-bezier(.4,0,.2,1); 
  background:linear-gradient(90deg,#3b82f6,#6366f1,#a855f7); 
}
.prog-fill.pdone { 
  background:linear-gradient(90deg,#10b981,#34d399); 
}
.prog-text  { 
  font-size:12px; 
  color:#64748b; 
  font-weight:500;
}
.upload-actions { 
  display:flex; 
  gap:10px; 
  margin-top:14px; 
  flex-wrap:wrap; 
  align-items:center; 
}
.btn-attach { 
  background:linear-gradient(135deg,#3b82f6,#6366f1); 
  color:#fff; 
  border:none; 
  border-radius:14px; 
  padding:10px 20px; 
  font-size:13px; 
  font-weight:700; 
  cursor:pointer; 
  font-family:inherit; 
  transition:all .2s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
}
.btn-attach:hover { 
  transform:scale(1.03); 
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}
.btn-del { 
  background:#fee2e2; 
  color:#dc2626; 
  border:none; 
  border-radius:14px; 
  padding:10px 18px; 
  font-size:13px; 
  font-weight:700; 
  cursor:pointer; 
  font-family:inherit; 
  transition:all .2s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 2px 8px rgba(220, 38, 38, 0.1);
}
.btn-del:hover { 
  background:#fecaca; 
  transform:scale(1.03);
}

/* DigiLocker button */
.btn-digilocker {
  display:inline-flex; align-items:center; gap:8px;
  background:linear-gradient(135deg,#4f46e5,#7c3aed); color:#fff; border:none;
  border-radius:14px; padding:10px 18px; font-size:13px; font-weight:700;
  cursor:pointer; font-family:inherit; transition:all .2s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 4px 16px rgba(79, 70, 229, 0.3);
}
.btn-digilocker:hover { 
  transform:scale(1.03); 
  box-shadow:0 8px 24px rgba(79,70,229,0.4); 
}
.btn-digilocker svg { width:16px; height:16px; flex-shrink:0; }

.file-nm { 
  font-size:12px; 
  color:#64748b; 
  margin-top:8px; 
  font-weight:500;
}
.file-compressed { 
  font-size:11px; 
  color:#0284c7; 
  font-weight:600; 
  margin-top:4px; 
}

.check-list { display:flex; flex-direction:column; gap:10px; margin-top:18px; }
.check-item { display:flex; align-items:flex-start; gap:10px; cursor:pointer; padding:12px 14px; background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:10px; transition:border .2s,background .2s; }
.check-item:hover { border-color:#bfdbfe; background:#eff6ff; }
.check-item input { margin-top:2px; accent-color:#3b82f6; width:15px; height:15px; flex-shrink:0; cursor:pointer; }
.check-item span  { font-size:12.5px; color:#374151; line-height:1.5; }

/* ══ Buttons ══ */
.btn-primary {
  background:linear-gradient(to right,#2563eb,#06b6d4); 
  color:#fff; 
  border:none;
  border-radius:9999px; 
  padding:10px 24px; 
  font-size:14px; 
  font-weight:700;
  cursor:pointer; 
  font-family:inherit; 
  transition:all .2s cubic-bezier(.4,0,.2,1);
  display:inline-flex; 
  align-items:center; 
  justify-content:center;
  gap:6px;
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
}
.btn-primary:hover { 
  transform:scale(1.05); 
  box-shadow:0 12px 32px rgba(37, 99, 235, 0.4); 
}
.btn-primary:active { 
  transform:scale(.97); 
}
.btn-primary.sky { 
  background:linear-gradient(135deg,#0ea5e9,#0284c7); 
}
.btn-primary.sky:hover { 
  box-shadow:0 12px 32px rgba(14, 165, 233,.4); 
}
.btn-secondary { 
  background:#f1f5f9; 
  color:#374151; 
  border:none; 
  border-radius:16px; 
  padding:13px 26px; 
  font-size:14px; 
  font-weight:700; 
  cursor:pointer; 
  font-family:inherit; 
  transition:all .2s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
}
.btn-secondary:hover { 
  background:#e2e8f0; 
  transform:translateY(-1px);
}
.btn-add { 
  background:linear-gradient(135deg,#6366f1,#4f46e5); 
  color:#fff; 
  border:none; 
  border-radius:14px; 
  padding:10px 22px; 
  font-size:13px; 
  font-weight:700; 
  cursor:pointer; 
  font-family:inherit; 
  transition:all .2s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}
.btn-add:hover { 
  transform:scale(1.03); 
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
}
.btn-add-mini {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  transition: transform 0.15s;
}
.btn-add-mini:hover { transform: scale(1.05); }

.optional-deg-box {
  background: #f8fafc;
  border: 1.5px dashed #e2e8f0;
  border-radius: 14px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 12px;
}
.optional-deg-box:hover {
  border-color: #3b82f6;
  background: #eff6ff;
  transform: translateY(-2px);
}
.opt-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.opt-text { flex: 1; display: flex; flex-direction: column; }
.opt-text strong { font-size: 13.5px; color: #1e293b; }
.opt-text span { font-size: 11px; color: #64748b; margin-top: 1px; }

.actions { display:flex; justify-content:center; gap:10px; margin-top:28px; flex-wrap:wrap; }

/* ══ Info panels ══ */
.info-panel { border-radius:18px; padding:28px; text-align:center; margin:10px 0 22px; }
.info-panel.amber  { background:linear-gradient(135deg,#fffbeb,#fef3c7); border:2px solid #fde68a; }
.info-panel.blue   { background:linear-gradient(135deg,#eff6ff,#dbeafe); border:2px solid #bfdbfe; }
.info-panel.indigo { background:linear-gradient(135deg,#eef2ff,#e0e7ff); border:2px solid #c7d2fe; }
.info-panel.sky  { background:linear-gradient(135deg,#f0f9ff,#e0f2fe); border:2px solid #7dd3fc; }
.info-icon  { font-size:46px; display:block; margin-bottom:11px; }
.info-panel h3 { font-size:19px; font-weight:800; margin-bottom:7px; color:#1e293b; }
.info-panel p  { font-size:13px; color:#475569; line-height:1.65; }
.amount { font-size:34px; font-weight:900; color:#1e293b; margin:10px 0 5px; }
.info-chip { display:inline-block; margin-top:10px; background:rgba(255,255,255,.8); border-radius:10px; padding:8px 16px; font-size:12px; color:#374151; }

/* ══ Timeline ══ */
.timeline { display:flex; flex-direction:column; }
.tl-item  { display:flex; gap:10px; padding:0 0 20px; }
.tl-item:last-child { padding-bottom:0; }
.tl-left  { display:flex; flex-direction:column; align-items:center; }
.tl-dot   { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:17px; flex-shrink:0; }
.tl-line  { width:2px; background:#f1f5f9; flex:1; margin-top:5px; }
.tl-content    { flex:1; padding-top:5px; }
.tl-content h4 { font-size:14px; font-weight:700; color:#1e293b; margin-bottom:3px; }
.tl-content p  { font-size:12px; color:#64748b; line-height:1.5; }
.tl-badge { display:inline-block; font-size:10.5px; font-weight:700; padding:2px 9px; border-radius:100px; margin-top:5px; }
.bdone { background:#e0f2fe; color:#166534; }
.bprog { background:#dbeafe; color:#1e40af; }
.bwait { background:#f1f5f9; color:#64748b; }

.star-burst { font-size:64px; display:block; text-align:center; margin-bottom:10px; animation:pop .55s cubic-bezier(.34,1.7,.64,1) both; }
.success-wrap { animation:slideUp .55s cubic-bezier(.34,1.2,.64,1) both; }

/* ══ DigiLocker Modal ══ */
.modal-overlay {
  position: fixed; inset:0; background:rgba(0,0,0,0.55);
  display:flex; align-items:center; justify-content:center; z-index:1000;
  animation: overlayIn .2s ease;
  padding: 16px;
}
.modal-box {
  background:#fff; border-radius:24px; padding:36px 30px;
  width:100%; max-width:440px;
  box-shadow:0 24px 80px rgba(0,0,0,0.25);
  animation: modalIn .3s cubic-bezier(.34,1.2,.64,1);
}
.modal-header { display:flex; align-items:center; gap:14px; margin-bottom:24px; }
.modal-icon { width:52px; height:52px; border-radius:16px; background:linear-gradient(135deg,#4f46e5,#7c3aed); display:flex; align-items:center; justify-content:center; font-size:24px; flex-shrink:0; }
.modal-title { font-size:20px; font-weight:800; color:#0f172a; }
.modal-sub   { font-size:13px; color:#64748b; margin-top:2px; }
.modal-field { margin-bottom:14px; }
.modal-field label { display:block; font-size:12px; font-weight:700; color:#374151; margin-bottom:5px; }
.modal-field input {
  width:100%; padding:11px 13px; border:1.5px solid #e2e8f0; border-radius:10px;
  font-size:14px; font-family:inherit; outline:none; color:#1e293b;
  transition:border .2s;
}
.modal-field input:focus { border-color:#6366f1; box-shadow:0 0 0 3px rgba(99,102,241,0.12); }
.modal-hint { font-size:11.5px; color:#94a3b8; margin-top:10px; line-height:1.5; }
.modal-actions { display:flex; gap:10px; margin-top:20px; }
.modal-actions .btn-primary { flex:1; justify-content:center; background:linear-gradient(135deg,#4f46e5,#7c3aed); }
.modal-actions .btn-primary:hover { box-shadow:0 8px 24px rgba(99,102,241,.4); }
.modal-actions .btn-secondary { flex:1; }
.digilocker-docs-list { margin-top:14px; display:flex; flex-direction:column; gap:8px; }
.dl-doc-item {
  display:flex; align-items:center; gap:10px; padding:10px 13px;
  background:#f8fafc; border:1.5px solid #e2e8f0; border-radius:10px;
  cursor:pointer; transition:border .2s, background .2s;
}
.dl-doc-item:hover { border-color:#a5b4fc; background:#eef2ff; }
.dl-doc-item.selected { border-color:#6366f1; background:#eef2ff; }
.dl-doc-icon { font-size:22px; flex-shrink:0; }
.dl-doc-name { font-size:13px; font-weight:700; color:#1e293b; }
.dl-doc-meta { font-size:11px; color:#94a3b8; }
.dl-doc-check { margin-left:auto; width:20px; height:20px; border-radius:50%; border:2px solid #e2e8f0; display:flex; align-items:center; justify-content:center; font-size:10px; transition:all .2s; }
.dl-doc-item.selected .dl-doc-check { background:#6366f1; border-color:#6366f1; color:#fff; }
.spinner { width:18px; height:18px; border:2.5px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin .7s linear infinite; display:inline-block; }

/* ══ Responsive ══ */
@media (max-width: 1024px) {
  .app-shell { flex-direction: column; }
  .portal-panel { margin-left: 0; width: 100%; padding-top: 10px; }
  .portal-wrap { padding: 32px 16px 60px; }
  .main-card { padding: 18px 14px; border-radius: 18px; }
  .form-grid { grid-template-columns: 1fr; }
  .proc-ribbon { flex-direction: column; }
  .proc-cell { border-right:none; border-bottom:1px solid #f1f5f9; }
  .proc-cell:last-child { border-bottom:none; }
  .track-bar { flex-direction: row; }
}
@media (max-width: 640px) {
  .track-bar { flex-direction: column; border-radius: 20px; padding: 12px; gap: 10px; }
  .track-input, .track-btn { width: 100%; border-radius: 12px !important; }
  .track-btn { padding: 14px; }
  .optional-deg-box { flex-direction: column; text-align: center; gap: 12px; padding: 20px; }
  .opt-icon { margin: 0 auto; }
  .btn-add-mini { width: 100%; }
  .hero-header h1 { font-size: 28px; }
  .main-card { padding: 20px 16px; margin-top: 10px; }
  .step-header { flex-direction: column; text-align: center; gap: 12px; }
  .step-icon { margin: 0 auto; }
  .dual-upload-container { grid-template-columns: 1fr; }
}

/* ══ Selection Panel Refined (Matches Image) ══ */
.selection-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
}
.selection-header {
  text-align: center;
  margin-bottom: 60px;
}
.selection-header h1 {
  font-size: 42px;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -1.5px;
  margin-bottom: 12px;
}
.selection-header p {
  font-size: 16px;
  color: #64748b;
  position: relative;
  display: inline-block;
}
.selection-header p::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 3px;
  background: #3b82f6;
  border-radius: 2px;
}

.selection-row {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 0;
  position: relative;
}
.selection-card {
  flex: 1;
  max-width: 420px;
  background: #fff;
  border-radius: 24px;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
  box-shadow: 0 20px 50px rgba(0,0,0,0.08);
}
.card-manual {
  border-bottom: 4px solid #3b82f6;
}
.card-digi {
  border-bottom: 4px solid #6d28d9;
}

.selection-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.12);
}

.card-illustration {
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 50%;
}
.card-illustration img {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

.card-title {
  font-size: 26px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 10px;
}
.card-desc {
  font-size: 14px;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 24px;
  height: 42px;
}

.card-features {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 35px;
  text-align: left;
}
.feature-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #475569;
  font-weight: 500;
}
.feature-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border: 1.5px solid currentColor;
}
.card-manual .feature-icon { color: #3b82f6; }
.card-digi .feature-icon { color: #8b5cf6; }

.card-btn {
  width: 100%;
  padding: 16px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-manual { background: #2563eb; color: #fff; }
.btn-digi { background: #6d28d9; color: #fff; }

.card-footer {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;
  font-weight: 600;
}

.or-separator {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
}
.or-line { width: 1px; background: #e2e8f0; flex: 1; }
.or-circle {
  width: 48px; height: 48px; border-radius: 50%;
  background: #fff; border: 1px solid #e2e8f0;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 800; color: #1e293b;
  z-index: 1;
}

.selection-trust-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 60px;
  background: #fff;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #f1f5f9;
  box-shadow: 0 15px 40px rgba(0,0,0,0.05);
}
.trust-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
.trust-icon {
  width: 44px; height: 44px; border-radius: 12px;
  background: #f0f7ff; color: #3b82f6;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
}
.trust-text h4 { font-size: 14px; font-weight: 800; color: #1e293b; margin: 0; }
.trust-text p { font-size: 11px; color: #64748b; margin: 2px 0 0; }

@media (max-width: 960px) {
  .selection-row { flex-direction: column; align-items: center; }
  .or-separator { height: 60px; flex-direction: row; width: 100%; }
  .or-line { height: 1px; width: 100%; }
  .selection-trust-bar { grid-template-columns: repeat(2, 1fr); }
}

/* Sidebar Security Box */
.sidebar-security {
  margin-top: auto;
  background: linear-gradient(135deg, #ecfdf5, #e0f2fe);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  border: 1px solid rgba(59, 130, 246, 0.1);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
}
.security-icon {
  width: 40px; height: 40px; border-radius: 12px;
  background: linear-gradient(135deg, #ffffff, #f8fafc);
  color: #2563eb;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);
}
.security-text h4 { 
  font-size: 14px; 
  font-weight: 800; 
  color: #0f172a; 
  margin: 0; 
  letter-spacing: -0.2px;
}
.security-text p { 
  font-size: 12px; 
  color: #64748b; 
  line-height: 1.5; 
  margin-top: 6px; 
}

/* ══ Guideline Images ══ */
.guideline-section { margin: 24px 0; padding: 22px; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 20px; }
.guideline-title { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
.guideline-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.guideline-item { text-align: center; }
.guideline-img-wrap { position: relative; border-radius: 14px; overflow: hidden; border: 3px solid #fff; box-shadow: 0 8px 24px rgba(15,52,120,0.12); margin-bottom: 10px; aspect-ratio: 1/1; background: #e2e8f0; }
.guideline-img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.guideline-badge { position: absolute; top: 10px; right: 10px; padding: 4px 10px; border-radius: 8px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
.badge-ok { background: #0ea5e9; color: #fff; }
.badge-no { background: #ef4444; color: #fff; }
.guideline-label { font-size: 12px; font-weight: 700; color: #475569; line-height: 1.3; }

/* ══ Dual Upload Panels ══ */
.dual-upload-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 10px;
}
.upload-side {
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 20px;
  padding: 24px;
}
.side-title {
  font-size: 14px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.manual-side .side-title { color: #3b82f6; }
.digilocker-side .side-title { color: #6d28d9; }

@media (max-width: 960px) {
  .dual-upload-container { grid-template-columns: 1fr; }
}

.side-content {
  max-height: 520px;
  overflow-y: auto;
  padding-right: 8px;
  scrollbar-width: thin;
  scrollbar-color: #e2e8f0 transparent;
}

.side-content::-webkit-scrollbar {
  width: 6px;
}

.side-content::-webkit-scrollbar-track {
  background: transparent;
}

.side-content::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}

.side-content::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
`;

/* ─────────────────────────────────────────
   IMAGE COMPRESSION UTILITY
───────────────────────────────────────── */
async function compressImage(file, _maxSizeMB = 1, maxDimension = 1920) {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve({ file, compressed: false });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width > height) { height = Math.round((height * maxDimension) / width); width = maxDimension; }
          else { width = Math.round((width * maxDimension) / height); height = maxDimension; }
        }
        const canvas = document.createElement("canvas");
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) { resolve({ file, compressed: false }); return; }
            const compressedFile = new File([blob], file.name, { type: "image/jpeg", lastModified: Date.now() });
            const savedKB = Math.max(0, Math.round((file.size - compressedFile.size) / 1024));
            resolve({ file: compressedFile, compressed: file.size > compressedFile.size, savedKB, originalKB: Math.round(file.size / 1024), newKB: Math.round(compressedFile.size / 1024) });
          },
          "image/jpeg", 0.82
        );
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ─────────────────────────────────────────
   DIGILOCKER MODAL
───────────────────────────────────────── */
const MOCK_DIGILOCKER_DOCS = [
  { id: "degree", icon: "🎓", name: "B.Tech Degree Certificate", meta: "JNTU Hyderabad • 2021" },
  { id: "marksheet", icon: "📋", name: "Consolidated Marksheet", meta: "JNTU Hyderabad • 2021" },
  { id: "provisional", icon: "📜", name: "Provisional Certificate", meta: "JNTU Hyderabad • 2021" },
  { id: "migration", icon: "📑", name: "Migration Certificate", meta: "JNTU Hyderabad • 2021" },
];

function DigiLockerModal({ onClose, onFetch, targetLabel }) {
  const [phase, setPhase] = useState("login");
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendOtp = () => {
    if (aadhaar.length < 12) { alert("Please enter a valid 12-digit Aadhaar number"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setOtpSent(true); }, 1200);
  };

  const verifyOtp = () => {
    if (otp.length < 6) { alert("Please enter the 6-digit OTP"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setPhase("docs"); }, 1400);
  };

  const fetchDocs = () => {
    if (!selected.length) { alert("Please select at least one document"); return; }
    setPhase("fetching");
    setTimeout(() => {
      const docs = MOCK_DIGILOCKER_DOCS.filter(d => selected.includes(d.id));
      onFetch(docs);
      onClose();
    }, 2000);
  };

  const toggleDoc = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-icon">🔐</div>
          <div>
            <div className="modal-title">DigiLocker</div>
            <div className="modal-sub">{phase === "docs" ? `Select documents for: ${targetLabel}` : "Securely fetch your documents"}</div>
          </div>
        </div>

        {phase === "login" && (
          <>
            <div className="modal-field">
              <label>Aadhaar Number</label>
              <input type="tel" inputMode="numeric" maxLength={12} placeholder="Enter 12-digit Aadhaar" value={aadhaar} onChange={e => setAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))} />
            </div>
            {!otpSent ? (
              <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={sendOtp} disabled={loading}>
                {loading ? <><span className="spinner" /> &nbsp;Sending OTP...</> : "Send OTP →"}
              </button>
            ) : (
              <>
                <div className="modal-field" style={{ marginTop: 12 }}>
                  <label>Enter OTP</label>
                  <input type="tel" inputMode="numeric" maxLength={6} placeholder="6-digit OTP" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} />
                </div>
                <div className="modal-actions">
                  <button className="btn-secondary" onClick={onClose}>Cancel</button>
                  <button className="btn-primary" onClick={verifyOtp} disabled={loading}>
                    {loading ? <><span className="spinner" /> &nbsp;Verifying...</> : "Verify & Continue →"}
                  </button>
                </div>
              </>
            )}
            <p className="modal-hint">🔒 This is a simulated DigiLocker flow. No real data is accessed.</p>
          </>
        )}

        {phase === "docs" && (
          <>
            <div className="digilocker-docs-list">
              {MOCK_DIGILOCKER_DOCS.map(doc => (
                <div key={doc.id} className={`dl-doc-item ${selected.includes(doc.id) ? "selected" : ""}`} onClick={() => toggleDoc(doc.id)}>
                  <span className="dl-doc-icon">{doc.icon}</span>
                  <div>
                    <div className="dl-doc-name">{doc.name}</div>
                    <div className="dl-doc-meta">{doc.meta}</div>
                  </div>
                  <div className="dl-doc-check">{selected.includes(doc.id) ? "✓" : ""}</div>
                </div>
              ))}
            </div>
            <div className="modal-actions" style={{ marginTop: 18 }}>
              <button className="btn-secondary" onClick={onClose}>Cancel</button>
              <button className="btn-primary" onClick={fetchDocs} disabled={!selected.length}>
                Fetch {selected.length > 0 ? `(${selected.length})` : ""} →
              </button>
            </div>
          </>
        )}

        {phase === "fetching" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>📥</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1e293b" }}>Fetching from DigiLocker…</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>Securely retrieving your documents</div>
            <div style={{ marginTop: 20, display: "flex", justifyContent: "center" }}>
              <div style={{ width: 36, height: 36, border: "3px solid #e2e8f0", borderTopColor: "#6366f1", borderRadius: "50%", animation: "spin .7s linear infinite" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const PROC = [

  { icon: "📤", label: "Upload Documents", hint: "Fill form & upload docs" },
  { icon: "🔍", label: "Admin Verification", hint: "Our team checks your docs" },
  { icon: "💳", label: "Secure Payment", hint: "Secure one-time service fee" },
  { icon: "🚚", label: "Delivery Successful", hint: "Certified docs delivered!" },
];

const PROC_FULL = [

  { icon: "📤", label: "Upload Documents", hint: "Submitting digital paperwork", narrative: "Uploading my docs... 📤" },
  { icon: "🔍", label: "Admin Verification", hint: "Team checks for authenticity", narrative: "Admin is reviewing! 🔍" },
  { icon: "💳", label: "Secure Payment", hint: "Processing application fees", narrative: "Paying for service... 💳" },
  { icon: "🚚", label: "Delivery Successful", hint: "Documents delivered safely", narrative: "Successfully Completed! 🎉" },
];

const STEP_COLORS6 = [
  { bg: "#e8f0fe", color: "#2563eb" },
  { bg: "#e8f5e9", color: "#2e7d32" },
  { bg: "#fce4ec", color: "#c2185b" },
  { bg: "#fff3e0", color: "#e65100" },
  { bg: "#e3f2fd", color: "#0277bd" },
  { bg: "#f3e5f5", color: "#6a1b9a" },
];




/* ─────────────────────────────────────────
   SMALL HELPERS
───────────────────────────────────────── */
const TlItem = ({ icon, bg, title, desc, badge, last }) => (
  <div className="tl-item">
    <div className="tl-left">
      <div className="tl-dot" style={{ background: bg }}>{icon}</div>
      {!last && <div className="tl-line" />}
    </div>
    <div className="tl-content">
      <h4>{title}</h4>
      {desc && <p>{desc}</p>}
      <span className={`tl-badge ${badge}`}>
        {badge === "bdone" ? "Done" : badge === "bprog" ? "In Progress" : "Upcoming"}
      </span>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   UPLOAD BLOCK
───────────────────────────────────────── */
const UpBlock = ({ type, label, options, upProg, upNames, upCompressed, onFile, onDelFile, onDigiLocker, flowType }) => {
  const fileInputRef = useRef(null);
  const prog = upProg[type];
  const nm = upNames[type];
  const comprInfo = upCompressed[type];
  const isDigiFlow = flowType === 'digilocker';

  return (
    <div className={`upload-box ${isDigiFlow ? 'digi-mode' : ''}`} style={isDigiFlow ? { borderStyle: 'solid', borderColor: '#e0e7ff', background: '#f5f7ff' } : {}}>
      <div className="upload-lbl">
        {isDigiFlow ? '🔐' : '📎'} {label}
      </div>

      {!isDigiFlow && (
        <div className="upload-row">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,image/*"
            onChange={onFile(type)}
          />
          <select>{options.map(o => <option key={o}>{o}</option>)}</select>
        </div>
      )}

      {prog > 0 && (
        <div className="prog-wrap">
          <div className="prog-bar">
            <div className={`prog-fill${prog === 100 ? " pdone" : ""}`} style={{ width: `${prog}%` }} />
          </div>
          <div className="prog-text">{prog === 100 ? "✅ Fetched successfully" : isDigiFlow ? `Fetching… ${prog}%` : `Uploading… ${prog}%`}</div>
        </div>
      )}

      {nm && <div className="file-nm" style={isDigiFlow ? { color: '#4f46e5', fontWeight: 600 } : {}}>📄 {nm}</div>}

      {comprInfo && comprInfo.compressed && !isDigiFlow && (
        <div className="file-compressed">
          🗜 Compressed: {comprInfo.originalKB}KB → {comprInfo.newKB}KB (saved {comprInfo.savedKB}KB)
        </div>
      )}

      <div className="upload-actions">
        {!isDigiFlow && (
          <button
            className="btn-attach"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            Attach
          </button>
        )}
        {nm && <button className="btn-del" type="button" onClick={() => onDelFile(type)}>Delete</button>}
        {onDigiLocker && (
          <button className="btn-digilocker" type="button" onClick={() => onDigiLocker(type, label)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" /><line x1="12" y1="12" x2="12" y2="16" />
            </svg>
            {isDigiFlow ? 'Fetch from DigiLocker' : 'DigiLocker'}
          </button>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   STEP COMPONENTS
───────────────────────────────────────── */
const Step0 = ({ form, errors, onChange, degrees, addDeg, rmDeg, chDeg, upProg, upNames, upCompressed, onFile, delFile, onDigiLocker, onSubmit, adminMessage }) => {
  const [showManualUpload, setShowManualUpload] = React.useState(false);

  return (
    <form onSubmit={onSubmit}>
      {adminMessage && (
        <div className="info-panel amber" style={{ marginBottom: 24, border: "2px solid #fbbf24" }}>
          <span className="info-icon">⚠️</span>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: "#92400e", marginBottom: 4 }}>Action Required / Rejection Message</h3>
            <p style={{ color: "#b45309", fontSize: "14px", fontWeight: 500 }}>{adminMessage}</p>
          </div>
        </div>
      )}

      <div className="step-header">
        <div className="step-icon icon-blue">📄</div>
        <div>
          <div className="step-title">Transcript Application Form</div>
          <div className="step-subtitle">Fill in your details and provide document copies to begin</div>
        </div>
      </div>

      <div className="sec-title">Personal Information</div>
      <div className="form-grid">
        {[
          { id: "fullName", label: "Full Name", type: "text", ph: "e.g. Ravi Kumar", req: true },
          { id: "email", label: "Email Address", type: "email", ph: "email@example.com", req: true },
          { id: "phone", label: "Phone Number", type: "tel", ph: "9876543210", req: true },
          { id: "altPhone", label: "Alternative Number", type: "tel", ph: "9876543210", req: true },
        ].map(({ id, label, type, ph, req }) => (
          <div className="field" key={id}>
            <label>{label} {req && <span className="req">*</span>}</label>
            <input
              type={type}
              name={id}
              value={form[id]}
              onChange={onChange}
              onKeyPress={(e) => {
                if (id === "fullName") restrictNameInput(e);
                if (id === "phone" || id === "altPhone") restrictPhoneInput(e);
              }}
              maxLength={type === "tel" ? 10 : undefined}
              placeholder={ph}
              autoComplete="off"
              inputMode={type === "tel" ? "numeric" : undefined}
              style={{ borderColor: errors && errors[id] ? "#ef4444" : undefined }}
            />
            {errors && errors[id] && <p style={{ color: "#ef4444", fontSize: "11px", fontWeight: 600, marginTop: "2px" }}>{errors[id]}</p>}
          </div>
        ))}
        <div className="field">
          <label>Select Requirement <span className="req">*</span></label>
          <select name="requirement" value={form.requirement} onChange={onChange}>
            <option value="">— Choose Service —</option>
            <option value="Transcripts">Transcripts</option>
            <option value="WES">WES</option>
            <option value="Genuineness">Genuineness</option>
          </select>
        </div>
        <div className="field">
          <label>Reference Number</label>
          <input type="text" name="referenceNumber" value={form.referenceNumber} onChange={onChange} placeholder="If you have one" />
        </div>
      </div>

      <div className="sec-title">Academic Information <span className="req">*</span></div>
      {degrees.length === 0 ? (
        <div className="optional-deg-box" onClick={addDeg}>
          <div className="opt-icon">🎓</div>
          <div className="opt-text">
            <strong>Add Degree Details</strong>
            <span>Click to add your university and course information if applicable</span>
          </div>
          <button type="button" className="btn-add-mini">+ Add</button>
        </div>
      ) : (
        <>
          {degrees.map(d => (
            <div className="degree-card" key={d.id}>
              <div className="deg-header">
                <span className="deg-num">Degree {d.id}</span>
                {degrees.length > 1 && (
                  <button type="button" className="btn-rm" onClick={() => rmDeg(d.id)}>✕ Remove</button>
                )}
              </div>
              <div className="form-grid">
                <div className="field">
                  <label>Degree Type</label>
                  <select value={d.type} onChange={e => chDeg(d.id, "type", e.target.value)}>
                    <option value="">Select Type</option>
                    {["B.Tech", "B.Sc", "B.Com", "M.Tech", "MBA", "Diploma"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>University / Board <span className="req">*</span></label>
                  <input type="text" value={d.university} placeholder="e.g. Osmania University" onChange={e => chDeg(d.id, "university", e.target.value)} />
                </div>
                <div className="field">
                  <label>Course / Specialization</label>
                  <input type="text" value={d.course} placeholder="e.g. Computer Science" onChange={e => chDeg(d.id, "course", e.target.value)} />
                </div>
                <div className="field">
                  <label>College / School Name <span className="req">*</span></label>
                  <input type="text" value={d.college} placeholder="e.g. JNTU College" onChange={e => chDeg(d.id, "college", e.target.value)} />
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="btn-add" onClick={addDeg}>+ Add Another Degree</button>
        </>
      )}

      <div className="flex flex-col items-center mb-10 mt-12 text-center px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-8">How would you like to submit your documents?</h2>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
          {/* BUTTON 1: Upload Documents (Left, Highlighted) */}
          <button
            type="button"
            onClick={() => setShowManualUpload(true)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 text-lg border border-transparent"
          >
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            Upload Documents
          </button>

          {/* BUTTON 2: Fetch from DigiLocker (Right) */}
          <button
            type="button"
            onClick={() => onDigiLocker('all', 'All Documents')}
            className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-800 font-bold py-4 px-6 rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 text-lg"
          >
            <img src={digilockerLogo} alt="DigiLocker" className="h-9 w-auto object-contain" />
            Fetch from DigiLocker
          </button>
        </div>
      </div>

      {/* Conditionally Rendered Manual Upload Block */}
      {showManualUpload && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm w-full max-w-3xl mx-auto mb-12 relative">
          <button
            type="button"
            onClick={() => setShowManualUpload(false)}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm transition-all shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back
          </button>
          <h3 className="text-lg font-bold text-slate-800 mb-8 mt-2 text-center">Upload Your Documents</h3>
          <div className="flex flex-col gap-5">
            <UpBlock type="cmm" label="CMM / Yearly Marks Sheet"
              options={["CMM", "Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"]}
              upProg={upProg} upNames={upNames} upCompressed={upCompressed}
              onFile={onFile} delFile={delFile} flowType="manual" />

            <UpBlock type="degree" label="Degree / Provisional Certificate"
              options={["Degree Certificate", "Provisional Certificate"]}
              upProg={upProg} upNames={upNames} upCompressed={upCompressed}
              onFile={onFile} delFile={delFile} flowType="manual" />

            <UpBlock type="internship" label="Internship Certificate"
              options={["Internship Certificate"]}
              upProg={upProg} upNames={upNames} upCompressed={upCompressed}
              onFile={onFile} delFile={delFile} flowType="manual" />
          </div>
        </div>
      )}

      <div className="guideline-section" style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '32px' }}>
        <div className="guideline-title" style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>📸</span> Photo Instructions
        </div>
        <ul style={{ listStyleType: 'disc', paddingLeft: '24px', color: '#475569', fontSize: '14px', lineHeight: '1.8', margin: 0 }}>
          <li>Use a clear and high-quality photo.</li>
          <li>Face should be fully visible.</li>
          <li>Use a plain/light background.</li>
          <li>Good lighting, no shadows.</li>
          <li>No blur or low-quality images.</li>
          <li>No sunglasses, masks, or cropped faces.</li>
          <li>Upload a recent passport-style photo.</li>
        </ul>
      </div>

      <div className="check-list">
        <label className="check-item">
          <input type="checkbox" name="termsAccepted" checked={form.termsAccepted} onChange={onChange} />
          <span>I have read and accepted the <strong>Terms &amp; Conditions</strong> of this service</span>
        </label>
        <label className="check-item">
          <input type="checkbox" name="specialCondition" checked={form.specialCondition} onChange={onChange} />
          <span>I confirm that I am not physically challenged / pregnant or under similar special conditions</span>
        </label>
      </div>
      <div className="actions">
        <button type="submit" className="btn-primary">Proceed to Payment &nbsp;→</button>
      </div>
    </form>
  );
};

const Step1 = ({ form: _form, goStep, handlePayment, serviceFee }) => (
  <div>
    <div className="step-header">
      <div className="step-icon icon-amber">💳</div>
      <div>
        <div className="step-title">Secure Payment</div>
        <div className="step-subtitle">Complete your payment to begin document processing</div>
      </div>
    </div>
    <div className="info-panel amber">
      <span className="info-icon">🔒</span>
      <h3>Service Fee</h3>
      <div className="amount">₹ {serviceFee}</div>
      <p>One-time fee for verification, attestation &amp; processing.<br />100% Secure &bull; Instant confirmation</p>
    </div>
    <div className="timeline">
      <TlItem icon="✅" bg="#e0f2fe" title="Documents Received" desc="All your documents submitted successfully." badge="bdone" />
      <TlItem icon="💳" bg="#fef3c7" title="Payment Required" desc="Complete payment to unlock document review." badge="bprog" />
      <TlItem icon="🔍" bg="#f1f5f9" title="Document Review" desc="Our team verifies your documents (24–48 hrs)." badge="bwait" last />
    </div>
    <div className="actions">
      <button className="btn-secondary" onClick={() => goStep(0)}>← Back</button>
      <button className="btn-primary sky" onClick={handlePayment}>💳 &nbsp;Pay ₹{serviceFee} Now</button>
    </div>
  </div>
);

const Step2 = ({ appStatus, adminMessage, rejectionReason, goStep, onRetry }) => {
  const isPendingApproval = appStatus === "pending_approval";
  const isPending = appStatus === "pending";
  const isWaiting = isPendingApproval || isPending;
  const isApproved = appStatus === "approved";
  const isRejected = appStatus === "rejected";
  const isChangesRequested = appStatus === "changes_requested";

  return (
    <div>
      <div className="step-header">
        <div className={`step-icon ${isRejected ? "icon-amber" : isApproved ? "icon-sky" : isChangesRequested ? "icon-amber" : "icon-blue"}`}>
          {isRejected ? "❌" : isApproved ? "✅" : isChangesRequested ? "⚠️" : "⏳"}
        </div>
        <div>
          <div className="step-title">
            {isRejected ? "Application Rejected" : isApproved ? "Documents Verified" : isChangesRequested ? "Changes Requested" : "Waiting for Admin Approval"}
          </div>
          <div className="step-subtitle">
            {isRejected
              ? "Your application was rejected by the admin"
              : isApproved
              ? "Your documents have been approved! Please proceed to payment"
              : isChangesRequested
              ? "The admin has requested some changes to your application"
              : "Your application has been submitted and is pending admin review"}
          </div>
        </div>
      </div>

      {isWaiting && (
        <div className="info-panel blue">
          <span className="info-icon">⏳</span>
          <h3>Pending Admin Approval</h3>
          <p>Your application has been submitted successfully and is waiting for admin approval.<br /><strong>Estimated: 24–48 business hours</strong></p>
        </div>
      )}

      {isApproved && (
        <div className="info-panel sky">
          <span className="info-icon">✅</span>
          <h3>Verification Successful</h3>
          <p>All documents are clear and verified. You can now proceed to make the payment to start processing.</p>
        </div>
      )}

      {isRejected && (
        <div className="info-panel amber">
          <span className="info-icon">❌</span>
          <h3>Application Rejected</h3>
          <div style={{ background: "rgba(255,255,255,0.6)", padding: "12px", borderRadius: "10px", margin: "10px 0", border: "1px solid #fde68a" }}>
            <p style={{ fontWeight: 700, color: "#92400e", marginBottom: 4 }}>Rejection Reason:</p>
            <p style={{ color: "#b45309", fontSize: "14px" }}>{rejectionReason || adminMessage || "Your application was rejected. Please contact support for more information."}</p>
          </div>
          <p>Please contact our support team or submit a new application.</p>
        </div>
      )}

      {isChangesRequested && (
        <div className="info-panel amber">
          <span className="info-icon">⚠️</span>
          <h3>Changes Requested</h3>
          <div style={{ background: "rgba(255,255,255,0.6)", padding: "12px", borderRadius: "10px", margin: "10px 0", border: "1px solid #fde68a" }}>
            <p style={{ fontWeight: 700, color: "#92400e", marginBottom: 4 }}>Admin Message:</p>
            <p style={{ color: "#b45309", fontSize: "14px" }}>{adminMessage || "Please review your documents and update them."}</p>
          </div>
          <p>Please update your application and resubmit.</p>
        </div>
      )}

      <div className="timeline">
        <TlItem icon="✅" bg="#e0f2fe" title="Documents Submitted" desc="All documents received." badge="bdone" />
        <TlItem
          icon={isApproved ? "✅" : isRejected ? "❌" : isChangesRequested ? "⚠️" : "⏳"}
          bg={isApproved ? "#e0f2fe" : (isRejected || isChangesRequested) ? "#fee2e2" : "#dbeafe"}
          title="Admin Approval"
          desc={isRejected ? "Application was rejected." : isChangesRequested ? "Changes requested by admin." : isApproved ? "Admin approved!" : "Waiting for admin review."}
          badge={isApproved ? "bdone" : (isRejected || isChangesRequested) ? "bwait" : "bprog"}
        />
        <TlItem icon="💳" bg="#f1f5f9" title="Secure Payment" desc="Proceed to payment after approval." badge={isApproved ? "bprog" : "bwait"} />
        <TlItem icon="🏛️" bg="#f1f5f9" title="University Verification" desc="Sent to university after payment." badge="bwait" last />
      </div>

      <div className="actions">
        {(isRejected || isChangesRequested) && (
          <button className="btn-primary" onClick={onRetry}>
            🔄 &nbsp;{isChangesRequested ? "Update Application" : "Submit New Application"}
          </button>
        )}
        {isApproved && (
          <button className="btn-primary sky" onClick={() => goStep(2)}>
            💳 &nbsp;Proceed to Payment
          </button>
        )}
        {isWaiting && (
          <button className="btn-secondary" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>
            ⏳ &nbsp;Waiting for Admin Approval...
          </button>
        )}
      </div>
    </div>
  );
};

const Step3 = ({ reset, handleRefund }) => (
  <div>
    <div className="step-header">
      <div className="step-icon icon-purple">🏛️</div>
      <div>
        <div className="step-title">University / Board Verification</div>
        <div className="step-subtitle">Documents sent to the official authority</div>
      </div>
    </div>
    <div className="info-panel indigo">
      <span className="info-icon">🏛️</span>
      <h3>Sent to University / Board</h3>
      <p>Your documents have been forwarded to the respective authority.<br /><strong>Estimated: 3–7 working days</strong></p>
    </div>
    <div className="timeline">
      <TlItem icon="✅" bg="#e0f2fe" title="Documents Submitted" badge="bdone" />
      <TlItem icon="✅" bg="#e0f2fe" title="Payment Confirmed" badge="bdone" />
      <TlItem icon="✅" bg="#e0f2fe" title="Document Review Cleared" badge="bdone" />
      <TlItem icon="🏛️" bg="#e0e7ff" title="University Verification — Active" desc="Official authority is processing your request." badge="bprog" />
      <TlItem icon="🚀" bg="#f1f5f9" title="Final Delivery" desc="Digital & physical copies delivered." badge="bwait" last />
    </div>
    <div className="actions">
      <button className="btn-primary" onClick={reset}>+ Start New Request</button>
      <button
        className="btn-secondary"
        style={{
          marginLeft: "10px",
          backgroundColor: "#ef4444",
          color: "#fff"
        }}
        onClick={handleRefund}
      >
        💸 Refund Payment
      </button>
    </div>
  </div>
);

const Step4 = ({ form, reset }) => (
  <div className="success-wrap">
    <div className="step-header">
      <div className="step-icon icon-sky">🚀</div>
      <div>
        <div className="step-title">All Done! Delivery Complete</div>
        <div className="step-subtitle">Your verified documents are ready</div>
      </div>
    </div>
    <div className="info-panel sky" style={{ padding: 36 }}>
      <span className="star-burst">🎉</span>
      <h3 style={{ fontSize: 22, color: "#166534" }}>Congratulations!</h3>
      <p style={{ fontSize: 14, marginTop: 8 }}>Your documents have been successfully verified and delivered.</p>
      {form.email && <div className="info-chip">📧 Sent to: <strong>{form.email}</strong></div>}
      {form.referenceNumber && <div className="info-chip" style={{ marginLeft: 8 }}>🔖 Ref: <strong>{form.referenceNumber}</strong></div>}
    </div>
    <div className="timeline">
      <TlItem icon="✅" bg="#e0f2fe" title="Documents Submitted" badge="bdone" />
      <TlItem icon="✅" bg="#e0f2fe" title="Payment Confirmed" badge="bdone" />
      <TlItem icon="✅" bg="#e0f2fe" title="Document Review Cleared" badge="bdone" />
      <TlItem icon="✅" bg="#e0f2fe" title="University Verified" badge="bdone" />
      <TlItem icon="🚀" bg="#e0f2fe" title="Delivered!" badge="bdone" last />
    </div>
    <div className="actions">
      <button className="btn-primary" onClick={reset}>+ Start New Request</button>
    </div>
  </div>
);

const NumberedRoadmap = ({ activeStep = 0 }) => {
  const steps = [
    { num: 1, label: "Upload Documents", color: "from-blue-500 to-cyan-400", shadow: "shadow-blue-500/40" },
    { num: 2, label: "Verification", color: "from-indigo-500 to-purple-400", shadow: "shadow-indigo-500/40" },
    { num: 3, label: "Payment", color: "from-pink-500 to-rose-400", shadow: "shadow-pink-500/40" },
    { num: 4, label: "Final Submission", color: "from-emerald-500 to-teal-400", shadow: "shadow-emerald-500/40" }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-4 sm:px-6 mt-4">
      <div className="relative flex justify-between items-start">

        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;
          const isUpcoming = index > activeStep;

          return (
            <React.Fragment key={index}>
              <div className="relative z-10 flex flex-col items-center w-[60px] sm:w-[100px]">

                {/* Circle */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.15 : 1,
                    backgroundColor: isCompleted || isActive ? "#fff" : "#f8fafc",
                    borderColor: isCompleted || isActive ? "transparent" : "#e2e8f0"
                  }}
                  transition={{ duration: 0.4 }}
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 text-xs sm:text-sm font-bold transition-all relative
                    ${isActive ? `bg-gradient-to-br ${step.color} shadow-lg ${step.shadow} text-white border-transparent` : ""}
                    ${isCompleted ? "bg-slate-800 text-white border-slate-800" : ""}
                    ${isUpcoming ? "text-slate-400 border-slate-200 bg-white" : ""}
                  `}
                >
                  {/* Gradient background for active state to override border */}
                  {isActive && (
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color}`} />
                  )}
                  {isCompleted && (
                    <div className="absolute inset-0 rounded-full bg-slate-800" />
                  )}

                  {/* Number or Checkmark */}
                  <span className="relative z-10 flex items-center justify-center">
                    {isCompleted ? (
                      <motion.svg
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    ) : (
                      <span className={isActive ? "text-white" : "text-slate-500"}>{step.num}</span>
                    )}
                  </span>

                  {/* Glow ring for active */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: [0.4, 0.1, 0.4], scale: [1.2, 1.4, 1.2] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} -z-10`}
                    />
                  )}
                </motion.div>

                {/* Label */}
                <div className="mt-2 text-center">
                  <div className={`text-[8px] sm:text-[9px] font-bold uppercase tracking-wider mb-0.5 transition-colors duration-300
                    ${isActive ? "text-blue-600" : isCompleted ? "text-slate-500" : "text-slate-400"}
                  `}>
                    Step {step.num}
                  </div>
                  <div className={`text-[9px] sm:text-[10px] font-bold transition-colors duration-300 w-full leading-tight
                    ${isActive ? "text-slate-900" : isCompleted ? "text-slate-700" : "text-slate-400"}
                  `}>
                    {step.label}
                  </div>
                </div>
              </div>

              {/* Connecting Arrow */}
              {index < steps.length - 1 && (
                <div className="flex-1 flex items-center justify-center mt-3 sm:mt-4 px-1">
                  <div className="w-full relative flex items-center">
                    <div className={`w-full h-[1px] sm:h-[2px] transition-colors duration-500 ${index < activeStep ? "bg-blue-500" : "bg-slate-200"}`} />
                    <svg className={`absolute right-0 -mr-1 w-3 h-3 transition-colors duration-500 ${index < activeStep ? "text-blue-500" : "text-slate-200"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const HorizontalRoadmap = () => {
  const [loopIndex, setLoopIndex] = useState(0);

  const steps = [
    { num: 1, label: "Upload Documents", hint: "Submitting digital paperwork", icon: "📤", color: "#3b82f6", bg: "#eff6ff" },
    { num: 2, label: "Admin Verification", hint: "Team checks for authenticity", icon: "🔍", color: "#22c55e", bg: "#f0fdf4" },
    { num: 3, label: "Secure Payment", hint: "Processing application fees", icon: "💳", color: "#e11d48", bg: "#fff1f2" },
    { num: 4, label: "Delivery Successful", hint: "Documents delivered safely", icon: "🚚", color: "#64748b", bg: "#f8fafc" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setLoopIndex(prev => (prev + 1) % (steps.length + 1));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hp-container">
      <div className="hp-track-bg">
        <div className="hp-track-fill" style={{ width: `${(loopIndex / steps.length) * 100}%` }} />
      </div>
      <div className="hp-steps">
        {steps.map((step, i) => {
          const isDone = i < loopIndex;
          const isActive = i === loopIndex;
          return (
            <div key={i} className={`hp-step ${isDone ? "done" : ""} ${isActive ? "active" : ""}`}>
              <div
                className="hp-circle"
                style={{
                  borderColor: isActive || isDone ? step.color : "#e2e8f0",
                  background: isActive ? step.bg : isDone ? "#f0f9ff" : "#ffffff",
                  boxShadow: isActive ? `0 0 15px ${step.color}44` : "none",
                  filter: !isActive && !isDone ? "grayscale(1) opacity(0.4)" : "none",
                  position: "relative"
                }}
              >
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-[11px] font-extrabold text-white flex items-center justify-center border-2 border-white shadow-sm transition-all duration-300"
                  style={{
                    background: isDone ? "#0ea5e9" : isActive ? step.color : "#94a3b8"
                  }}
                >
                  {isDone ? "✓" : step.num}
                </div>
                {step.icon}
              </div>
              <div style={{ textAlign: "center" }}>
                <div className="hp-label" style={{
                  color: isDone ? "#15803d" : isActive ? step.color : "#64748b",
                  transition: "all 0.3s ease",
                  fontWeight: "800",
                  fontSize: "14px",
                  whiteSpace: "nowrap"
                }}>
                  {step.label}
                </div>
                <div style={{ fontSize: "10px", color: isDone ? "#22c55e" : isActive ? step.color : "#64748b", marginTop: "2px", fontWeight: "600", opacity: 1, whiteSpace: "nowrap" }}>
                  {step.hint}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Apply() {
  const location = useLocation();
  const navigate = useNavigate();
  const [flowType, setFlowType] = useState('manual');
  const [activeStep, setActiveStep] = useState(0);
  const [trackId, setTrackId] = useState("");
  const [animKey, setAnimKey] = useState(0);

  const [applicationId, setApplicationId] = useState(() => localStorage.getItem("applicationId") || null);
  const [appStatus, setAppStatus] = useState("pending_approval");
  const [adminMessage, setAdminMessage] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [serviceFee, setServiceFee] = useState(20);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userData = user?.data || {};
    return {
      fullName: userData.name || "",
      altPhone: "",
      email: userData.email || "",
      phone: "",
      requirement: "",
      referenceNumber: "",
      termsAccepted: false,
      specialCondition: false,
    };
  });

  const [upProg, setUpProg] = useState({ cmm: 0, degree: 0, internship: 0 });
  const [upNames, setUpNames] = useState({ cmm: null, degree: null, internship: null });
  const [upCompressed, setUpCompressed] = useState({ cmm: null, degree: null, internship: null });
  const [degrees, setDegrees] = useState([{ id: 1, type: "", university: "", course: "", college: "" }]);

  const [digiModal, setDigiModal] = useState({ open: false, type: null, label: "" });
  const hasAppliedUniversityRef = useRef(false);

  // ✅ Handle University Autofill from Search
  useEffect(() => {
    if (location.state?.university && !hasAppliedUniversityRef.current) {
      // We no longer set flowType here so the SelectionPanel opens
      setDegrees([
        {
          id: 1,
          type: "",
          university: location.state.university,
          course: "",
          college: "",
        },
      ]);
      hasAppliedUniversityRef.current = true;
    }
  }, [location.state]);

  useEffect(() => {
    if (!document.getElementById("apply-css")) {
      const s = document.createElement("style");
      s.id = "apply-css";
      s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
  }, []);

  // ✅ Dynamic API Base
  // const API_BASE = API_BASE_URL; // Removed as it is imported at the top

  const goStep = useCallback((n) => {
    setActiveStep(n);
    setAnimKey(k => k + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 🔄 Restore state on refresh
  useEffect(() => {
    const restoreState = async () => {
      const storedId = localStorage.getItem("applicationId");
      const storedFlow = localStorage.getItem("flowType");
      const user = JSON.parse(localStorage.getItem("user"));
      const userEmail = user?.data?.email;

      if (storedFlow) setFlowType(storedFlow);

      let fetchUrl = "";
      if (storedId) {
        fetchUrl = `${API_BASE}/api/application/${storedId}/status/`;
      } else if (userEmail) {
        fetchUrl = `${API_BASE}/api/application-status/?email=${userEmail}`;
      }

      if (fetchUrl) {
        try {
          const res = await fetch(fetchUrl);
          const data = await res.json();
          if (data.status) {
            setAppStatus(data.status);
            setAdminMessage(data.admin_message || "");
            setRejectionReason(data.rejection_reason || "");
            if (data.service_fee) {
              setServiceFee(data.service_fee);
            }
            if (data.application_id) {
              setApplicationId(data.application_id);
              localStorage.setItem("applicationId", data.application_id);
            }
            if (data.flow_type) {
              setFlowType(data.flow_type);
              localStorage.setItem("flowType", data.flow_type);
            }

            // Map status to step
            if (data.status === "approved") {
              if (data.payment_status === "Paid") goStep(3);
              else goStep(2);
            } else if (data.status === "pending_approval" || data.status === "pending") {
              goStep(1);
            } else if (data.status === "rejected" || data.status === "changes_requested") {
              goStep(1); // Stay on waiting screen to show message
            } else if (data.status === "delivered") {
              goStep(4);
            }
          }
        } catch {
          // Restore state error handled silently
        }
      }
    };
    restoreState();
  }, [goStep, API_BASE]);

  // 🔄 Status Polling while in Waiting Screen (activeStep 1)
  useEffect(() => {
    let interval;
    if (activeStep === 1 && applicationId) {
      const checkStatus = async () => {
        try {
          const res = await fetch(`${API_BASE}/api/application/${applicationId}/status/`);
          const data = await res.json();
          if (data.status) {
            setAppStatus(data.status);
            setAdminMessage(data.admin_message || "");
            setRejectionReason(data.rejection_reason || "");
            if (data.service_fee) {
              setServiceFee(data.service_fee);
            }
            if (data.status === "approved") {
              // keep step 1, but Step2 will show proceed to payment
            } else if (data.status === "rejected" || data.status === "changes_requested") {
              // keep step 1, Step2 will show rejection or changes requested message
            } else if (data.status === "delivered") {
              goStep(4);
            }
          }
        } catch {
          // Polling error handled silently
        }
      };

      checkStatus(); // Initial check
      interval = setInterval(checkStatus, 5000); // Check every 5 seconds
    }
    return () => clearInterval(interval);
  }, [activeStep, applicationId, API_BASE, goStep]);

  const onChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setForm(f => ({ ...f, [name]: finalValue }));
    
    // Real-time validation
    let errorMsg = "";
    if (name === "fullName") errorMsg = validateName(finalValue);
    else if (name === "email") errorMsg = validateEmail(finalValue);
    else if (name === "phone" || name === "altPhone") errorMsg = validatePhone(finalValue);
    
    setErrors(prev => ({ ...prev, [name]: errorMsg }));
  }, []);

  const addDeg = useCallback(() => {
    const id = Math.max(0, ...degrees.map(d => d.id)) + 1;
    setDegrees(ds => [...ds, { id, type: "", university: "", course: "", college: "" }]);
  }, [degrees]);

  const rmDeg = useCallback((id) => {
    setDegrees(ds => ds.filter(d => d.id !== id));
  }, []);

  const chDeg = useCallback((id, field, val) => {
    setDegrees(ds => ds.map(d => d.id === id ? { ...d, [field]: val } : d));
  }, []);

  const onFile = useCallback((type) => async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUpNames(p => ({ ...p, [type]: file.name }));
    setUpProg(p => ({ ...p, [type]: 5 }));
    const result = await compressImage(file);
    setUpCompressed(p => ({ ...p, [type]: result }));
    let v = 10;
    const t = setInterval(() => {
      v += Math.random() * 15 + 8;
      if (v >= 100) { v = 100; clearInterval(t); }
      setUpProg(p => ({ ...p, [type]: Math.round(v) }));
    }, 110);
  }, []);

  const delFile = useCallback((type) => {
    setUpProg(p => ({ ...p, [type]: 0 }));
    setUpNames(p => ({ ...p, [type]: null }));
    setUpCompressed(p => ({ ...p, [type]: null }));
  }, []);

  const openDigiLocker = useCallback(() => {
    navigate("/signin");
  }, [navigate]);

  const handleDigiLockerFetch = useCallback((docs) => {
    const { type } = digiModal;
    if (!type || !docs.length) return;

    if (type === 'all') {
      // Map docs to available types
      const mapping = {
        degree: 'degree',
        marksheet: 'cmm',
        provisional: 'degree',
        migration: 'internship' // Just as a fallback for demo
      };

      docs.forEach(doc => {
        const targetType = mapping[doc.id];
        if (targetType) {
          setUpNames(p => ({ ...p, [targetType]: `[DigiLocker] ${doc.name}` }));
          setUpProg(p => ({ ...p, [targetType]: 100 }));
          setUpCompressed(p => ({ ...p, [targetType]: { compressed: false } }));
        }
      });
    } else {
      const docName = docs.map(d => d.name).join(", ");
      setUpNames(p => ({ ...p, [type]: `[DigiLocker] ${docName}` }));
      setUpProg(p => ({ ...p, [type]: 100 }));
      setUpCompressed(p => ({ ...p, [type]: { compressed: false } }));
    }
  }, [digiModal]);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackId.trim()) { alert("Please enter a tracking ID"); return; }
    alert(`Searching for Application ID: ${trackId}\n\n[Demo Mode]: Current status is "Processing at University"`);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const nameErr = validateName(form.fullName);
    if (nameErr) newErrors.fullName = nameErr;
    const emailErr = validateEmail(form.email);
    if (emailErr) newErrors.email = emailErr;
    const phoneErr = validatePhone(form.phone);
    if (phoneErr) newErrors.phone = phoneErr;
    const altPhoneErr = validatePhone(form.altPhone);
    if (altPhoneErr) newErrors.altPhone = altPhoneErr;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert("Please fix the errors in the form before submitting.");
      return;
    }

    if (!form.requirement || !form.termsAccepted) {
      alert("Please fill all required fields (*) and accept Terms");
      return;
    }

    const hasValidDegree = degrees.length > 0 && degrees.some(d => d.university && d.university.trim() !== "");
    if (!hasValidDegree) {
      alert("Please provide your University / Board details.");
      return;
    }

    const trackingId = "TRK" + Date.now().toString().slice(-6);

    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      formData.append("trackingId", trackingId);
      formData.append("degrees", JSON.stringify(degrees));
      formData.append("flowType", flowType); // Save flowType with submission

      Object.keys(upCompressed).forEach(type => {
        const fileData = upCompressed[type];
        if (fileData?.file) formData.append(type, fileData.file);
      });

      const res = await fetch(`${API_BASE}/api/submit/`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Your application has been submitted successfully and is waiting for admin approval.");
        setApplicationId(data.application_id);
        setAppStatus("pending_approval");
        setAdminMessage("");
        setRejectionReason("");
        localStorage.setItem("applicationId", data.application_id);
        localStorage.setItem("flowType", flowType); // Persist flowType locally
        goStep(1);
      } else {
        alert(data.error || "Submission failed");
      }
    } catch (error) {
      // Frontend error handled silently
      alert("Something went wrong: " + error.message);
    }
  };

  const handleRefund = async () => {
    const confirmRefund = window.confirm("Are you sure you want to refund?");
    if (!confirmRefund) return;

    try {
      const res = await fetch(`${API_BASE}/api/refund/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          application_id: applicationId
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Refund Successful ✅\nRefund ID: ${data.refund_id}`);
      } else {
        alert(data.error || "Refund Failed ❌");
      }

    } catch {
      console.error("Refund Error");
      alert("Refund error ❌");
    }
  };

  const handlePayment = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/create-order/${applicationId}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 20,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || "Failed to create order");
        return;
      }

      const data = await res.json();

      const cashfree = window.Cashfree({
        mode: "sandbox", // Set to "sandbox" for testing
      });

      const checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal",
      };

      cashfree.checkout(checkoutOptions).then(async (result) => {
        if (result.error) {
          alert("Payment Failed: " + result.error.message);
          return;
        }
        
        if (result.paymentDetails || result.redirect === false) {
          try {
            const verifyRes = await fetch(`${API_BASE}/api/verify-payment/${data.order_id}/`);
            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.status === "PAID") {
              alert("Payment Successful ✅");
              goStep(3);
            } else {
              alert("Payment Failed ❌");
            }
          } catch (error) {
            alert("Verification error ❌");
          }
        }
      });
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment error ❌: " + error.message);
    }
  };

  const reset = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userData = user?.data || {};
    setForm({
      fullName: userData.name || "",
      altPhone: "",
      email: userData.email || "",
      phone: "",
      requirement: "",
      referenceNumber: "",
      termsAccepted: false,
      specialCondition: false
    });
    setDegrees([]);
    setUpProg({ cmm: 0, degree: 0, internship: 0 });
    setUpNames({ cmm: null, degree: null, internship: null });
    setUpCompressed({ cmm: null, degree: null, internship: null });
    setDegrees([{ id: 1, type: "", university: "", course: "", college: "" }]);
    setApplicationId(null);
    setAppStatus("pending_approval");
    setAdminMessage("");
    setRejectionReason("");
    setFlowType(null);
    localStorage.removeItem("applicationId");
    localStorage.removeItem("flowType");
    goStep(0);
  };

  const fillPct = Math.round(((activeStep + 1) / (PROC.length)) * 100);

  return (
    <div className="app-shell">
      <div className="portal-panel">
        <div className="portal-wrap">
          <HorizontalRoadmap activeStep={activeStep} />
          <NumberedRoadmap activeStep={activeStep} />

          <div className="main-card card-anim" key={animKey}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep + (flowType || "")}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {activeStep === 0 && (
                  <Step0
                    form={form} errors={errors} onChange={onChange}
                    degrees={degrees} addDeg={addDeg} rmDeg={rmDeg} chDeg={chDeg}
                    upProg={upProg} upNames={upNames} upCompressed={upCompressed}
                    onFile={onFile} delFile={delFile}
                    onDigiLocker={openDigiLocker}
                    onSubmit={onSubmit}
                    adminMessage={adminMessage}
                  />
                )}
                {activeStep === 1 && (
                  <Step2
                    appStatus={appStatus}
                    adminMessage={adminMessage}
                    rejectionReason={rejectionReason}
                    goStep={goStep}
                    onRetry={() => goStep(0)}
                  />
                )}
                {activeStep === 2 && (
                  <Step1
                    form={form}
                    goStep={() => goStep(1)}
                    handlePayment={handlePayment}
                    serviceFee={serviceFee}
                  />
                )}
                {activeStep === 3 && <Step3 reset={reset} handleRefund={handleRefund} />}
                {activeStep === 4 && <Step4 form={form} reset={reset} />}
              </motion.div>
            </AnimatePresence>
          </div>


        </div>
      </div>
    </div>
  );
}
