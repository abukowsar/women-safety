
import React, { useState } from 'react';
import { Upload, Eye, EyeOff, CheckCircle, ShieldAlert } from 'lucide-react';
import { ReportType, Case } from '../types';

interface ReportFormProps {
  onSubmitReport: (report: Omit<Case, 'id' | 'status' | 'date' | 'riskScore' | 'evidenceCount'>) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmitReport }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  
  // Form State
  const [description, setDescription] = useState('');
  const [reportType, setReportType] = useState<ReportType>(ReportType.Harassment);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate submission
    onSubmitReport({
        type: reportType,
        description: description,
        isAnonymous: isAnonymous
    });

    const id = "CASE-" + Math.floor(Math.random() * 1000000);
    setTrackingId(id);
    setSubmitted(true);
    setDescription('');
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto text-center border-t-4 border-green-500 animate-in fade-in zoom-in duration-300 my-16">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">অভিযোগ সফলভাবে জমা হয়েছে</h2>
        <p className="text-slate-600 mb-6">আপনার অভিযোগটি আমাদের সিস্টেমে সংরক্ষিত হয়েছে। আমরা শীঘ্রই ব্যবস্থা নেব।</p>
        
        <div className="bg-slate-100 p-4 rounded-lg inline-block mb-6">
          <p className="text-sm text-slate-500 uppercase font-semibold">ট্র্যাকিং আইডি</p>
          <p className="text-3xl font-mono font-bold text-slate-800 tracking-wider">{trackingId}</p>
        </div>
        
        <p className="text-sm text-slate-500">এই আইডি ব্যবহার করে আপনি পরবর্তীতে অভিযোগের অবস্থা জানতে পারবেন।</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 text-brand-600 hover:text-brand-800 underline">
          আরেকটি অভিযোগ করুন
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-16 px-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-alert-500 p-6 flex items-center justify-between">
          <div className="flex items-center text-white">
            <ShieldAlert className="h-8 w-8 mr-3" />
            <h2 className="text-2xl font-bold">অভিযোগ ফরম</h2>
          </div>
          <div className="flex items-center bg-white/20 rounded-full px-4 py-1 backdrop-blur-sm">
            <span className="text-white text-sm font-medium mr-2">গোপন মোড</span>
            <button
              onClick={() => setIsAnonymous(!isAnonymous)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                isAnonymous ? 'bg-green-400' : 'bg-slate-300'
              }`}
            >
              <span
                className={`${
                  isAnonymous ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200`}
              />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {isAnonymous && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-r-lg">
              <div className="flex">
                <EyeOff className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-sm text-blue-700">
                  আপনি বেনামে অভিযোগ করছেন। আপনার পরিচয় গোপন রাখা হবে।
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!isAnonymous && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">নাম</label>
                  <input required type="text" className="w-full !bg-white border-slate-300 rounded-lg shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2.5 transition-shadow !text-slate-900" placeholder="আপনার পুরো নাম" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">মোবাইল নম্বর</label>
                  <input required type="tel" className="w-full !bg-white border-slate-300 rounded-lg shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2.5 transition-shadow !text-slate-900" placeholder="017..." />
                </div>
              </>
            )}

            <div className={isAnonymous ? "col-span-2" : "col-span-2"}>
              <label className="block text-sm font-medium text-slate-700 mb-1">সহিংসতার ধরন</label>
              <select 
                value={reportType}
                onChange={(e) => setReportType(e.target.value as ReportType)}
                className="w-full !bg-white border-slate-300 rounded-lg shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2.5 !text-slate-900"
              >
                {Object.values(ReportType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">বিস্তারিত বিবরণ</label>
              <textarea 
                required 
                rows={4} 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full !bg-white border-slate-300 rounded-lg shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2.5 transition-shadow !text-slate-900" 
                placeholder="ঘটনাটি বিস্তারিত লিখুন..." 
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">প্রমাণ আপলোড করুন (স্ক্রিনশট/ভিডিও)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-slate-50 transition-colors cursor-pointer relative group">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-slate-400 group-hover:text-brand-500 transition-colors" />
                  <div className="flex text-sm text-slate-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none">
                      <span>ফাইল নির্বাচন করুন</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">অথবা ড্র্যাগ করে আনুন</p>
                  </div>
                  <p className="text-xs text-slate-500">PNG, JPG, MP4 up to 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end pt-4">
            <button
              type="submit"
              className="bg-alert-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-red-600 transition-all hover:shadow-red-200 hover:-translate-y-0.5 flex items-center"
            >
              <ShieldAlert className="mr-2 h-5 w-5" />
              অভিযোগ জমা দিন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
