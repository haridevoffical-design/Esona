import { useEffect, useState } from 'react';
import { Sparkles, MessageCircle, Music } from 'lucide-react';
import type { Page, MoodRecord } from '../types';
import { supabase } from '../lib/supabase';

interface ReportPageProps {
  onNavigate: (page: Page) => void;
  moodId: string | null;
}

export function ReportPage({ onNavigate, moodId }: ReportPageProps) {
  const [mood, setMood] = useState<MoodRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMood();
  }, [moodId]);

  const loadMood = async () => {
    if (!moodId) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('mood_records')
      .select('*')
      .eq('id', moodId)
      .maybeSingle();

    if (error) {
      console.error('Error loading mood:', error);
    } else if (data) {
      setMood(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <p className="text-gray-600 text-xl">Loading your mood report...</p>
      </div>
    );
  }

  if (!mood) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Mood Report Found</h1>
            <p className="text-gray-600 mb-8">Start by recording your mood to see your report.</p>
            <button
              onClick={() => onNavigate('record')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Start Recording
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-blue-600';
    return 'text-orange-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return 'bg-green-100';
    if (score >= 50) return 'bg-blue-100';
    return 'bg-orange-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className="text-teal-600 hover:text-teal-700 font-medium mb-8 transition-colors"
        >
          ← Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Your Mood Report
          </h1>
          <p className="text-lg text-gray-600 mb-12 text-center">
            Here's your emotional summary based on the tone, pitch, and energy of your voice.
          </p>

          <div className="space-y-6 mb-12">
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Mood Detected
              </h3>
              <p className="text-3xl font-bold text-gray-900">{mood.mood_type}</p>
            </div>

            <div className={`${getScoreBgColor(mood.mood_score)} rounded-2xl p-8`}>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Mood Score
              </h3>
              <p className={`text-5xl font-bold ${getScoreColor(mood.mood_score)}`}>
                {mood.mood_score} / 100
              </p>
            </div>

            <div className="bg-cyan-50 rounded-2xl p-8">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                Energy Level
              </h3>
              <p className="text-2xl font-bold text-gray-900">{mood.energy_level}</p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
                AI Insight
              </h3>
              <p className="text-xl text-gray-700 leading-relaxed">"{mood.ai_insight}"</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('suggestions')}
              className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl p-6 transition-all transform hover:scale-105 shadow-lg"
            >
              <Sparkles className="w-8 h-8 mx-auto mb-2" />
              <span className="font-semibold">Get Calming Suggestions</span>
            </button>

            <button
              onClick={() => onNavigate('suggestions')}
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-6 transition-all transform hover:scale-105 shadow-lg"
            >
              <Music className="w-8 h-8 mx-auto mb-2" />
              <span className="font-semibold">Play Relaxing Music</span>
            </button>

            <button
              onClick={() => onNavigate('record')}
              className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl p-6 transition-all transform hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-8 h-8 mx-auto mb-2" />
              <span className="font-semibold">Talk Again</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
