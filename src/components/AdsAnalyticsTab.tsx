import React, { useState } from 'react';
import { 
  Zap, 
  Target, 
  DollarSign, 
  MousePointerClick, 
  Eye, 
  Percent, 
  TrendingUp, 
  Sliders, 
  CheckCircle2, 
  AlertCircle,
  PieChart
} from 'lucide-react';
import { CampaignData } from '../types';
import { getBrandTheme } from '../utils/brandColors';

interface AdsAnalyticsTabProps {
  totalGmv: number;
  totalOrders: number;
}

export const AdsAnalyticsTab: React.FC<AdsAnalyticsTabProps> = ({
  totalGmv,
  totalOrders,
}) => {
  // Configurable Ad spend ratio (default 14.5% of GMV)
  const [adSpendPct, setAdSpendPct] = useState<number>(14.5);
  const [adSharePct, setAdSharePct] = useState<number>(42.0); // % of GMV driven by ads

  // Calculated Ads Metrics
  const totalSpend = Math.round(totalGmv * (adSpendPct / 100));
  const adGmv = Math.round(totalGmv * (adSharePct / 100));
  const organicGmv = Math.max(0, totalGmv - adGmv);

  const roas = totalSpend > 0 ? adGmv / totalSpend : 0;
  const blendedRoas = totalSpend > 0 ? totalGmv / totalSpend : 0;
  const acos = adGmv > 0 ? (totalSpend / adGmv) * 100 : 0;
  const tacos = totalGmv > 0 ? (totalSpend / totalGmv) * 100 : 0;

  // Estimated digital interactions
  const avgCpc = 7.40; // ₹7.40 CPC
  const clicks = Math.round(totalSpend / avgCpc);
  const impressions = Math.round(clicks * 32.5); // ~3.08% CTR
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
  
  const adOrders = Math.round(totalOrders * (adSharePct / 100));
  const cvr = clicks > 0 ? (adOrders / clicks) * 100 : 0;

  // Granular Campaign List
  const campaigns: CampaignData[] = [
    {
      campaignId: 'CMP-NAFA-01',
      campaignName: 'NAFA SnapX Tripod Search & Display Ads',
      brand: 'nafa',
      spend: Math.round(totalSpend * 0.45),
      impressions: Math.round(impressions * 0.44),
      clicks: Math.round(clicks * 0.46),
      adSales: Math.round(adGmv * 0.48),
      adOrders: Math.round(adOrders * 0.46),
      targetAcos: 25.0
    },
    {
      campaignId: 'CMP-NAFA-02',
      campaignName: 'NAFA 6A 80W Type-C Cables Quick Commerce Ads',
      brand: 'nafa',
      spend: Math.round(totalSpend * 0.25),
      impressions: Math.round(impressions * 0.28),
      clicks: Math.round(clicks * 0.26),
      adSales: Math.round(adGmv * 0.24),
      adOrders: Math.round(adOrders * 0.27),
      targetAcos: 30.0
    },
    {
      campaignId: 'CMP-AVRX-01',
      campaignName: 'averX Neem Wood Comb Grooming Category Campaign',
      brand: 'averx',
      spend: Math.round(totalSpend * 0.18),
      impressions: Math.round(impressions * 0.16),
      clicks: Math.round(clicks * 0.17),
      adSales: Math.round(adGmv * 0.16),
      adOrders: Math.round(adOrders * 0.15),
      targetAcos: 32.0
    },
    {
      campaignId: 'CMP-AVRX-02',
      campaignName: 'averX Kitchen Chopper & Disposable Containers',
      brand: 'averx',
      spend: Math.round(totalSpend * 0.12),
      impressions: Math.round(impressions * 0.12),
      clicks: Math.round(clicks * 0.11),
      adSales: Math.round(adGmv * 0.12),
      adOrders: Math.round(adOrders * 0.12),
      targetAcos: 28.0
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-indigo-950 rounded-3xl p-6 text-white shadow-xl border border-sky-500/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Zap className="w-6 h-6 text-amber-300" />
              <h2 className="text-xl font-black tracking-tight">
                Advertising &amp; Marketing ROAS Intelligence
              </h2>
            </div>
            <p className="text-xs text-sky-200/90 max-w-2xl leading-relaxed">
              Complete marketing metrics breakdown: ROAS, ACoS, TACoS, Impressions, Clicks, CTR, CPC, and Paid vs Organic GMV split.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-right">
              <span className="text-[10px] text-sky-200 uppercase font-semibold block">Total ROAS Return</span>
              <span className="text-2xl font-black text-emerald-400">{roas.toFixed(2)}x</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Ads Metric Cards (6 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* Ad Spend */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Ad Spend</span>
            <DollarSign className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-lg font-black text-slate-900 dark:text-white">
            ₹{totalSpend.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-400">{adSpendPct}% of Total GMV</span>
        </div>

        {/* Ad GMV */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Ad Attributed GMV</span>
            <Target className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
            ₹{adGmv.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-slate-400">{adSharePct}% ad generated</span>
        </div>

        {/* ROAS */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Ad ROAS</span>
            <TrendingUp className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-lg font-black text-indigo-600 dark:text-indigo-400">
            {roas.toFixed(2)}x
          </div>
          <span className="text-[10px] text-emerald-500 font-semibold">Ad Sales / Spend</span>
        </div>

        {/* ACoS */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">ACoS</span>
            <Percent className="w-4 h-4 text-amber-500" />
          </div>
          <div className={`text-lg font-black ${acos <= 35 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
            {acos.toFixed(1)}%
          </div>
          <span className="text-[10px] text-slate-400">Spend / Ad GMV</span>
        </div>

        {/* TACoS */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">TACoS</span>
            <Percent className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-lg font-black text-violet-600 dark:text-violet-400">
            {tacos.toFixed(1)}%
          </div>
          <span className="text-[10px] text-slate-400">Spend / Total GMV</span>
        </div>

        {/* Blended ROAS */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Blended ROAS</span>
            <TrendingUp className="w-4 h-4 text-teal-500" />
          </div>
          <div className="text-lg font-black text-teal-600 dark:text-teal-400">
            {blendedRoas.toFixed(2)}x
          </div>
          <span className="text-[10px] text-slate-400">Total GMV / Spend</span>
        </div>

      </div>

      {/* Traffic & Conversion Performance Metrics (4 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold">
            <Eye className="w-3.5 h-3.5 text-blue-500" /> Ad Impressions
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            {impressions.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400">Total views served</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold">
            <MousePointerClick className="w-3.5 h-3.5 text-indigo-500" /> Clicks &amp; CTR
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>{clicks.toLocaleString()}</span>
            <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              {ctr.toFixed(2)}% CTR
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Avg CPC: ₹{avgCpc.toFixed(2)}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold">
            <Target className="w-3.5 h-3.5 text-emerald-500" /> Orders &amp; CVR
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>{adOrders}</span>
            <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              {cvr.toFixed(2)}% CVR
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Ad driven purchases</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1 font-semibold">
            <PieChart className="w-3.5 h-3.5 text-violet-500" /> Organic Revenue
          </div>
          <div className="text-xl font-black text-slate-900 dark:text-white">
            ₹{Math.round(organicGmv).toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400">{(100 - adSharePct).toFixed(0)}% Organic Sales</span>
        </div>
      </div>

      {/* Interactive Ads Sensitivity Simulator */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-5 h-5 text-indigo-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Interactive Ad Spend &amp; ROAS Sensitivity Simulator
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
          {/* Slider 1: Ad Spend % */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">
                Ad Spend Ratio (% of GMV):
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold">
                {adSpendPct}% (₹{totalSpend.toLocaleString('en-IN')})
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="35"
              step="0.5"
              value={adSpendPct}
              onChange={(e) => setAdSpendPct(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Conservative (5%)</span>
              <span>Balanced (15%)</span>
              <span>High Growth (35%)</span>
            </div>
          </div>

          {/* Slider 2: Ad Attributed Sales % */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">
                Ad Attributed Sales Share:
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold">
                {adSharePct}% (₹{adGmv.toLocaleString('en-IN')})
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="70"
              step="1"
              value={adSharePct}
              onChange={(e) => setAdSharePct(parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Low (15%)</span>
              <span>Typical (40%)</span>
              <span>High Ad Reliance (70%)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Target ROAS: {roas.toFixed(2)}x (Strong Profitability Index)</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>ACoS Efficiency: {acos <= 30 ? 'Highly Efficient (<30%)' : 'Acceptable Range'}</span>
          </div>
        </div>
      </div>

      {/* Granular Campaign Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-500" />
          Active Campaign Performance Breakdown
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Campaign Name &amp; ID</th>
                <th className="py-3 px-3">Brand</th>
                <th className="py-3 px-3">Ad Spend</th>
                <th className="py-3 px-3">Ad GMV</th>
                <th className="py-3 px-3">ROAS</th>
                <th className="py-3 px-3">ACoS</th>
                <th className="py-3 px-3">Orders</th>
                <th className="py-3 px-3">Clicks &amp; CTR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium text-slate-700 dark:text-slate-300">
              {campaigns.map((c) => {
                const cmpRoas = c.spend > 0 ? (c.adSales / c.spend).toFixed(2) : '0';
                const cmpAcos = c.adSales > 0 ? ((c.spend / c.adSales) * 100).toFixed(1) : '0';
                const cmpCtr = c.impressions > 0 ? ((c.clicks / c.impressions) * 100).toFixed(2) : '0';
                const brandTheme = getBrandTheme(c.brand);

                return (
                  <tr key={c.campaignId} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">{c.campaignName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{c.campaignId}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span 
                        className="px-2 py-0.5 rounded text-[10px] font-black uppercase text-white shadow-xs"
                        style={{ backgroundColor: brandTheme.hex }}
                      >
                        {c.brand}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-rose-600 dark:text-rose-400">
                      ₹{c.spend.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400">
                      ₹{c.adSales.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 font-black text-indigo-600 dark:text-indigo-400">
                      {cmpRoas}x
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        Number(cmpAcos) <= c.targetAcos ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                      }`}>
                        {cmpAcos}%
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold">
                      {c.adOrders} orders
                    </td>
                    <td className="py-3 px-3">
                      <div>{c.clicks.toLocaleString()} clicks</div>
                      <div className="text-[10px] text-slate-400">{cmpCtr}% CTR</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
