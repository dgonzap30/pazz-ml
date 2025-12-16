import React, { useState, useEffect } from 'react';
import {
  Server,
  Smartphone,
  ShieldCheck,
  Database,
  Cpu,
  GitBranch,
  FileText,
  CheckCircle,
  Globe,
  Lock,
  Layers,
  Zap,
  DollarSign,
  TrendingUp,
  Clock,
  X,
  HelpCircle,
  FileKey,
  ChevronRight,
  Activity,
  Box,
  ChevronDown,
  ChevronUp,
  Users,
  AlertTriangle,
  Shield,
  Eye,
  Rocket,
  Network
} from 'lucide-react';

// --- Type Definitions ---

interface NodeData {
  id: string;
  title: string;
  icon: React.ReactElement;
  description: string;
  details: string;
  tech: string;
  compliance: string;
  sovereigntyMsg: string;
}

interface NodesDataMap {
  [key: string]: NodeData;
}

interface ROIDataItem {
  metric: string;
  manual: number;
  auto: number;
  unit: string;
  delta: string;
  desc: string;
}

interface RoadmapPhaseItem {
  phase: string;
  subtitle: string;
  time: string;
  desc: string;
  color: string;
  icon: React.ReactElement;
  deliverables: string[];
  dataRequirement?: string;
  status?: 'ready' | 'pending' | 'critical';
}

interface DataGapRow {
  feature: string;
  arModel: string;
  pdModel: string;
  lmdStatus: string;
  arReady: boolean;
  pdReady: boolean;
}

interface ExecutiveSummaryPoint {
  title: string;
  description: string;
  icon: React.ReactElement;
  color: 'orange';
}

// --- Data Models ---

const nodesData: NodesDataMap = {
  ingestion: {
    id: 'ingestion',
    title: 'Ingestion Layer',
    icon: <Smartphone className="w-6 h-6" />,
    description: 'Web/Mobile app collects raw data.',
    details: 'Captures PII, consent signatures, and document images. Normalizes input for processing. Handles session management and initial data validation.',
    tech: 'React Native / Web Forms',
    compliance: 'Consent Logs',
    sovereigntyMsg: 'Data collection point. Explicit user consent for cross-border data transfer must be logged here to satisfy LFPDPPP.'
  },
  orchestration: {
    id: 'orchestration',
    title: 'Orchestrator',
    icon: <Activity className="w-6 h-6" />,
    description: 'Workflow state manager.',
    details: 'Manages the lifecycle of the application. Handles retries if APIs fail and maintains state (Saga Pattern). Ensures no application is lost in limbo.',
    tech: 'Temporal / Netflix Conductor',
    compliance: 'Audit Trail',
    sovereigntyMsg: 'Orchestration logs containing PII must have a "Shadow Copy" maintained in a Mexican data center for CNBV auditability.'
  },
  verification: {
    id: 'verification',
    title: 'Verification API',
    icon: <Server className="w-6 h-6" />,
    description: 'External Data Checks.',
    details: 'Parallel calls to SAT (Tax), RENAPO (ID), and Utility providers to verify existence. Returns boolean flags and raw data payloads.',
    tech: 'Rest APIs / GraphQL',
    compliance: 'Data Minimization',
    sovereigntyMsg: 'Connections to SAT/RENAPO are government endpoints. Latency is lower if the connector is hosted in-region (Mexico).'
  },
  fraud: {
    id: 'fraud',
    title: 'Fraud Engine',
    icon: <ShieldCheck className="w-6 h-6" />,
    description: 'Security Pre-Screen.',
    details: 'Detects synthetic IDs, deepfakes, and altered PDF documents before credit scoring. Uses computer vision to match selfie-to-ID.',
    tech: 'Computer Vision / Anomaly Detection',
    compliance: 'Security Logs',
    sovereigntyMsg: 'Biometric vectors generated here are considered "Sensitive Personal Data" and require the highest level of encryption and residency protections.'
  },
  feature_store: {
    id: 'feature_store',
    title: 'Feature Store',
    icon: <Database className="w-6 h-6" />,
    description: 'Engineered Data Features.',
    details: 'Calculates and stores variables like "avg_monthly_balance", "income_stability_index", and "bureau_hit_rate".',
    tech: 'Feast / Redis',
    compliance: 'Shadow Copy (Mexico)',
    sovereigntyMsg: 'CRITICAL: This database holds the complete financial profile. Under CNBV outsourcing rules, if the primary is in AWS US-East, a real-time sync to a local node is recommended.'
  },
  inference: {
    id: 'inference',
    title: 'Inference Engine',
    icon: <Cpu className="w-6 h-6" />,
    description: 'ML Scoring Models.',
    details: 'Runs Base Model + Partner Specific Heads. Generates a probability vector [P(Approval), P(Default), P(Churn)].',
    tech: 'XGBoost / TensorFlow Serving',
    compliance: 'Model Versioning',
    sovereigntyMsg: 'The model itself can run anywhere, but the input payload (customer data) must be transmitted via encrypted tunnels that prevent third-party access.'
  },
  decision: {
    id: 'decision',
    title: 'Decision Engine',
    icon: <GitBranch className="w-6 h-6" />,
    description: 'Business Rules.',
    details: 'Applies hard knock-out rules (e.g., "Must be > 21") and partner specific credit policy thresholds to the ML score.',
    tech: 'Rules Engine (Drools/EasyRules)',
    compliance: 'Policy Audit',
    sovereigntyMsg: 'Decision logic must be transparent. If a regulator audits, you must be able to reproduce the decision locally without relying solely on external cloud logs.'
  },
  explanation: {
    id: 'explanation',
    title: 'Explanation',
    icon: <FileText className="w-6 h-6" />,
    description: 'Why was this decided?',
    details: 'Generates SHAP values to explain rejection reasons to users (Regulatory Requirement). Converts complex vector math into human-readable text.',
    tech: 'SHAP / Lime',
    compliance: 'LFPDPPP Transparency',
    sovereigntyMsg: 'Explanation data is key for consumer rights (ARCO rights). Users have the right to know why they were rejected, requiring accessible local records.'
  },
  response: {
    id: 'response',
    title: 'Response',
    icon: <CheckCircle className="w-6 h-6" />,
    description: 'Final Verdict.',
    details: 'Delivers the decision, interest rate, and contract terms to the frontend. Triggers email/SMS notifications.',
    tech: 'API Gateway',
    compliance: 'Notification',
    sovereigntyMsg: 'Final contract generation must comply with NOM-151 (Digital Stamps) to be legally binding in Mexico.'
  }
};

