import { Mic, BarChart3, Sparkles } from 'lucide-react';
import type { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Esona</h1>
          <p className="text-2xl text-teal-600 font-medium mb-6">
            💬 The Sound of Understanding.
          </p>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Talk. Reflect. Heal — with AI that listens and understands you.
          </p>
        </header>

        <div className="bg-white rounded-3xl shadow-xl p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Welcome to Esona, your personal AI-powered emotional companion.
          </h2>
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            Share your thoughts or feelings anytime — Esona listens, analyzes your voice tone,
            and helps you understand your mood better.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Get a Mood Score, personalized insights, and calming recommendations — all confidential,
            all judgment-free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <button
            onClick={() => onNavigate('record')}
            className="bg-teal-500 hover:bg-teal-600 text-white rounded-2xl p-8 shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl"
          >
            <Mic className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Start Talking</h3>
            <p className="text-teal-100">Share your feelings with Esona</p>
          </button>

          <button
            onClick={() => onNavigate('history')}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-2xl p-8 shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl"
          >
            <BarChart3 className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">View Mood Report</h3>
            <p className="text-blue-100">Track your emotional journey</p>
          </button>

          <button
            onClick={() => onNavigate('suggestions')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-2xl p-8 shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Get Calming Suggestions</h3>
            <p className="text-cyan-100">Personalized relaxation tips</p>
          </button>
        </div>

        <footer className="text-center">
          <button
            onClick={() => onNavigate('about')}
            className="text-teal-600 hover:text-teal-700 font-medium text-lg transition-colors"
          >
            Learn more about Esona
          </button>
        </footer>
      </div>
    </div>
  );
}
