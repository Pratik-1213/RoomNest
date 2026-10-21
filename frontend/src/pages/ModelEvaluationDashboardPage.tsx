import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Sparkles,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Award,
  BookOpen,
  ArrowRight,
  Database,
  Cpu,
  Sliders,
  Users,
  Target,
  Wrench,
  Grid,
  Info
} from 'lucide-react';
import { MODELS_EVALUATION_DATA } from '../data/modelsEvaluationData';

export const ModelEvaluationDashboardPage: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<
    'model_1_rent_prediction' | 'model_2_roommate_compatibility' | 'model_3_booking_conversion' | 'model_4_quality_maintenance_risk' | 'overview'
  >('overview');

  const { academic_meta, models } = MODELS_EVALUATION_DATA;
  const m1 = models.model_1_rent_prediction;
  const m2 = models.model_2_roommate_compatibility;
  const m3 = models.model_3_booking_conversion;
  const m4 = models.model_4_quality_maintenance_risk;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Academic Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/30 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-teal-400" />
            {academic_meta.institution} • {academic_meta.course}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Models Evaluation & Data Visualization Studio
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Rigorous statistical evaluation and visualization matrices for all 4 RoomNest production ML models. Trained on an augmented 100,000-record dataset with 5-fold cross-validation, confusion matrices, ROC/PR curves, residual distributions, and feature attribution.
          </p>
          <div className="flex flex-wrap gap-2.5 pt-1 text-xs">
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
              <Database className="w-3.5 h-3.5 text-teal-400" /> 100,000 Augmented Dataset Records
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" /> 4 Specialized Architectures
            </span>
            <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> 5-Fold Stratified Cross-Validation
            </span>
          </div>
        </div>
      </div>

      {/* KPI Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Model 1 KPI */}
        <div
          onClick={() => setSelectedModel('model_1_rent_prediction')}
          className={`p-5 rounded-xl border transition cursor-pointer ${
            selectedModel === 'model_1_rent_prediction'
              ? 'bg-teal-50/80 border-teal-500 ring-1 ring-teal-500'
              : 'bg-white border-slate-200 hover:border-teal-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase mb-1">
            <span>Model 1: PG Rent</span>
            <span className="text-[10px] bg-teal-100 text-teal-800 px-1.5 py-0.2 rounded font-bold">Regression</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">R² = {m1.metrics.r2_score}</div>
          <div className="text-xs text-slate-600 mt-1 flex justify-between">
            <span>MAE: ₹{m1.metrics.mae_inr}</span>
            <span>MAPE: {m1.metrics.mape_percent}%</span>
          </div>
          <p className="text-[11px] text-teal-700 mt-2 font-medium">HistGradientBoosting • 25,000 samples</p>
        </div>

        {/* Model 2 KPI */}
        <div
          onClick={() => setSelectedModel('model_2_roommate_compatibility')}
          className={`p-5 rounded-xl border transition cursor-pointer ${
            selectedModel === 'model_2_roommate_compatibility'
              ? 'bg-emerald-50/80 border-emerald-500 ring-1 ring-emerald-500'
              : 'bg-white border-slate-200 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase mb-1">
            <span>Model 2: Roommate</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">Harmony</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">R² = {m2.metrics.r2_score}</div>
          <div className="text-xs text-slate-600 mt-1 flex justify-between">
            <span>MAE: {m2.metrics.mae_percent}%</span>
            <span>r = {m2.metrics.pearson_correlation}</span>
          </div>
          <p className="text-[11px] text-emerald-700 mt-2 font-medium">RandomForest • 10 Lifestyle Vectors</p>
        </div>

        {/* Model 3 KPI */}
        <div
          onClick={() => setSelectedModel('model_3_booking_conversion')}
          className={`p-5 rounded-xl border transition cursor-pointer ${
            selectedModel === 'model_3_booking_conversion'
              ? 'bg-purple-50/80 border-purple-500 ring-1 ring-purple-500'
              : 'bg-white border-slate-200 hover:border-purple-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase mb-1">
            <span>Model 3: Conversion</span>
            <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded font-bold">Classifier</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {(m3.metrics.accuracy * 100).toFixed(1)}% Acc
          </div>
          <div className="text-xs text-slate-600 mt-1 flex justify-between">
            <span>ROC-AUC: {m3.metrics.roc_auc}</span>
            <span>F1: {m3.metrics.f1_score}</span>
          </div>
          <p className="text-[11px] text-purple-700 mt-2 font-medium">GradientBoosting • Lead Intent</p>
        </div>

        {/* Model 4 KPI */}
        <div
          onClick={() => setSelectedModel('model_4_quality_maintenance_risk')}
          className={`p-5 rounded-xl border transition cursor-pointer ${
            selectedModel === 'model_4_quality_maintenance_risk'
              ? 'bg-amber-50/80 border-amber-500 ring-1 ring-amber-500'
              : 'bg-white border-slate-200 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase mb-1">
            <span>Model 4: Quality</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">Risk Audit</span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">
            {(m4.metrics.accuracy * 100).toFixed(1)}% Acc
          </div>
          <div className="text-xs text-slate-600 mt-1 flex justify-between">
            <span>ROC-AUC: {m4.metrics.roc_auc}</span>
            <span>F1: {m4.metrics.f1_score}</span>
          </div>
          <p className="text-[11px] text-amber-800 mt-2 font-medium">RandomForest • Complaint Predictor</p>
        </div>
      </div>

      {/* Model Selector Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setSelectedModel('overview')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            selectedModel === 'overview'
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Grid className="w-4 h-4" /> Suite Overview & DV Summary
        </button>
        <button
          onClick={() => setSelectedModel('model_1_rent_prediction')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            selectedModel === 'model_1_rent_prediction'
              ? 'border-teal-600 text-teal-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4 text-teal-600" /> Model 1: Rent Regression
        </button>
        <button
          onClick={() => setSelectedModel('model_2_roommate_compatibility')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            selectedModel === 'model_2_roommate_compatibility'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-600" /> Model 2: Roommate Harmony
        </button>
        <button
          onClick={() => setSelectedModel('model_3_booking_conversion')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            selectedModel === 'model_3_booking_conversion'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Target className="w-4 h-4 text-purple-600" /> Model 3: Conversion Matrix & ROC
        </button>
        <button
          onClick={() => setSelectedModel('model_4_quality_maintenance_risk')}
          className={`pb-3 px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition whitespace-nowrap ${
            selectedModel === 'model_4_quality_maintenance_risk'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Activity className="w-4 h-4 text-amber-600" /> Model 4: Quality & Risk Matrix
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. SUITE OVERVIEW TAB */}
      {/* ========================================================================= */}
      {selectedModel === 'overview' && (
        <div className="space-y-8">
          {/* Comparative Model Architecture Matrix */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Comprehensive 4-Model Comparative Architecture Matrix
                </h2>
                <p className="text-xs text-slate-500">
                  Benchmarked on 100,000 augmented Pune records across 12 residential corridors
                </p>
              </div>
              <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded border">
                scikit-learn 1.7.2
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-xs text-left">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 uppercase text-[10px] border-b">
                    <th className="py-3 px-4">Model # & Name</th>
                    <th className="py-3 px-4">Task & Algorithm</th>
                    <th className="py-3 px-4">Dataset Samples</th>
                    <th className="py-3 px-4">Primary Performance</th>
                    <th className="py-3 px-4">5-Fold Cross Validation</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      1. PG Monthly Rent Regression
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 font-semibold border border-teal-200">
                        HistGradientBoosting
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">25,000 rows (20k / 5k)</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-teal-800">R² = {m1.metrics.r2_score}</div>
                      <div className="text-[11px] text-slate-500">MAE: ₹{m1.metrics.mae_inr} | MAPE: {m1.metrics.mape_percent}%</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {m1.metrics.cv_mean_r2} ± {m1.metrics.cv_std_r2}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedModel('model_1_rent_prediction')}
                        className="text-xs text-teal-700 font-bold hover:underline"
                      >
                        View Visuals →
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      2. Roommate Compatibility Matcher
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                        RandomForestRegressor
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">25,000 pairs (20k / 5k)</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-emerald-800">R² = {m2.metrics.r2_score}</div>
                      <div className="text-[11px] text-slate-500">MAE: {m2.metrics.mae_percent}% | Pearson r: {m2.metrics.pearson_correlation}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      {m2.metrics.cv_mean_r2} ± {m2.metrics.cv_std_r2}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedModel('model_2_roommate_compatibility')}
                        className="text-xs text-emerald-700 font-bold hover:underline"
                      >
                        View Visuals →
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      3. Booking Conversion Propensity
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 font-semibold border border-purple-200">
                        GradientBoostingClassifier
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">25,000 leads (20k / 5k)</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-purple-800">Accuracy: {(m3.metrics.accuracy * 100).toFixed(1)}%</div>
                      <div className="text-[11px] text-slate-500">ROC-AUC: {m3.metrics.roc_auc} | F1: {m3.metrics.f1_score}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      AUC = {m3.metrics.cv_mean_auc}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedModel('model_3_booking_conversion')}
                        className="text-xs text-purple-700 font-bold hover:underline"
                      >
                        View Visuals →
                      </button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      4. PG Quality & Maintenance Risk
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                        RandomForestClassifier
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">25,000 reviews (20k / 5k)</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-amber-800">Accuracy: {(m4.metrics.accuracy * 100).toFixed(1)}%</div>
                      <div className="text-[11px] text-slate-500">ROC-AUC: {m4.metrics.roc_auc} | F1: {m4.metrics.f1_score}</div>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700">
                      AUC = {m4.metrics.cv_mean_auc}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedModel('model_4_quality_maintenance_risk')}
                        className="text-xs text-amber-800 font-bold hover:underline"
                      >
                        View Visuals →
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Quick links to test models live */}
          <section className="bg-slate-50 rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Interactive End-to-End Testing Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <Link
                to="/price-estimator"
                className="p-4 bg-white rounded-lg border border-slate-200 hover:border-teal-500 transition group space-y-1"
              >
                <div className="font-bold text-slate-900 group-hover:text-teal-700 flex items-center justify-between">
                  <span>Model 1: Price Estimator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
                </div>
                <p className="text-slate-500">Test live rent inference across Pune locations</p>
              </Link>

              <Link
                to="/roommate-finder"
                className="p-4 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 transition group space-y-1"
              >
                <div className="font-bold text-slate-900 group-hover:text-emerald-700 flex items-center justify-between">
                  <span>Model 2: Roommate Match</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <p className="text-slate-500">Test live compatibility & pairwise synergy</p>
              </Link>

              <Link
                to="/owner/analytics"
                className="p-4 bg-white rounded-lg border border-slate-200 hover:border-purple-500 transition group space-y-1"
              >
                <div className="font-bold text-slate-900 group-hover:text-purple-700 flex items-center justify-between">
                  <span>Model 3: Lead Propensity</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600" />
                </div>
                <p className="text-slate-500">Predict booking conversions in Owner Portal</p>
              </Link>

              <Link
                to="/admin/reports"
                className="p-4 bg-white rounded-lg border border-slate-200 hover:border-amber-500 transition group space-y-1"
              >
                <div className="font-bold text-slate-900 group-hover:text-amber-800 flex items-center justify-between">
                  <span>Model 4: Risk Inspector</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-700" />
                </div>
                <p className="text-slate-500">Audit maintenance risk & quality scores</p>
              </Link>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. MODEL 1: RENT REGRESSION VISUALIZATION */}
      {/* ========================================================================= */}
      {selectedModel === 'model_1_rent_prediction' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b">
            <div>
              <span className="text-xs font-bold uppercase text-teal-700">Model 1 Evaluation & Visuals</span>
              <h2 className="text-xl font-extrabold text-slate-900">
                PG Monthly Rent Regression Evaluation (R² = {m1.metrics.r2_score})
              </h2>
            </div>
            <div className="text-xs font-mono bg-teal-50 text-teal-800 px-3 py-1 rounded-full border border-teal-200">
              MAE: ₹{m1.metrics.mae_inr} • RMSE: ₹{m1.metrics.rmse_inr}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Actual vs Predicted Scatter Chart (SVG) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">Actual vs. Predicted Rent (Holdout Test Set)</h3>
                <span className="text-[11px] text-slate-500">Ideal Fit: 45° line</span>
              </div>
              <p className="text-xs text-slate-500">
                Shows tight clustering around the $y = x$ reference line, demonstrating minimal dispersion across ₹5,000 to ₹30,000 rent range.
              </p>

              {/* Scatter Plot SVG */}
              <div className="relative w-full h-72 bg-slate-50 rounded-lg border border-slate-100 p-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 320 220">
                  {/* Grid Lines */}
                  <line x1="40" y1="20" x2="310" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="40" y1="80" x2="310" y2="80" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="40" y1="140" x2="310" y2="140" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="40" y1="190" x2="310" y2="190" stroke="#cbd5e1" />
                  <line x1="40" y1="20" x2="40" y2="190" stroke="#cbd5e1" />

                  {/* Axis Labels */}
                  <text x="35" y="195" fontSize="8" fill="#64748b" textAnchor="end">₹5k</text>
                  <text x="35" y="145" fontSize="8" fill="#64748b" textAnchor="end">₹12k</text>
                  <text x="35" y="85" fontSize="8" fill="#64748b" textAnchor="end">₹20k</text>
                  <text x="35" y="25" fontSize="8" fill="#64748b" textAnchor="end">₹30k</text>

                  <text x="50" y="205" fontSize="8" fill="#64748b">₹5k</text>
                  <text x="140" y="205" fontSize="8" fill="#64748b">₹15k</text>
                  <text x="240" y="205" fontSize="8" fill="#64748b">₹25k</text>
                  <text x="300" y="205" fontSize="8" fill="#64748b">₹30k</text>

                  {/* 45 Degree Perfect Line */}
                  <line x1="40" y1="190" x2="310" y2="20" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="4 2" />

                  {/* Scatter points */}
                  {m1.scatter_sample.map((pt, idx) => {
                    // map ₹4500-₹30000 to x: 40-310, y: 190-20
                    const x = 40 + ((pt.actual - 4500) / (30000 - 4500)) * 270;
                    const y = 190 - ((pt.predicted - 4500) / (30000 - 4500)) * 170;
                    return (
                      <circle
                        key={idx}
                        cx={Math.max(40, Math.min(310, x))}
                        cy={Math.max(20, Math.min(190, y))}
                        r="3"
                        fill="#0d9488"
                        opacity="0.65"
                      >
                        <title>{`Actual: ₹${pt.actual.toLocaleString()} | Predicted: ₹${pt.predicted.toLocaleString()}`}</title>
                      </circle>
                    );
                  })}
                </svg>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>X-Axis: Actual Monthly Rent (INR)</span>
                <span>Y-Axis: Model Predicted Rent (INR)</span>
              </div>
            </div>

            {/* Residual Distribution Histogram (SVG) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">Residual Error Distribution (e = y - ŷ)</h3>
                <span className="text-[11px] text-emerald-700 font-semibold">Zero-Centered (Normal)</span>
              </div>
              <p className="text-xs text-slate-500">
                Histogram of error residuals confirming unbiased normal distribution with standard deviation ~₹349.
              </p>

              {/* Histogram SVG */}
              <div className="relative w-full h-72 bg-slate-50 rounded-lg border border-slate-100 p-2 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 320 220">
                  <line x1="20" y1="190" x2="310" y2="190" stroke="#cbd5e1" />
                  {/* Center zero line */}
                  <line x1="165" y1="20" x2="165" y2="190" stroke="#94a3b8" strokeDasharray="3 3" />
                  <text x="165" y="15" fontSize="8" fill="#64748b" textAnchor="middle">e = 0</text>

                  {m1.residual_bins.map((b, idx) => {
                    const maxCount = Math.max(...m1.residual_bins.map((x) => x.count), 1);
                    const barHeight = (b.count / maxCount) * 160;
                    const x = 30 + idx * 28;
                    const y = 190 - barHeight;
                    return (
                      <g key={idx}>
                        <rect
                          x={x}
                          y={y}
                          width="24"
                          height={barHeight}
                          fill="#14b8a6"
                          rx="2"
                          opacity="0.8"
                        >
                          <title>{`${b.bin}: ${b.count} samples`}</title>
                        </rect>
                        <text
                          x={x + 12}
                          y={198}
                          fontSize="7"
                          fill="#64748b"
                          textAnchor="middle"
                        >
                          {b.mid.toFixed(0)}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Negative Error (Under-prediction)</span>
                <span>Positive Error (Over-prediction)</span>
              </div>
            </div>
          </div>

          {/* Feature Importance Bar Chart */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Feature Attribution & Importance Weights
            </h3>
            <div className="space-y-3">
              {m1.feature_importances.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.feature}</span>
                    <span className="font-extrabold text-teal-800">{item.importance_percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${item.importance_percent * 2.2}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MODEL 2: ROOMMATE HARMONY VISUALIZATION */}
      {/* ========================================================================= */}
      {selectedModel === 'model_2_roommate_compatibility' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b">
            <div>
              <span className="text-xs font-bold uppercase text-emerald-700">Model 2 Evaluation & Visuals</span>
              <h2 className="text-xl font-extrabold text-slate-900">
                Roommate Compatibility & Harmony Regression (R² = {m2.metrics.r2_score})
              </h2>
            </div>
            <div className="text-xs font-mono bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              MAE: {m2.metrics.mae_percent}% • Pearson r: {m2.metrics.pearson_correlation}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Actual vs Predicted Harmony Scatter */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">Compatibility Score vs. Predicted Harmony</h3>
                <span className="text-[11px] text-slate-500">Pearson r = {m2.metrics.pearson_correlation}</span>
              </div>
              <p className="text-xs text-slate-500">
                Visualizing pairwise harmony ratings (0% to 100%) against model predictions across test profiles.
              </p>

              <div className="relative w-full h-72 bg-slate-50 rounded-lg border border-slate-100 p-2">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 320 220">
                  <line x1="40" y1="20" x2="310" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="40" y1="80" x2="310" y2="80" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="40" y1="140" x2="310" y2="140" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="40" y1="190" x2="310" y2="190" stroke="#cbd5e1" />
                  <line x1="40" y1="20" x2="40" y2="190" stroke="#cbd5e1" />

                  <text x="35" y="195" fontSize="8" fill="#64748b" textAnchor="end">20%</text>
                  <text x="35" y="140" fontSize="8" fill="#64748b" textAnchor="end">50%</text>
                  <text x="35" y="80" fontSize="8" fill="#64748b" textAnchor="end">80%</text>
                  <text x="35" y="25" fontSize="8" fill="#64748b" textAnchor="end">100%</text>

                  <text x="40" y="205" fontSize="8" fill="#64748b">20%</text>
                  <text x="140" y="205" fontSize="8" fill="#64748b">50%</text>
                  <text x="240" y="205" fontSize="8" fill="#64748b">80%</text>
                  <text x="300" y="205" fontSize="8" fill="#64748b">100%</text>

                  {/* 45 Deg line */}
                  <line x1="40" y1="190" x2="310" y2="20" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 2" />

                  {m2.scatter_sample.map((pt, idx) => {
                    const x = 40 + ((pt.actual - 18) / (100 - 18)) * 270;
                    const y = 190 - ((pt.predicted - 18) / (100 - 18)) * 170;
                    return (
                      <circle
                        key={idx}
                        cx={Math.max(40, Math.min(310, x))}
                        cy={Math.max(20, Math.min(190, y))}
                        r="3"
                        fill="#10b981"
                        opacity="0.65"
                      >
                        <title>{`Actual: ${pt.actual}% | Predicted: ${pt.predicted}%`}</title>
                      </circle>
                    );
                  })}
                </svg>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>X-Axis: Actual Harmony (%)</span>
                <span>Y-Axis: Predicted Compatibility (%)</span>
              </div>
            </div>

            {/* Feature Attribution */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Lifestyle Vector Attributions (Feature Importances)</h3>
              <p className="text-xs text-slate-500">
                Substance harmony and cleanliness standards exhibit the strongest impact on shared living compatibility.
              </p>

              <div className="space-y-2.5 pt-2">
                {m2.feature_importances.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{item.feature}</span>
                      <span className="font-extrabold text-emerald-800">{item.importance_percent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.importance_percent * 3.5}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODEL 3: BOOKING CONVERSION CLASSIFIER VISUALIZATION */}
      {/* ========================================================================= */}
      {selectedModel === 'model_3_booking_conversion' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b">
            <div>
              <span className="text-xs font-bold uppercase text-purple-700">Model 3 Evaluation & Visuals</span>
              <h2 className="text-xl font-extrabold text-slate-900">
                Booking Conversion Classifier (Accuracy = {(m3.metrics.accuracy * 100).toFixed(1)}%, ROC-AUC = {m3.metrics.roc_auc})
              </h2>
            </div>
            <div className="text-xs font-mono bg-purple-50 text-purple-800 px-3 py-1 rounded-full border border-purple-200">
              Sensitivity: {(m3.confusion_matrix.sensitivity * 100).toFixed(1)}% • Specificity: {(m3.confusion_matrix.specificity * 100).toFixed(1)}%
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 2x2 Confusion Matrix Heatmap */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">2x2 Confusion Matrix Heatmap</h3>
                <span className="text-[11px] text-slate-500">Test Set: {m3.confusion_matrix.total_test.toLocaleString()} samples</span>
              </div>
              <p className="text-xs text-slate-500">
                Detailed true-positive, true-negative, false-positive, and false-negative distribution.
              </p>

              {/* Confusion Matrix Table Heatmap */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {/* True Negative */}
                <div className="p-4 rounded-xl bg-purple-100/70 border border-purple-200 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-purple-900 block">
                    True Negative (TN)
                  </span>
                  <div className="text-2xl font-extrabold text-purple-950">
                    {m3.confusion_matrix.true_negatives.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-600 block">
                    {((m3.confusion_matrix.true_negatives / m3.confusion_matrix.total_test) * 100).toFixed(1)}% of test set
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Correctly Predicted No-Booking</span>
                </div>

                {/* False Positive */}
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-rose-800 block">
                    False Positive (FP - Type I)
                  </span>
                  <div className="text-2xl font-extrabold text-rose-700">
                    {m3.confusion_matrix.false_positives.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-600 block">
                    {((m3.confusion_matrix.false_positives / m3.confusion_matrix.total_test) * 100).toFixed(1)}% error
                  </span>
                  <span className="text-[10px] text-slate-500">Predicted Booking, but Dropped</span>
                </div>

                {/* False Negative */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-800 block">
                    False Negative (FN - Type II)
                  </span>
                  <div className="text-2xl font-extrabold text-amber-700">
                    {m3.confusion_matrix.false_negatives.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-600 block">
                    {((m3.confusion_matrix.false_negatives / m3.confusion_matrix.total_test) * 100).toFixed(1)}% error
                  </span>
                  <span className="text-[10px] text-slate-500">Missed Booking Conversion</span>
                </div>

                {/* True Positive */}
                <div className="p-4 rounded-xl bg-emerald-100/70 border border-emerald-200 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-900 block">
                    True Positive (TP)
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-950">
                    {m3.confusion_matrix.true_positives.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-600 block">
                    {((m3.confusion_matrix.true_positives / m3.confusion_matrix.total_test) * 100).toFixed(1)}% of test set
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Correctly Predicted Booking</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs pt-3 border-t">
                <div>
                  <span className="text-slate-500 block">Sensitivity (Recall):</span>
                  <span className="font-bold text-slate-800">
                    {(m3.confusion_matrix.sensitivity * 100).toFixed(1)}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Specificity:</span>
                  <span className="font-bold text-slate-800">
                    {(m3.confusion_matrix.specificity * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* ROC Curve SVG */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">Receiver Operating Characteristic (ROC Curve)</h3>
                <span className="text-[11px] font-bold text-purple-700">AUC = {m3.metrics.roc_auc}</span>
              </div>
              <p className="text-xs text-slate-500">
                True Positive Rate (Sensitivity) vs. False Positive Rate (1 - Specificity) across decision thresholds.
              </p>

              <div className="relative w-full h-72 bg-slate-50 rounded-lg border border-slate-100 p-2">
                <svg className="w-full h-full" viewBox="0 0 320 220">
                  <line x1="40" y1="20" x2="310" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="40" y1="105" x2="310" y2="105" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="40" y1="190" x2="310" y2="190" stroke="#cbd5e1" />
                  <line x1="40" y1="20" x2="40" y2="190" stroke="#cbd5e1" />

                  <text x="35" y="195" fontSize="8" fill="#64748b" textAnchor="end">0.0</text>
                  <text x="35" y="108" fontSize="8" fill="#64748b" textAnchor="end">0.5</text>
                  <text x="35" y="25" fontSize="8" fill="#64748b" textAnchor="end">1.0</text>

                  <text x="40" y="205" fontSize="8" fill="#64748b">0.0</text>
                  <text x="175" y="205" fontSize="8" fill="#64748b">0.5</text>
                  <text x="305" y="205" fontSize="8" fill="#64748b">1.0</text>

                  {/* Diagonal Chance Line */}
                  <line x1="40" y1="190" x2="310" y2="20" stroke="#94a3b8" strokeDasharray="4 2" />

                  {/* ROC Curve Path */}
                  <path
                    d={m3.roc_curve
                      .map((p, idx) => {
                        const x = 40 + p.x * 270;
                        const y = 190 - p.y * 170;
                        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>X-Axis: False Positive Rate (FPR)</span>
                <span>Y-Axis: True Positive Rate (TPR)</span>
              </div>
            </div>
          </div>

          {/* Feature Importances for Conversion */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Lead Intent Feature Attribution Weights
            </h3>
            <div className="space-y-3">
              {m3.feature_importances.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.feature}</span>
                    <span className="font-extrabold text-purple-800">{item.importance_percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${item.importance_percent * 2.3}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODEL 4: PG QUALITY & MAINTENANCE RISK VISUALIZATION */}
      {/* ========================================================================= */}
      {selectedModel === 'model_4_quality_maintenance_risk' && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-2 border-b">
            <div>
              <span className="text-xs font-bold uppercase text-amber-700">Model 4 Evaluation & Visuals</span>
              <h2 className="text-xl font-extrabold text-slate-900">
                PG Quality & Maintenance Risk Predictor (Accuracy = {(m4.metrics.accuracy * 100).toFixed(1)}%, ROC-AUC = {m4.metrics.roc_auc})
              </h2>
            </div>
            <div className="text-xs font-mono bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200">
              Sensitivity: {(m4.confusion_matrix.sensitivity * 100).toFixed(1)}% • Specificity: {(m4.confusion_matrix.specificity * 100).toFixed(1)}%
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 2x2 Confusion Matrix Heatmap */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">Maintenance Complaint Confusion Matrix</h3>
                <span className="text-[11px] text-slate-500">Test Set: {m4.confusion_matrix.total_test.toLocaleString()} samples</span>
              </div>
              <p className="text-xs text-slate-500">
                Heatmap classification breakdown separating compliant clean PGs from high-risk maintenance properties.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {/* True Negative */}
                <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-200 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-amber-900 block">
                    True Negative (Compliant)
                  </span>
                  <div className="text-2xl font-extrabold text-amber-950">
                    {m4.confusion_matrix.true_negatives.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-600 block">
                    {((m4.confusion_matrix.true_negatives / m4.confusion_matrix.total_test) * 100).toFixed(1)}% of test set
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Correctly Identified Compliant PG</span>
                </div>

                {/* False Positive */}
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-rose-800 block">
                    False Positive (False Alarm)
                  </span>
                  <div className="text-2xl font-extrabold text-rose-700">
                    {m4.confusion_matrix.false_positives.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-600 block">
                    {((m4.confusion_matrix.false_positives / m4.confusion_matrix.total_test) * 100).toFixed(1)}% false alerts
                  </span>
                  <span className="text-[10px] text-slate-500">Flagged, but Property was Clean</span>
                </div>

                {/* False Negative */}
                <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-700 block">
                    False Negative (Missed Risk)
                  </span>
                  <div className="text-2xl font-extrabold text-slate-700">
                    {m4.confusion_matrix.false_negatives.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-600 block">
                    {((m4.confusion_matrix.false_negatives / m4.confusion_matrix.total_test) * 100).toFixed(1)}% overlooked
                  </span>
                  <span className="text-[10px] text-slate-500">Unflagged Complaint</span>
                </div>

                {/* True Positive */}
                <div className="p-4 rounded-xl bg-emerald-100/70 border border-emerald-200 text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-900 block">
                    True Positive (High Risk Flag)
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-950">
                    {m4.confusion_matrix.true_positives.toLocaleString()}
                  </div>
                  <span className="text-[11px] text-slate-600 block">
                    {((m4.confusion_matrix.true_positives / m4.confusion_matrix.total_test) * 100).toFixed(1)}% identified
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Correctly Intervened Before Escalation</span>
                </div>
              </div>
            </div>

            {/* ROC Curve SVG */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-900">ROC Curve (AUC = {m4.metrics.roc_auc})</h3>
                <span className="text-[11px] font-bold text-amber-700">RandomForest Classifier</span>
              </div>
              <p className="text-xs text-slate-500">
                Visualizing diagnostic trade-off between sensitivity and 1-specificity across inspection thresholds.
              </p>

              <div className="relative w-full h-72 bg-slate-50 rounded-lg border border-slate-100 p-2">
                <svg className="w-full h-full" viewBox="0 0 320 220">
                  <line x1="40" y1="20" x2="310" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="40" y1="105" x2="310" y2="105" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <line x1="40" y1="190" x2="310" y2="190" stroke="#cbd5e1" />
                  <line x1="40" y1="20" x2="40" y2="190" stroke="#cbd5e1" />

                  <text x="35" y="195" fontSize="8" fill="#64748b" textAnchor="end">0.0</text>
                  <text x="35" y="108" fontSize="8" fill="#64748b" textAnchor="end">0.5</text>
                  <text x="35" y="25" fontSize="8" fill="#64748b" textAnchor="end">1.0</text>

                  <text x="40" y="205" fontSize="8" fill="#64748b">0.0</text>
                  <text x="175" y="205" fontSize="8" fill="#64748b">0.5</text>
                  <text x="305" y="205" fontSize="8" fill="#64748b">1.0</text>

                  <line x1="40" y1="190" x2="310" y2="20" stroke="#94a3b8" strokeDasharray="4 2" />

                  <path
                    d={m4.roc_curve
                      .map((p, idx) => {
                        const x = 40 + p.x * 270;
                        const y = 190 - p.y * 170;
                        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>X-Axis: False Positive Rate (FPR)</span>
                <span>Y-Axis: True Positive Rate (Sensitivity)</span>
              </div>
            </div>
          </div>

          {/* Feature Importances for Quality */}
          <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Quality Health & Complaint Driver Attribution
            </h3>
            <div className="space-y-3">
              {m4.feature_importances.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{item.feature}</span>
                    <span className="font-extrabold text-amber-800">{item.importance_percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-600 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${item.importance_percent * 2.4}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
