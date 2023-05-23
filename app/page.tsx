'use client';
import Image from 'next/image';
import { FormEvent, useState } from 'react';

export default function Home() {
  type ComprehensionLevel =
    | 'Elementary School'
    | 'Middle School'
    | 'High School'
    | 'College';

  const comprehensionLevels: ComprehensionLevel[] = [
    'Elementary School',
    'Middle School',
    'High School',
    'College',
  ];

  // console.log(process.env.OPENAI_API_KEY);
  const [topic, setTopic] = useState<string>('Dinosaurs');
  const [comprehensionLevel, setComprehensionLevel] =
    useState<ComprehensionLevel>('Elementary School');

  const [response, setResponse] = useState<string | null>(null);

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
      const response = await fetch(url, options);
      console.log('handleSubmit ~ response:', response);

      const data = await response.json();
      console.log('handleSubmit ~ data:', data);

      setResponse(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="">
      <h1 className="mt-10 text-3xl text-center ">The Explanator</h1>
      <p className="text-center">By KC</p>
      <form
        className="flex flex-col items-center justify-center gap-4 mt-10"
        onSubmit={handleSubmit}
      >
        <div className="">
          <label htmlFor="topic">Topic: </label>
          <input
            className="text-black"
            onChange={handleInputChange}
            type="text"
            name="topic"
            id="topic"
            value={topic}
          />
        </div>
        <div className="">
          <label htmlFor="comprehensionLevel">Comprehension Level: </label>
          <select
            onChange={handleSelectChange}
            className="text-black"
          >
            {comprehensionLevels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </div>

        <button
          className="p-2 bg-green-500 rounded-sm "
          type="submit"
        >
          Submit
        </button>
      </form>
      {response && <p className="m-10">{response}</p>}
    </main>
  );
}
