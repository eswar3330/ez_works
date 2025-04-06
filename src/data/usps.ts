import { Clock, Star, Timer, Shield } from 'lucide-react';

export interface TimelineStep {
  time: string;
  unit: string;
  text: string;
}

export interface USPCard {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  link: string;
}

export const timelineSteps: TimelineStep[] = [
  { 
    time: '10', 
    unit: 'minutes', 
    text: 'Receive a Confirmation Email' 
  },
  { 
    time: '20', 
    unit: 'minutes', 
    text: 'Experts Allocated' 
  },
  { 
    time: '30', 
    unit: 'minutes', 
    text: 'Assignment Starts' 
  }
];

export const uspCards: USPCard[] = [
  {
    title: 'Consistently High Quality',
    icon: Star,
    description: 'Technology has brought us to the threshold of a variety of high-quality services. However, as a team of ex-consultants from top consulting firms, we have constantly found',
    link: 'https://www.ez.works/ez/consistently-high-quality'
  },
  {
    title: 'Round the Clock Availability',
    icon: Clock,
    description: 'Oftentimes our new clients ask us how it is that our service experts are always available, no matter the time of day, day of the week, or season of the year. How do we fulfill our promise',
    link: 'https://www.ez.works/ez/round-the-clock-availability'
  },
  {
    title: 'Faster than the Fastest',
    icon: Timer,
    description: 'Rome may not have been built in a day, but what about your presentation? What about the audio-visual content you promised your client for the next meeting? In a competitive market',
    link: 'https://www.ez.works/ez/faster-than-the-fastest'
  },
  {
    title: 'Information Security',
    icon: Shield,
    description: 'ISO 27001:2022 comes within the ISO 27000 family, which is dedicated to the standardization of Information Security Management Systems (ISMS). There are quite a few standards',
    link: 'https://www.ez.works/ez/iso-27001-2022'
  }
];