const roiData: ROIDataItem[] = [
  {
    metric: 'Processing Cost',
    manual: 150,
    auto: 15,
    unit: 'USD / App',
    delta: '-90%',
    desc: 'Eliminates expensive manual analyst review time per application.'
  },
  {
    metric: 'Time to Decision',
    manual: 72,
    auto: 0.01,
    unit: 'Hours',
    delta: '-99%',
    desc: 'Reduces turnaround from days to seconds, preventing customer churn.'
  },
  {
    metric: 'Conversion Rate',
    manual: 12,
    auto: 18,
    unit: '% Sold',
    delta: '+50%',
    desc: 'Instant approvals capture impulse buyers before they shop elsewhere.'
  }
];

const roadmapPhases: RoadmapPhaseItem[] = [
  {
    phase: 'Phase 1: Foundation',
    subtitle: 'Golden Record',
    time: 'Months 1-4',
    desc: 'Establish verified identity and tax data infrastructure. Automate extraction of Constancia de Situación Fiscal via SAT APIs (CRiskCo/Belvo). Implement RENAPO CURP validation and biometric liveness detection.',
    color: 'bg-orange-400',
    icon: <Shield size={20} />,
    deliverables: [
      'SAT Integration (CRiskCo/Belvo APIs)',
      'RENAPO CURP + Biometric Liveness (INE match)',
      'Device Fingerprinting (geolocation, device data)',
      'LFPDPPP 2025 Compliance (Express Consent, CNBV Addendum)'
    ],
    status: 'ready'
  },
  {
    phase: 'Phase 2: A/R Model',
    subtitle: 'Committee Clone',
    time: 'Months 5-10',
    desc: 'Train XGBoost model on 10k-15k historical committee decisions. Implement traffic light system: Green Channel (>90%) auto-approve, Red Channel (<20%) auto-reject, Gray Channel for human review.',
    color: 'bg-orange-500',
    icon: <Users size={20} />,
    deliverables: [
      'XGBoost A/R model (Approved vs Rejected)',
      'Green Channel: Auto-Approve (Score > 90%)',
      'Red Channel: Auto-Reject (Score < 20%)',
      'Gray Channel: Human-in-the-Loop',
      'SHAP explainability for rejection reasons'
    ],
    dataRequirement: '10k-15k decisions',
    status: 'ready'
  },
  {
    phase: 'Phase 3: Risk Transition',
    subtitle: 'Shadow Mode',
    time: 'Months 11-18',
    desc: 'Deploy PD Model in shadow mode (scores without deciding). Include macro-economic features (interest rates, inflation index) to adjust for economic shifts. Apply Reject Inference via Fuzzy Augmentation to expand model coverage.',
    color: 'bg-orange-600',
    icon: <Eye size={20} />,
    deliverables: [
      'Shadow Mode PD deployment (parallel scoring)',
      'Macro-economic feature integration (rates, inflation)',
      'Early Payment Default calibration',
      'Reject Inference via Fuzzy Augmentation',
      'Model performance monitoring dashboard'
    ],
    dataRequirement: '~150+ defaults observed',
    status: 'pending'
  },
  {
    phase: 'Phase 4: Marketplace',
    subtitle: 'PD Launch & Orchestration',
    time: 'Month 19+',
    desc: 'Implement Champion/Challenger framework: 80% traffic to PD model, 20% remains on A/R for real-time benchmarking. Enable dynamic risk-based pricing. Onboard partners via Transfer Learning. Explore Federated Learning or Anonymized Pooled Learning for data sharing.',
    color: 'bg-orange-700',
    icon: <Globe size={20} />,
    deliverables: [
      'Champion/Challenger Framework (80/20 traffic split)',
      'PD Model as primary engine (300+ defaults trigger)',
      'Dynamic/Risk-Based Pricing',
      'Partner onboarding via Transfer Learning',
      'Federated Learning (or Anonymized Pooled as fallback)'
    ],
    dataRequirement: '300+ defaults required',
    status: 'critical'
  }
];

const dataGapAnalysis: DataGapRow[] = [
  {
    feature: 'Objective',
    arModel: 'Efficiency (replicate committee)',
    pdModel: 'Profitability (predict defaults)',
    lmdStatus: 'Needs Efficiency first',
    arReady: true,
    pdReady: false
  },
  {
    feature: 'Training Decisions',
    arModel: '10k-15k',
    pdModel: '20k-25k',
    lmdStatus: 'Feasible',
    arReady: true,
    pdReady: true
  },
  {
    feature: 'Bad Labels (Defaults)',
    arModel: '0 Required',
    pdModel: '240-300 Defaults',
    lmdStatus: 'CRITICAL GAP',
    arReady: true,
    pdReady: false
  },
  {
    feature: 'Current Verdict',
    arModel: 'Ready to Deploy',
    pdModel: 'Do Not Deploy Yet',
    lmdStatus: 'Phased Approach',
    arReady: true,
    pdReady: false
  }
];

const executiveSummary: ExecutiveSummaryPoint[] = [
  {
    title: 'Data Reality Check',
    description: 'With ~2% default rate, accumulating 300+ defaults requires processing 15,000+ applications. Rushing PD deployment without sufficient bad labels produces a model that cannot distinguish risk.',
    icon: <Database size={24} />,
    color: 'orange'
  },
  {
    title: 'Efficiency Before Profitability',
    description: 'The A/R model delivers immediate ROI by automating 60-70% of decisions while the portfolio matures. This funds the data collection needed for true risk prediction.',
    icon: <Rocket size={24} />,
    color: 'orange'
  },
  {
    title: 'Shadow Mode De-Risks Launch',
    description: 'Running PD in shadow mode allows calibration against real defaults without business risk. When the trigger threshold (300 defaults) is reached, the model is already battle-tested.',
    icon: <ShieldCheck size={24} />,
    color: 'orange'
  },
  {
    title: 'Economic Resilience',
    description: 'Models include macro-economic features (interest rates, inflation index) ensuring predictions adapt to changing economic conditions over the 18-month maturation period.',
    icon: <TrendingUp size={24} />,
    color: 'orange'
  },
  {
    title: 'Platform for Scale',
    description: 'Transfer Learning enables rapid partner onboarding. Federated Learning (partners run local training nodes) is ambitious but complex. If infrastructure proves too heavy, Anonymized Pooled Learning (hashed data in secure enclaves) serves as an intermediate step.',
    icon: <Network size={24} />,
    color: 'orange'
  }
];

