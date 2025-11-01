import { useState, useRef } from 'react';
import { Mic, Square, Loader2 } from 'lucide-react';
import type { Page } from '../types';
import { supabase } from '../lib/supabase';

interface RecordPageProps {
  onNavigate: (page: Page) => void;
  onMoodRecorded: (moodId: string) => void;
}

export function RecordPage({ onNavigate, onMoodRecorded }: RecordPageProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      intervalRef.current = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please grant permission and try again.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());

      setIsProcessing(true);
      simulateMoodAnalysis();
    }
  };

  const simulateMoodAnalysis = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const moods = [
      { type: 'Calm but slightly anxious', score: 62, energy: 'Medium', insight: 'You sound thoughtful but a little stressed. Try a short breathing exercise.' },
      { type: 'Energetic and positive', score: 85, energy: 'High', insight: 'Your voice shows great enthusiasm! Keep that positive energy going.' },
      { type: 'Tired but content', score: 54, energy: 'Low', insight: 'You seem fatigued but at peace. Consider rest and self-care today.' },
      { type: 'Focused and determined', score: 78, energy: 'Medium', insight: 'You sound clear-headed and motivated. Great time to tackle goals!' },
      { type: 'Relaxed and peaceful', score: 82, energy: 'Low', insight: 'Your tone reflects calmness. This is a good state for reflection.' },
    ];

    const randomMood = moods[Math.floor(Math.random() * moods.length)];

    const { data, error } = await supabase
      .from('mood_records')
      .insert([
        {
          mood_type: randomMood.type,
          mood_score: randomMood.score,
          energy_level: randomMood.energy,
          ai_insight: randomMood.insight,
          recording_duration: recordingTime,
        },
      ])
      .select()
      .maybeSingle();

    setIsProcessing(false);

    if (error) {
      console.error('Error saving mood record:', error);
      alert('Error saving your mood. Please try again.');
      return;
    }

    if (data) {
      onMoodRecorded(data.id);
      onNavigate('report');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Talk Freely — Your AI Listens
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Press record and start talking. Esona will listen and analyze your tone, pace,
            and energy to detect your emotional state.
          </p>

          <div className="bg-teal-50 rounded-2xl p-8 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Example topics:</h3>
            <ul className="text-gray-700 space-y-2">
              <li>"I feel overwhelmed about exams."</li>
              <li>"Today was a really good day."</li>
              <li>"I'm worried about the future."</li>
              <li>"I accomplished something I'm proud of."</li>
            </ul>
          </div>

          {!isRecording && !isProcessing && (
            <div>
              <button
                onClick={startRecording}
                className="bg-teal-500 hover:bg-teal-600 text-white rounded-full p-12 shadow-2xl transition-all transform hover:scale-105 mb-6"
              >
                <Mic className="w-24 h-24" />
              </button>
              <p className="text-gray-600 text-lg">Click to start recording</p>
              <p className="text-gray-500 text-sm mt-2">Speak for 20-60 seconds</p>
            </div>
          )}

          {isRecording && (
            <div>
              <div className="relative inline-block mb-6">
                <button
                  onClick={stopRecording}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full p-12 shadow-2xl transition-all transform hover:scale-105 animate-pulse"
                >
                  <Square className="w-24 h-24" />
                </button>
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                  <span className="animate-pulse">●</span>
                </div>
              </div>
              <p className="text-gray-900 text-2xl font-bold mb-2">{formatTime(recordingTime)}</p>
              <p className="text-gray-600 text-lg">Recording... Click to stop</p>
            </div>
          )}

          {isProcessing && (
            <div>
              <div className="bg-teal-100 rounded-full p-12 inline-block mb-6">
                <Loader2 className="w-24 h-24 text-teal-600 animate-spin" />
              </div>
              <p className="text-xl font-semibold text-gray-900 mb-2">✅ Voice received successfully!</p>
              <p className="text-gray-600 text-lg">Analyzing your mood… Please wait a few seconds.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
