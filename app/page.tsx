'use client';
import Nav from '@/components/Nav';
import { ComprehensionLevel } from '@/models/types';

import { FormEvent, useState, useRef } from 'react';

export default function Home() {
  const [topic, setTopic] = useState<string>('dinosaurs');
  const [comprehensionLevel, setComprehensionLevel] =
    useState<ComprehensionLevel>('elementary school');
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const topicInputRef = useRef();

  const comprehensionLevels: ComprehensionLevel[] = [
    'elementary school',
    'middle school',
    'high school',
    'college',
  ];

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setTopic(e.currentTarget.value);
  };

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    setComprehensionLevel(e.currentTarget.value as ComprehensionLevel);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const url = '/api/test';

    const data = {
      topic,
      comprehensionLevel,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      console.log('handleSubmit ~ response:', response);

      const data = await response.json();
      console.log('handleSubmit ~ data:', data);

      setResponse(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <main className="bg-base-100">
        <form className="p-10 text-5xl">
          <div>
            <h1>
              I want to learn about
              <span>
                <input
                  type="text"
                  value={topic}
                  className="text-5xl text-yellow-400 input input-ghost"
                  // ref={topicInputRef}
                  onChange={handleInputChange}
                />
              </span>
            </h1>
            <div className="mt-4">
              <h1>
                Explain to to me like I&apos;m in
                <span>
                  <select className="w-auto text-5xl text-teal-500 select-ghost select select-lg">
                    {comprehensionLevels.map((level) => (
                      <option key={level}>{level}</option>
                    ))}
                  </select>
                </span>
              </h1>
            </div>
          </div>
          <button className="mt-10 btn btn-lg btn-primary">Teach Me</button>
        </form>

        {isLoading && <p>Contest is loading</p>}
        {response && <p className="m-10">{response}</p>}
      </main>
    </>
  );
}