// --- Components ---

interface SectionHeadingProps {
  number: string;
  title: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ number, title }) => (
  <div className="flex items-center gap-4 mb-10 group">
    <div className="w-10 h-10 rounded bg-orange-600 flex items-center justify-center text-sm font-black text-black shadow-[0_0_20px_rgba(234,88,12,0.5)] group-hover:scale-110 transition-transform">
      {number}
    </div>
    <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-400 font-bold group-hover:text-orange-500 transition-colors">
      {title}
    </h3>
    <div className="flex-1 h-px bg-gradient-to-r from-neutral-800 to-transparent ml-4"></div>
  </div>
);

const ResponsiveConnector: React.FC = () => (
  <div className="flex items-center justify-center text-neutral-800 py-2 md:py-0 md:px-4">
    {/* Mobile Arrow (Down) */}
    <ChevronDown strokeWidth={3} size={24} className="md:hidden text-neutral-700" />
    {/* Desktop Arrow (Right) */}
    <ChevronRight strokeWidth={3} size={24} className="hidden md:block text-neutral-800" />
  </div>
);

interface NodeCardProps {
  id: string;
  onClick: (node: NodeData) => void;
  showCompliance: boolean;
}

const NodeCard: React.FC<NodeCardProps> = ({ id, onClick, showCompliance }) => {
  const node = nodesData[id];
  const isCritical = ['feature_store', 'verification', 'inference'].includes(id);

  // Base Styles
  const baseStyles = "relative flex flex-col gap-4 p-6 rounded-2xl border bg-neutral-900/40 backdrop-blur-sm transition-all duration-300 cursor-pointer group w-full md:w-[240px] flex-shrink-0";

  // Interaction Styles
  const interactionStyles = "hover:-translate-y-1 active:scale-95 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  // Compliance/State Styles
  const defaultBorder = "border-neutral-800 hover:border-orange-500/50 hover:bg-neutral-900";
  const complianceBorder = (showCompliance && isCritical)
    ? "border-orange-500 shadow-[0_0_25px_rgba(234,88,12,0.15)] bg-neutral-900 ring-1 ring-orange-500/20"
    : defaultBorder;

  return (
    <button
      onClick={() => onClick(node)}
      className={`${baseStyles} ${interactionStyles} ${complianceBorder} text-left`}
      aria-label={`View details for ${node.title}: ${node.description}`}
      type="button"
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-xl border ${showCompliance && isCritical ? 'bg-orange-950/40 border-orange-500/40 text-orange-500' : 'bg-black border-neutral-800 text-neutral-500 group-hover:text-orange-500 group-hover:border-orange-500/30'} transition-colors duration-300`}>
          {node.icon}
        </div>
        {showCompliance && isCritical && (
          <div className="flex items-center gap-1 text-[10px] text-orange-500 font-bold uppercase tracking-wider bg-orange-950/50 px-2 py-1 rounded border border-orange-500/30 animate-pulse">
            <Lock size={10} /> Localize
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="font-bold text-base text-neutral-200 group-hover:text-white leading-tight">
          {node.title}
        </h4>
        <p className="text-xs text-neutral-500 font-medium group-hover:text-neutral-400 leading-relaxed line-clamp-2">
          {node.description}
        </p>
      </div>
    </button>
  );
};

interface DetailModalProps {
  node: NodeData | null;
  onClose: () => void;
  showCompliance: boolean;
}

const DetailModal: React.FC<DetailModalProps> = ({ node, onClose, showCompliance }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Lock body scroll when modal is open (modal content can still scroll)
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (!node) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div
        className="bg-neutral-900 border border-neutral-800 w-full max-w-2xl flex flex-col rounded-3xl shadow-2xl overflow-hidden relative transform transition-all scale-100 max-h-[85dvh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Fixed Header */}
        <div className="bg-black/50 p-6 sm:p-8 border-b border-neutral-800 flex items-start justify-between shrink-0">
          <div className="flex gap-5 sm:gap-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-neutral-900 text-orange-500 border border-neutral-800 rounded-2xl flex items-center justify-center shadow-inner shrink-0">
              {React.cloneElement(node.icon, { className: "w-6 h-6 sm:w-8 sm:h-8" } as any)}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{node.title}</h2>
              <p className="text-sm sm:text-base text-neutral-400 font-medium mt-1">{node.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-white transition-colors bg-neutral-800/50 p-2 rounded-lg hover:bg-neutral-700"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto custom-scrollbar bg-neutral-900/50">
          {/* Main Details */}
          <div>
            <h3 className="text-[10px] sm:text-xs uppercase tracking-widest text-orange-500 font-bold mb-4">Technical Specification</h3>
            <div className="text-sm text-neutral-300 leading-7 bg-black/40 p-5 rounded-2xl border border-neutral-800 shadow-inner">
              {node.details}
            </div>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-black/30 p-4 rounded-xl border border-neutral-800/50">
              <h3 className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2 flex items-center gap-2">
                <Cpu size={12} /> Tech Stack
              </h3>
              <p className="text-sm text-neutral-200 font-mono">{node.tech}</p>
            </div>
            <div className="bg-black/30 p-4 rounded-xl border border-neutral-800/50">
              <h3 className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold mb-2 flex items-center gap-2">
                <ShieldCheck size={12} /> Compliance Goal
              </h3>
              <p className="text-sm text-neutral-200 font-mono">{node.compliance}</p>
            </div>
          </div>

          {/* Compliance Special Section */}
          {showCompliance && (
            <div className="animate-fadeIn bg-orange-950/10 border border-orange-500/20 p-5 rounded-xl relative overflow-hidden">
              <div className="absolute -right-4 -top-4 p-4 opacity-10 rotate-12">
                <Globe size={120} className="text-orange-500" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <FileKey size={16} className="text-orange-500" />
                  <h3 className="text-xs font-bold text-orange-200 uppercase tracking-widest">Sovereignty Impact</h3>
                </div>
                <p className="text-sm text-orange-100/70 leading-relaxed max-w-[90%]">
                  {node.sovereigntyMsg}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Fixed Footer */}
        <div className="p-4 sm:p-6 border-t border-neutral-800 bg-black/80 backdrop-blur text-center shrink-0">
          <button onClick={onClose} className="text-xs text-neutral-500 hover:text-white font-bold uppercase tracking-widest transition-colors px-6 py-2 rounded-full hover:bg-neutral-800">
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};

interface DataSovereigntyInfoProps {
  onClose: () => void;
}

const DataSovereigntyInfo: React.FC<DataSovereigntyInfoProps> = ({ onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-fadeIn" onClick={onClose}>
    <div className="bg-neutral-900 border border-neutral-800 w-full max-w-xl flex flex-col rounded-3xl shadow-2xl relative max-h-[90dvh]" onClick={e => e.stopPropagation()}>
      <div className="p-8 overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="bg-orange-500/10 p-4 rounded-2xl border border-orange-500/20">
            <Globe className="text-orange-500 w-8 h-8" />
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors p-2">
            <X size={24} />
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-6">Data Sovereignty</h2>

        <div className="space-y-6 text-neutral-400 text-sm sm:text-base leading-relaxed font-light">
          <p>
            <strong className="text-white font-bold">Data Sovereignty</strong> implies that data is subject to the laws and governance structures within the nation it is collected.
          </p>
          <p>
            In the context of <strong className="text-white font-bold">Mexico (CNBV & Ley Fintech)</strong>, this is critical for financial institutions. It ensures that regulators can audit financial records even if the technology provider (AWS/GCP) is foreign.
          </p>
          <div className="bg-black p-6 rounded-xl border-l-4 border-orange-500 my-6">
            <h4 className="text-white font-bold mb-2 text-xs uppercase tracking-wide">Requirement: "Secondary Infrastructure"</h4>
            <p className="text-sm text-neutral-500">
              Regulations often require a <span className="text-orange-500 font-bold">"Shadow Copy"</span> or real-time backup of critical transaction logs to be maintained on infrastructure physically located in Mexico.
            </p>
          </div>
          <p>
            Toggle the <strong>Data Sovereignty Mode</strong> in the diagram to identify components requiring local replication.
          </p>
        </div>
      </div>

      <div className="p-6 border-t border-neutral-800 bg-black/50 text-center shrink-0 rounded-b-3xl">
         <button
          onClick={onClose}
          className="w-full bg-orange-600 hover:bg-orange-500 text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] text-xs uppercase tracking-widest"
        >
          I Understand
        </button>
      </div>
    </div>
  </div>
);

// --- Data Strategy View ---

const ExecutiveSummarySection: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white uppercase tracking-wider">
          Executive Summary: Why This Approach
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {executiveSummary.map((item, idx) => {
          const isLastItem = idx === executiveSummary.length - 1;
          return (
            <div
              key={idx}
              className={`bg-neutral-900/40 rounded-xl p-5 md:p-6 border border-neutral-800/50 ${isLastItem ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''}`}
            >
              <div className="flex gap-4">
                <div className="text-orange-500 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold mb-2 text-base">{item.title}</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DataGapAnalysisSection: React.FC = () => (
  <div className="mb-6">
    <div className="mb-4">
      <h3 className="text-lg font-bold text-white uppercase tracking-wider">
        Data Gap Analysis
      </h3>
    </div>

    {/* Desktop: Table layout */}
    <div className="hidden md:block bg-neutral-900/40 rounded-xl border border-neutral-800/50 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 p-4 bg-black/20 border-b border-neutral-800/30">
        <div className="text-xs font-bold text-neutral-400 uppercase tracking-wide">
          Feature
        </div>
        <div className="text-xs font-bold text-neutral-400 uppercase tracking-wide text-center">
          A/R Model
        </div>
        <div className="text-xs font-bold text-neutral-400 uppercase tracking-wide text-center">
          PD Model
        </div>
        <div className="text-xs font-bold text-neutral-400 uppercase tracking-wide text-center">
          LMD Status
        </div>
      </div>

      {/* Table Body */}
      {dataGapAnalysis.map((row, idx) => (
        <div
          key={idx}
          className={`grid grid-cols-4 gap-4 p-4 items-center
                     ${idx !== dataGapAnalysis.length - 1 ? 'border-b border-neutral-800/30' : ''}`}
        >
          <div className="text-sm text-neutral-300 font-medium">
            {row.feature}
          </div>
          <div className="flex items-center justify-center gap-2">
            {row.arReady ? (
              <CheckCircle size={16} className="text-emerald-500 shrink-0" />
            ) : (
              <AlertTriangle size={16} className="text-red-500 shrink-0" />
            )}
            <span className="text-sm text-neutral-400">{row.arModel}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            {row.pdReady ? (
              <CheckCircle size={16} className="text-emerald-500 shrink-0" />
            ) : (
              <AlertTriangle size={16} className="text-red-500 shrink-0" />
            )}
            <span className="text-sm text-neutral-400">{row.pdModel}</span>
          </div>
          <div className={`text-sm text-center font-medium
                         ${row.lmdStatus === 'CRITICAL GAP' ? 'text-red-400' : 'text-neutral-400'}`}>
            {row.lmdStatus}
          </div>
        </div>
      ))}
    </div>

    {/* Mobile: Card layout */}
    <div className="md:hidden space-y-4">
      {dataGapAnalysis.map((row, idx) => (
        <div key={idx} className="bg-neutral-900/40 rounded-xl p-4 border border-neutral-800/50">
          <div className="text-sm font-bold text-white mb-3">{row.feature}</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] text-neutral-500 uppercase tracking-wide block mb-1.5">A/R Model</span>
              <div className="flex items-start gap-2">
                {row.arReady ? (
                  <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
                )}
                <span className="text-xs text-neutral-300 leading-tight">{row.arModel}</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] text-neutral-500 uppercase tracking-wide block mb-1.5">PD Model</span>
              <div className="flex items-start gap-2">
                {row.pdReady ? (
                  <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
                )}
                <span className="text-xs text-neutral-300 leading-tight">{row.pdModel}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-neutral-800/30">
            <span className="text-[11px] text-neutral-500 uppercase tracking-wide">Status: </span>
            <span className={`text-xs font-medium ${row.lmdStatus === 'CRITICAL GAP' ? 'text-red-400' : 'text-neutral-400'}`}>
              {row.lmdStatus}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EnhancedTimelineSection: React.FC = () => {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const phaseRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const togglePhase = (idx: number) => {
    const isExpanding = expandedPhase !== idx;

    // Scroll immediately if expanding
    if (isExpanding && phaseRefs.current[idx]) {
      const element = phaseRefs.current[idx];
      if (element) {
        const yOffset = -120; // Offset for header with padding
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }

    setExpandedPhase(expandedPhase === idx ? null : idx);
  };

  const getPhaseColor = (idx: number) => {
    const colors = [
      { dot: 'bg-orange-400', bg: 'bg-orange-400/10', text: 'text-orange-400', badge: 'bg-orange-400/20 border-orange-400/30' },
      { dot: 'bg-orange-500', bg: 'bg-orange-500/10', text: 'text-orange-500', badge: 'bg-orange-500/20 border-orange-500/30' },
      { dot: 'bg-orange-600', bg: 'bg-orange-600/10', text: 'text-orange-600', badge: 'bg-orange-600/20 border-orange-600/30' },
      { dot: 'bg-orange-700', bg: 'bg-orange-700/10', text: 'text-orange-700', badge: 'bg-orange-700/20 border-orange-700/30' }
    ];
    return colors[idx] || colors[0];
  };

  return (
    <div className="relative pt-12">
      {/* Vertical timeline line with gradient */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-orange-400 via-orange-500 to-orange-700 md:left-1/2 md:-ml-px"></div>

      <div className="space-y-12">
        {roadmapPhases.map((item, idx) => {
          const colors = getPhaseColor(idx);
          return (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row gap-8 items-start ${
                idx % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline marker */}
              <div className="absolute left-8 -translate-x-1/2 md:left-1/2 w-10 h-10 rounded-full bg-black border-4 border-neutral-900 z-10 flex items-center justify-center">
                <div className={`w-4 h-4 rounded-full ${colors.dot}`}></div>
              </div>

              {/* Phase Card */}
              <div
                ref={(el) => { phaseRefs.current[idx] = el; }}
                className="ml-16 md:ml-0 w-full md:w-1/2 pl-0 md:px-8"
              >
                <div className="bg-neutral-900/40 rounded-xl border border-neutral-800/50 overflow-hidden transition-all hover:bg-neutral-900/50">
                  {/* Card Header (always visible, clickable) */}
                  <div
                    onClick={() => togglePhase(idx)}
                    className="p-5 md:p-6 cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded border ${colors.badge} ${colors.text}`}>
                            {item.time}
                          </span>
                          <span className="text-[10px] text-neutral-500 uppercase tracking-wide">
                            {item.subtitle}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">{item.phase}</h4>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${colors.bg} border border-neutral-800/50 shrink-0`}>
                          <div className={colors.text}>
                            {item.icon}
                          </div>
                        </div>
                        {expandedPhase === idx ? (
                          <ChevronUp size={18} className="text-neutral-500 shrink-0" />
                        ) : (
                          <ChevronDown size={18} className="text-neutral-500 shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Deliverables Section */}
                  {expandedPhase === idx && (
                    <div className={`px-5 md:px-6 pb-5 md:pb-6 pt-0 border-t border-neutral-800/50 ${colors.bg}`}>
                      <div className="pt-5">
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wide mb-3">
                          Key Deliverables
                        </p>
                        <ul className="space-y-2.5">
                          {item.deliverables.map((deliverable, dIdx) => (
                            <li
                              key={dIdx}
                              className="flex items-start gap-3 text-xs text-neutral-300"
                            >
                              <CheckCircle size={14} className={`${colors.text} shrink-0 mt-0.5`} />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Data Requirement */}
                      {item.dataRequirement && (
                        <div className="mt-4 pt-4 border-t border-neutral-800/30 flex justify-between items-center">
                          <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wide">
                            Data Requirement
                          </span>
                          <span className={`text-xs font-medium px-3 py-1 rounded border ${colors.badge} ${colors.text}`}>
                            {item.dataRequirement}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Empty half for layout balance */}
              <div className="hidden md:block w-1/2"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DataStrategyView: React.FC = () => (
  <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 animate-fadeIn pt-4 md:pt-6 pb-8 md:pb-12">

    {/* Section 1: Enhanced Header */}
    <div className="text-center space-y-4 md:space-y-6 mb-8 md:mb-12 relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>
      <h2 className="relative text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
        Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">Strategy</span>
      </h2>
      <p className="relative text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
        A phased approach to ML deployment that respects data maturity.
        Start with <strong className="text-orange-400">efficiency gains</strong>,
        mature into <strong className="text-orange-500">risk prediction</strong>.
      </p>
    </div>

    {/* Section 2: Executive Summary */}
    <ExecutiveSummarySection />
    <div className="border-t border-neutral-800/50 my-4 md:my-6"></div>

    {/* Section 3: Data Gap Analysis */}
    <DataGapAnalysisSection />
    <div className="border-t border-neutral-800/50 my-4 md:my-6"></div>

    {/* Section 4: A/R vs PD Model Comparison (existing) */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">

      {/* A/R Model */}
      <div className="bg-neutral-900/40 rounded-2xl p-6 md:p-8 border border-neutral-800/50">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-1">A/R Model</h3>
          <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Stop-Gap: Committee Clone</p>
        </div>

        <div className="space-y-5">
           <div className="bg-black/30 p-5 rounded-xl border border-neutral-800/30">
             <div className="text-xs text-neutral-500 font-bold uppercase mb-3">Data Required</div>
             <div className="mb-2">
               <span className="text-white text-2xl font-bold">10k - 15k</span>
               <span className="text-neutral-500 text-sm ml-2">records</span>
             </div>
             <p className="text-xs text-neutral-400">Records of past decisions (Approved vs Rejected).</p>
           </div>

           <ul className="space-y-3">
             <li className="flex gap-3 text-sm text-neutral-300">
               <CheckCircle size={18} className="text-orange-500 shrink-0" />
               <span>Replicates current committee consistency.</span>
             </li>
             <li className="flex gap-3 text-sm text-neutral-300">
               <CheckCircle size={18} className="text-orange-500 shrink-0" />
               <span>Implementable in the short term (MVP).</span>
             </li>
             <li className="flex gap-3 text-sm text-neutral-300">
               <AlertTriangle size={18} className="text-orange-500 shrink-0" />
               <span>Inherits existing human biases.</span>
             </li>
           </ul>

           <div className="p-4 bg-black/20 rounded-xl border border-neutral-800/30">
             <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wide mb-3">Key Performance Indicators</p>
             <div className="flex gap-3 mb-3">
               <div className="text-xs text-white font-medium">Time to Decision</div>
               <div className="text-xs text-neutral-500">•</div>
               <div className="text-xs text-white font-medium">Consistency</div>
             </div>
             <p className="text-[10px] text-neutral-500">
               Loss Rate is NOT a KPI for A/R model
             </p>
           </div>
        </div>
      </div>

      {/* PD Model */}
      <div className="bg-neutral-900/40 rounded-2xl p-6 md:p-8 border border-neutral-800/50">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-1">PD Model</h3>
          <p className="text-xs text-neutral-400 font-medium uppercase tracking-wide">Risk Prediction</p>
        </div>

        <div className="space-y-5">
           <div className="bg-black/30 p-5 rounded-xl border border-neutral-800/30">
             <div className="text-xs text-neutral-500 font-bold uppercase mb-3">Data Required</div>
             <div className="mb-2">
               <span className="text-white text-2xl font-bold">20k - 25k</span>
               <span className="text-neutral-500 text-sm ml-2">records</span>
             </div>
             <p className="text-xs text-neutral-400">
                Needs <span className="text-orange-400 font-medium">~300 defaults</span> to learn real risk patterns.
             </p>
           </div>

           <ul className="space-y-3">
             <li className="flex gap-3 text-sm text-neutral-300">
               <CheckCircle size={18} className="text-orange-500 shrink-0" />
               <span>Predicts actual profitability (who pays).</span>
             </li>
             <li className="flex gap-3 text-sm text-neutral-300">
               <CheckCircle size={18} className="text-orange-500 shrink-0" />
               <span>Eliminates subjective biases.</span>
             </li>
             <li className="flex gap-3 text-sm text-neutral-300">
               <AlertTriangle size={18} className="text-orange-500 shrink-0" />
               <span>Requires historical maturity (Phase 2).</span>
             </li>
           </ul>

           <div className="p-4 bg-black/20 rounded-xl border border-neutral-800/30">
             <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wide mb-3">Key Performance Indicators</p>
             <div className="flex gap-3 mb-3">
               <div className="text-xs text-white font-medium">Loss Rate</div>
               <div className="text-xs text-neutral-500">•</div>
               <div className="text-xs text-white font-medium">Profit per Customer</div>
             </div>
             <p className="text-[10px] text-neutral-500">
               Optimizes for portfolio profitability
             </p>
           </div>
        </div>
      </div>
    </div>
    <div className="border-t border-neutral-800/50 my-4 md:my-6"></div>

    {/* Section 5: Enhanced 4-Phase Timeline */}
    <EnhancedTimelineSection />
  </div>
);

// --- Main Views ---

interface ArchitectureViewProps {
  setSelectedNode: (node: NodeData) => void;
  showCompliance: boolean;
  setShowCompliance: (show: boolean) => void;
  setShowSovInfo: (show: boolean) => void;
}

const ArchitectureView: React.FC<ArchitectureViewProps> = ({ setSelectedNode, showCompliance, setShowCompliance, setShowSovInfo }) => {
  return (
    <div className="flex flex-col pb-8 md:pb-12 animate-fadeIn">

      {/* Toolbar */}
      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center bg-black/70 backdrop-blur-lg p-3 sm:p-4 rounded-2xl border border-neutral-800 gap-3 sm:gap-4 shadow-2xl" role="toolbar" aria-label="Architecture view controls">
          <div className="flex items-center gap-3 sm:gap-4 px-1 sm:px-2">
            <div className="bg-orange-500/10 p-2 rounded-lg border border-orange-500/20">
               <Layers size={18} className="text-orange-500 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white">System Pipeline</div>
              <div className="text-[9px] sm:text-[10px] text-neutral-500 font-medium uppercase tracking-wider">End-to-End Flow</div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
             <button
               onClick={() => setShowSovInfo(true)}
               className="text-neutral-500 hover:text-white p-2 sm:p-3 hover:bg-neutral-800 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
               aria-label="Show data sovereignty information"
             >
               <HelpCircle size={18} className="sm:w-5 sm:h-5" />
             </button>

             <div className="w-px h-6 sm:h-8 bg-neutral-800 mx-1 sm:mx-2"></div>

             <button
              onClick={() => setShowCompliance(!showCompliance)}
              aria-pressed={showCompliance}
              aria-label={showCompliance ? "Disable sovereignty mode" : "Enable sovereignty mode"}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${showCompliance ? 'bg-orange-500/10 border-orange-500/40 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)]' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'}`}
            >
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest">Sovereignty Mode</span>
              <div className={`w-7 sm:w-8 h-3.5 sm:h-4 rounded-full p-0.5 transition-colors duration-300 flex items-center ${showCompliance ? 'bg-orange-500' : 'bg-neutral-700'}`}>
                <div className={`w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${showCompliance ? 'translate-x-3.5 sm:translate-x-4' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Diagram Canvas */}
      <div className="bg-black border border-neutral-900 rounded-[2rem] p-4 sm:p-8 md:p-12 flex flex-col gap-12 md:gap-16 lg:gap-20 relative overflow-hidden shadow-2xl">

        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        {/* Stage 1: Input */}
        <div className="relative z-10 w-full">
          <SectionHeading number="01" title="Ingestion Layer" />
          <div className="flex flex-col md:flex-row gap-8 items-center justify-start bg-neutral-900/30 p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm">
            <NodeCard id="ingestion" onClick={setSelectedNode} showCompliance={showCompliance} />
            <ResponsiveConnector />
            <NodeCard id="orchestration" onClick={setSelectedNode} showCompliance={showCompliance} />

            {/* Context Label */}
            <div className="hidden lg:flex flex-1 items-center gap-4 px-6 opacity-30">
               <div className="h-px bg-neutral-700 flex-1 border-t border-dashed"></div>
               <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">Secure Payload</div>
               <div className="h-px bg-neutral-700 flex-1 border-t border-dashed"></div>
            </div>
          </div>
        </div>

        {/* Stage 2: Verification */}
        <div className="relative z-10 w-full">
          <SectionHeading number="02" title="Verification" />
          {/* "Circuit Board" Look for Parallel Processing */}
          <div className="bg-neutral-900/40 p-1 rounded-3xl border border-neutral-800 backdrop-blur-sm flex flex-col relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500/20 to-transparent"></div>
             <div className="p-8 flex flex-col gap-6 items-center justify-center h-full">
                <div className="w-full flex flex-col md:flex-row gap-6 justify-center items-center">
                  <NodeCard id="verification" onClick={setSelectedNode} showCompliance={showCompliance} />
                  <div className="hidden md:block h-32 w-px border-l border-dashed border-neutral-700"></div>
                  <NodeCard id="fraud" onClick={setSelectedNode} showCompliance={showCompliance} />
                </div>
                <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-neutral-950 rounded-full border border-neutral-800">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Async Parallel Execution</span>
                </div>
             </div>
          </div>
        </div>

        {/* Stage 3: ML Core */}
        <div className="relative z-10 w-full">
          <SectionHeading number="03" title="ML Core" />
           <div className="bg-neutral-900/30 p-6 sm:p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm overflow-hidden">
              {/* Mobile & Tablet: Stacked vertically */}
              <div className="flex xl:hidden flex-col justify-center items-center gap-6">
                <NodeCard id="feature_store" onClick={setSelectedNode} showCompliance={showCompliance} />
                <ResponsiveConnector />
                <NodeCard id="inference" onClick={setSelectedNode} showCompliance={showCompliance} />
                <ResponsiveConnector />
                <NodeCard id="decision" onClick={setSelectedNode} showCompliance={showCompliance} />
              </div>
              {/* Desktop: Horizontal flow with proper spacing */}
              <div className="hidden xl:flex flex-row flex-wrap justify-center items-center gap-4 2xl:gap-6">
                <NodeCard id="feature_store" onClick={setSelectedNode} showCompliance={showCompliance} />
                <ResponsiveConnector />
                <NodeCard id="inference" onClick={setSelectedNode} showCompliance={showCompliance} />
                <ResponsiveConnector />
                <NodeCard id="decision" onClick={setSelectedNode} showCompliance={showCompliance} />
              </div>
           </div>
        </div>

        {/* Stage 4: Output */}
        <div className="relative z-10 w-full">
          <SectionHeading number="04" title="Resolution" />
          <div className="flex flex-col md:flex-row gap-8 items-center bg-neutral-900/30 p-8 rounded-3xl border border-neutral-800 backdrop-blur-sm">
             {/* Context Label */}
             <div className="hidden lg:flex flex-1 items-center gap-4 px-6 opacity-30">
               <div className="h-px bg-neutral-700 flex-1 border-t border-dashed"></div>
               <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-widest">Decision Vector</div>
               <div className="h-px bg-neutral-700 flex-1 border-t border-dashed"></div>
            </div>

             <NodeCard id="explanation" onClick={setSelectedNode} showCompliance={showCompliance} />
             <ResponsiveConnector />
             <NodeCard id="response" onClick={setSelectedNode} showCompliance={showCompliance} />
          </div>
        </div>

      </div>
    </div>
  );
};

const ROIView: React.FC = () => (
  <div className="max-w-7xl mx-auto space-y-20 animate-fadeIn pt-4 md:pt-6 pb-12">

    <div className="text-center space-y-6 mb-12 relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>
      <h2 className="relative text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
        The Economic <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">Shift</span>
      </h2>
      <p className="relative text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
        Transforming vehicle leasing from a manual, high-variable cost model into a scalable, fixed-cost technology asset.
      </p>
    </div>

    {/* Metric Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {roiData.map((item, idx) => (
        <div key={idx} className="bg-neutral-900 rounded-3xl p-8 border border-neutral-800 relative overflow-hidden group hover:border-orange-500/50 hover:shadow-[0_0_50px_-10px_rgba(234,88,12,0.15)] transition-all duration-500">
          <div className="flex justify-between items-start mb-8">
             <div className="p-4 bg-black rounded-2xl border border-neutral-800 text-neutral-500 group-hover:text-orange-500 group-hover:border-orange-500/30 transition-colors">
               {idx === 0 ? <DollarSign size={28} /> : idx === 1 ? <Clock size={28} /> : <TrendingUp size={28} />}
             </div>
             <span className={`text-4xl font-black tracking-tighter ${item.metric === 'Conversion Rate' ? 'text-emerald-500' : 'text-orange-500'}`}>
               {item.delta}
             </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-2">{item.metric}</h3>
          <p className="text-sm text-neutral-500 mb-10 leading-relaxed font-medium">{item.desc}</p>

          <div className="space-y-4 pt-8 border-t border-neutral-800">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-neutral-600 font-black uppercase tracking-widest">Manual</span>
              <span className="text-sm font-mono text-neutral-500">{item.manual} <span className="text-[10px]">{item.unit}</span></span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-white font-black uppercase tracking-widest">Pazz ML</span>
              <span className="text-sm font-mono text-white">{item.auto} <span className="text-[10px] text-neutral-500">{item.unit}</span></span>
            </div>
            {/* Visual Bar */}
            <div className="h-2 w-full bg-black rounded-full overflow-hidden flex mt-3 border border-neutral-800">
              <div
                 className={`h-full ${item.metric === 'Conversion Rate' ? 'bg-neutral-800' : 'bg-orange-600'}`}
                 style={{ width: `${(item.metric === 'Conversion Rate' ? (item.manual/item.auto)*100 : (item.auto/item.manual)*100)}%` }}
              />
              <div
                 className={`h-full ${item.metric === 'Conversion Rate' ? 'bg-emerald-500' : 'bg-neutral-800'}`}
                 style={{ width: `${(item.metric === 'Conversion Rate' ? ((item.auto-item.manual)/item.auto)*100 : ((item.manual-item.auto)/item.manual)*100)}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Bottom Analysis */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-neutral-900 p-10 rounded-3xl border border-neutral-800 hover:border-neutral-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-lg">
             <Zap className="text-orange-500" size={24} />
          </div>
          Strategic Feasibility
        </h3>
        <ul className="space-y-8">
          <li className="flex gap-5 text-neutral-300">
            <div className="mt-1">
              <CheckCircle className="text-emerald-500 shrink-0" size={24} />
            </div>
            <div>
              <strong className="text-white block mb-1 text-lg">Tech Maturity</strong>
              <span className="text-sm text-neutral-400 leading-relaxed">Infrastructure for SAT/INE/RENAPO verification is now a stable commodity in Mexico, reducing implementation risk.</span>
            </div>
          </li>
          <li className="flex gap-5 text-neutral-300">
            <div className="mt-1">
              <CheckCircle className="text-emerald-500 shrink-0" size={24} />
            </div>
            <div>
              <strong className="text-white block mb-1 text-lg">Cold Start Strategy</strong>
              <span className="text-sm text-neutral-400 leading-relaxed">Utilization of Transfer Learning allows the model to adapt generic risk parameters to new leasing partners immediately.</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="bg-neutral-900 p-10 rounded-3xl border border-neutral-800 hover:border-neutral-700 transition-colors">
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
          <div className="p-2 bg-neutral-800 rounded-lg">
             <Box className="text-neutral-400" size={24} />
          </div>
          Compliance "Glass Box"
        </h3>
        <ul className="space-y-8">
          <li className="flex gap-5 text-neutral-300">
            <div className="mt-1">
              <CheckCircle className="text-emerald-500 shrink-0" size={24} />
            </div>
            <div>
              <strong className="text-white block mb-1 text-lg">LFPDPPP Transparency</strong>
              <span className="text-sm text-neutral-400 leading-relaxed">SHAP values provide mathematical explanations for every rejection, satisfying the user's "Right to Explanation".</span>
            </div>
          </li>
          <li className="flex gap-5 text-neutral-300">
            <div className="mt-1">
              <CheckCircle className="text-emerald-500 shrink-0" size={24} />
            </div>
            <div>
              <strong className="text-white block mb-1 text-lg">Reject Inference</strong>
              <span className="text-sm text-neutral-400 leading-relaxed">Fuzzy augmentation of rejected data helps discover hidden good borrowers that traditional banks miss.</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default function PazzMLAppV6() {
  const [activeTab, setActiveTab] = useState<'architecture' | 'roi' | 'strategy'>('architecture');
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [showCompliance, setShowCompliance] = useState(false);
  const [showSovInfo, setShowSovInfo] = useState(false);

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-orange-500/30 pb-8 md:pb-12">

      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-orange-600 focus:text-black focus:rounded-lg focus:font-bold"
      >
        Skip to content
      </a>

      {/* Modals */}
      {selectedNode && (
        <DetailModal
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          showCompliance={showCompliance}
        />
      )}

      {showSovInfo && (
        <DataSovereigntyInfo onClose={() => setShowSovInfo(false)} />
      )}

      {/* App Header */}
      <header className="border-b border-neutral-900 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 md:h-24 flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-end gap-1 sm:gap-1.5 md:gap-2 shrink-0">
            <img
              src="/pazz-logo.svg"
              alt="Pazz"
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
            <span className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-none translate-y-0.5 sm:translate-y-1" style={{ fontFamily: 'inherit' }}>ML</span>
          </div>

          <nav className="flex gap-0.5 sm:gap-1 bg-neutral-900/50 p-0.5 sm:p-1 md:p-1.5 rounded-lg sm:rounded-xl border border-neutral-800/50" aria-label="Main navigation">
            <button
              onClick={() => {
                setActiveTab('architecture');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="View architecture diagram"
              aria-current={activeTab === 'architecture' ? 'page' : undefined}
              className={`w-[70px] sm:w-[90px] md:w-[120px] py-1.5 sm:py-2 md:py-2.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider sm:tracking-widest transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${activeTab === 'architecture' ? 'bg-orange-600 text-black shadow-lg shadow-orange-600/20' : 'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}
            >
              Arch
            </button>
            <button
              onClick={() => {
                setActiveTab('strategy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="View data strategy"
              aria-current={activeTab === 'strategy' ? 'page' : undefined}
              className={`w-[70px] sm:w-[90px] md:w-[120px] py-1.5 sm:py-2 md:py-2.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider sm:tracking-widest transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${activeTab === 'strategy' ? 'bg-orange-600 text-black shadow-lg shadow-orange-600/20' : 'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}
            >
              Strat
            </button>
            <button
              onClick={() => {
                setActiveTab('roi');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="View return on investment analysis"
              aria-current={activeTab === 'roi' ? 'page' : undefined}
              className={`w-[70px] sm:w-[90px] md:w-[120px] py-1.5 sm:py-2 md:py-2.5 rounded-md sm:rounded-lg text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider sm:tracking-widest transition-all flex items-center justify-center focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${activeTab === 'roi' ? 'bg-orange-600 text-black shadow-lg shadow-orange-600/20' : 'text-neutral-500 hover:text-white hover:bg-neutral-800'}`}
            >
              ROI
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10" role="main">
        {activeTab === 'architecture' && (
          <ArchitectureView
            setSelectedNode={setSelectedNode}
            showCompliance={showCompliance}
            setShowCompliance={setShowCompliance}
            setShowSovInfo={setShowSovInfo}
          />
        )}
        {activeTab === 'strategy' && <DataStrategyView />}
        {activeTab === 'roi' && <ROIView />}
      </main>

    </div>
  );
}
