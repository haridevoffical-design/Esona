import { Wind, Music, PenTool, Sun, MessageCircle, History } from 'lucide-react';
import type { Page } from '../types';

interface SuggestionsPageProps {
  onNavigate: (page: Page) => void;
}

export function SuggestionsPage({ onNavigate }: SuggestionsPageProps) {
  const suggestions = [
    {
      icon: Wind,
      title: 'Try a 5-minute breathing exercise',
      description: 'Deep breathing can lower stress and bring clarity to your mind.',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
    },
    {
      icon: Music,
      title: 'Listen to soothing instrumental music',
      description: 'Calm music can help regulate emotions and promote relaxation.',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
    },
    {
      icon: PenTool,
      title: 'Write down 3 things you\'re grateful for',
      description: 'Gratitude journaling shifts focus to positive aspects of life.',
      color: 'bg-teal-500',
      hoverColor: 'hover:bg-teal-600',
    },
    {
      icon: Sun,
      title: 'Take a short walk or stretch',
      description: 'Physical movement releases endorphins and improves mood.',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('home')}
          className="text-teal-600 hover:text-teal-700 font-medium mb-8 transition-colors"
        >
          ← Back to Home
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
            Relax and Recharge
          </h1>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-2xl mx-auto">
            Here are some personalized calming ideas based on your mood:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <div
                  key={index}
                  className={`${suggestion.color} ${suggestion.hoverColor} text-white rounded-2xl p-8 transition-all transform hover:scale-105 shadow-lg cursor-pointer`}
                >
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{suggestion.title}</h3>
                  <p className="text-white/90 leading-relaxed">{suggestion.description}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">💡 Bonus Tip</h3>
            <p className="text-gray-700 leading-relaxed">
              Talking regularly with Esona helps you understand your emotional patterns and build
              emotional balance. Make it a daily habit for better self-awareness.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onNavigate('record')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Talk Again
            </button>
            <button
              onClick={() => onNavigate('history')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <History className="w-5 h-5" />
              View My Mood History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
