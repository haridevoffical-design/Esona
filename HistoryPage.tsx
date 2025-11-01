import { useEffect, useState } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import type { Page, MoodRecord } from '../types';
import { supabase } from '../lib/supabase';

interface HistoryPageProps {
  onNavigate: (page: Page) => void;
  onViewMood: (moodId: string) => void;
}

export function HistoryPage({ onNavigate, onViewMood }: HistoryPageProps) {
  const [moods, setMoods] = useState<MoodRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMoods();
  }, []);

  const loadMoods = async () => {
    const { data, error } = await supabase
      .from('mood_records')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error loading moods:', error);
    } else if (data) {
      setMoods(data);
    }

    setLoading(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'bg-green-500';
    if (score >= 50) return 'bg-blue-500';
    return 'bg-orange-500';
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-blue-600';
    return 'text-orange-600';
  };

  const averageScore = moods.length > 0
    ? Math.round(moods.reduce((sum, mood) => sum + mood.mood_score, 0) / moods.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className="text-teal-600 hover:text-teal-700 font-medium mb-8 transition-colors"
        >
          ← Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Your Emotional Journey
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Track how your moods change over time.
            {moods.length > 0 && ' Each entry shows your Mood Score, Emotion Type, and Date.'}
          </p>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-xl">Loading your mood history...</p>
            </div>
          ) : moods.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Mood Records Yet</h2>
              <p className="text-gray-600 mb-8">
                Start recording your moods to see your emotional journey over time.
              </p>
              <button
                onClick={() => onNavigate('record')}
                className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
              >
                Record Your First Mood
              </button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-6 h-6 text-teal-600" />
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Average Score
                    </h3>
                  </div>
                  <p className={`text-4xl font-bold ${getScoreTextColor(averageScore)}`}>
                    {averageScore} / 100
                  </p>
                </div>

                <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-6 h-6 text-cyan-600" />
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Total Records
                    </h3>
                  </div>
                  <p className="text-4xl font-bold text-gray-900">{moods.length}</p>
                </div>
              </div>

              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold">Date</th>
                      <th className="text-left py-4 px-4 text-gray-600 font-semibold">Mood</th>
                      <th className="text-center py-4 px-4 text-gray-600 font-semibold">Score</th>
                      <th className="text-center py-4 px-4 text-gray-600 font-semibold">Energy</th>
                      <th className="text-center py-4 px-4 text-gray-600 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moods.map((mood) => (
                      <tr
                        key={mood.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 text-gray-700">
                          {formatDate(mood.created_at)}
                        </td>
                        <td className="py-4 px-4 text-gray-900 font-medium">
                          {mood.mood_type}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span
                            className={`${getScoreColor(mood.mood_score)} text-white px-4 py-2 rounded-full font-bold inline-block min-w-[80px]`}
                          >
                            {mood.mood_score}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center text-gray-700">
                          {mood.energy_level}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <button
                            onClick={() => {
                              onViewMood(mood.id);
                              onNavigate('report');
                            }}
                            className="text-teal-600 hover:text-teal-700 font-medium transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={() => onNavigate('record')}
                  className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  Record New Mood
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
