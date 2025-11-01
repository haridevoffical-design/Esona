import { Heart, Shield, TrendingUp, Users } from 'lucide-react';
import type { Page } from '../types';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time mood detection',
      description: 'Advanced AI analyzes your voice tone, pace, and energy instantly.',
    },
    {
      icon: Heart,
      title: 'Mood tracking and insights',
      description: 'Track your emotional patterns over time and gain valuable insights.',
    },
    {
      icon: Shield,
      title: 'Calming suggestions',
      description: 'Personalized recommendations to help you relax and recharge.',
    },
    {
      icon: Users,
      title: 'Confidential and judgment-free',
      description: 'A safe space to express yourself without fear of judgment.',
    },
  ];

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
          <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">About Esona</h1>

          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Esona is an AI-powered <span className="font-semibold text-teal-600">Sound of Understanding</span> — your digital mental health mirror designed especially for students and professionals.
            </p>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              It uses <span className="font-semibold">voice emotion recognition technology</span> to analyze how you feel from your tone, speech speed, and energy.
            </p>
            <p className="text-2xl text-gray-900 font-semibold text-center my-8">
              Our mission is simple —
            </p>
            <p className="text-xl text-gray-700 leading-relaxed text-center">
              to help you become more aware of your emotions, track your well-being, and find calm through AI.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-8 hover:shadow-lg transition-all"
                  >
                    <div className="bg-teal-500 text-white w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8 border-2 border-orange-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Important Notice
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              Esona is not a replacement for therapy, but a digital companion to support your mental wellness journey. If you're experiencing severe mental health issues, please seek professional help.
            </p>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Have questions or feedback?</h3>
            <p className="text-lg text-gray-700 mb-6">We'd love to hear from you!</p>
            <a
              href="mailto:esona.ai@gmail.com"
              className="inline-block bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              📧 Email us at esona.ai@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
