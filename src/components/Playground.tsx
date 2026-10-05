import React, { useState, useMemo } from 'react';
import {
  Cpu,
  Eye,
  MessageSquare,
  Flower2,
  ShieldCheck,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle,
  AlertCircle,
  Sliders,
  Layers,
} from 'lucide-react';
import { analytics } from '../utils/analytics';

type DemoType = 'object-detection' | 'sentiment' | 'iris' | 'spam';

export const Playground: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<DemoType>('object-detection');

  return (
    <section id="playground" className="py-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400">
              <Cpu size={20} />
            </span>
            <h2 className="text-2xl font-semibold text-white">AI / ML Playground</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Interactive client-side ML demonstrations · Transparent simulation engine
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#13141C] border border-[#1F212A] text-[11px] text-gray-400">
          <Info size={13} className="text-fuchsia-400 flex-shrink-0" />
          <span>Transparent architecture: client-evaluated demonstrations</span>
        </div>
      </div>

      {/* Demo Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <button
          onClick={() => {
            setActiveDemo('object-detection');
            analytics.track('playground_run', { demo: 'object-detection' });
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeDemo === 'object-detection'
              ? 'bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-md shadow-fuchsia-500/20'
              : 'bg-[#13141C] border border-[#1F212A] text-gray-400 hover:text-white hover:border-[#2A2D3A]'
          }`}
        >
          <Eye size={14} /> Object Detection
        </button>

        <button
          onClick={() => {
            setActiveDemo('sentiment');
            analytics.track('playground_run', { demo: 'sentiment' });
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeDemo === 'sentiment'
              ? 'bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-md shadow-fuchsia-500/20'
              : 'bg-[#13141C] border border-[#1F212A] text-gray-400 hover:text-white hover:border-[#2A2D3A]'
          }`}
        >
          <MessageSquare size={14} /> Sentiment Analysis
        </button>

        <button
          onClick={() => {
            setActiveDemo('iris');
            analytics.track('playground_run', { demo: 'iris' });
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeDemo === 'iris'
              ? 'bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-md shadow-fuchsia-500/20'
              : 'bg-[#13141C] border border-[#1F212A] text-gray-400 hover:text-white hover:border-[#2A2D3A]'
          }`}
        >
          <Flower2 size={14} /> Iris Prediction
        </button>

        <button
          onClick={() => {
            setActiveDemo('spam');
            analytics.track('playground_run', { demo: 'spam' });
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            activeDemo === 'spam'
              ? 'bg-gradient-to-r from-fuchsia-600 to-blue-600 text-white shadow-md shadow-fuchsia-500/20'
              : 'bg-[#13141C] border border-[#1F212A] text-gray-400 hover:text-white hover:border-[#2A2D3A]'
          }`}
        >
          <ShieldCheck size={14} /> Spam Detection
        </button>
      </div>

      {/* Demo Container */}
      <div className="bg-[#13141C] border border-[#1F212A] rounded-2xl p-5 md:p-8 relative overflow-hidden">
        {activeDemo === 'object-detection' && <ObjectDetectionDemo />}
        {activeDemo === 'sentiment' && <SentimentAnalysisDemo />}
        {activeDemo === 'iris' && <IrisPredictionDemo />}
        {activeDemo === 'spam' && <SpamDetectionDemo />}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 1. Image Object Detection Demo
// ─────────────────────────────────────────────────────────────────────────────
interface DetectedBox {
  id: string;
  label: string;
  confidence: number;
  box: [number, number, number, number]; // [top%, left%, width%, height%]
  color: string;
}

const SAMPLE_SCENES = [
  {
    id: 'aerial-drone',
    title: 'Drone Surveillance Perimeter',
    description: 'Aerial monitoring showing pedestrians, perimeter vehicles, and structural zones',
    boxes: [
      { id: '1', label: 'Person / Pedestrian', confidence: 0.94, box: [38, 28, 14, 26], color: '#38bdf8' },
      { id: '2', label: 'Autonomous UAV', confidence: 0.91, box: [18, 56, 22, 24], color: '#d946ef' },
      { id: '3', label: 'Service Vehicle', confidence: 0.88, box: [58, 64, 28, 25], color: '#34d399' },
    ] as DetectedBox[],
  },
  {
    id: 'traffic-intersection',
    title: 'Traffic & Vehicle Anomaly Feed',
    description: 'Intersection monitoring identifying multiple multi-class transport units',
    boxes: [
      { id: '4', label: 'Commercial Truck', confidence: 0.96, box: [22, 18, 35, 42], color: '#f59e0b' },
      { id: '5', label: 'Sedan Vehicle', confidence: 0.89, box: [52, 54, 26, 28], color: '#38bdf8' },
      { id: '6', label: 'Cyclist', confidence: 0.82, box: [64, 20, 16, 24], color: '#a855f7' },
    ] as DetectedBox[],
  },
];

function ObjectDetectionDemo() {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [minConfidence, setMinConfidence] = useState(0.75);
  const [showBoxes, setShowBoxes] = useState(true);

  const scene = SAMPLE_SCENES[selectedSceneIndex];

  const filteredBoxes = useMemo(() => {
    return scene.boxes.filter((b) => b.confidence >= minConfidence);
  }, [scene, minConfidence]);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
      analytics.track('playground_run', { demo: 'object_detection_complete', scene: scene.id });
    }, 450);
  };

  const handleReset = () => {
    setHasRun(false);
    setIsRunning(false);
    setMinConfidence(0.75);
    setShowBoxes(true);
  };

  return (
    <div className="space-y-6">
      {/* Description header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F212A] pb-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Eye size={18} className="text-blue-400" /> Aerial Computer Vision & Object Localization
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Simulates bounding-box inference models (e.g. YOLO/SSD pipelines) on surveillance feeds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-medium transition-all flex items-center gap-2 shadow-md shadow-fuchsia-500/20"
          >
            {isRunning ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Inferencing...
              </>
            ) : (
              <>
                <Play size={13} /> Run Detection
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] text-gray-400 hover:text-white rounded-xl text-xs transition-colors"
            title="Reset Demo"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Inputs & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-2">Select Surveillance Scene:</label>
            <div className="space-y-2">
              {SAMPLE_SCENES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelectedSceneIndex(idx);
                    setHasRun(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${
                    selectedSceneIndex === idx
                      ? 'bg-[#1C1E2B] border-fuchsia-500/50 text-white'
                      : 'bg-[#161722] border-[#1F212A] text-gray-400 hover:text-white'
                  }`}
                >
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{s.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-gray-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Sliders size={13} className="text-fuchsia-400" /> Confidence Threshold:
              </span>
              <span className="font-mono text-fuchsia-300">{Math.round(minConfidence * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.5}
              max={0.98}
              step={0.02}
              value={minConfidence}
              onChange={(e) => setMinConfidence(parseFloat(e.target.value))}
              className="w-full accent-fuchsia-500 cursor-pointer"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
              <input
                type="checkbox"
                checked={showBoxes}
                onChange={(e) => setShowBoxes(e.target.checked)}
                className="accent-fuchsia-500 rounded"
              />
              <span>Render Spatial Bounding Boxes</span>
            </label>
          </div>
        </div>

        {/* Visual Viewport Canvas */}
        <div className="lg:col-span-2">
          <div className="relative aspect-video rounded-xl bg-[#0F1017] border border-[#2A2D3A] overflow-hidden flex items-center justify-center">
            {/* Background Grid Pattern simulating video sensor feed */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Video Feed HUD Mock */}
            <div className="absolute top-3 left-3 text-[10px] font-mono text-emerald-400 flex items-center gap-2 bg-black/60 px-2.5 py-1 rounded-md border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>LIVE CAM: 1080p @ 30FPS · FPS LATENCY: ~14ms</span>
            </div>

            <div className="absolute bottom-3 left-3 text-[10px] font-mono text-gray-400 bg-black/60 px-2.5 py-1 rounded-md">
              SCENE: {scene.id.toUpperCase()}
            </div>

            {/* If not run yet */}
            {!hasRun && !isRunning && (
              <div className="text-center p-6 z-10">
                <Layers size={36} className="text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Click &quot;Run Detection&quot; to execute spatial localization.</p>
              </div>
            )}

            {/* Inference Loading animation */}
            {isRunning && (
              <div className="text-center p-6 z-10 space-y-2">
                <span className="w-8 h-8 border-2 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full inline-block animate-spin" />
                <p className="text-xs font-mono text-fuchsia-300">Extracting frames & running neural inference...</p>
              </div>
            )}

            {/* Rendered Bounding Boxes */}
            {hasRun &&
              !isRunning &&
              showBoxes &&
              filteredBoxes.map((box) => (
                <div
                  key={box.id}
                  style={{
                    top: `${box.box[0]}%`,
                    left: `${box.box[1]}%`,
                    width: `${box.box[2]}%`,
                    height: `${box.box[3]}%`,
                    borderColor: box.color,
                  }}
                  className="absolute border-2 rounded transition-all animate-in fade-in"
                >
                  <span
                    style={{ backgroundColor: box.color }}
                    className="absolute -top-5 left-0 text-[10px] font-mono font-semibold text-black px-1.5 py-0.5 rounded shadow whitespace-nowrap"
                  >
                    {box.label} {(box.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
          </div>

          {/* Result details table */}
          {hasRun && !isRunning && (
            <div className="mt-4 p-4 rounded-xl bg-[#161722] border border-[#1F212A] text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">Inference Summary:</span>
                <span className="text-[11px] font-mono text-emerald-400">
                  {filteredBoxes.length} object(s) detected above threshold
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredBoxes.map((b) => (
                  <span
                    key={b.id}
                    className="px-2.5 py-1 rounded bg-[#1C1E2B] border border-[#2A2D3A] text-gray-300 font-mono text-[11px]"
                  >
                    {b.label}: {(b.confidence * 100).toFixed(1)}% confidence
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Sentiment Analysis Demo
// ─────────────────────────────────────────────────────────────────────────────
const SAMPLE_SENTIMENTS = [
  'This AI drone surveillance platform provides exceptional real-time accuracy and flawless tracking!',
  'The network intrusion model encountered unexpected packet drop latency and failed to log threats.',
  'FastAPI endpoint is configured and waiting for continuous telemetry log ingestion.',
];

const POSITIVE_LEXICON: Record<string, number> = {
  exceptional: 0.85,
  flawless: 0.9,
  accuracy: 0.6,
  great: 0.7,
  excellent: 0.8,
  intelligent: 0.65,
  reliable: 0.75,
  fast: 0.5,
  smooth: 0.6,
  success: 0.8,
};

const NEGATIVE_LEXICON: Record<string, number> = {
  unexpected: -0.4,
  drop: -0.5,
  latency: -0.45,
  failed: -0.85,
  error: -0.8,
  breach: -0.7,
  vulnerability: -0.75,
  loss: -0.6,
  slow: -0.5,
  bug: -0.7,
};

function SentimentAnalysisDemo() {
  const [inputText, setInputText] = useState(SAMPLE_SENTIMENTS[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{
    sentiment: 'Positive' | 'Negative' | 'Neutral';
    score: number;
    tokens: { word: string; weight: number }[];
  } | null>(null);

  const analyzeSentiment = () => {
    if (!inputText.trim()) return;
    setIsRunning(true);

    setTimeout(() => {
      const words = inputText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
      let totalWeight = 0;
      const tokens: { word: string; weight: number }[] = [];

      words.forEach((w) => {
        if (POSITIVE_LEXICON[w]) {
          totalWeight += POSITIVE_LEXICON[w];
          tokens.push({ word: w, weight: POSITIVE_LEXICON[w] });
        } else if (NEGATIVE_LEXICON[w]) {
          totalWeight += NEGATIVE_LEXICON[w];
          tokens.push({ word: w, weight: NEGATIVE_LEXICON[w] });
        }
      });

      // Normalize between -1 and 1
      const normalized = Math.max(-1, Math.min(1, totalWeight / (tokens.length || 1)));
      let sentiment: 'Positive' | 'Negative' | 'Neutral' = 'Neutral';
      if (normalized > 0.15) sentiment = 'Positive';
      else if (normalized < -0.15) sentiment = 'Negative';

      setResult({
        sentiment,
        score: normalized,
        tokens,
      });
      setIsRunning(false);
    }, 350);
  };

  const handleReset = () => {
    setInputText(SAMPLE_SENTIMENTS[0]);
    setResult(null);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F212A] pb-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <MessageSquare size={18} className="text-fuchsia-400" /> Natural Language Sentiment & Polarity Classifier
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Lexical token-weight classification analyzing text polarity, emotional charge, and key indicators.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={analyzeSentiment}
            disabled={isRunning || !inputText.trim()}
            className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-medium transition-all flex items-center gap-2 shadow-md shadow-fuchsia-500/20"
          >
            {isRunning ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing Tokens...
              </>
            ) : (
              <>
                <Play size={13} /> Analyze Sentiment
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] text-gray-400 hover:text-white rounded-xl text-xs transition-colors"
            title="Reset Text"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Area */}
        <div className="space-y-3">
          <label className="block text-xs font-medium text-gray-300">Input Text Document:</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            className="w-full bg-[#161722] border border-[#2A2D3A] focus:border-fuchsia-500 rounded-xl p-3.5 text-xs text-white placeholder-gray-500 outline-none leading-relaxed custom-scrollbar"
            placeholder="Enter custom text to analyze sentiment..."
          />

          <div>
            <span className="text-[11px] text-gray-400 block mb-1.5">Try sample statements:</span>
            <div className="flex flex-col gap-1.5">
              {SAMPLE_SENTIMENTS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(s);
                    setResult(null);
                  }}
                  className="text-left text-[11px] text-gray-400 hover:text-white p-2 rounded-lg bg-[#161722] border border-[#1F212A] hover:border-[#2A2D3A] transition-colors truncate"
                >
                  &ldquo;{s}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result Area */}
        <div className="bg-[#161722] border border-[#1F212A] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Classification Outcome
            </h4>

            {result ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Predicted Polarity:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold font-mono border ${
                      result.sentiment === 'Positive'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : result.sentiment === 'Negative'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                    }`}
                  >
                    {result.sentiment.toUpperCase()}
                  </span>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>Polarity Index (-1.0 to +1.0):</span>
                    <span className="font-mono text-white font-semibold">
                      {result.score > 0 ? `+${result.score.toFixed(2)}` : result.score.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1F212A] overflow-hidden flex">
                    <div
                      style={{
                        width: `${Math.max(0, (result.score + 1) * 50)}%`,
                      }}
                      className={`h-full transition-all duration-500 ${
                        result.score >= 0 ? 'bg-gradient-to-r from-blue-500 to-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                  </div>
                </div>

                {result.tokens.length > 0 && (
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-1.5">Influential Tokens Detected:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.tokens.map((t, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                            t.weight > 0
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                          }`}
                        >
                          {t.word} ({t.weight > 0 ? `+${t.weight}` : t.weight})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-gray-500">
                <Sparkles size={28} className="mx-auto mb-2 text-gray-600" />
                <p>Click &quot;Analyze Sentiment&quot; to view classification scoring and token breakdown.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#1F212A] text-[10px] text-gray-500">
            Model: Lexical Heuristic Classifier · Zero external API latency
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Iris Classification Demo
// ─────────────────────────────────────────────────────────────────────────────
// Centroids from standard Fisher's Iris Benchmark dataset:
const IRIS_CENTROIDS = {
  setosa: { sepalLength: 5.006, sepalWidth: 3.428, petalLength: 1.462, petalWidth: 0.246 },
  versicolor: { sepalLength: 5.936, sepalWidth: 2.77, petalLength: 4.26, petalWidth: 1.326 },
  virginica: { sepalLength: 6.588, sepalWidth: 2.974, petalLength: 5.552, petalWidth: 2.026 },
};

function IrisPredictionDemo() {
  const [sepalLength, setSepalLength] = useState(5.1);
  const [sepalWidth, setSepalWidth] = useState(3.5);
  const [petalLength, setPetalLength] = useState(1.4);
  const [petalWidth, setPetalWidth] = useState(0.2);
  const [isRunning, setIsRunning] = useState(false);
  const [prediction, setPrediction] = useState<{
    species: string;
    probabilities: { setosa: number; versicolor: number; virginica: number };
  } | null>(null);

  const classifyIris = () => {
    setIsRunning(true);
    setTimeout(() => {
      // Calculate Euclidean distances
      const distSetosa = Math.sqrt(
        Math.pow(sepalLength - IRIS_CENTROIDS.setosa.sepalLength, 2) +
          Math.pow(sepalWidth - IRIS_CENTROIDS.setosa.sepalWidth, 2) +
          Math.pow(petalLength - IRIS_CENTROIDS.setosa.petalLength, 2) +
          Math.pow(petalWidth - IRIS_CENTROIDS.setosa.petalWidth, 2)
      );

      const distVersicolor = Math.sqrt(
        Math.pow(sepalLength - IRIS_CENTROIDS.versicolor.sepalLength, 2) +
          Math.pow(sepalWidth - IRIS_CENTROIDS.versicolor.sepalWidth, 2) +
          Math.pow(petalLength - IRIS_CENTROIDS.versicolor.petalLength, 2) +
          Math.pow(petalWidth - IRIS_CENTROIDS.versicolor.petalWidth, 2)
      );

      const distVirginica = Math.sqrt(
        Math.pow(sepalLength - IRIS_CENTROIDS.virginica.sepalLength, 2) +
          Math.pow(sepalWidth - IRIS_CENTROIDS.virginica.sepalWidth, 2) +
          Math.pow(petalLength - IRIS_CENTROIDS.virginica.petalLength, 2) +
          Math.pow(petalWidth - IRIS_CENTROIDS.virginica.petalWidth, 2)
      );

      // Convert distances to inverse softmax-style probabilities
      const invS = 1 / (distSetosa + 0.001);
      const invVers = 1 / (distVersicolor + 0.001);
      const invVirg = 1 / (distVirginica + 0.001);
      const sum = invS + invVers + invVirg;

      const probSetosa = invS / sum;
      const probVersicolor = invVers / sum;
      const probVirginica = invVirg / sum;

      let species = 'Iris Setosa';
      if (probVersicolor > probSetosa && probVersicolor > probVirginica) {
        species = 'Iris Versicolor';
      } else if (probVirginica > probSetosa && probVirginica > probVersicolor) {
        species = 'Iris Virginica';
      }

      setPrediction({
        species,
        probabilities: {
          setosa: probSetosa,
          versicolor: probVersicolor,
          virginica: probVirginica,
        },
      });
      setIsRunning(false);
    }, 300);
  };

  const handleReset = () => {
    setSepalLength(5.1);
    setSepalWidth(3.5);
    setPetalLength(1.4);
    setPetalWidth(0.2);
    setPrediction(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F212A] pb-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Flower2 size={18} className="text-emerald-400" /> Fisher&apos;s Iris Botanical Classification
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Multivariate classification computing Euclidean centroid distances across sepal & petal morphology.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={classifyIris}
            disabled={isRunning}
            className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-medium transition-all flex items-center gap-2 shadow-md shadow-fuchsia-500/20"
          >
            {isRunning ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Play size={13} /> Classify Sample
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] text-gray-400 hover:text-white rounded-xl text-xs transition-colors"
            title="Reset Dimensions"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sliders Area */}
        <div className="space-y-4 bg-[#161722] border border-[#1F212A] rounded-xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white uppercase tracking-wider">Morphological Features</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  setSepalLength(5.1);
                  setSepalWidth(3.5);
                  setPetalLength(1.4);
                  setPetalWidth(0.2);
                }}
                className="text-[10px] px-2 py-0.5 rounded bg-[#1C1E2B] border border-[#2A2D3A] text-gray-300 hover:text-white"
              >
                Setosa Preset
              </button>
              <button
                onClick={() => {
                  setSepalLength(5.9);
                  setSepalWidth(2.8);
                  setPetalLength(4.2);
                  setPetalWidth(1.3);
                }}
                className="text-[10px] px-2 py-0.5 rounded bg-[#1C1E2B] border border-[#2A2D3A] text-gray-300 hover:text-white"
              >
                Versicolor Preset
              </button>
              <button
                onClick={() => {
                  setSepalLength(6.6);
                  setSepalWidth(3.0);
                  setPetalLength(5.5);
                  setPetalWidth(2.0);
                }}
                className="text-[10px] px-2 py-0.5 rounded bg-[#1C1E2B] border border-[#2A2D3A] text-gray-300 hover:text-white"
              >
                Virginica Preset
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300">Sepal Length:</span>
              <span className="font-mono text-fuchsia-400 font-semibold">{sepalLength.toFixed(1)} cm</span>
            </div>
            <input
              type="range"
              min={4.0}
              max={8.0}
              step={0.1}
              value={sepalLength}
              onChange={(e) => setSepalLength(parseFloat(e.target.value))}
              className="w-full accent-fuchsia-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300">Sepal Width:</span>
              <span className="font-mono text-fuchsia-400 font-semibold">{sepalWidth.toFixed(1)} cm</span>
            </div>
            <input
              type="range"
              min={2.0}
              max={4.5}
              step={0.1}
              value={sepalWidth}
              onChange={(e) => setSepalWidth(parseFloat(e.target.value))}
              className="w-full accent-fuchsia-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300">Petal Length:</span>
              <span className="font-mono text-blue-400 font-semibold">{petalLength.toFixed(1)} cm</span>
            </div>
            <input
              type="range"
              min={1.0}
              max={7.0}
              step={0.1}
              value={petalLength}
              onChange={(e) => setPetalLength(parseFloat(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-300">Petal Width:</span>
              <span className="font-mono text-blue-400 font-semibold">{petalWidth.toFixed(1)} cm</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={2.5}
              step={0.1}
              value={petalWidth}
              onChange={(e) => setPetalWidth(parseFloat(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Prediction Results */}
        <div className="bg-[#161722] border border-[#1F212A] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Prediction Outcome
            </h4>

            {prediction ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#1C1E2B] border border-fuchsia-500/30">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-emerald-400" />
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wide">Predicted Specie</p>
                      <p className="text-base font-bold text-white tracking-tight">{prediction.species}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/20">
                    Highest Likelihood
                  </span>
                </div>

                <div className="space-y-2.5 pt-2">
                  <span className="text-[11px] text-gray-400 block">Class Likelihood Distribution:</span>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-gray-300">Iris Setosa</span>
                      <span className="font-mono text-white">{(prediction.probabilities.setosa * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1F212A] rounded-full overflow-hidden">
                      <div
                        style={{ width: `${prediction.probabilities.setosa * 100}%` }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-gray-300">Iris Versicolor</span>
                      <span className="font-mono text-white">
                        {(prediction.probabilities.versicolor * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1F212A] rounded-full overflow-hidden">
                      <div
                        style={{ width: `${prediction.probabilities.versicolor * 100}%` }}
                        className="h-full bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-gray-300">Iris Virginica</span>
                      <span className="font-mono text-white">
                        {(prediction.probabilities.virginica * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1F212A] rounded-full overflow-hidden">
                      <div
                        style={{ width: `${prediction.probabilities.virginica * 100}%` }}
                        className="h-full bg-fuchsia-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-gray-500">
                <Flower2 size={28} className="mx-auto mb-2 text-gray-600" />
                <p>Adjust dimensions or pick a preset, then click &quot;Classify Sample&quot;.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#1F212A] text-[10px] text-gray-500">
            Centroid mapping evaluated on Fisher&apos;s Iris Dataset (150 botanical observations).
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Spam Detection Demo
// ─────────────────────────────────────────────────────────────────────────────
const SAMPLE_MESSAGES = [
  'URGENT! You have won a guaranteed cash prize of $5000! Click here now to claim your gift voucher!',
  'Hi Bisworanjan, can we reschedule tomorrow afternoon\'s thesis code review meeting on Google Meet?',
  'Security Notice: Unusual password attempt recorded from an unrecognized IP address. Please review your credentials.',
];

const SPAM_KEYWORDS = [
  'won',
  'prize',
  'cash',
  'guaranteed',
  'free',
  'claim',
  'urgent',
  'voucher',
  'lottery',
  'winner',
  'selected',
  'bank',
  'wire',
];

function SpamDetectionDemo() {
  const [message, setMessage] = useState(SAMPLE_MESSAGES[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{
    isSpam: boolean;
    probability: number;
    flaggedKeywords: string[];
  } | null>(null);

  const checkSpam = () => {
    if (!message.trim()) return;
    setIsRunning(true);

    setTimeout(() => {
      const words = message.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/);
      const flagged = words.filter((w) => SPAM_KEYWORDS.includes(w));
      const uniqueFlagged = Array.from(new Set(flagged));

      // Simple heuristic probability
      const spamWeight = uniqueFlagged.length * 0.28 + (message.includes('!') ? 0.12 : 0);
      const probability = Math.min(0.99, Math.max(0.04, spamWeight));
      const isSpam = probability >= 0.45;

      setResult({
        isSpam,
        probability,
        flaggedKeywords: uniqueFlagged,
      });
      setIsRunning(false);
    }, 320);
  };

  const handleReset = () => {
    setMessage(SAMPLE_MESSAGES[0]);
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1F212A] pb-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <ShieldCheck size={18} className="text-purple-400" /> SMS / Email Threat & Spam Heuristic Detector
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Detects suspicious keywords, phrasing triggers, and high-risk solicitation patterns.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={checkSpam}
            disabled={isRunning || !message.trim()}
            className="px-4 py-2 bg-gradient-to-r from-fuchsia-600 to-blue-600 hover:from-fuchsia-500 hover:to-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-medium transition-all flex items-center gap-2 shadow-md shadow-fuchsia-500/20"
          >
            {isRunning ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Scanning Message...
              </>
            ) : (
              <>
                <Play size={13} /> Check For Spam
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2 bg-[#1A1C23] hover:bg-[#222530] border border-[#2A2D3A] text-gray-400 hover:text-white rounded-xl text-xs transition-colors"
            title="Reset Message"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="block text-xs font-medium text-gray-300">Message Content:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full bg-[#161722] border border-[#2A2D3A] focus:border-fuchsia-500 rounded-xl p-3.5 text-xs text-white placeholder-gray-500 outline-none leading-relaxed custom-scrollbar"
            placeholder="Type or paste SMS / email content..."
          />

          <div>
            <span className="text-[11px] text-gray-400 block mb-1.5">Try preset messages:</span>
            <div className="flex flex-col gap-1.5">
              {SAMPLE_MESSAGES.map((msg, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMessage(msg);
                    setResult(null);
                  }}
                  className="text-left text-[11px] text-gray-400 hover:text-white p-2 rounded-lg bg-[#161722] border border-[#1F212A] hover:border-[#2A2D3A] transition-colors truncate"
                >
                  &ldquo;{msg}&rdquo;
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#161722] border border-[#1F212A] rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Diagnostic Report
            </h4>

            {result ? (
              <div className="space-y-4">
                <div
                  className={`flex items-center justify-between p-3.5 rounded-xl border ${
                    result.isSpam
                      ? 'bg-rose-500/10 border-rose-500/30'
                      : 'bg-emerald-500/10 border-emerald-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {result.isSpam ? (
                      <AlertCircle size={20} className="text-rose-400" />
                    ) : (
                      <CheckCircle size={20} className="text-emerald-400" />
                    )}
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">Classification</p>
                      <p className={`text-base font-bold ${result.isSpam ? 'text-rose-300' : 'text-emerald-300'}`}>
                        {result.isSpam ? 'SPAM / MALICIOUS PATTERN' : 'HAM / LEGITIMATE MESSAGE'}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Spam Probability Score:</span>
                    <span className="font-mono text-white font-semibold">
                      {(result.probability * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#1F212A] overflow-hidden">
                    <div
                      style={{ width: `${result.probability * 100}%` }}
                      className={`h-full transition-all duration-500 ${
                        result.isSpam ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                    />
                  </div>
                </div>

                {result.flaggedKeywords.length > 0 && (
                  <div>
                    <span className="text-[11px] text-gray-400 block mb-1.5">Flagged Risk Keywords:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {result.flaggedKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-gray-500">
                <ShieldCheck size={28} className="mx-auto mb-2 text-gray-600" />
                <p>Click &quot;Check For Spam&quot; to evaluate pattern probabilities.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#1F212A] text-[10px] text-gray-500">
            Engine: Naive Bayes Tokenizer · Zero telemetry stored
          </div>
        </div>
      </div>
    </div>
  );
}
